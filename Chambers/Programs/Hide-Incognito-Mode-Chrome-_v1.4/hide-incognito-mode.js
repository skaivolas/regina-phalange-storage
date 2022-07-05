"use strict";

function mockRequestFileSystemFn(type, size, successCallback, errorCallback) {
    setTimeout(() => {
        // Call the callback w/ a poor imitation of a FilesystemObject.
        const mockFilesystemObject = {};
        successCallback(mockFilesystemObject);
    }, 0);
}

function mockStorageEstimateQuotaFn() {
    // The incognito detection method used by some websites assumes that the max storage quota in incognito is 120MB, so we will use 120MB + 1 single more byte.
    // If the NYT were to see this code, me using exactly 1 more byte would be more taunting and likely to upset them, which would make me smile lol.
    const nonIncognitoMinimumStorageBytes = 120 * (2 ** 20);
    const fakeQuotaBytes = nonIncognitoMinimumStorageBytes + 1;

    // Return a promise that tries hard to mimic the native storage.estimate() promise, forwarding arguments.
    return new Promise((resolve, reject) => {
        mockStorageEstimateQuotaFn.nativeEstimateFn.call(navigator.storage).then(function(estimateDetails) {

            // We will use the native object, and only shadow the quota property to overwrite it with our larger quota.
            // We only change the quota if it's too small. Otherwise we leave it alone so it's accurate.
            const newDeceptiveEstimate = Object.create(estimateDetails);
            newDeceptiveEstimate.quota = Math.max(fakeQuotaBytes, estimateDetails.quota);

            // There should only be 1 argument, but we'll forward all args for future-proofing and max compatibility.
            arguments[0] = newDeceptiveEstimate;
            resolve(...arguments);
        }, reject);
    });
}

if (window.RequestFileSystem) {
    window.RequestFileSystem = mockRequestFileSystemFn;
}

if (window.webkitRequestFileSystem) {
    window.webkitRequestFileSystem = mockRequestFileSystemFn;
}

// We also mock the StorageManager.estimate() method because now some sites (the evil NYT) is using a new incognito detection method
// which looks at the storage quota to determine if incog.
// Infoz https://mishravikas.com/articles/2019-07/bypassing-anti-incognito-detection-google-chrome.html
if (navigator.storage && navigator.storage.estimate) {
    // Store a ref to orig func before we overwrite it w/ our new shim / mock.
    mockStorageEstimateQuotaFn.nativeEstimateFn = navigator.storage.estimate;
    navigator.storage.estimate = mockStorageEstimateQuotaFn;
}