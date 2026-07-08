/***************************************
Copyright: Robert Rose aka "TINTED" 2014
***************************************/

/*
This document is intellectual property of Robert Rose aka TINTED
© 2014 Robert Rose
© Tints Tech LLC 2020-2021
*/

// OBJECTS

var Params = new Object(),tempVar;

location.search.slice(1).split('&').map(function(x){x=x.split("=");Params[unescape(x[0])]=unescape(x[1]);});

// FUNCTIONS

function ord(a){return charConvertChart[0][a];};
function hex(a){return unescape('%'+a)};
function bin(a){return charConvertChart[0][charConvertChart[2].indexOf(a)];};

function lambda(f,data,type){
 var Result={};
 if(f==undefined){f=function(x,k,d){return x}};
 if(type!=undefined){Result=new type()};
 for(var x in data){Result[x]=f(data[x],x,data)};
 return Result;
};

function Find(sel,att,loc){
 var sList=[],sTemp=[], t=(loc==undefined)?window:loc;
 if(sel==undefined){sel="*"};
 if(sel.constructor==Array){return sel.map(function(x){return Find(x,att,loc)})};
 if(loc==undefined){loc=document};
 if(sel.constructor==String){try{sList=loc.querySelectorAll(sel)}catch(err){}};
 if(sList.length==0){if(sel.constructor!=String){sList=[sel]}else{sList=sel.split('.').map(function(x){x=t[x];t=x;return x});if(sList[0]==undefined){return []}}}else{for(var i=0;i<sList.length;i++){sTemp[i]=sList[i]};sList=sTemp;};
 if(att!=undefined){
  if(att.constructor==Array){
   for(var i=0;i<sList.length;i++){
    sTemp=[];
	 for(var j=0;j<att.length;j++){sTemp[j]=[Find(att[j],undefined,sList[i]).pop()]};
	sList[i]=sTemp.copy();
   };
  }else{
   for(var i=0;i<sList.length;i++){sList[i]=sList[i][att]};
  };
 };
 return sList;
};

function Make(tag,att,evt,inn,par){
 if(tag.constructor==Array){
  if(tag.length<1){return []};
  return tag.map(function(x){return Make(x,att,evt,inn,par)});
 };
 if(par==undefined){par=document.body};
 if(par.constructor==Array){return par.map(function(x){return Make(tag,att,evt,inn,x)})};
 var E=document.createElement(tag.toUpperCase());
 [E].set(att,evt,inn,par);
 return E;
};

function Data(a,b,c){
 if(typeof(Storage)==undefined){return undefined};
 b=(b)?sessionStorage:localStorage;
 switch(a.constructor){
  case Array:return a.map(function(x){return Data(x,b,c)});break;
  case String:if(c){return b.removeItem(a)};return b[a];break;
  case Object:return lambda(function(x,k,d){b[k]=x},a);break;
 };
};

function GetFile(add,node,sel){
 if(add.constructor==Array){return add.map(function(x){return GetFile(x,node,sel)})};
 if(node!=undefined){if(sel==undefined){sel='head>*,body>*'};Make('iframe',{'style':'display:none','src':add},{'load':function(e){var A=(this.contentWindow || this.contentDocument).document;Find(sel,undefined,A).map(function(x){node.appendChild(x)});[this].removeNodes()}},undefined,node)};
 var FILE = new XMLHttpRequest();
 FILE.open("GET",add,false);
 FILE.send();
 return FILE.response;
};

function TTS(msg){
 try{
 var temp;
 if(msg.constructor==Object){
  temp = new SpeechSynthesisUtterance();
  lambda(function(x,k,d){temp[k]=x},msg);
 }else{
  temp = new SpeechSynthesisUtterance(msg);
 };
 return speechSynthesis.speak(temp);
 }catch(err){return false};
};

function SpeechRec(func,settings){
 var SR = new webkitSpeechRecognition();
 SR.onresult = function(e){func(e.results[0][0].transcript,e)};
 if(settings!=undefined){lambda(function(x,k,d){SR[k] = x},settings);};
 return SR;
};

function protect(a){
 if(a==undefined){a=Find('img')};
 return a.map(function(x){var C = Make("canvas",undefined,undefined,undefined,x.parent);C.width=x.offsetWidth;C.height=x.offsetHeight;['id','name','class'].map(function(a){C[a]=x[a]});var X = C.getContext('2d');X.scale(X.height/x.height,X.width/x.width);X.drawImage(x,0,0);;[x].removeNodes();return C});
};

function range(a,b,c=1){
 var r=new Array(),
 N = Number(a),
 C = 0;
 if(Number(a)!=a){return range(a.to(ord)[0],b.to(ord)[0],c).map(ord)};
 if(b!=undefined){
  while(N<Number(b)){N=Number(a)+(Number(c)*C++);r.push(N)};return r;
  //for(var i=Number(a);i<=Number(b);i+=((c==undefined)?1:Number(c))){r.push(i);};return r;
 };
 for(var i=0;i<Number(a);i++){r.push(i);};return r;
};

function sequence(a){
 return a.map(function(x){return setTimeout(x[0],x[1]*1000)});
};

function cancel(a){
 return a.map(function(x){clearTimeout(x)});
};


//PROTOTYPES

Array.prototype.cycle=function(arr,key){
 if(key==undefined){key = 'cycleIndex'};
 return this.map(function(x){if((/[0-9]/).test(x[key])){x[key]++}else{x[key]=0};if(x[key]>=arr.length){x[key]=0};return arr[x[key]](x,key)});
};

Array.prototype.rotate=function(i){
 if(i==undefined){i=1}else{i=i%this.length};
 return this.slice(i).concat(this.slice(0,i));
};

