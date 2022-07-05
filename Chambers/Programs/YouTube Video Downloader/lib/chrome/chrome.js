var app = {};
var urls_op;
app.loadReason = "startup";
app.manifest = chrome.extension.getURL('');
app.version = function () {return chrome.runtime.getManifest().version};
app.tab = {"open": function (url) {chrome.tabs.create({"url": url, "active": true})}};
if (chrome.runtime.onInstalled) chrome.runtime.onInstalled.addListener(function (e) {app.loadReason = e.reason});
app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      document.getElementById("common").src = "../common.js";
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      objs[id] = data;
      tmp[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();
app.addon = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.method === id) {
          var _data = request.data || {};
          if (sender.tab) {
            _data["top"] = sender.tab.url;
            _data["tabId"] = sender.tab.id;
          }
          _tmp[id](_data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"method": id, "data": data});
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (tab.url.indexOf("http") === 0) {
            if (!tabId || (tabId && tab.id === tabId)) {
              var _data = data || {};
              _data["top"] = tab.url;
              _data["tabId"] = tab.id;
              chrome.tabs.sendMessage(tab.id, {"method": id, "data": _data}, function () {});
            }
          }
        });
      });
    }
  }
})();
function uReload() {
  chrome.tabs.query({}, function (tabs) {
  var myTabs = [];
  for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.indexOf("youtube.com")>-1) {
        chrome.tabs.reload(tabs[i].id);
      }
    }
  });
}
var comments=false, screenshots=true, float=false, pause=false, autoplay=false;
var db = {
  read:function (value, callback) {
    chrome.storage.local.get(value, function(d) {
        callback(d[value]);
    }); 
  },
  r:function(d) {
    if (typeof d !== 'undefined') return true;return false; 
  },
  init:function() {
    db.read("comments",   function(d) { if(db.r(d))comments = d; });
    db.read("screenshot", function(d) { if(db.r(d))screenshots = d; });
    db.read("float",      function(d) { if(db.r(d))float = d; });
    db.read("pause",      function(d) { if(db.r(d))pause = d; });
    db.read("autoplay",   function(d) { if(db.r(d))autoplay = d; });
  }
}
var s = true;
function getValuers() {   
    chrome.storage.local.get('enableButton', function(data) {
        if(data.enableButton) {                
          s = data.enableButton;
        }
    });
    return s;
}
var dC = true;
function dataCopy() {   
    chrome.storage.local.get('copy', function(data) {
        if(data.copy) {                
          dC = data.copy;
        }
    });
    return dC;
}
var x = 2;
function getSiteTarget() { 
    chrome.storage.local.get('site', function(data) {
        if(data.site) {                
          x = data.site;
        }
    });
    return x; 
}
var hd = 1;
function hdSetup() {
  chrome.storage.local.get('hd', function(data) {
        if(data.hd) {                
          hd = data.hd;
        }
  });
  return hd;
}
var sT = 1;
function setTooltip(d) {
  chrome.storage.local.get('st3', function(data) {
      if(data.st3) {   
        sT = 0;              
      } else {        
        if(d==1)setTimeout(function(){chrome.storage.local.set({'st3': 1 });setTooltip();},2000);
      }
  });  
  return sT;
}
var reload = 1;
function getReloadData() {
  chrome.storage.local.get('reload', function(data) {
      if(data.reload === false) {   
        reload = 0;              
      } else {
        reload = 1;
      }
  });
}
var ads = true;
function setAdsBlock() {
  chrome.storage.local.get('ads', function(data) {
      if(data.ads == false) {  
        ads = data.ads;              
      } else {
        ads = true; 
      }
  });  
  return ads;
}
var anno = true;
function setAnnoBlock() {
  chrome.storage.local.get('anno', function(data) {
      if(data.anno == true) {  
        urls_op = ["/ads/","/pageads/","/pagead/","/api/stats","doubleclick.net","pagead2.googlesyndication.com","/annotations_invideo?","pubads_impl","youtube.com/get_video_info"];             
      } else {
        urls_op = ["/ads/","/pageads/","/pagead/","/api/stats","doubleclick.net","pagead2.googlesyndication.com","pubads_impl","youtube.com/get_video_info"];
      }
  });  
  return anno;
}
function u() {
  getValuers();getSiteTarget();hdSetup();dataCopy();setAdsBlock(); setAnnoBlock();db.init();getReloadData();uReload();
}
setTooltip(0);
u();
var ctrlBlock = "null";
function requestWarn() {  
  chrome.webRequest.onBeforeRequest.addListener(function(details){    
    if(ctrlBlock.indexOf("youtube.com/")>-1 && ads)
    {
      for ( var key in urls_op) { if (details.url.indexOf(urls_op[key])>-1) return{cancel:true}; };
    }
  },{urls: ['<all_urls>']},['blocking']);
}
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  if(tab.url.indexOf("/embed/")==-1) {
    ctrlBlock = tab.url;
  } else {
    ctrlBlock = "null";
  }
});
requestWarn();
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "EnableAddoncrop")
      sendResponse({farewell: getValuers()});
    if (request.greeting == "siteTarget")
      sendResponse({farewell: getSiteTarget()});
    if (request.greeting == "siteTargetInject")
      sendResponse({farewell: x});
    if (request.greeting == "HD")
      sendResponse({farewell: hdSetup()});
    if (request.greeting == "HDx")
      sendResponse({farewell: hd});
    if (request.greeting == "update")
      sendResponse({farewell: u()});
    if (request.greeting == "st")
      sendResponse({farewell: setTooltip(1)});
    if (request.greeting == "copyData")
      sendResponse({farewell: dataCopy()});   
    if (request.greeting == "proto")
      sendResponse({farewell: {comments, screenshots,float,pause,autoplay}}); 
    if (request.greeting == "force")
      sendResponse({farewell: reload}); 
});