var bgPage = chrome.extension.getBackgroundPage();

var manifestData = chrome.runtime.getManifest();
var ver = manifestData.version;



function checkSuperStarterStatus(cb) {
    chrome.runtime.sendNativeMessage('com.tacticstechnology.superstarter',
        { text: "ping" },
        function (r) {
            var storageObj = {};
            if (r) {
                storageObj["superstarter"] = { "installed": "true" };
            } else {
                storageObj["superstarter"] = { "installed": "false" };
            }
            chrome.storage.local.set(storageObj, function () { });
            if (cb) cb(r);
        }
    );
}

function log(msg) {
    console.log(msg);
}

function isValidTab(tab) {
    if (tab == null) return false;
    var url = new URL(tab.url);
    if (url.protocol == "https:" || url.protocol == "http:") {
        return true;
    }
    return false;
}



function enableFlash() {
    //window.sessionStorage.setItem(window.location.host, '{"flashenabled":"true"}')
    log("Requesting to enable flash");
    chrome.runtime.sendMessage({ "command": "enableFlash" }, function (response) {
        if (response && response.data) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length > 0 && isValidTab(tabs[0])) {

                    var url = new URL(tabs[0].url)
                    var domain = url.hostname;
                    var storageObj = {};
                    storageObj[domain] = { "flashenabled": true, "dismissed": false };
                    chrome.storage.local.set(storageObj, function () {
                        log('Value is set to true');
                    })

                    chrome.tabs.reload(tabs[0].id);
                    window.close();
                }
            });
        }
    });
}


function disableFlash() {
    //window.sessionStorage.setItem(window.location.host, '{"flashenabled":"true"}')
    log("Requesting to disable flash");
    chrome.runtime.sendMessage({ "command": "disableFlash" }, function (response) {
        if (response && response.data) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length > 0 && isValidTab(tabs[0])) {
                    var url = new URL(tabs[0].url)
                    var domain = url.hostname;
                    var storageObj = {};
                    storageObj[domain] = { "flashenabled": false };
                    chrome.storage.local.set(storageObj, function () {
                        log('Value is set to false');
                    })

                    chrome.tabs.reload(tabs[0].id);
                    window.close();
                }
            });
        }
    });
}

function installSupernovaPlayer() {
    var newURL = "http://www.getsupernova.com/download/";
    chrome.tabs.create({ url: newURL });
    window.close();
}


function runSupernovaUI() {
    chrome.windows.getCurrent(function (w) {
        chrome.tabs.getSelected(w.id, function (tab) {
            if (isValidTab(tab)) {
                chrome.tabs.executeScript(tab.id, {
                    file: 'supernovalauncher.js'
                });
            }
        });
    });
}

function sendDismissNotificationMsg() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            var tab = tabs[0];
            if (isValidTab(tab)) {
                chrome.tabs.sendMessage(tab.id, { data: "dismissNotification" })
            }
        }
    });
}

function sendCloseNotificationMsg() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            var tab = tabs[0];
            if (isValidTab(tab)) {
                chrome.tabs.sendMessage(tab.id, { data: "closeNotification" })
            }
        }
    });
}

function sendSuperstarterNotificationMessage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            var tab = tabs[0];
            if (isValidTab(tab)) {
                chrome.tabs.sendMessage(tab.id, { data: "superstarterrequest" }, function (response) {
                    log("UI - Posting superstarter notice");
                    window.close();
                });
            }
        }
    });
}

$(document).ready(function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0 && isValidTab(tabs[0])) {
            //var url = new URL(tabs[0].url);
            //$(".current-domain").html("on "+url.protocol + "//" + url.host);
        } else {
            $("#enableFlashButton").hide();
        }
    });

    $("#disableFlashButton").hide();
    chrome.runtime.sendMessage({ "command": "getFlashStatus" }, function (response) {
        log(response);
        if (response && typeof (response) === "object" && response.setting == "allow") {
            log(response);
            $("#enableFlashButton").hide();
            $("#disableFlashButton").show();
        }
    });




    $("#runSupernovaPlayerButton").click(function () {
        checkSuperStarterStatus(function (r) {
            if (r) {
                sendSuperstarterNotificationMessage();
                runSupernovaUI();
            }
        });
    });

    $("#enableFlashButton").click(function () {
        enableFlash();
    });

    $("#enableButtonV2").click(function () {
        enableFlash();
    });

    $(".close-x-button").click(function (e) {
        e.preventDefault();
        sendCloseNotificationMsg();
    });
    $(".dismiss-link").click(function (e) {
        e.preventDefault();
        sendCloseNotificationMsg();
    });


    $("#closeSelf").click(function () {
        console.log(window.parent.document);
    });

    $("#disableFlashButton").click(function () {
        disableFlash();
    });

    $("#installSuperNovaPlayerButton").click(function () {
        installSupernovaPlayer();
    });

    chrome.runtime.getPlatformInfo(function (info) {
        let os = info.os
        chrome.storage.local.get(["superstarter"], function (storage) {
            if (storage["superstarter"] != null && typeof (storage["superstarter"]) === 'object') {
                var superstarterdata = storage["superstarter"];
                if (superstarterdata.installed) {
                    $('#button-centerer').addClass("button-centerer-two-buttons");
                    $('.run-button-container').show();
                    $('.install-button-container').hide();
                } else {
                    $('#button-centerer').addClass("button-centerer-one-button");
                    $('.run-button-container').hide();
                    if (os === "win") {
                        $('.install-button-container').show();
                    }
                }
            }
        });


    });



})