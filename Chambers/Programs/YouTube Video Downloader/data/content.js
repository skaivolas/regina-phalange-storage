var comments, screenshots, pause, autoplay;

function screenCapture(){

	var videoTitle= document.getElementsByClassName("watch-title")[0] ? document.getElementsByClassName("watch-title")[0].innerHTML.trim() : document.getElementsByClassName("title")[0].innerHTML.trim();

	var videoPlayer = document.getElementsByClassName("video-stream")[0];
	var canvas = document.createElement("canvas");
	canvas.width = videoPlayer.videoWidth;
	canvas.height = videoPlayer.videoHeight;
	canvas.getContext('2d').drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
	var imgdata = canvas.toDataURL('image/png');
	var dummyAnchor = document.createElement("a");
	dummyAnchor.href = imgdata;
	dummyAnchor.download = videoTitle+"-screenshot.png";
	dummyAnchor.click();
}
var crop ={
  _comments:function() {
    var commentsStyle = document.createElement("style");
    var commentTag = document.getElementsByClassName("yt-spinner")[0] ? commentsStyle.innerHTML += ".yt-spinner" : commentsStyle.innerHTML += "#comments";
    commentsStyle.innerHTML += " { display:none !important }#watch-discussion { display:none !important }#comments-test-iframe { display:none !important }#watch7-action-panels { border-bottom:1px solid #e6e6e6 }#watch-description-extras { margin-bottom:0 !important }#action-panel-details.action-panel-content { padding-bottom:18px !important }";
  	document.head.appendChild(commentsStyle);
  },
  _screen:function() {
  	var button = document.createElement("button");
	button.className = "screenshotButton ytp-button";
	button.background = "none";
	button.border = "0px";
	button.title = "Take screenshot"
	button.innerHTML = "<img style='width: 24px;margin-top: 7px;' src='" + "chrome-extension://"+ chrome.runtime.id +"/Dark/images/screen.png" + "'/>";
	button.style.color = "white";
	button.style.cssFloat = "left";
	button.onclick=screenCapture;
	var interval = window.setInterval(function(){
		var ytpControlsRight = document.getElementsByClassName("ytp-right-controls")[0];
		if(ytpControlsRight && ytpControlsRight.innerHTML!=="Capture"){
			ytpControlsRight.prepend(button);
			clearInterval(interval);
		}
	},2000);
  },
  _autoplay:function (){

  	if(document.getElementById("body-container") == null){ 
  	try {
	if(document.getElementById("toggle").getAttribute('checked') !== null)document.getElementById("toggleButton").click();
	document.getElementById("head").style.display = "none";}catch(err){setTimeout(function(){crop._autoplay()},1000);}
	return;
	}	
	var disable_autoplay;
	var autoplay, chkbox;
	autoplay = $('div.checkbox-on-off, div.ytd-compact-autoplay-renderer');
	chkbox = autoplay.find('input, paper-toggle-button');
	if ((autoplay != null) && (chkbox != null)) {
	    if (chkbox.attr('checked')) {
	        chkbox.click();
	    }
	    return autoplay.remove();
	}		
	return $(this).on('spfdone yt-navigate-finish viewport-load');
  },
  _focus:function() {
  	var video = document.getElementsByTagName('video')[0];
  	window.onblur = function() {
	  video.pause()
	};
	window.onfocus = function() {
	  video.play();
	};
},
  init:function() {
  	if (comments) crop._comments();
  	if (screenshots) crop._screen();
  	if (autoplay) crop._autoplay();
  	if (pause) crop._focus();  	
  }
};
chrome.runtime.sendMessage({greeting: "proto"}, function(response) {
    var d = response.farewell; 
    comments=d.comments, screenshots=d.screenshots, pause=d.pause, autoplay=d.autoplay;
    crop.init();
});