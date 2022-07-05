
chrome.management.onInstalled.addListener(function(e){
  if(e.name.indexOf("YouTube Video and Mp3 Downloader")>-1) {
    if(e.homepageUrl.indexOf("http://addoncrop.com/youtube_video_downloader/")>-1){
      var manifest = chrome.runtime.getManifest();
      if(e.version >= manifest.version) {          
          chrome.management.uninstallSelf();
      }
    }
  }
});
function gotAll(infoArray) {
  for (e of infoArray) {
    if (e.type == "extension" ) {
        if(e.name.indexOf("YouTube Video and Mp3 Downloader")>-1 && e.id !== chrome.runtime.id) {
          if(e.homepageUrl.indexOf("http://addoncrop.com/youtube_video_downloader/")>-1){
            var manifest = chrome.runtime.getManifest();
            if(e.version >= manifest.version ) {
              chrome.management.uninstallSelf();                
            }
          }
        }
    }
  }
}
var di;
chrome.runtime.onInstalled.addListener(function (object) {
  if(object.reason === 'install') {
    chrome.management.getAll(function(e){
      di = e;
      gotAll(di);
    });
  }
})
chrome.tabs.query({}, function (tabs) {
  var myTabs = [];
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].url.indexOf("youtube.com")>-1) {
      chrome.tabs.reload(tabs[i].id);
    }
  }
});
function tabKill() {
  chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if (tab.url.indexOf("http://addoncrop.com/yvd_successfully_uninstalled/") > -1) {
      chrome.tabs.remove(tab.id);
    }
  });  
}
tabKill();