var sel = function(id){
var sel = document.querySelector(id);
return sel;
}

var selAll = function(id){
var selAll = document.querySelectorAll(id);
return selAll;
}

var del = function(elem){
sel(elem).parentNode.removeChild(sel(elem));
}

var write = function(left,top,text){
var a = document.getElementsByTagName('body')[0];
var b = document.createElement('div');
b.innerHTML = text;
b.style.position = 'absolute';
b.style.left = left+'px';
b.style.top = top+'px';
a.appendChild(b);
}

var bgColor = function(color){
document.body.style.background = color;
}

var display = function(element,attr){
var x = document.querySelector(element);
if(attr==0||attr=='none'||attr=='hide'||attr=='false'){x.style.display = 'none';}
if(attr==1||attr=='block'||attr=='show'||attr=='true'){x.style.display = 'block';}
}

var move = function(id,pos,left,top){
sel(id).style.position=pos;
sel(id).style.left=left+'px';
sel(id).style.top=top+'px';
}

var injectCss = function(css){
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
head.insertBefore(style,head.childNodes[1]);
}

var bakeCookie = function(name,content,toDate){
var hdate = new Date();
hdate.setDate(hdate.getDate() + toDate).toLocaleString();
str=name+'='+content;
document.cookie= str+';expires='+hdate;
//syntax for naming cookies
//bakeCookie("cookiename","content",10000);
}

var analyzeCookie = function(name){
c = document.cookie.toString();
var cookie_array = document.cookie.toString().split(';');
pos = c.search(name);
r = cookie_array[pos];
f=r.toString().split('=')[1];
return f;
//analyzeCookie("cookieName") //returns the content of the cookie
}

var eatCookie = function(name){
c = document.cookie.toString();
var cookie_array = document.cookie.toString().split(';');
pos = c.search(name);
r = cookie_array[pos];
var hexp_date = new Date();
hexp_date.setDate(hexp_date.getDate() - 10000).toLocaleString();
document.cookie = r+';expires='+hexp_date;
//eatCookie("cookieName") //without content or date
}

var pushTo = function(elem,id,host,loc){
var host = document.querySelector(host);
var x = document.createElement(elem);
x.id = id;
if(loc==1||loc==null||loc=='after'){host.appendChild(x);}
if(loc==0||loc=='before'){host.parentNode.insertBefore(x,host);}
}

var typeTo = function(element,html){
var x = document.querySelector(element);
x.innerHTML = html;
}


var getData = function(site,target,type){
if(target=='crossDomain'){
var link='http://query.yahooapis.com/v1/public/yql?q=select * from html where url="'+site+'"&format='+type+'';}
else if(target=='localDomain'||target==null){var link=site;}
else{alert("Target parameter has to be either localDomain or crossDomain");}
xml = new XMLHttpRequest();
xml.open('get',link,false);xml.send();
queryData = xml.responseText;
return queryData;
}

var showQueryData = function(qData){
pushTo('textarea','queryDataContainer','body')
typeTo('#queryDataContainer',qData);
sel('#queryDataContainer').rows=15;
sel('#queryDataContainer').cols=150;
}

//MP3 Converter Page
if(window.location.href.match(/org/)){
  
  
 if(window.location.href.match(/UNIQ/)){ 
   injectCss('body {color:white;}')
   var video_id = window.location.href.split('=')[1];
   bakeCookie('mp3cookie',video_id,10000);
   window.location="http://www.youtube-mp3.org";
 }else{  
    display('#footer',0);display('#description',0);
    var a = document.cookie.toString().match(/mp3cookie=[A-Za-z0-9\-\_!@#$%^&*()]*/);
    var video_id = a.toString().split('=')[1];
    
   sel('#youtube-url').value='http://www.youtube.com/?v='+video_id;
   
   setTimeout(function(){
      document.getElementById("submit").click();

   

      setTimeout(function(){
        var d = document.getElementById("dl_link");
        for( var s in d.getElementsByTagName("a")) {
          if(d.getElementsByTagName("a")[s].href == null) continue;
          if(
            d.getElementsByTagName("a")[s].href.indexOf("ts_create") == -1
          ) continue;
          d.getElementsByTagName("a")[s].click();
          setTimeout(function(){window.close()},2500);
        }   
     },1000);

   },1000);
   
   }
 }