Array.prototype.each=function(f){ var i=0,target=this;
 return this.map(function(x){return f(x,i++,target)});
};

Array.prototype.set=function(att,evt,inn,par){
 if(att==undefined){att={}};if(evt==undefined){evt={}};
 for(var e=0;e<this.length;e++){
  for(var i in att){this[e].setAttribute(i,att[i])};
  for(var i in evt){this[e].addEventListener(i,evt[i])};
 };
 if(inn!=undefined){this.map(function(x){x.innerHTML+=inn});};
 if(par!=undefined){this.map(function(x){par.appendChild(x)});};
 return this;
};

Array.prototype.animate=function(stl,val){
 var C=0,arr=this;
 stl=stl.split(",");
 return val.map(function(x){return setTimeout(function(){arr.map(function(t){x[0].each(function(s,i,a){if(s!=""&&t.style[stl[i]]!=s){t.style[stl[i]]=s}})})},x[1]*1000)});
};

Array.prototype.eval=function(f,val){
 return f(this,val);
};

Array.prototype.check=function(){
 if(arguments.length==0){console.log(this)}else{console.log(this,arguments)};
 return this;
};

Array.prototype.zip=function(){ 
 var i=0, Result=new Array(), arr=[this].concat(lambda(undefined,arguments,Array));
 for(var i=0;i<this.length;i++){Result[i]=[];arr.map(function(x){Result[i].push(x[i])})};
 return Result;
};

Array.prototype.transpose=function(){
 return this[0].zip.apply(this[0],this.slice(1))
};

Array.prototype.sortBy=function(a,b){
	var F = a, A = this.copy(), B;
	if(F==undefined){F = function(x){return x}};
	if(F.constructor!=Function){F = function(x){return x[a]}};
	if(b!=undefined){B=b}else if(F(A[0]).constructor==String){
 		B = function(a,b){
			let A = F(a).toLowerCase(),
			B = F(b).toLowerCase();
			if(A < B){return -1};
			if(A > B){return 1};
			return 0;
 		};
	}else{
	 	B = function(a,b){return F(a)-F(b)};
	};
	return A.sort(B);
};


Array.prototype.copy=function(n){
 var Result = new Array();
 for(var i = 0;i<((n==undefined)?1:n);i++){Result = Result.concat(this.slice(0))};
 return Result;
};

Array.prototype.random=function(a,b,c){
 var result=new Array();
 if(a==undefined){return this[Math.floor(Math.random()*this.length)];};
 if(b){if(c){var A=this}else{var A=this.copy()};for(var i=0;i<a;i++){result.push(A.splice(Math.floor(Math.random()*A.length),1));};return result};
 for(var i=0;i<a;i++){result.push(this[Math.floor(Math.random()*this.length)])};
 return result;
};

Array.prototype.perm=function(a,b){
 switch(a){case undefined: a=1;break; case 0:return [];break;};
 var result=this.map(function(x){return [x]}),A=this.length;
 for(var i=1;i<a;i++){
 var B=this.map(function(x){return [x]}),C=new Array();
  for(var j=0;j<A;j++){
   for(var k=0;k<result.length;k++){C.push(B[j].concat(result[k]));};
  };
 result=C;
 };
 if(b!=undefined){result = result.map(function(x){return x.join(b)})};
 return result;
};

Array.prototype.removeNodes=function(brk){(brk==undefined)?this.map(function(x){x.parentNode.removeChild(x)}):this.map(function(x){x.outerHTML=x.innerHTML})};

Array.prototype.items=function(a){
 if(a.constructor == Array){var target=this;return a.map(function(x){return target.items(x)})};
 var A=String(a).split(':').map(Number),B=[],C;
 if(A[0]<0){A[0]=this.length+A[0]};
 if(A.length>1){
  if(A[1]<0){A[1]=this.length+A[1]};
  if(A[0]==""){A[0]=0};
  if(A[1]==""){A[1]=this.length-1};
  if(A[2]==""){A[2]=1};
 };
 if(A.length==1){return this[Number(A[0])]};
 C=range.apply(this,A);
 for(var i=0;i<C.length;i++){B.push(this[C[i]])};
 return B;
};

Array.prototype.changeTag=function(tag){
 return this.map(function(x){
  x.outerHTML="<"+tag+x.outerHTML.slice(x.tagName.length+1)+"</"+tag+">";
  return x;
 });
};

Array.prototype.swap=function(a,b){
 var A=this[a];
 this[a]=this[b];
 this[b]=A;
 return this;
};

/*
Array.prototype.all=function(f){for(var i=0;i<this.length;i++){if(!f(this[i])){return false}};return true};

Array.prototype.any=function(f){for(var i=0;i<this.length;i++){if(f(this[i])){return true}};return false};
*/

String.prototype.to=function(a){
 var A=this.split("");
 switch(a){
  default:A=A.map(a);break;
  case ord:for(var i=0;i<A.length;i++){A[i]=charConvertChart[0].indexOf(A[i]);};
  break;
  case hex:for(var i=0;i<A.length;i++){A[i]=charConvertChart[1][charConvertChart[0].indexOf(A[i])]};
  break;
  case bin:for(var i=0;i<A.length;i++){A[i]=charConvertChart[2][charConvertChart[0].indexOf(A[i])]};
  break;
 };
 return A;
};

Number.prototype.random=function(a){
 if(a==undefined){
  return Math.floor(Math.random()*(this+1));
 }else{
  return (this-a).random()+a;
 };
};

var charConvertChart=[['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'].perm(2,""),[0,1].perm(8,"")];charConvertChart.unshift(charConvertChart[0].map(hex));