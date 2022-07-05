function n() {
  $("#n").fadeIn("slow");
  setTimeout(function(){$("#n").fadeOut();},1000);
}

function s() {
  chrome.runtime.sendMessage({greeting: "update"});
}

function saveSettings(d) {
  chrome.storage.local.set({
    darkModes: d
  });n(),s();
}

function saveSettings2(d) {
  chrome.storage.local.set({
    ads: d
  });n(),s();
}

function saveSettings3(d) {
  chrome.storage.local.set({
    anno: d
  });n(),s();
}

var db = {
  save:function(key,value) {
    var storage = chrome.storage.local;
    var v1 = key;
    var obj= {};
    obj[v1] = value;
    storage.set(obj, function(){n(),s();});
  }
}

var init = function (data) {
  var _mp4 = document.getElementById("mp4");
  var _flv = document.getElementById("flv");
  var _3gp = document.getElementById("3gp");
  var _m4a = document.getElementById("m4a");
  var _webm = document.getElementById("webm");
  var r1 = document.getElementById("r1x");
  var r2 = document.getElementById("r2x");
  var r3 = document.getElementById("r3x");
  var _saveAs = document.getElementById("save-as");
  var _enableBtn = document.getElementById("btnEnable");
  /*  */

  _enableBtn.checked = data["enableButton"];
  _mp4.checked = data["mp4"];
  if ( data["mp4"] ) document.getElementById("mp4x").className="btn active";
  _flv.checked = data["flv"];
  if ( data["flv"] ) document.getElementById("flvx").className="btn active";
  _3gp.checked = data["3gp"];
  if ( data["3gp"] ) document.getElementById("3gpx").className="btn active";
  _m4a.checked = data["m4a"];
  if ( data["m4a"] ) document.getElementById("m4ax").className="btn active";
  _webm.checked = data["webm"];
  if ( data["webm"] ) document.getElementById("webmx").className="btn active";
  if ( data["v"] == true ) r2.checked = true, document.getElementById("r2").className="btn active";
  if ( data["a"] == true ) r3.checked = true, document.getElementById("r3").className="btn active";
  if ( !data["a"] && !data["v"]) r1.checked = true, document.getElementById("r1").className="btn active";
  _saveAs.checked = data["saveAs"];
  if ( data["saveAs"] ) document.getElementById("save-as2").className="btn active";

  chrome.runtime.sendMessage({greeting: "EnableAddoncrop"}, function(response) {
    if( response.farewell == "false") {
      _enableBtn.checked = false;
    } else {
      _enableBtn.checked = true;      
      document.getElementById("btnEnable2").className="btn active";
    }    
  });

  chrome.runtime.sendMessage({greeting: "force"}, function(response) {
    if( response.farewell == 0) {
      document.getElementById("reloadx").checked = false;
      document.getElementById("reload").className="btn";
    }    
  });

  /*
    Data addoncrop
  */

  chrome.runtime.sendMessage({greeting: "proto"}, function(response) {
    var d = response.farewell; 
    var o1=d.comments, o2=d.screenshots, o3=d.pause, o4=d.float,o5=d.autoplay;
    if(o1)document.getElementById("commentsx").checked = true,document.getElementById("comments").className="btn active";
    if(o2)document.getElementById("sshotx").checked = true,document.getElementById("sshot").className="btn active";
    if(o3)document.getElementById("pausex").checked = true,document.getElementById("pause").className="btn active";
    if(o4)document.getElementById("floatx").checked = true,document.getElementById("float").className="btn active";
    if(o5)document.getElementById("autox").checked = true,document.getElementById("auto").className="btn active";
  });

  document.getElementById("comments").addEventListener("click", function (e) {
    e = document.getElementById("commentsx");
    setTimeout(function(){
      db.save("comments",e.checked);
    },300);     
  });

  document.getElementById("reload").addEventListener("click", function (e) {
    e = document.getElementById("reloadx");
    setTimeout(function(){
      db.save("reload",e.checked);
    },300);     
  });

  document.getElementById("sshot").addEventListener("click", function (e) {
    e = document.getElementById("sshotx");
    setTimeout(function(){
      db.save("screenshot",e.checked);
    },300);     
  });
  document.getElementById("pause").addEventListener("click", function (e) {
    e = document.getElementById("pausex");
    setTimeout(function(){
      db.save("pause",e.checked);
    },300);     
  });
  document.getElementById("float").addEventListener("click", function (e) {
    e = document.getElementById("floatx");
    setTimeout(function(){
      db.save("float",e.checked);
    },300);     
  });
  document.getElementById("auto").addEventListener("click", function (e) {
    e = document.getElementById("autox");
    setTimeout(function(){
      db.save("autoplay",e.checked);
    },300);     
  });
  /* End Data*/

  chrome.runtime.sendMessage({greeting: "copyData"}, function(response) {
    if( response.farewell == "false") {
      document.getElementById("copy").checked = false;
    } else {
      document.getElementById("copy").checked = true;      
      document.getElementById("copyx").className="btn active";
    }    
  });

  chrome.storage.local.get({darkModes: true}, function(items) {
      document.getElementById("Thme").checked = items.darkModes;
      if (items.darkModes) document.getElementById("theme").className = "btn active";
  });

  chrome.storage.local.get({ads: true}, function(items) {
      document.getElementById("ads").checked = items.ads;
      if (items.ads) document.getElementById("adsx").className = "btn active";
  });

  chrome.storage.local.get({anno: false}, function(items) {
      document.getElementById("anno").checked = items.anno;
      if (items.anno) document.getElementById("annox").className = "btn active";
  });

  chrome.runtime.sendMessage({greeting: "HD"}, function(response) {
    if(response.farewell == 1)document.getElementById("hd1").checked = true, document.getElementById("hd1x").className="btn active";
    if(response.farewell == 2)document.getElementById("hd2").checked = true, document.getElementById("hd2x").className="btn active";  
  });

  chrome.runtime.sendMessage({greeting: "siteTarget"}, function(response) {
    if(response.farewell == 1)document.getElementById("s1").checked = true, document.getElementById("s1x").className="btn active";
    if(response.farewell == 2)document.getElementById("s2").checked = true, document.getElementById("s2x").className="btn active";
    if(response.farewell == 3)document.getElementById("s3").checked = true, document.getElementById("s3x").className="btn active";
    if(response.farewell == 4)document.getElementById("s4").checked = true, document.getElementById("s4x").className="btn active"; 
    if(response.farewell == 5)document.getElementById("s5").checked = true, document.getElementById("s5x").className="btn active";   
  });

  document.getElementById("theme").addEventListener("click", function (e) {
    e = document.getElementById("Thme");
    setTimeout(function(){
      saveSettings(e.checked);
    },400);     
  });

  document.getElementById("adsx").addEventListener("click", function (e) {
    e = document.getElementById("ads");
    setTimeout(function(){
      saveSettings2(e.checked);
    },400);     
  });

  document.getElementById("annox").addEventListener("click", function (e) {
    e = document.getElementById("anno");
    setTimeout(function(){
      saveSettings3(e.checked);
    },400);     
  });

  document.getElementById("mp4x").addEventListener("click", function (e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      background.send('options:store-mp4', {"mp4": e.checked});n();
    },300);     
  });

  document.getElementById("flvx").addEventListener("click", function (e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      background.send('options:store-flv', {"flv": e.checked});n();
    },300);     
  });

  document.getElementById("3gpx").addEventListener("click", function (e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      background.send('options:store-3gp', {"3gp": e.checked});n();
    },300);
  });

  document.getElementById("m4ax").addEventListener("click", function (e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      background.send('options:store-m4a', {"m4a": e.checked});n();
    },300);     
  });

  document.getElementById("webmx").addEventListener("click", function (e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      background.send('options:store-webm', {"webm": e.checked});n();
    },300); 
    
  });

  document.getElementById("save-as2").addEventListener("click", function (e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      background.send('options:save-as', {"saveAs": e.checked});n();
    },300);    
  });


  document.getElementById("btnEnable2").addEventListener("click", function(e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      chrome.storage.local.set({'enableButton': e.checked.toString() }, function(e) {
          if (chrome.runtime.error) {
              console.log("Runtime error."+chrome.runtime.error);
          } n(), s();
      });
    },300);
  });

  document.getElementById("copyx").addEventListener("click", function(e) {
    e = e.path[1].getElementsByTagName("input")[0];
    setTimeout(function(){
      chrome.storage.local.set({'copy': e.checked.toString() }, function(e) {
        n(), s();
      });
    },300);
  });

  document.getElementById("r1").addEventListener("click", function(e) {
    background.send('options:store-v', {"v": false});
    background.send('options:store-a', {"a": false});n();
  });

  document.getElementById("r2").addEventListener("click", function(e) {
    background.send('options:store-v', {"v": true});
    background.send('options:store-a', {"a": false});n();
  });

  document.getElementById("r3").addEventListener("click", function(e) {
    background.send('options:store-v', {"v": false});
    background.send('options:store-a', {"a": true});n();
  });


  document.getElementById("s1x").addEventListener("click", function(e) {    
    chrome.storage.local.set({"site":1}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

  document.getElementById("s2x").addEventListener("click", function(e) {
    chrome.storage.local.set({"site":2}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

  document.getElementById("s3x").addEventListener("click", function(e) {
    chrome.storage.local.set({"site":3}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

  document.getElementById("s4x").addEventListener("click", function(e) {
    chrome.storage.local.set({"site":4}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

  document.getElementById("s5x").addEventListener("click", function(e) {
    chrome.storage.local.set({"site":5}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

  document.getElementById("hd1x").addEventListener("click", function(e) {
    chrome.storage.local.set({"hd":1}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

  document.getElementById("hd2x").addEventListener("click", function(e) {
    chrome.storage.local.set({"hd":2}, function(e) {
      console.log("Runtime error.");
      if (chrome.runtime.error) {
        console.log("Runtime error."+chrome.runtime.error);
      } n();s();
    });
  });

};

background.receive('options:storage', init);
background.send('options:load');


var theToggle = document.getElementById('toggle');

// based on Todd Motto functions
// http://toddmotto.com/labs/reusable-js/

// hasClass
function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
      elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
// toggleClass
function toggleClass(elem, className) {
  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function() {
   toggleClass(this, 'on');
   return false;
}