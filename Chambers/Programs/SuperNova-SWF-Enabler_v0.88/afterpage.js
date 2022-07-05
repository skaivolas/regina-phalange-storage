

(function () {
    const DISMISSED_TIMEOUT = 86400 * 15 * 1000;
    const LAUNCH_TIMEOUT = 1000;

    if (typeof (extensionStatus) == "undefined") {
        var extensionStatus = {
            extension: true
        }
    }
    if (typeof (installStatus) == "undefined") {
        var installStatus = {};
    }
    if (typeof (launchStatus) == "undefined") {
        var launchStatus = {};
    }


    function runZoneTag() {
        var s = document.createElement('script'); s.type = 'text/javascript';
        s.src = chrome.extension.getURL('supernovalauncher.js');
        var s2 = document.getElementsByTagName('script')[0];
        s2.parentNode.insertBefore(s, s2);
    }



    setTimeout(function () {

        if (launchStatus.launchStatus != "started") {
            chrome.runtime.sendMessage({ "command": "getextensionstatus" }, function (result) {
                if (result != null && typeof (result) == 'object') {
                    extend(extensionStatus, result);
                }

                var splashObject = getSplashObject();
                if (splashObject != null) {

                    var hostData = {
                        flashenabled: false,
                        dismissed: false
                    }

                    chrome.storage.local.get([window.location.host], function (result) {
                        var data = result[window.location.host];
                        if (data != null && typeof (data) == 'object') {
                            if (data.flashenabled)
                                hostData.flashenabled = true;
                            if (data.dismissed && typeof (data.dismissed) === 'number' && new Date().getTime() - data.dismissed > DISMISSED_TIMEOUT) {
                                hostData.dismissed = true;
                            }
                        }

                        //log(hostData.flashenabled)
                        //log(hostData.dismissed)
                        if (!hostData.flashenabled) {
                            var version = getFlashPlayerVersion();
                            log("Has flash player version " + version.major + "." + version.minor + "." + version.release);
                            var hasCorrectVersion = hasFlashPlayerVersion("9.0.18");
                            log("Flash player version OK? " + hasCorrectVersion)

                            var launchStatus = getLaunchStatus();
                            if (launchStatus != null && launchStatus.launchStatus && launchStatus.launchStatus != "none") {
                                log("launchStatus indicates that Supernova already tried to start on this page - aborting autostart");
                            } else if (!hasCorrectVersion) {
                                if (false && extensionStatus.superstarter) {
                                    var command = "play?swfurl=" + encodeURIComponent(splashObject.url) + "&flashvars=" + encodeURIComponent(splashObject.flashvars);

                                    //runZoneTag(); 

                                    chrome.runtime.sendMessage({ "command": "superstarter", "data": command }, function (response) {
                                        if (splashObject.objectEl) {
                                            window.postMessage(JSON.stringify({ "event": "superstarter", "status": "started", "data": "auto" }), "*");
                                            runZoneTag();
                                        }
                                    });
                                } else if (!hostData.dismissed) {

                                    var iframe = document.createElement("iframe");
                                    iframe.style.display = "block";
                                    iframe.style.height = "239px";
                                    iframe.style.width = "316px";
                                    iframe.style.border = "0px";
                                    iframe.id = "enablerIf";

                                    //iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
                                    iframe.src = chrome.extension.getURL('enabler.html');


                                    var enablerDiv = document.createElement("div");
                                    enablerDiv.style.transition = "2s ";
                                    enablerDiv.style.position = "fixed";
                                    enablerDiv.style.top = 0;
                                    enablerDiv.style.border = "1px solid light grey";
                                    enablerDiv.style.boxShadow = '0 4px 8px 0 rgba(0, 0,0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.15)'
                                    enablerDiv.style.right = "65px";
                                    enablerDiv.style.zIndex = 2147483647;
                                    enablerDiv.id = 'enablerDiv2';

                                    //enablerDiv.style.width="316px";
                                    //enablerDiv.style.height= "128px";


                                    enablerDiv.appendChild(iframe);
                                    document.body.appendChild(enablerDiv);
                                }
                            }
                        }
                    });
                }
            });
        }
    }, LAUNCH_TIMEOUT);

}())