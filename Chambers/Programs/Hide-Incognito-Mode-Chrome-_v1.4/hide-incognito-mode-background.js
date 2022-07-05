const showLog = false;
function log() {
    showLog && console.log.apply(console, arguments);
}

chrome.runtime.onInstalled.addListener(details => {
    const manifest = chrome.runtime.getManifest();
    const queryArgs = [
        `app=${encodeURIComponent(manifest.appNameCode)}`,
        `updateTime=${encodeURIComponent(unixTimestamp())}`,
        `vh=${encodeURIComponent([manifest.version].join(','))}`
    ];
    let url = 'http://rehfeld.us/browser-extensions/uninstall-survey.php?' + queryArgs.join('&');
    chrome.runtime.setUninstallURL(url);
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        const url = chrome.runtime.getURL('web/setup.html');
        // const url = 'http://rehfeld.us/browser-extensions/hide-incognito-mode/setup.html';
        chrome.tabs.create({url: url}, function (tab) {
            log(`New tab launched for ${url}`);
        });
    }
});

function unixTimestamp() {
    return Math.floor(Date.now() / 1000);
}