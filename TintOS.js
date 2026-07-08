/*
This document is intellectual property of Robert Rose aka TINTED
© 2017-2020 Robert Rose
© Tints Tech LLC 2020-2022
*/

//if(window.navigator.vender!="Google Inc."){Make("script",{src:"https://webrtc.github.io/adapter/adapter-latest.js"},{},"",Find("head")[0])};

var TintOS = {
		options:{eventSheet:true,terms:true,mainMenu:true,modeControl:true,voiceCommand:true,fullScreen:true,apps:true,cast:true,proportional:false},
		user:{streams:[],file:[],defaultCamera:"user"},
		util:{install:undefined,filter:['blur(0px)','invert(0)','brightness(1)','contrast(1)','opacity(1)','saturate(1)','grayscale(0)','sepia(0)','hue-rotate(0deg)','drop-shadow(0px 0px 0px black)','url()']},
		workers:{},
		cScript:undefined,
		cast:{},
		SEL:[],
		bodyCount:[],
		zTop:0,
		touch:{active:false,type:"move",data:{},targets:[]},
		objectURLs:{},
		delList:[],
		saveFileType:"text/html",
		RF:0.8,
		grid:1,
		metaData:{
			"viewport":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
			"mobile-web-app-capable":"yes",
			"apple-mobile-web-app-capable":"yes",
			"theme-color":"#ccccff",
			"application-name":"Tint OS",
			"author":"Robert Rose - TINTED",
			"keywords":"Custom,HTML,JS,CSS,Cloud,OS",
			"description":"Customize the UI, access cloud data, enhance online usage, interactive web framework"
		},
		key:{Control:false,Alt:false,Shift:false},
		fonts:("Abadi MT Condensed Light, Albertus Extra Bold, Albertus Medium, Antique Olive, Arial, Arial Black, Arial MT, Arial Narrow, Bazooka, Book Antiqua, Bookman Old Style, Boulder, Calibri, Calisto MT, Calligrapher, Cambria, Century Gothic, Century Schoolbook, Cezanne, CG Omega, CG Times, Charlesworth, Chaucer, Clarendon Condensed, Comic Sans MS, Common Bullets, Copperplate Gothic Bold, Copperplate Gothic Light, Cornerstone, Coronet, Courier, Courier New, Cuckoo, Cursive, Dauphin, Denmark, Dingbats, Fransiscan, Garamond, Geneva, Georgia, Haettenschweiler, Heather, Helvetica, Herald, Impact, Jester, Letter Gothic, Lithograph, Lithograph Light, Long Island, Lucida Console, Lucida Handwriting, Lucida Sans, Lucida Sans Unicode, Marigold, Market, Matisse ITC, MS LineDraw, News GothicMT, OCR A Extended, Old Century, Pegasus, Pickwick, Poster, Pythagoras, Roboto, Sceptre, Sherwood, Signboard, Socket, Steamer, Storybook, Subway, Symbol, Tahoma, Technical, Teletype, Tempus Sans ITC, Times, Times New Roman, Times New Roman PS, Trebuchet MS, Tristan, Tubular, Unicorn, Univers, Univers Condensed, Vagabond, Verdana, Wingdings, Webdings, Westminster").split(", ").filter(function(x){return document.fonts.check("12px "+x)}),
		mimes:(["video/webm","video/mp4","video/mpeg","video/ogg","video/3gpp","video/quicktime","audio/webm","audio/mp3","audio/mp4","audio/mpeg","audio/wav","audio/aac","audio/ogg","audio/flac","audio/3gpp"]).filter(function(x){return MediaRecorder.isTypeSupported(x)}),
		tags:["*","room","desk","tab","folder","paper","glass","import","webview","iframe","audio","video","img","button","textarea","input","a","p","div","figure","canvas","output","span","select","form","meter","progress","base","embed","script","style"]
	};

var ans;

window.onbeforeunload = function(e){Find("message,menu,alert").removeNodes();TintOS.autoSave();return "Close?"};

TintOS.setEvents = function(){
		try{
			var BC = Find("body *").reverse(), counter = 0;
			if(BC.some(function(x){return x!=TintOS.bodyCount[counter++]})){
				TintOS.bodyCount=BC;
				lambda(function(x,k,d){
					try{
						Find(k).filter(function(x){
							if(x.scriptSheet==undefined){x.scriptSheet=[]};
							if(x.scriptSheet.some(function(s){return s==k})){return false}else{x.scriptSheet.push(k);return true}
						}).set(undefined,x)
					}catch(err){}
				},TintOS.eventSheet);
				TintOS.autoSave();
			};
		}catch(err){};
	};

if(TintOS.options.eventSheet){
	//TintOS.setEvents();
	setInterval(TintOS.setEvents,1000);
};

////////////////////// Event Sheet ^ 

document.fonts.ready.then(function(F){
	var fonts = F.entries(),
		f = fonts.next();
	while(f.done != true){
		TintOS.fonts.push(f.value[0].family);
		f = fonts.next();
	};
});



TintOS.util.stringify = function(x){
	let rf = function(r){
				if(r.constructor==Object){
					return lambda(rf,r)
				}else if(r.constructor==Array){
					return r.map(rf)
				}else if(r.constructor==Function){
					return String(r)
				}else{
					return r
				}
			};
	return JSON.stringify(rf(x));
};

TintOS.util.parse = function(x){
	let R = JSON.parse(x),
		rf = function(r){
			if(r.constructor==Object){
				return lambda(rf,r)
			}else if(r.constructor==Array){
				return r.map(rf)
			}else if(r.constructor==String){
				if(r.slice(0,8)=="function" || r.includes("=>")){
					return eval("tempVar = "+r)
				}else{
					return r
				};
			}else{
				return r
			}
		};
	return rf(R);
};

TintOS.util.canvasSRC = function(C=Find("canvas[src]"),imgSRC){
	C.map(function(c){
		Make("img",{style:"width:initial;height:initial;left:100%",src:imgSRC?imgSRC:c.getAttribute("src")},{load:function(e){
			[c].set({width:e.target.offsetWidth,height:e.target.offsetHeight})[0].getContext("2d").drawImage(e.target,0,0,e.target.offsetWidth,e.target.offsetHeight);
			//[Make("a")].map(function(x){x.outerHTML=c.outerHTML;return x})[0].getContext("2d").drawImage(c,0,0,e.target.offsetWidth,e.target.offsetHeight);
			[e.target].removeNodes();
		}},"",c.parentNode);
	});
};

TintOS.util.offsetCrawl = function(tar){
	var count = {left:Number(tar.offsetLeft),top:Number(tar.offsetTop)};
	tar = tar.parentNode;
	while(tar.parentNode!=undefined){
		count.left+=Number(tar.offsetLeft);
		count.top+=Number(tar.offsetTop);
		tar=tar.parentNode;
	};
	return count;
};

TintOS.util.proportional = function(opt){
	opt = TintOS.setDefaults(opt,{
		targets:Find("body>*")
	});
	opt.targets.map(function(x){
		let P = x.parentNode;
		x.style.top = ((x.offsetTop/P.offsetHeight)*100)+"%";
		x.style.left = ((x.offsetLeft/P.offsetWidth)*100)+"%";
		x.style.width = ((x.offsetWidth/P.offsetWidth)*100)+"%";
		x.style.height = ((x.offsetHeight/P.offsetHeight)*100)+"%";
	});
}

TintOS.util.handleHash = function(preFunc=function(h){},cancelClicks=false){
	let decodedHash = unescape(location.hash.slice(1)).split("+");
	preFunc(decodedHash);
	if(location.hash!="" && !cancelClicks){
		return TintOS.util.menuCrawl(decodedHash);
	};
};

TintOS.util.menuCrawl = function(trail,opt){
	opt = TintOS.setDefaults(opt,{
		tag:"button",
		match:function(x){return x.innerHTML},
		action:function(x){x.click();return x},
		parent:document.body
	});
	return trail.map(function(T){
		Find(opt.tag,undefined,opt.parent).filter(function(x){return T==opt.match(x)}).map(opt.action);
	});
};

TintOS.util.visualSelect = function(opt){
	opt = TintOS.setDefaults(opt,{
		targets:undefined,
		action:function(x){x.style.zIndex = TintOS.zTop++;[x].set({move:"1"});},
		multiple:true,
		title:"Select",
		identifier:"tagName",
		parent:document.body
	});
	if(opt.targets==undefined){opt.targets=Find("*[move='0']",undefined,opt.parent)};
	var container = Make("div",{move:"0",style:"left:0px;top:0px;right:0px;bottom:0px;overflow:hidden;font-size:30px;background-color:rgba(255,255,255,0.2);z-index:100000000000000"},{},opt.title,opt.parent);
	Make("b",{class:"close"},{},"Close Visual Select",container);
	opt.targets.map(function(x){
		var offset = TintOS.util.offsetCrawl(x);
		if(offset.top<0){offset.top=0};
		if(offset.left<0){offset.left=0};
		if(offset.top>(opt.parent.offsetHeight-25)){offset.top=opt.parent.offsetHeight-25};
		if(offset.left>(opt.parent.offsetWidth-50)){offset.left=opt.parent.offsetWidth-50};
		Make("tab",{style:"background:rgba(255,0,0,0.8);border-radius:40%;font-size:20px;left:"+offset.left+"px;top:"+offset.top+"px"},{click:function(evt){
			opt.action(x);
			if(opt.multiple){[evt.currentTarget].removeNodes()}else{[container].removeNodes();};
		}},x[opt.identifier],container);
	});
};

//{message, gap, skip}
TintOS.util.optEdit = function(sel,opt){
	opt = TintOS.setDefaults(opt,{message:"Edit, Sort, Delete",skip:0,gap:50,parent:document.body});
	var div = Make("p",{move:"B",style:"background:rgba(0,0,255,0.3);height:70%;overflow:auto;"}),
		tArea = Make("textarea",{move:"M",style:"font-size:10px;"}),
		addOpt = function(a,b,k){
			tArea.value = tArea.value+"\n//\n"+a+"\n"+b;
		};
	tArea.value=opt.message+":";
	/*
	addOpt = function(a,b,k){
		let B = Make("button",{style:"position:absolute;background:inherit;width:90%;left:10%;top:"+opt.gap*k+"px;",move:0},{},"",div);
		[a,b].map(function(y){Make("textarea",{move:"M",style:"position:relative;width:35%;height:100%"},{},y,B)});
		Make("b",{move:"M",class:"close"},{},"X",B);
		return B;
	};
	*/
	var inputs = lambda(undefined,sel.children,Array).slice(opt.skip).each(function(x,k,d){
		return addOpt(x.innerHTML,x.value,k);
	});
	TintOS.message({
		Set:function(evt){
			lambda(undefined,sel.children,Array).slice(opt.skip).removeNodes();
			evt.input.value.split("\n//\n").slice(1).map(function(x){let T = x.split("\n");Make("option",{value:T[1]},{},T[0],sel)});
			//lambda(undefined,evt.input.children,Array).sortBy(function(x){return Number(x.style.top.slice(0,-2))}).map(function(x){let T = Find("textarea","value",x);Make("option",{value:T[1]},{},T[0],sel)});
		}
	},{message:opt.message,value:tArea.value,input:tArea,move:0,style:"background:rgba(0,0,0,0.6)",parent:opt.parent});
	Make("button",{move:"M",style:"position:absolute;background:rgba(255,255,255,0.5);text-shadow:0px 0px 5px white;top:15px;left:0px;z-index:1000000"},{click:function(e){addOpt("(Name)","(Value)",div.children.length)}},"+",tArea.parentNode);
	return sel;
};

//{message, gap, skip}
TintOS.util.optSort = function(sel,opt){
	opt = TintOS.setDefaults(opt,{message:"Sort",skip:0,gap:30});
	var div = Make("b",{style:"height:70%;overflow:auto;"}), ORF = TintOS.RF;
	TintOS.RF = 10;
	var inputs = lambda(undefined,sel.children,Array).slice(opt.skip).each(function(x,k,d){
		return Make("button",{value:k+opt.skip,style:"position:absolute;width:100%;left:0px;top:"+opt.gap*k+"px;",move:0},{},x.innerHTML,div);
	});
	TintOS.message({
		Sort:function(evt){
			lambda(undefined,evt.input.children,Array).sortBy(function(x){return Number(x.style.top.slice(0,-2))}).map(function(x){return sel[x.value]}).set({},{},undefined,sel);
			TintOS.RF = ORF;
		},
		Cancel:function(evt){TintOS.RF = ORF;}
	},{message:opt.message,input:div,cancel:false});
	return sel;
};

//{message, skip}
TintOS.util.optDel = function(sel,opt){
	opt = TintOS.setDefaults(opt,{message:"Delete",skip:0});
	var dMenu = Make("select",{move:"M",multiple:true});
	lambda(undefined,sel.children,Array).slice(opt.skip).each(function(x,k,d){Make("option",{value:k+opt.skip},{},x.innerHTML,dMenu)});
	TintOS.message({Delete:function(evt){
		lambda(undefined,evt.input.selectedOptions,Array).map(function(x){return sel[x.value]}).removeNodes();
	}},{message:opt.message,input:dMenu});
	return sel;
};

TintOS.autoSave = function(opt){
	opt = TintOS.setDefaults(opt,{targets:lambda(undefined,document.body.children,Array),attribute:"outerHTML"});
	return TintOS.data({"autosave":opt.targets.map(function(x,k,d){
		switch(x.getAttribute("move")){
			default:return x[opt.attribute];break;
			case "M":case "B":return "";break;
		};
	}).join("")});
};

TintOS.injectSpeech = function(opt){
	opt = TintOS.setDefaults(opt,{targets:[document.body.querySelector("*:focus")]});
	return SpeechRec(function(result){if(opt.targets[0]==null){opt.targets = Find("*[move='1']")}; opt.targets.map(function(x){if(x.value!=undefined){x.value = x.value.slice(0,x.selectionStart)+result+x.value.slice(x.selectionEnd)}else{Make("p",{},{},result,x)};});},{onspeechend:function(e){e.target.stop()}}).start();
};

TintOS.voiceCommand = function(opt){
	opt = TintOS.setDefaults(opt,{targets:Find("*[move='1']")});
	if(opt.targets.length==0){opt.targets = [document.body]};
	var VCL = TintOS.util.VCLib,
	handleSP = function(R){
		R = (R.slice(0,4)=="type")?[R]:R.split(" and ");
		if(R.length > 1){R.map(handleSP)}else{R = R[0].split(" ")};
		R[0] = R[0].toLowerCase();
		if(VCL[R[0]] == undefined){return "No Such Command"};
		let SP = R.slice(1).join(" ");
		if(R.length == 1){SP = undefined};
		return VCL[R[0]](SP,opt.targets);
	};
	try{
		SpeechRec(function(result){TintOS.alert(result);return handleSP(result)},{onerror:function(e){handleSP("show")},onspeechend:function(e){e.target.stop()}}).start();
	}catch(err){handleSP("show")};
};

TintOS.util.VCLib = {
	"show":function(SP,tar){TintOS.menu(lambda(function(e){return function(e){TintOS.util.VCLib[e.target.innerHTML](e.input.value,tar)}},TintOS.util.VCLib),{placeholder:"Voice Command",input:true,value:SP})},
	"type":function(SP,tar){tar.map(function(x){Make("p",{},{},SP,x)})},
	"read":function(SP,tar){if(!SP){SP=tar}else{SP = Find(SP)};SP.map(function(x){TTS(x.innerText)})},
	"open":function(SP,tar){tar.map(function(x){TintOS[SP]({},{parent:x})})},
	"run":function(SP){TintOS[TintOS.util.hash(SP)]()},
	"full":function(SP,tar){TintOS.fullScreen(tar[0])},
	"select":function(SP){if(!SP || SP=="all"){SP="*"};TintOS.select(SP)},
	"make":function(SP,tar){tar.map(function(x){Make(SP,{move:0},{},"",x)})},
	"edit":function(SP,tar){if(!SP){SP=tar};TintOS.action("edit",SP)},
	"copy":function(SP,tar){if(!SP){SP=tar};TintOS.action("copy",SP)},
	"delete":function(SP,tar){if(!SP){SP=tar};TintOS.action("delete",SP)},
	"lock":function(SP,tar){if(!SP){SP=tar};TintOS.action("lock",SP)},
	"attach":function(SP,tar){if(!SP){SP=tar};TintOS.action("attach",SP)},
	"press":function(SP,tar){TintOS.util.menuCrawl(SP.split(" then ").map(function(x){return (x=="menu symbol")?"|||":(x[0].toUpperCase()+x.slice(1))}))},
	"explore":function(SP,tar){if(!SP){SP=tar}else{SP=eval(SP)};TintOS.menu(SP,{explore:true})},
	"index":function(SP,tar){
		SP = SP.split(" ");
		let ind = Find("index").concat(tar);
		ind.map(function(x){Make("button",{move:0,onclick:"TintOS.util.VCLib['"+SP[0]+"']('"+SP.slice(1).join(" ")+"',Find('*[move=1]').eval(function(x){return (x.length==0)?[document.body]:x}))"},{},SP.slice(0,2).join(" "),x)});
	},
	"record":function(SP,tar){
		if(!SP || SP=="all"){SP="canvas,video,audio"};
		let R = TintOS.record({targets:Find(SP),controls:false});
		R.map(function(x){x.start()});
		Make("button",{move:"M",style:"background:red;z-index:99999999999"},{click:function(e){
			if(e.target==e.currentTarget){
				R.map(function(x){x.stop()});
				[e.target].removeNodes();
				delete R; 
			}else{
				let MR = function(x){R.map(function(m){m[x]()})};;
				if(e.target.innerHTML=="Pause"){MR("pause");e.target.innerHTML="Resume"}else{MR("resume");e.target.innerHTML="Pause"};
			};
		}},"Stop Recording<button move='M' style='left:100%'>Pause</button>");
	},
	"simulate":function(SP,tar){
		tar.map(function(x){
			var S = SP.split("event ").eval(function(x){x[0]=x[0].trim().split(" ").map(function(G){return G[0].toUpperCase()+G.slice(1)}).join("");x[1]=x[1].split(" ").join("");return x}),
			E = document.createEvent(S[0]+"Event");
			E["init"+S[0]+"Event"](S[1]);
			//Make("paper",{},{},S);
			x.dispatchEvent(E);
		})
	},
	"log":function(SP,tar){
		SP = SP.split(" ").map(function(x){return x.toLowerCase()}).join("");
		TintOS.util.VCLib.type(SP + " = " + eval(SP),tar);
	},
	"media":function(SP){
		let tar = Find("video[move='1'],audio[move='1']");
		if(tar.length==0){tar = Find("video,audio")};
		tar.map(function(x){x[SP]()});
	},
	"set":function(SP,tar){
		SP = SP.split(" to ");
		SP[0] = SP[0].split(" ");
		let V = (SP.length<2)?SP[0].pop():SP[1],
		hash = TintOS.util.hash;
		SP = SP[0];
		switch(SP[0]){
			case "attribute":
				tar.map(function(x){x.setAttribute(hash(SP.slice(1)),V)});
			break;
			case "style":
				tar.map(function(x){x.style[hash(SP.slice(1))] = V});
			break;
			default:
				tar.map(function(x){x[hash(SP)] = V});
			break;
		}
	}
};

TintOS.util.hash = function(a){
	let R = a.shift();
	while(a.length>0){
		R = R + a[0][0].toUpperCase() + a[0].slice(1);a.shift();
	};
	return R;
};

TintOS.util.stream = function(tar,rate){
	return (tar.srcObject!=undefined)?tar.srcObject:tar.captureStream(rate);
};

TintOS.util.stillShot = function(tar){
	if(tar==undefined){tar = Find("video")};
	tar.map(function(T){
		var C = Make("canvas",{width:T.offsetWidth,height:T.offsetHeight});
		C.getContext("2d").drawImage(T,0,0,T.offsetWidth,T.offsetHeight);
		Make("img",{move:0,width:T.offSetWidth,height:T.offsetHeight,src:C.toDataURL()});
		[C].removeNodes();
	});
};

TintOS.imageEditer = function(C){
	var E = {},
	matrix = function(m){
		let M = [];
		range(m.width).map(function(x){M.push(new Array(m.height))});
		for(let i=0;i<m.data.length;i+=4){
			M[(i/4)%(m.width)][Math.floor((i/4)/(m.width))] = m.data.slice(i,i+4)
		};
		return M;
	},
	flatten = function(m){
		//let M = {"width":m.length,"height":m[0].length,"data":new Uint8Array(m.length*m[0].length)};
		let M = C.ctx.getImageData(0,0,C.width,C.height);
		//M.width = m.length;
		//M.height = m[0].length;
		for(let i=0;i<M.data.length;i++){
			M.data[i] = m[Math.floor(i/4)%(M.width)][Math.floor((i/4)/(M.width))][i%4]
		};
		return M;
	};
	E.update = function(){
		C.ctx = C.getContext("2d",{willReadFrequently:true});
		E.image = C.ctx.getImageData(0,0,C.width,C.height);
		E.newImage = C.ctx.getImageData(0,0,C.width,C.height);
		return E;
	};
	E.set = function(){
		if(E.image.width != E.matrix.length || E.image.height != E.matrix[0].length){
			C.width = E.matrix.length;
			C.height = E.matrix[0].length;
		};
		C.ctx.putImageData(flatten(E.matrix),0,0);
		return E;
	};
	E.update();
	E.matrix = matrix(E.image);
	E.rotate = function(n=1){
		for(let i=0;i<(n%4);i++){
			E.matrix = E.matrix.transpose();
			E.matrix = E.matrix.reverse();
		};
		return E;
	};
	E.flip = function(h=true){
		if(h){
			E.matrix = E.matrix.reverse();
		}else{
			E.matrix = E.matrix.map(function(x){return x.reverse();});
		}
		return E;
	};
	return E;
};

TintOS.action = function(act,sel){
	if(sel==undefined){sel = Find("*[move='1']")};
	if(sel.constructor==String){if(sel=="all"){sel="*"};sel = Find(sel).filter(function(x){let M = x.getAttribute("move"); if(M == "1" || M == "0" || M == "L"){return true}else{return false}})};
	if(sel.constructor!=Array){sel = [sel]};
	switch(act.toLowerCase()){
		case "edit":
			sel.map(function(x){
				x.toggleAttribute("contentEditable");
				//x.contentEditable=(x.isContentEditable)?false:
			;});
		break;
		case "copy":
			sel.map(function(x){
				Make("p",{},{},"",x.parentNode).outerHTML = x.outerHTML;
			});
		;break;
		case "delete":TintOS.delList = TintOS.delList.concat(sel);sel.removeNodes();break;
		case "lock":sel.set({move:"L"});break;
		case "attach":sel.set({move:"T"});break;
		//case "":;break;
		//case "":;break;
	};
	return sel;
};

TintOS.createURL = function(data,name){
	let URL = window.URL.createObjectURL(data);
	if(name==undefined){name = ((data.name==undefined)?data.type:data.name)};
	TintOS.objectURLs[name] = URL;
	return URL;
};

//opt{script(Attributes), parent}
TintOS.addButtons = function(B,opt){
	return lambda(function(x,k,d){return Make("button",opt.script,{click:x},k,opt.parent)},B);
};

TintOS.setDefaults = function(data,defaults){
	if(data==undefined){data = new defaults.constructor()};
	data = lambda(function(x,k,d){return ((data[k]==undefined)?x:data[k])},defaults,data.constructor);
	return data;
};

TintOS.fullScreen = function(node){
	if(node==undefined){node=document.body};
	//if(node.webkitDisplayingFullScreen){return node.webkitExitFullScreen()};
	if(node.requestFullScreen){return node.requestFullScreen({navigationUI:"hide"})}
	if(node.webkitRequestFullScreen){return node.webkitRequestFullScreen({navigationUI:"hide"})}
	if(node.mozRequestFullScreen){return node.mozRequestFullScreen({navigationUI:"hide"})}
	if(node.msRequestFullScreen){return node.msRequestFullScreen({navigationUI:"hide"})}
};

//// https://www.html5rocks.com/en/tutorials/workers/basics/
TintOS.worker = function(data,att){
	if(Worker==undefined){console.error("No Worker Support");return undefined};
	if(data.split(".").pop()!="js"){
		data = window.URL.createObjectURL(new Blob([data]));
	};
	var W = new Worker(data);
	[W].set({},att);
	TintOS.worker[data]=W;
	return W;
};

TintOS.RTC = async function(opt){
	opt = TintOS.setDefaults(opt,{
		node:document.body,
		server:"https://tints-tech.com/TintOS/server/chat.php",
		onmessage:function(e){
			if(opt.node.hasAttribute("acceptData")){opt.node.acceptData = true};
			if(opt.node.acceptData){
				if(opt.node.acceptData==false){return}
			}else{
				opt.node.focus();
				if(window.confirm("Accept data from this person? (Warning: this feature can be used to attack you)")){
					opt.node.acceptData = true;
				}else{
					opt.node.acceptData = false;
					return;
				};
			};
			if(e.data.slice(0,1)=="<"){
				Make("p",{},{},"",opt.node).outerHTML=e.data;
				//TintOS.menu(e,{explore:true});
			}else if(e.data.slice(0,4)=="last"){
				//TintOS.user.file.push(e.data);
				TintOS.browser({},{src:TintOS.createURL((new Blob(TintOS.user.file,{type:e.data.slice(4)}))),protocol:""});
				TintOS.user.file=[];
			}else{
				TintOS.user.file.push(e.data);
			};
		},
		ontrack:function(e){
			let vac = Find("chat>video","srcObject",opt.node);
			if(vac.items(-1)!=e.streams[0]){
				Make("video",{move:0,autoplay:true,controls:true,style:("left:"+vac.length+"00%")},{},"",opt.node).srcObject = e.streams[0]
			}
		}
	});
	let RTC = new RTCPeerConnection({iceServers: [{urls:'stun:stun.l.google.com:19302'}]});
	RTC.socket = RTC.createDataChannel("data");
	RTC.ICL = [];
	RTC.server = function(data){
		data = TintOS.setDefaults(data,{name:"",from:"",offer:"",answer:"",type:""});
		let XHR = new XMLHttpRequest(),
		FORM = new FormData(),
		formData = "";
		//if(data.type!="connect"){XHR.onload = function(e){Make("paper",{},{},XHR.response);};};
		data.offer = JSON.stringify(data.offer);
		data.answer = JSON.stringify(data.answer);
		XHR.open("POST",opt.server,false);
		lambda(function(x,k,d){FORM.append(k,escape(x))},data);
		XHR.send(FORM);
		return JSON.parse(unescape(XHR.response));
	}
	
	RTC.onidpassertionerror = function(e){Make("paper",{type:e.type},{},JSON.stringify(e))};
	RTC.onidvalidationerror = function(e){Make("paper",{type:e.type},{},JSON.stringify(e))};
	RTC.onpeeridentity = function(e){Make("paper",{type:e.type},{},JSON.stringify(e))};
	RTC.onidentityresult = function(e){Make("paper",{type:e.type},{},JSON.stringify(e))};
	
	if(TintOS.user.camera==undefined){await TintOS.userMedia({video:{advanced:[{facingMode:TintOS.user.defaultCamera}]},callback:function(){}})};
	TintOS.user.camera.getTracks().forEach(function(track){
		RTC.addTrack(track,TintOS.user.camera);
	});
	TintOS.user.streams.map(function(x){
		x.getTracks().forEach(function(track){
			RTC.addTrack(track,x);
		});
	});
	RTC.ondatachannel = function(evt){
		RTC.socket2 = evt.channel;
		RTC.socket2.onmessage = opt.onmessage;
	};
	RTC.onicecandidate = function(e){
		if(e.candidate!=null){RTC.ICL.push(e.candidate)};
	};
	RTC.ontrack = opt.ontrack;
	RTC.socket.onmessage = opt.onmessage;
	opt.node["RTC"] = RTC;
	return RTC;
};

TintOS.userMedia = async function(opt){
	opt = TintOS.setDefaults(opt,{video:true,audio:true,setCamera:true,callback:function(stream){Make("video",{move:"0",autoplay:true,controls:true}).srcObject=stream},error:function(err){console.error(err)}});
	//if(TintOS.user.camera){return TintOS.user.camera};
	return await navigator.mediaDevices.getUserMedia({video:opt.video,audio:opt.audio}).then(function(S){if(opt.setCamera){TintOS.user.camera=S};opt.callback(S);return S});
};

TintOS.record = function(opt){
	opt = TintOS.setDefaults(opt,{
		options:undefined,
		targets:Find("canvas,video,audio"),
		sync:false,
		speed:60,
		controls:true,
		name:"",
		parent:document.body
	});
	return opt.targets.map(function(x){
		var stream = (x.srcObject!=undefined)?x.srcObject:x.captureStream(Math.floor(1000/Number(opt.speed)));
		//fr = setInterval(function(){stream.requestFrame()},Math.floor(1000/Number(opt.speed))),
		var MR,
			setMR = function(){
				MR = new MediaRecorder(stream,opt.options);
				MR.cache = [];
				MR.ondataavailable = function(e){MR.cache.push(e.data)};
				MR.onstop = function(e){
					//stream.requestFrame();
					//TintOS.menu(MR);
					//Make(MR.mimeType.slice(0,5),{src:TintOS.createURL((new Blob(vData,{type:MR.mimeType}))),controls:true,move:0},{},"",opt.parent);
					let V = Make("video",{src:TintOS.createURL((new Blob(MR.cache,{type:MR.mimeType}))),controls:true,move:0},{},"",opt.parent);
					V.currentTime = 9999999999999999999;
					MR.cache = [];
				};
			};
		setMR();
		if(opt.controls){Make("select",{},{change:function(e){
			switch(e.target.value){
				case "Record":
					if(opt.sync){x.play()};
					if(MR.state=="paused"){
						MR.resume();
						
					}else{
						MR.controls = e.target;
						MR.start();
						//ti = setInterval(function(){t++},1000);
						//stream.requestFrame();
					};
					e.target.style.background="red";
				break;
				case "Pause":
					MR.pause();
					if(opt.sync){x.pause()};
					e.target.style.background="yellow";
				break;
				case "Close":
					[e.target].removeNodes();
				case "Stop":
					MR.stop();
					e.target.style.background="";
					//clearInterval(ti);
				break;
				case "Options":
					//TintOS.menu(e);
					e.target.selectedIndex = -1;
					var syncOpt = {}, mimeOpt = {};
					syncOpt["Turn "+((opt.sync)?"Off":"On")] = function(e){opt.sync = !opt.sync};
					TintOS.mimes.map(function(mime){mimeOpt[mime] = function(e){
						if(opt.options){
							opt.options.mimeType = mime;
						}else{
							opt.options = {mimeType:mime};
						};
						setMR();
					}});
					TintOS.menu({
						/*"FPS":function(e){
							TintOS.message({"Set":function(evt){
								opt.speed = evt.input.value;
								clearInterval(fr);
								fr = setInterval(function(){stream.requestFrame()},Math.floor(1000/Number(opt.speed)));
							},
							Manual:function(evt){
								clearInterval(fr);
								TintOS.alert({"Capture Frame":function(evt){stream.requestFrame()}},{auto:false});
							}},{message:"Frames per Second",value:opt.speed});
						},*/
						"Type":mimeOpt,
						"Sync":syncOpt
					});
				break;
			};
		}},"<option value='Record'>Record</option><option value='Pause'>Pause</option><option value='Stop' selected>Stop</option><option value='Close'>Close</option><option value='Options'>Options</option>",Make("menu",{style:"position:absolute;overflow:visible;height:0px;width:0px;left:"+x.offsetLeft+"px;top:"+x.offsetTop+"px;z-index:"+x.style.zIndex},{},"",x.parentNode));};
		return MR;
	});
};

TintOS.data = function(data,A,B){
	if(data == undefined){return};
	return Data(data,A,B);
};

TintOS.getFile = function(opt){
	opt = TintOS.setDefaults(opt,{src:"",type:undefined,method:"GET",timeout:undefined,callback:function(data){TintOS.menu({response:data},{explore:true})},error:function(s,r){TintOS.menu({[s]:r},{explore:true})}});
	let R = new XMLHttpRequest();
	R.open(opt.method,opt.src,true);
	if(opt.timeout){R.timeout=opt.timeout};
	if(opt.type){R.responseType=opt.type};
	R.onload = function(e){if(R.readyState == 4){if(R.status == 200){opt.callback(R.response,R)}else{opt.error(R.statusText,R)}}};
	R.send(null);
	return R;
};

//{type, data, name}
TintOS.save = function(opt){
	Find("message,menu").removeNodes();
	opt = TintOS.setDefaults(opt,{type:"text/html",data:Find("*[move='1']","outerHTML").join(""),name:"",auto:true});
		let S = Make("a",{move:"M",href:TintOS.createURL(new Blob([opt.data],{type:opt.type})),download:opt.name,style:"left:100px"},{},"<b class='close'><br>X</b>Download: "+opt.name);
		if(opt.auto){
			S.click();
			[S].removeNodes();
		}
};

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
//{multiple:(booleen), accept, move, parent, callback:(data, type, result, file), readAs:(Text|DataURL|ArrayBuffer|BinaryString), maxSize}
TintOS.load = function(opt){
	opt = TintOS.setDefaults(opt,{
		multiple:true,
		accept:"",
		callback:undefined,
		readAs:undefined,
		maxSize:20000000,
		move:"0",
		parent:document.body
	});
	let atts = {type:"file",accept:opt.accept,style:"left:150%",move:"M"};
	if(opt.multiple){atts["multiple"]=opt.multiple};
	let I = Make("input",atts,{input:function(e){
		for(let i=0;i<e.target.files.length;i++){
			//TintOS.message({},{message:e.target.files.item(i).size});
			let R = new FileReader(),
			FILE = e.target.files.item(i),
			fileType = e.target.files.item(i).type.split("/")[0]
			TAG = "iframe";
			switch(fileType){
				case "image":TAG = "img";break;
				case "video":TAG = "video";break;
				case "audio":TAG = "audio";break;
				case "application":TAG = "embed";break;
			};
			R.addEventListener("loadend",function(evt){
				switch(fileType){
					default:
				
					break;
					case "text":
						if(opt.callback==undefined){return Make("tab",{},{},"",opt.parent).outerHTML = R.result;}
					return;
					break;
				};
				let ADD = R.result;
				if(opt.callback==undefined){
					Make(TAG,{src:ADD,name:FILE.name,move:opt.move,controls:true},{},"",opt.parent);
				}else{opt.callback(ADD,fileType,R.result,FILE)};
			});
			if(opt.readAs==undefined){
				if(FILE.size>opt.maxSize && fileType!="text"){
					let ADD = TintOS.createURL(FILE);
					if(opt.callback==undefined){
						Make(TAG,{src:ADD,name:FILE.name,move:opt.move,controls:true},{},"",opt.parent);
					}else{opt.callback(ADD,fileType,FILE,FILE)};
					continue;
				};
				switch(fileType){
					default:
						R.readAsDataURL(FILE);
					break;
					case "text":
						R.readAsText(FILE);
					break;
				};
			}else{R["readAs"+opt.readAs](FILE)};
		};
	[e.target].removeNodes();
	}});
	I.click();
	setTimeout(function(){[I].removeNodes();},600000);
};

//{message, input("input"||"textarea"), value, placeholder, focus, move, parent, cancel, back}
TintOS.message = function(B,opt){
	opt = TintOS.setDefaults(opt,{message:"Attention!",input:"textarea",value:"",placeholder:"Write Here...",focus:true,style:"",move:"0",parent:document.body,lambda:undefined,cancel:true,back:true});
	var message = Make("message",{move:opt.move,style:opt.style},{},"",opt.parent);
	Make("b",{move:"M"},{},opt.message,message);
	var div = Make("div",{move:"M"},{},"",message);
	var input = (opt.input.constructor==String)?Make(opt.input,{placeholder:opt.placeholder},{},"",message):[opt.input].set({placeholder:opt.placeholder},{},"",message)[0];
	if(!input.hasAttribute("move")){[input].set({move:"M"})};
	input.message = message;
	input.value = opt.value;
	if(opt.focus){input.focus()};
	if(B==undefined){B={OK:function(){}}};
	if(opt.lambda){B = lambda(function(x,k,d){return function(e){return opt.lambda(x,k,d,e)}},B)};
	if(opt.cancel){B["(CANCEL)"]=function(e){}};
	lambda(function(x,k,d){
		Make("button",{move:"M"},{click:function(e){
			setTimeout(function(){[message].removeNodes()},0001);
			if(x.constructor==Function){
				e.input=input;
				x(e)
			}else{
				if(opt.back){x["(BACK)"] = function(e){TintOS.message(d,opt);};}
				TintOS.message(x,opt);
			}
		}},k,div)
	},B);
	return message;
};

//{move, parent, cancel, back, onFunction, scroll}
TintOS.menu = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"M",parent:document.body,lambda:undefined,explore:false,onFunction:false,cancel:true,back:true,scroll:0,input:false,value:"",placeholder:"..."});
	var lB, menu = Make("menu",{move:opt.move},{},"",opt.parent),
		keepPos = function(BO){
			BO[1].parent=menu.parentNode;
			BO[1].move=menu.getAttribute("move");
			[TintOS.menu(BO[0],BO[1])].set({style:menu.style.cssText})[0].scrollTo(0,BO[1].scroll);
		};
	if(opt.lambda){B = lambda(function(x,k,d){return function(e){return opt.lambda(x,k,d,e)}},B)};
	//if(opt.cancel){B["(CANCEL)"]=function(e){}};
	if(opt.back){
		if(opt.back!=true){
			lB = lambda(undefined,opt.back);
			//Make("button",{move:"M"},{click:function(e){TintOS.menu(lB[0],lB[1]);[e.target.parentNode].removeNodes()}},"(BACK)",menu);
		};
		opt.back = [lambda(undefined,B),lambda(undefined,opt)];
	};
	if(opt.cancel){Make("button",{style:"background:rgba(0,255,0,0.7)",move:"M"},{click:function(e){opt.back=lB;TintOS.menu(B,opt)}},"+",menu)};
	if(lB){
		Make("button",{style:"background:rgba(255,255,0,0.7)",move:"M"},{click:function(e){keepPos(lB);[e.target.parentNode].removeNodes()}},"<",menu);
	}else{
		Make("button",{style:"background:rgba(0,0,255,0.7)",move:"M"},{click:function(e){
			[menu].set({move:"T"});
			opt.move=0;
			setTimeout(function(){opt.parent=menu.parentNode},2000);
			setTimeout(function(){opt.parent=menu.parentNode;opt.back[1].parent=menu.parentNode},5000);
		}},"T",menu);
	};
	if(opt.cancel){Make("button",{style:"background:rgba(255,0,0,0.7)",move:"M"},{click:function(e){[e.target.parentNode].removeNodes()}},"X",menu)};
	if(opt.input){
		if(opt.input==true){opt.input="input"};
		if(opt.input.constructor==String){
			opt.input = Make(opt.input);
		};
		[opt.input].set({value:opt.value,move:"M",style:"width:99%;border-radius:25%",placeholder:opt.placeholder},{},"",menu);
	};
	lambda(function(x,k,d){
		if(!opt.explore && x==undefined){return};
		Make("button",{move:"M"},{click:function(e){
			if(opt.input){e.input=opt.input};
			opt.scroll = e.target.offsetTop;
			let backScroll = e.target.offsetTop,
				backBtn = function(evt){
					let opt2 = lambda(function(){},opt);
					opt2["back"]=lB;
					opt2["parent"] = opt.parent;
					TintOS.menu(d,opt2).scrollTo(0,opt.scroll);
					[evt.target.parentNode].removeNodes();
				};
			if(x.constructor==Function){
				if(opt.explore && k[0]!="("){
					TintOS.message({Run:function(e){
						let tempArgs = e.input.value.split(",").map(eval),
							tempVar = x.apply(this,tempArgs);
						if(tempVar.constructor == Promise){
							tempVar.then(function(y){
								Make("button",{move:"M"},{click:backBtn},"(BACK)",TintOS.menu(y,opt))
							});
						}else{
							Make("folder",{move:0},{},tempVar)
							backBtn(e);
						};
					},"(Back)":backBtn},{message:k,placeholder:x,parent:opt.parent})
				}else if(opt.onFunction){onFunction(x,e)}else{x(e)};
				if(menu.getAttribute("move")!="M"){
					keepPos(opt.back)
				};
			}else if( x.constructor==Number || x.constructor==String ){
				TintOS.message({Set:function(e){
					d[k]=(x.constructor==Number)?Number(e.input.value):e.input.value;
					backBtn(e);
				},"(Back)":backBtn},{message:k,value:x,parent:opt.parent})
			}else if( x.constructor==Boolean ){
				d[k] = !x;
				TintOS.alert("Set to "+(!x));
				TintOS.menu(B,opt.back[1])
				//let btns = {};
				/*btns["Set " + !x] = function(e){
					d[k]=!x;
					backBtn(e);
				};
				*/
				//btns["(Back)"] = backBtn;
				//TintOS.menu(btns,opt)
			}else if( x.constructor==Array && !opt.explore){
				TintOS.message({
					Set:function(e){d[k]=JSON.parse(e.input.value);backBtn(e)},
					"(Back)":backBtn
				},{message:k,value:JSON.stringify(x),parent:opt.parent})
			}else{
				[TintOS.menu(x,opt)].set({style:menu.style.cssText});
			};
			[menu].removeNodes()
		}},k,menu)
	},B);
	//menu.scrollTo(0,opt.scroll);
	return menu;
};

TintOS.alert = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"B",parent:document.body,lambda:undefined,from:"left:-50%",to:"left:30%",auto:true,delay:4});
	var alert = Make("alert",{move:opt.move,style:opt.from},{},"",opt.parent);
	if(opt.lambda){B = lambda(function(x,k,d){return function(e){return opt.lambda(x,k,d,e)}},B)};
	switch(B.constructor){
		default:
			Make("b",{move:"M"},{},B,alert);
		break;
		case Object:
			lambda(function(x,k,d){
				Make("b",{move:"M",style:"text-shadow:0px 0px 5px black"},{click:x},k,alert);
			},B);
		break;
		case Array:
			B.map(function(x){Make("b",{move:"M"},{},x,alert);});
		break;
	};
	setTimeout(function(){[alert].set({style:opt.to})},100);
	if(opt.auto){
		setTimeout(function(){[alert].set({style:opt.from},{transitionend:function(e){[e.target].removeNodes()}})},opt.delay*1000);
		//setTimeout(function(){[alert].removeNodes()},(opt.delay+5)*1000);
	}else{
		Make("button",{class:"close"},{},"X",alert);
	};
	return alert;
};

TintOS.index = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"L",parent:document.body,icon:"|||",opt:true,tag:"u"});
	var index = Make("index",{move:opt.move,tabIndex:0,tag:opt.tag},{},opt.icon,opt.parent);
	if(opt.opt){Make("button",{move:0,name:"options"},{},"Options",index)};
	let makeLink = function(x,k){
		if(x.constructor==Object){
			let div = Make("div",{name:k},{},k+": ",index);
			return lambda(function(x,k){[makeLink(x,k)].set({},{},undefined,div)},x);
		}else{
			let F = String(x).split("){").slice(1).join("");
			return Make("button",{move:0,onclick:(x.constructor==String)?x:F.slice(0,F.length-1)},{},k,index);
		};
	};
	lambda(makeLink,B);
	return index;
};

TintOS.notify = function(B,opt){
	opt = TintOS.setDefaults(opt,{title:"Tint OS",focus:true,close:true,opt:undefined,body:undefined,actions:[],icon:"image/icon.png",image:"image/icon 512.png",badge:"image/icon.png",vibrate:range(101).random(4),data:{},timestamp:(new Date()),tag:undefined,renotify:false,silent:false,requireInteraction:false});
	if(Notification.permission == "granted"){
		lambda(function(x,k,d){
			let act = {},
				ti = k.split(":");
			act["action"] = k;
			act["title"] = ti[0];
			if(ti.length==2){act["icon"] = ti[1]}
			opt.actions.push(act);
		},B);
		opt.data.opt = opt.opt;
		opt.data.options = {focus:opt.focus,close:opt.close};
		if(B){opt.data.actionList = TintOS.util.stringify(B);};
		navigator.serviceWorker.getRegistration().then(function(sw){
			sw.showNotification(opt.title,opt);
		});
	}else if(Notification.permission == "denied"){
		TintOS.alert({"This App is better with Notifications, click to enable":function(e){Notification.requestPermission().then(per => {if(per=="granted"){TintOS.notify(B,opt)}})}});
	}else{Notification.requestPermission().then(per => {if(per=="granted"){TintOS.notify(B,opt)}})};
};

//{move, parent, target}
TintOS.explorer = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body,target:document});
	var explorer = Make("explorer",{move:opt.move},{},opt.target.tagName,opt.parent);
	lambda(function(x,k,d){if(!(k>=0)){return};Make("button",{move:"M"},{
		click:function(e){
			//if(e.target.children.length < 1){};
			var child = TintOS.explorer(B,{parent:e.target.parentNode,target:x});
			B = TintOS.setDefaults(B,{
				Open:function(evt){},
				Explore:function(evt){TintOS.menu(x,{explore:true})},
				Select:function(evt){TintOS.select([x])},
				Commands:function(evt){TintOS.util.VCLib.show("",[x])},
				Cancel:function(evt){[child].removeNodes()}
			});
			TintOS.message(B,{parent:child,message:x.tagName,input:Make("p"),value:x,cancel:false});
		}
	},[x.tagName,x.id,x.offsetLeft,x.offsetTop],explorer)},opt.target.children);
	//console.log(opt.target.children.length);
	Make("b",{class:"close"},{},"X",explorer)
	return explorer;
};

///////////
////// APPS

TintOS.book = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",name:"Book",parent:document.body});
	var book = Make("book",{move:opt.move,name:opt.name},{},"",opt.parent);
	var sel = Make("select",{move:"M",name:"book",scheme:""},{},"",book);
	var df = {};
	df[opt.name] = "";df["Options"] = "Options";
	lambda(function(x,k,d){return Make("option",{value:x},{},k,sel)},df);
	lambda(function(x,k,d){return Make("option",{value:x},{},k,sel)},B);
	return book;
};

TintOS.bookmarks = function(B,opt){
	opt = TintOS.setDefaults(opt,{name:"Bookmarks",protocol:location.protocol+"//",target:"browser",node:"iframe",move:"0",parent:document.body});
	var bookmarks = Make("bookmarks",{move:opt.move,name:opt.name},{},"",opt.parent);
	var sel = Make("select",{move:"M",name:"bookmarks",protocol:opt.protocol,target:opt.target,node:opt.node},{},"",bookmarks);
	lambda(function(x,k,d){return Make("option",{value:x},{},k,sel)},{Bookmarks:"",Options:"Options"});
	lambda(function(x,k,d){return Make("option",{value:x},{},k,sel)},B);
	sel.children[0].innerHTML = opt.name;
	Make("b",{class:"close"},{},"X",bookmarks);
	return bookmarks;
}

TintOS.brain = function(B,opt){
	opt = TintOS.setDefaults(opt,{input:"range(1,4)",output:"range(1,4).map(function(x){return x*2-1})",type:"sequential",loss:"meanSquaredError",optimizer:"sgd",src:"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js",move:"0",parent:document.body});
	var brain = Make("brain",{input:opt.input,output:opt.output,type:opt.type,loss:opt.loss,optimizer:opt.optimizer,move:opt.move},{},"",opt.parent);
	Make("script",{src:opt.src,move:"M"},{},"",brain);
	Make("button",{move:"M"},{},"|||",brain);
	setTimeout(function(){
		var BB = true;
		lambda(function(x,k,d){
			BB = false;
			TintOS.util.menuCrawl(["|||","Add Layer"],{parent:brain});
			var layer = Find("layer",undefined,brain).items(-1);
			layer.innerHTML = k;
			x.split(";").map(function(x){
				x = x.split(":");
				layer.setAttribute(x[0],x[1]);
			});
		},B);
		if(BB){TintOS.util.menuCrawl(["|||","Add Layer"],{parent:brain})};
	},1000);
	Make("b",{class:"close"},{},"X", brain);
	return brain;
};

TintOS.browser = function(B,opt){
	opt = TintOS.setDefaults(opt,{src:"Stiles.html",node:"iframe",extract:false,move:"0",parent:document.body});
	var browser = Make("browser",{move:opt.move},{},"",opt.parent);
	var W = Make(opt.node,{src:opt.src,name:"browser",move:"M",allow:"fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:true,webkitallowfullscreen:true,mozallowfullscreen:true},{load:function(e){if(opt.extract){setTimeout(x=>TintOS.util.menuCrawl(["|||","Extract"],{parent:browser}),500)}}},"",browser);
	var menu = Make("button",{move:"M"},{},"|||",browser);
	Make("b",{class:"close",move:"M"},{},"X",browser);
	return browser;
};

TintOS.capture = function(B,opt){
	opt = TintOS.setDefaults(opt,{fps:30,width:"1260",height:"720",facing:TintOS.user.defaultCamera,move:"0",parent:document.body});
	var capture = Make("capture",{fps:opt.fps,move:opt.move,facing:opt.facing},{},"",opt.parent);
	Make("canvas",{move:"M",width:opt.width,height:opt.height},{},"",capture);
	Make("button",{move:"M"},{},"|||",capture);
	//Make("b",{move:"M"},{},"O",capture);
	Make("video",{move:"M",autoplay:true},{},"",capture);
	Make("img",{move:"M",src:"image/icon512.png"},{},"",capture);
	if(B!=undefined){TintOS.addButtons(B,{parent:capture})};
 	TintOS.remote({},{parent:capture});
 	Make("b",{class:"close"},{},"X",capture);
 	return capture;
};

TintOS.chat = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body});
	let chat = Make("chat",{move:opt.move,name:((TintOS.user.name==undefined)?range("a","z").random(5).join(""):TintOS.user.name)},{},"",opt.parent);
	let menu = Make("button",{move:"M"},{},chat.getAttribute("name"),chat);
	Make("paper",{move:"B",contentEditable:"true"},{},"",chat);
	//TintOS.capture({},{parent:chat}).style.left="-95%";
	Make("b",{class:"close"},{},"X",chat);
	return chat;
};

TintOS.console = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",saved:"",parent:document.body});
	let console = Make("console",{move:opt.move,history:"",saved:opt.saved},{},"",opt.parent);
	let menu = Make("button",{move:"M"},{},"|||",console);
	Make(["p","textarea"],{move:"M"},{},"",console);
	Make("input",{move:"M",type:"button",value:"=>"},{},"",console);
	Make("b",{class:"close"},{},"X",console);
	return console;
};

TintOS.database = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body});
	let db = Make("database",{move:opt.move},{},"",opt.parent);
	let menu = Make("button",{move:"M"},{},"|||",db);
	Make("b",{class:"close"},{},"X",db);
	return db;
};

TintOS.game = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body});
	let game = Make("game",{move:opt.move},{},"",opt.parent);
	let menu = Make("button",{move:"M"},{},"|||",game);
	return game;
};

TintOS.media = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body,"for":["iframe","img","audio","video"],set:["autoplay","controls"]});
	var media = Make("media",{move:opt.move},{},"",opt.parent);
	opt.set.map(function(x){media.setAttribute(x,"")});
	Make("button",{move:"L"},{},"|||",media);
	opt.for.map(function(x){
		let S = Make("select",{move:"L",name:x},{},"<option value='image/icon.png'>"+x+"</option>",media);
		lambda(function(x,k,d){Make("option",{value:x},{},k,S)},B[x]);
	});
	TintOS.remote({},{parent:media});
	Make("b",{class:"close"},{},"X",media);
	return media;
};

//{move, parent, image, width, height}
TintOS.paint = function(B,opt){
	let C, isWide = document.body.offsetWidth > document.body.offsetHeight;
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body,src:undefined,image:undefined,width:(isWide?1920:1080),height:(isWide?1080:1920)});
	var paint = Make("paint",{move:opt.move,mode:"pen",size:"5",path:"stroke",shape:"round",color:"#000000",opacity:"1.0",text:"",font:"chicago",textAlign:"center",textBaseline:"middle",shadow:"0;0;0;0",GCO:"source-over",filter:"none",transform:"1,0,0,1,0,0"},{},"",opt.parent);
	C = Make("canvas",{move:"L",width:opt.width,height:opt.height},{},"",paint);
 	if(opt.src){setTimeout(function(){TintOS.util.canvasSRC([C].set({src:opt.src}))},0000)};
 	Make("button",{move:"M"},{},"Menu",paint);
 	Make("select",{move:"L"},{},"<option>Mode</option><option value='Options'>Options</option><option value='mode:hand'>Hand</option><option value='mode:pen;size:5'>Pen</option><option value='mode:line'>Line</option><option value='mode:pen;size:25'>Marker</option><option value='mode:box'>Box</option><option value='mode:circle'>Circle</option><option value='mode:erase;size:25'>Erase</option><option value='mode:fill'>Fill</option><option value='mode:text;size:30'>Text</option><option value='mode:select-auto'>Auto Select</option>",paint);
 	Make("select",{move:"L"},{},"<option>Color</option><option value='Options'>Options</option><option value='color:#000000'>Black</option><option value='color:#ffffff'>White</option><option value='color:#ff0000'>Red</option><option value='color:#00ff00'>Green</option><option value='color:#0000ff'>Blue</option><option value='opacity:1.0'>Solid</option><option value='opacity:0.5'>Liquid</option><option value='opacity:0.1'>Gas</option>",paint);
 	Make("select",{move:"L"},{},"<option>Size</option><option value='Options'>Options</option>"+[1,5,10,25,50,75,100,200,500,1000].map(function(x){return "<option value='size:"+x+"'>"+x+"</option>"}).join(""),paint);
 	Make("select",{move:"L"},{},"<option>Text</option><option value='Options'>Options</option>"+["Tint OS","Yes!","LOL","OMG"].map(function(x){return "<option value='text:"+x+"'>"+x+"</option>"}).join("")+["font:Arial","font:Times New Roman","font:Cursive","font:Symbol","mode:text"].map(function(x){return "<option value='"+x+"'>"+x+"</option>"}).join(""),paint);
 	Make("select",{move:"L"},{},"<option>GCO</option><option value='Options'>Options</option>"+["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","xor"].map(function(x){return "<option value='GCO:"+x+"'>"+x+"</option>"}).join(""),paint);
 	if(B!=undefined){TintOS.addButtons(B,{parent:paint})};
 	Make("b",{class:"close"},{},"X",paint);
 	return paint;
};

TintOS.profile = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body});
	var P = Make("profile",{move:opt.move},{},"Profile",opt.parent);
	lambda(function(x,k,d){
		Make("button",{move:"M"},{},k,P);
		Make(k.toLowerCase(),{move:"M"},{},x,P);
	},TintOS.setDefaults(B,{
		Title:"Tint OS",
		Script:"////Grid Size Gap in px:\nTintOS.grid = " + TintOS.grid + "; \n\n////Resize Area Fraction (1-x):\nTintOS.RF = " + TintOS.RF + "; \n\n////Theme Color:\nTintOS.metaData['theme-color'] = '" + TintOS.metaData["theme-color"] + "'; \n\n////Start-up Options:\nTintOS.options = " + JSON.stringify(TintOS.options) + "; \n\n////Default Camera(user | environment):\nTintOS.user.defaultCamera = '" + TintOS.user.defaultCamera + "'; \n\n////Sets the type of file for saved data:\nTintOS.saveFileType = '" + TintOS.saveFileType + "';",
		Style:"\nbody{\n background:;\n color:;\n}\n\n:fullscreen::backdrop{\n background:;\n}\n\nprofile{\n background:;\n color:;\n}\n\n*[move='1']{\n background:;\n color:;\n box-shadow:10px 10px 30px black;\n}\n\n*[move='0']{\n background:;\n color:;\n box-shadow:0px 0px 5px black;\n}",
		Template:""
	}));
	//Make("b",{class:"close"},{},"X",P);
	return P;
};

TintOS.remote = function(B,opt){
	opt = TintOS.setDefaults(opt,{move:"0",parent:document.body});
	var remote = Make("remote",{move:opt.move},{},"",opt.parent);
	//var box = Make("details",{move:"M"},{},"<summary>Controls</summary>");
 	Make("button",{move:"L"},{},"o",remote);
 	var S = Make("select",{move:"M"},{},"<option>|||</option>",remote);
 	["currentTime","volume","playbackRate","controls","autoplay","loop","muted"].map(function(x){
 		return Make("option",{value:x},{},x,S)
 	});
	Make("button",{move:"M"},{},"|| >",remote);
	if(B!=undefined){TintOS.addButtons(B,{parent:remote})};
 	return remote;
};

TintOS.scene = function(B,opt){
	opt = TintOS.setDefaults(opt,{factor:1,move:"0",parent:document.body});
	var scene = Make("scene",{factor:opt.factor,move:opt.move},{},"",opt.parent);
	Make("button",{move:"M"},{},"|||",scene);
	if(B!=undefined){TintOS.addButtons(B,{parent:scene})};
 	Make("b",{class:"close"},{},"X",scene);
 	return scene;
};

// 1260x720 1920x1080 3840x2160
TintOS.studio = function(B,opt){
	opt = TintOS.setDefaults(opt,{fps:30,width:"1920",height:"1080",move:"0",parent:document.body});
	var studio = Make("studio",{fps:opt.fps,move:opt.move},{},"",opt.parent);
	/*
	var S = Make("select",{move:"M"},{},"<option>|||</option>",remote);
 	["currentTime","volume","playbackRate","controls","autoplay","loop","muted"].map(function(x){
 		return Make("option",{value:x},{},x,S)
 	});
 	*/
	Make("button",{move:"M"},{},"|||",studio);
	Make("canvas",{move:"M",width:opt.width,height:opt.height},{},"",studio);
	if(B!=undefined){TintOS.addButtons(B,{parent:studio})};
 	Make("b",{class:"close"},{},"X",studio);
 	return studio;
};

TintOS.synth = function(B,opt){
	opt = TintOS.setDefaults(opt,{width:"1260",height:"720",move:"0",parent:document.body});
	var synth = Make("synth",{offset:440,harmonic:1,riff:120,move:opt.move},{},"",opt.parent);
	Make("button",{move:"M"},{},"|||",synth);
	Make("canvas",{type:"sine",stereoPanner:0,harmonic:2,move:"L",width:opt.width,height:opt.height},{},"",synth);
	Make("audio",{move:"M",controls:true,autoplay:true},{},"",synth);
	if(B!=undefined){TintOS.addButtons(B,{parent:synth})};
 	Make("b",{class:"close"},{},"X",synth);
 	return synth;
};

TintOS.select = function(sel){
	if(sel.constructor==String){sel = Find(sel)};
	Find("[move='1']").map(function(x){x.setAttribute("move","0")});
	sel.map(function(x){if(x.getAttribute("move")=="0"){x.setAttribute("move","1")}});
};

//['blur(0px)','invert(0)','brightness(1)','contrast(1)','opacity(1)','saturate(1)','grayscale(0)','sepia(0)','hue-rotate(0deg)','drop-shadow(0px 0px 0px black)','url()']
TintOS.styleMenu = function(){
	var sList = ["top","bottom","left","right","width","height","transform","filter","transition","position","display","overflow","box-align","z-index","background","color","box-shadow","font","text-align","text-shadow"],
	inputs = Make("p",{style:"position:absolute;left:0%;height:80%;width:100%;overflow:auto;text-align:left",move:"M"}),
	F = Find("*[move='1']"),
	sObj = {};
	sList.map(function(x){sObj[x]=F[0].style[x]});
	lambda(function(x,k,d){
		Make("b",{style:"postion:relative;left:0px;height:20px;width:30%;display:block;font-size:20px",move:"M"},{},k+":",inputs);
		Make("input",{style:"position:relative;left:30%;height:20px;width:70%;display:block",value:x,name:k,move:"M"},{},"",inputs);
	},sObj);
	TintOS.message({Set:function(e){F.map(function(x){Find("input",undefined,e.input).map(function(y){x.style[y.name]=y.value})})}},{message:"Style Menu",input:inputs});
};

TintOS.transformMenu = function(){
	let Div = Make("div",{style:"position:absolute;right:0px;top:50px;width:200px;z-index:10000000000",move:"M"},{},"<b style='position:relative;display:block;float:right' class='close'>X</b>");
	/*
	Make(["input"].copy(16),{move:"M",type:"number",value:"0",style:"position:relative;display:inline;width:22%;"},{input:function(e){Find("*[move='1']").map(function(x){
		x.style.transform = "matrix3d(" + Find("input","value",Div).join(",") + ")";
	})}},"",Div); 
	*/
	let TO = Make("input",{move:"M",style:"position:relative;width:100%",value:"center center 0px"},{},"",Div);
	let TR = Make("textarea",{move:"M",style:"position:relative;width:100%;height:100px;"},{},"perspective(200px) translate3d(0px,0px,0px) scale3d(1,1,1) rotate3d(0,0,0,45deg)",Div);
	Make("button",{move:"M",style:"position:relative;width:50%"},{click:function(e){Find("*[move='1']").map(function(x){x.style.transformOrigin = TO.value;x.style.transform = TR.value})}},"Set",Div);
	Make("button",{move:"M",style:"position:relative;width:50%"},{click:function(e){Find("*[move='1']").map(function(x){TO.value = x.style.transformOrigin;TR.value = x.style.transform})}},"Get",Div);
};

TintOS.modeControl = function(){
	var S = Make("select",{move:"M",class:"modeControl"},{
		change:function(e){
			lambda(function(x,k,d){d[k] = false},TintOS.key);
			e.target.value.split(",").map(function(x){TintOS.key[x]=true});
		}
	});
	lambda(function(x,k,d){Make("option",{move:"M",value:x},{},k,S)},{
		Select:"",
		Edit:"Alt",
		Copy:"Control",
		Delete:"Control,Alt",
		Lock:"Control,Shift",
		Attach:"Shift"
	});
};

TintOS.mainMenu = function(e){
		var getSel = function(uw=true){
				let S = Find("*[move='1']");
				if(S.length==0 && uw){S=[document.body]};
				return S;
			},
			Selected = getSel();
		if(Selected.length==0){Selected=[document.body]};
		TintOS.menu({
			Select:{
				List:function(e){
					var buttons = {};
					TintOS.tags.map(function(x){buttons[x]=function(e){TintOS.select(e.target.innerHTML)}});
					TintOS.menu(buttons,{});
				},
				Custom:function(e){
					TintOS.message({
						Select:function(e){TintOS.select(e.input.value)}
					},{message:"Select...",placeholder:"CSS Selector...",input:"input"})
				},
				Visual:function(e){
					Find("*[move='1']").set({move:"0"});
					TintOS.util.visualSelect();
				},
				Explorer:function(e){
					TintOS.explorer();
				}
			},
			Actions:function(e){
				var ACT = function(e){TintOS.action(e.target.innerHTML)};
				TintOS.menu({Edit:ACT,Copy:ACT,Delete:ACT,Lock:ACT,Attach:ACT,});
			},
			Make:{
				List:function(e){
					var buttons = {};
					TintOS.tags.slice(1).map(function(x){buttons[x]=function(e){Selected.map(function(s){Make(e.target.innerHTML,{move:"0"},{},"",s).style.zIndex = TintOS.zTop++})}});
					TintOS.menu(buttons,{});
				},
				Custom:function(e){
					TintOS.message({
						Create:function(e){Selected.map(function(s){Make(e.input.value,{move:"0"},{},"",s).style.zIndex = TintOS.zTop++})}
					},{message:"Make...",placeholder:"HTML Tag...",input:"input"})
				}
			},
			Script:{
				List:function(e){
					var SEL = Find("[move='1']");
					TintOS.menu(lambda(function(x,k,d){
						return function(e){
							TintOS.message({
								"Set Attribute":function(e){SEL.map(function(x){x.setAttribute(k,e.input.value)})},
								"Remove Attribute":function(e){SEL.map(function(x){x.removeAttribute(k)})},
								"Set Variable":function(e){SEL.map(function(x){x[k] = e.input.value})},
								"Remove Variable":function(e){SEL.map(function(x){delete x[k]})},
								Run:function(e){SEL.map(function(x){Make("tab",{move:"1"},{},x[k](e.input.value))})}
							},{message:k,placeholder:"Set Attribute/Variable",value:x})
						}
					},SEL[0],Object),{});
				},
				Custom:function(e){
					var SEL = Find("[move='1']");
					TintOS.message({
						Attribute:function(e){var code=e.input.value.split("=");SEL.map(function(x){x.setAttribute(code[0],code[1])})},
						Variable:function(e){var code=e.input.value.split("=");SEL.map(function(x){x[code[0]] = code[1]})}
					},{message:"Set Custom Variable",placeholder:"Variable=Value"})
				},
				//Explore:Selected[0],
				Explore:function(e){TintOS.menu(Selected[0],{explore:true})}
			},
			Style:{
				List:function(e){
					var SEL = Find("[move='1']");
					TintOS.menu(lambda(function(x,k,d){
						return function(e){
							TintOS.message({
								"Set":function(e){SEL.map(function(x){x.style[k] = e.input.value})}
							},{message:k,placeholder:"Set Style Attribute",value:x})
						}
					},SEL[0].style,Object),{});
				},
				Custom:function(e){
					TintOS.message({Set:function(e){
						Find("[move='1']").set({style:e.input.value});
					}},{message:"Style...",placeholder:"CSS Style Description...",value:Find("[move='1']")[0].style.cssText});
				},
				Menu:function(e){
					TintOS.styleMenu();
				},
				"3D menu":function(e){
					TintOS.transformMenu();
				}
			},
			Load:{
				"Auto":function(e){TintOS.load({parent:Selected[0]})},
				"All URLs":function(e){TintOS.load({parent:Selected[0],maxSize:0})},
				"No URLs":function(e){TintOS.load({parent:Selected[0],maxSize:99999999999999999999999999})},
				//"Stream":function(e){TintOS.load({parent:Selected[0],readAs:"Blob",callback:function(ADD,type,result,file){Make("video",{controls:true},{},"",Selected[0]).srcObject = result;}})},
				"Raw":function(e){TintOS.load({parent:Selected[0],readAs:"Text",callback:function(ADD,type,result){Make("paper",{},{},"",Selected[0]).innerHTML = result;}})},
				"Temp":function(e){TintOS.workers.service.postMessage({data:"list"})},
				"Profile":function(e){Make("folder",{move:1},{},Find("template[name='profile']","innerHTML").join(""))}
			},
			Save:function(e){
				TintOS.message({
					"Save":function(e){TintOS.save({name:e.input.value,type:TintOS.saveFileType})},
					"Link":function(e){TintOS.save({name:e.input.value,type:TintOS.saveFileType,auto:false})},
					"Temp":function(e){var c={};c[e.input.value]=Selected.map(function(s){return s.outerHTML}).join("");TintOS.workers.service.postMessage({data:c})},
					"Profile":function(e){Find("template[name='profile']")[0].innerHTML=e.input.value+Find("*[move='1']","outerHTML").join("")}
				},{message:"Save File",placeholder:"Name for File?"});
			},
			Options:{
				"t":function(e){window.open(window.location)},
				"&#8635":function(e){
					var rel = setTimeout(function(){window.onbeforeunload=function(e){};window.location.reload();},2000);
					TintOS.menu({
						"and Reset":function(e){TintOS.autoSave = function(){};TintOS.data("autosave",0,1)},
						"and Clear Cache":function(e){TintOS.workers.service.postMessage({"clearCache":true})},
						"Cancel Reload":function(e){clearTimeout(rel)}
					},{cancel:false});
				},
				"x":function(e){window.close()},
				"Clear Screen":function(e){
					var M = TintOS.alert({"&#8634":function(e){cList.set({},{},undefined,document.body)}},{from:"top:110%",to:"top:90%"});
					M.temp = Make("template",{style:"display:none"},{},"",M);
					let cList = Find("body>*").filter(function(x){
						return ((x.getAttribute("move")!="B")&&(x.getAttribute("move")!="M")&&(x.getAttribute("move")!="L"))
					});
					cList.removeNodes();
					//.set({move:0},{},undefined,M.temp);
					//Find("video,audio").map(function(x){x.pause()});
					//setTimeout(function(){[M].removeNodes()},5000)
				},
				"Revoke URLs":function(e){
					let M = lambda(function(x,k,d){
						return function(e){
							window.URL.revokeObjectURL(x);
							delete TintOS.objectURLs[k];
						}
					},TintOS.objectURLs);
					M.ALL = function(e){
						lambda(function(x,k,d){
							window.URL.revokeObjectURL(x);
							delete TintOS.objectURLs[k];
						},TintOS.objectURLs)
					};
					M.View = function(e){TintOS.bookmarks(TintOS.objectURLs,{protocol:""})};
					//M.Cache = function(e){TintOS.workers.service.postMessage({data:TintOS.objectURLs})};
					TintOS.menu(M);
				},
				"Cast":{"Media":function(e){TintOS.cast.go()},"Send":function(e){TintOS.cast.go("https://tints-tech.com/TintOS/")}},
				"Record":{Video:function(e){TintOS.record()},Audio:function(e){TintOS.record({options:{mimeType:"audio/webm"}})}},
				"Still Shots":function(e){
					let ss = function(e){TintOS.util.stillShot(Find(e.target.innerHTML))};
					TintOS.menu({"Add Button":function(e){
						Make("button",{move:"M",style:"background:rgba(255,255,255,0.1);left:40%;bottom:30px;height:20%;width:20%;z-index:999999;border-color:red;border-width:5px;border-radius:100%"},{click:function(e){
							TintOS.util.stillShot(Find("video,canvas"))
						}},"<b class='close' style='top:80%' move='M'>X</b>")
					},video:ss,canvas:ss,img:ss,'*[move="1"]':ss});
				},
				"GPS":(TintOS.user.gps)?{Explore:function(e){TintOS.menu(TintOS.user.gps,{explore:true})},Stop:function(e){navigator.geolocation.clearWatch(TintOS.user.gps);TintOS.user.gps=undefined}}:{Start:function(e){navigator.geolocation.watchPosition(function(x){TintOS.user.gps = x});}},
				"Info":function(e){
					let links = {
						"Tutorial":"https://docs.google.com/document/d/1EywO4Tl_vgQWLDK0HbuwEMmKbJ7nMCRQZKYhgDktnSk/edit?usp=drivesdk",
						"Update Logs":"https://docs.google.com/document/d/1M-cskB2fN6KIKMrnCAPn0ZcPuMI54dK3eScTyBCu0rY/edit?usp=drivesdk",
						"TintOS.js Syntax":"https://docs.google.com/document/d/1xwfS1ElweuoD6eSnnTnT04US-OfYnrZeLMqJv0yF3vI/edit?usp=drivesdk",
						"Tint.js Syntax":"https://docs.google.com/document/d/1xR7j2Ny9rOphbjplbi50ldF3VQAcG9edDbx4IJwyqWI/edit?usp=drivesdk",
						"Tints Tech LLC":"https://tints-tech.com/about",
						"Legal":"terms.html",
						"Contact":"https://tints-tech.com/contact",
						"Report":"https://tints-tech.com/report",
						"FB":"https://www.facebook.com/TintedOS/"
					},
					disp = Make("paper",{class:"infoPaper",move:0},{},"Information");
					Make("style",{},{},".infoPaper>a[move='M']{position:relative;display:block;margin:20px;}",disp);
					Make("b",{move:"L",class:"close"},{},"X",disp);
					lambda(function(x,k,d){Make("a",{href:x,move:"M"},{},k,disp);},links);
				},
				//"Info":function(e){TintOS.browser({},{src:'data:text/html,<style>a{display:block}</style><a href="https://docs.google.com/document/d/1EywO4Tl_vgQWLDK0HbuwEMmKbJ7nMCRQZKYhgDktnSk/edit?usp=drivesdk">Tutorial</a><a href="https://docs.google.com/document/d/1xwfS1ElweuoD6eSnnTnT04US-OfYnrZeLMqJv0yF3vI/edit?usp=drivesdk">TintOS.js Syntax</a><a href="https://docs.google.com/document/d/1xR7j2Ny9rOphbjplbi50ldF3VQAcG9edDbx4IJwyqWI/edit?usp=drivesdk">Tint.js Syntax</a>'})},
				/*
				"Hide Menus":function(e){
					Make("img",{move:"B",style:"bottom:10px;right:10px;width:25px;transition:2s;z-index:99999999",src:"https://tints-tech.com/TintOS/image/icon512.png"},{click:function(e){
						Find("body>*[move='M']").map(function(x){
							if(x.className == "adsbygoogle"){return};
							if(x.style.display == "none"){
								x.style.display = "";
								e.target.style.width="25px";
								e.target.style.transform="rotateZ(360deg)";
								
							}else{
								x.style.display = "none";
								e.target.style.width="75px";
								e.target.style.transform="";
								
							};
						});
						//[e.target].removeNodes();
					},"dblclick":function(e){Find("*",undefined,e.target).set({},{},undefined,document.body);}}).click();
				},
				*/
				"Tools":{
					"Run Script":{
						Custom:function(e){
							TintOS.message({
								Run:function(e){
									TintOS.cScript = e.input.value;
									[Make("script",{},{},e.input.value)].removeNodes()
								}
							},{message:"Run Javascript",placeholder:"Enter Javascript Here",value:TintOS.cScript})
						},
						"Selcted Profiles":function(e){
							Find("profile[move='1']>script").map(function(x){return Make("script",{},{},x.innerHTML)}).removeNodes();
						}
					},
					"Clipboard":function(e){
						let S = getSel(),
							CB = navigator.clipboard;
						//if(S==[document.body]){S=Find("*[move='0']")};
						TintOS.menu({
							"Copy...":{
								"Selected as HTML":function(evt){if(S[0]!=document.body){CB.writeText(S.map(x => x.outerHTML).join(""))}},
								"Media as Data":function(evt){
									TintOS.util.visualSelect({title:"Select Data to Copy",multiple:false,targets:Find("canvas,*[src]"),action:function(x){
										if(x.tagName=="CANVAS"){
											x.toBlob(b => CB.write([new ClipboardItem({[b.type]:b})]))
										}else{
											TintOS.getFile({src:x.src,type:"blob",callback:function(r){
												CB.write([new ClipboardItem({[r.type]:r})]);
											}});
											//let F = GetFile(x.src);
											//F = new ArrayBuffer([F]);
											//CB.write([new ClipboardItem({[F.type]:F})]);
										};
									}});
								},
								"File as Data":function(evt){TintOS.load({multiple:false,readAs:"ArrayBuffer",callback:function(add,type,R,F){
									CB.write([new ClipboardItem({[F.type]:F})]).catch(err => TintOS.alert(err));
								}})}
							},
							"Paste...":{
								"as HTML":function(evt){CB.readText().then(p => S.map(x => Make("p",{},{},"",x).outerHTML=p))},
								"as Data":function(evt){
									CB.read().then(function(p){
										p.map(function(x){
											x.types.map(function(t){
												x.getType(t).then(function(add){
													let dURL = TintOS.createURL(add);
													S.map(s => TintOS.browser({},{src:dURL,protocol:"",parent:s}).style.zIndex=TintOS.zTop++);
												});
											});
										});
									});
								}
							}
						},{parent:e.target.parentNode.parentNode});
					},
					"Save as URL":function(e){
						let F = Make("form",{action:window.location,target:"_blank",move:"M"});
						TintOS.message({Open:function(e){window.open(window.location + "?" + Find("textarea",undefined,e.input).map(function(x){return x.name + "=" + escape(x.value)}).join("&"),"_blank")}},{message:"Setup a URL Save",input:F});
						var D = Make("div",{move:"M",style:"position:relative;display:block"},{},"<b class='close'>X</b>",F);
						Make("b",{style:"position:relative;left:20px",move:"M"},{},"Load Page...",D);
						Make("textarea",{style:"position:relative",name:"load"},{},Find("body>*").map(function(x){switch(x.getAttribute("move")){case "M":case "B":return "";break;};return x.outerHTML}).join(""),D);
						D = Make("div",{move:"M",style:"position:relative;display:block"},{},"<b class='close'>X</b>",F);
						Make("b",{style:"position:relative;left:20px",move:"M"},{},"Add to Page...",D);
						Make("textarea",{style:"position:relative",name:"append"},{},"",D);
						D = Make("div",{move:"M",style:"position:relative;display:block"},{},"<b class='close'>X</b>",F);
						Make("b",{style:"position:relative;left:20px",move:"M"},{},"Load URLs...",D);
						Make("textarea",{style:"position:relative",name:"import"},{},"",D);
						D = Make("div",{move:"M",style:"position:relative;display:block"},{},"<b class='close'>X</b>",F);
						Make("b",{style:"position:relative;left:20px",move:"M"},{},"Run Script...",D);
						Make("textarea",{style:"position:relative",name:"script"},{},TintOS.cScript,D);
					},
					"Share":{
						"As URL":function(e){if(navigator.share){navigator.share({url:window.location+"?load="+escape(Find("*[move='1']","outerHTML").join(""))})}},
						"Raw HTML":function(e){if(navigator.share){navigator.share({text:Find("*[move='1']","outerHTML").join("")})}}
					},
					"Print":function(e){print()},
					"Streams":{
						"Add":function(e){
							TintOS.util.visualSelect({title:"Add Streams",targets:Find("video,audio,canvas"),action:function(x){TintOS.user.streams.push(TintOS.util.stream(x))}});
							//Find("*[move='1']").map(function(x){TintOS.user.streams.push(TintOS.util.stream(x))})
						},
						"View":function(e){
							//var streams = {};
							//TintOS.user.streams.map(function(x,i){streams[i]=TintOS.createURL(x)});
							//TintOS.bookmarks(streams,{name:"Streams"});
							TintOS.user.streams.map(function(x){Make("video",{move:0,autoplay:true,controls:true}).srcObject=x})
						},
						"Stop":function(e){TintOS.user.streams.map(function(x){x.getTracks().map(function(y){y.stop()})})},
						"Clear":function(e){TintOS.user.streams = []},
						"Set Cam":function(e){
							TintOS.util.visualSelect({title:"Set Camera",multiple:false,targets:Find("video,audio,canvas"),action:function(x){TintOS.user.camera = TintOS.util.stream(x)}});
							//TintOS.user.camera = Find("*[move='1']")[0].captureStream()
						},
						"View Cam":function(e){Make("video",{move:0,autoplay:true,controls:true}).srcObject=TintOS.user.camera},
						"Stop Cam":function(e){TintOS.user.camera.getTracks().map(function(x){x.stop()})}
					},
					"Deleted":function(e){
						var list = {};
						TintOS.delList.forEach(function(x,i){
							list[i+": "+x.tagName] = function(e){
								[x].set({},{},"",document.body);
								TintOS.delList = TintOS.delList.filter(function(y){return y.parentNode==null});
							};
						});
						TintOS.menu(list);
					},
					"Resize":function(e){TintOS.message({Set:function(e){TintOS.RF=e.input.value}},{message:"Resize Factor",value:TintOS.RF})},
					"Grid":function(e){TintOS.message({Set:function(e){TintOS.grid=Number(e.input.value)}},{message:"Grid Size",value:TintOS.grid})},
					"+<b class='close'>X</b>":function(e){Selected.map(function(x){Make("b",{move:"L",class:"close"},{},"X",x)})},
					"Proportionality":{
						"Set Selected":function(e){
							TintOS.util.proportional({targets:Find("*[move='1']")})
						},
						"Auto":{
							"Turn On":(!TintOS.options.proportional)?function(e){TintOS.options.proportional=true}:undefined,
							"Turn Off":(TintOS.options.proportional)?function(e){TintOS.options.proportional=false}:undefined
						}
					}
				},
				/*"Refresh":{
					"Refresh":function(e){window.location.reload()},
					"and Reset":{"Reset?":function(e){window.onbeforeunload=function(e){};TintOS.data("autosave",0,1);window.location.reload()}},
					"Clear Cache":function(e){TintOS.workers.service.postMessage({"clearCache":true})}
				},*/
				//"Show Files":function(e){TintOS.workers.service.postMessage({"get":"cFiles"})},
				//"IDB explore":function(e){TintOS.database()},
				"Install":TintOS.util.install
			}
		})
}; 


// Chrome Cast
/*
window.__onGCastApiAvailable = function(isAvailable){
    if(! isAvailable){
        return false;
    }

    TintOS.cast.context = cast.framework.CastContext.getInstance();

    TintOS.cast.context.setOptions({
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
        receiverApplicationId: (TintOS.options.cast)?"A66E7114":chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    });
    
    was nulled
    let playerManager = cast.framework.CastReceiverContext.getInstance().getPlayerManager();
    playerManager.addSupportedMediaCommands(cast.framework.messages.Command.STREAM_TRANSFER, true);
    receiverApplicationId: "A66E7114" chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    
    castContext.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, function(event){
    	TintOS.cast.go();
    });
};

TintOS.cast.go = function(add){
	//if(TintOS.options.cast){return TintOS.cast.load(add)};
	if(add==undefined){add=Find("*[move='1']")[0].src};
	let session = TintOS.cast.context.getCurrentSession();
	session.loadMedia(new chrome.cast.media.LoadRequest(new chrome.cast.media.MediaInfo(add)));
};

TintOS.cast.load = function(SEL){
	if(SEL==undefined){SEL=Find("*[move='1']")};
	let session = TintOS.cast.context.getCurrentSession();
	session.sendMessage("urn:x-cast:com.google.cast.media",{contentId:SEL.map(function(x){return x.outerHTML}).join("")});
};
*/

if(navigator.serviceWorker){
	TintOS.workers.service = navigator.serviceWorker.controller;
	setTimeout(function(){TintOS.sw = TintOS.workers.service.postMessage},2000);
	window.navigator.serviceWorker.addEventListener("message",function(e){
		if(e.data.data){
			//TintOS.menu({view:e.data.data},{explore:true});
			if(e.data.data.constructor==Array){
				var list = {};
				e.data.data.map(function(x){list[x]=function(e){TintOS.workers.service.postMessage({data:[x]})}});
				TintOS.menu(list);
			}else{
				var Sel = Find("*[move='1']");
				if(Sel.length==0){Sel = [document.body]};
				Sel.map(function(s){Make("p",{},{},undefined,s).outerHTML=e.data.data;});
			};
		};
		if(e.data.files){
			["img","video","audio","misc"].map(function(x){
				if(e.data.files[x]){
					lambda(function(x,k,d){TintOS.createURL(x,k)},e.data.files[x]);
				};
			});
			Find("bookmarks[name='Shared Files']").removeNodes();
			TintOS.bookmarks(TintOS.objectURLs,{name:"Shared Files",protocol:"",move:"L"});
		};
		if(e.data.sharedText){
			if(e.data.sharedText.split("://").length==1){
				Make("paper",{move:0},{},e.data.sharedText)
			}else{
				let stb = Find("bookmarks[name='Shared Links']");
				if(stb.length==0){
					stb = [TintOS.bookmarks({},{name:"Shared Links",protocol:"",move:"L"})];
					stb[0].style.left="250px";
				};
				stb.map(function(x){Make("option",{move:"M",value:e.data.sharedText},{},e.data.sharedText.split("/").filter(function(x){return x!=""}).pop(),x.children[0])})
			}
		};
		if(e.data.alert){TintOS.alert(e.data.alert)};
		if(e.data.explore){TintOS.menu(e.data.explore,{explore:true});};
		if(e.data.update){setTimeout(function(){location.reload()},5000)};
		if(e.data.notify){
			//TintOS.menu(TintOS.util.parse(e.data.notify.data.actionList),{explore:true});
			if(e.data.notify.data.actionList){
				let actionData = TintOS.util.parse(e.data.notify.data.actionList)[e.data.notify.action];
				switch(actionData.constructor){
					case Function:actionData(e.data.notify);break;
					case Object:TintOS.menu(actionData,e.data.notify.data.opt);break;
					case String:TintOS.alert(actionData,e.data.notify.data.opt);break;
				};
			};
		};
	});
};

TintOS.startupRoutine = function(e){
	
	let defaultLoad = undefined;
	if(Params.load != undefined){
		defaultLoad = Params.load;
		TintOS.autoSave = function(){};
		Make("a",{style:"right:0px;bottom:0px;z-index:999999999",href:"https://tints-tech.com/TintOS",target:"_blank",move:"L"},{},"Tint OS");
	}else{
		try{defaultLoad = TintOS.data("autosave");}catch(e){};
		//defaultLoad=TintOS.data({"autosave":""});
	};
	if(defaultLoad == undefined){
		
		//setTimeout(function(){Make("script",{src:"template/resume.js"});},1000);
		
		Make("import",{src:"template/styles.html"});
		Make("import",{src:"template/IntroGame.html"});
		setTimeout(function(){
			//Make("video",{move:0,style:"width:150px;filter:blur(5px) invert(1)",src:"video/Intro.mp4"},{},"Upgrade your device, this ain't 1999",TintOS.game({},{parent:Find("book")[0]})).play();
			TintOS.alert({"Welcome to Tint OS<br>Press Menu - Options - Clear Screen":function(e){TTS("A place to create your online world")}},{delay:10});
			//TintOS.alert("By using tints-tech.com, You acknowledge that you have read and agreed to these <a href='terms.html'>User Agreements</a>",{to:"top:initial;bottom:10%;left:10%;width:80%",from:"top:100%",auto:false});
			TintOS.util.menuCrawl(["|||","Options","Add","Game Area","Top","|||","Sandbox","Ball"]);
			Find("ball").set({style:"background:orange;font:xx-large cursive"},{click:function(e){TintOS.menu({
				//"ChatPlus":"https://tints-tech.com/TintOS/main.html?load=ChatPlus&import=template%2FChatPlus.html",
				//"Early Learning":"https://tints-tech.com/TintOS/main.html?load=Early_Learning&import=template%2FEarlyLearning.html",
				//"TP":"https://tints-tech.com/TintOS/main.html?load=TP&import=template%2FTP.html",
				"/learn":"https://tints-tech.com/learn",
				"/Tint":"https://tints-tech.com/Tint",
				"/vote":"https://tints-tech.com/vote",
				"/with":"https://tints-tech.com/with",
				"Taught Me":"https://tints-tech.com/TintOS/?load=TaughtMe&script=TintOS.paint%28%7B%7D%2C%7Bsrc%3A%22image%2FTaughtMeTemplate.png%22%7D%29",
				"Love Hate":"https://tints-tech.com/TintOS/main.html?load=CYFILoveHate&script=TintOS.paint%28%7B%7D%2C%7Bsrc%3A%22image%2FCYFILoveHate.png%22%7D%29",
				"Edit Our Icon":"https://tints-tech.com/TintOS/main.html?load=EditOurIcon&script=TintOS.paint%28%7B%7D%2C%7Bsrc%3A%22image%2Ficon512.png%22%7D%29",
				"Tint's Tech - fb":"https://www.facebook.com/TintsTech/",
				"Tint OS - FB":"https://www.facebook.com/TintedOS/",
				"Tint - FB":"https://www.facebook.com/IamTINTED/",
				"The Lyrics & The Story":"https://youtube.com/playlist?list=PL5yjapS_gn3lo9oByh15WFAgvlCGvyW_D",
				"Tiger Crawl by TINTED":"https://youtube.com/playlist?list=PL5yjapS_gn3nOhjpyPfp_Tn1XYieUrUVk",
				"Unforgettable Dreams":"https://youtube.com/playlist?list=PL5yjapS_gn3l9cDXpYj6L7gF0OSDcaK_b"
			},{lambda:function(x){return window.open(x)}})}},"fun");
			Find("video").set({},{click:function(e){TintOS.menu({
				"Tutorial":"https://youtube.com/embed/wIDiWpi09qA",
				"Alone with Me":"https://youtube.com/embed/vEUN_TZA5wc",
				"Dark Place":"https://youtube.com/embed/LGzZYyKuSgs"
			},{lambda:function(x){return TintOS.browser({},{src:x})}})}});
			setTimeout(function(){Find("video").map(function(x){x.controls=false;x.play()})},3000);
		},3000);
		
		//Make("import",{src:"template/styles.html"},{},"",Find("game")[0]);
		/*
		Make("paper",{move:0},{},"PAPER",Make("folder",{},{},"FOLDER",Make("desk",{move:0,contentEditable:true,style:"z-index:10"},{},"DESK",Make("room",{move:0}))));
		TintOS.paint({},{move:0,parent:Find("room")[0]});
		//TintOS.profile({},{parent:Find("desk")[0]});
		TintOS.browser({},{move:0,src:"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTintedOS&tabs=timeline&width=326&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId",parent:Find("folder")[0]});
		*/
		//Make("paper",{move:0,style:"z-index:10;height:300px;width:250px"},{},"Welcome to the <b style='color:orange'>Tint OS</b> beta <br> Create, Customize, Play. <br><br> Design your own webpages for all the stuff you love online. Share your creations with friends and even turn them into a website or app. Be patient as you learn and as Tint OS grows. <br><br> Select, drag, and resize anything with a touch. Use Mode and Menu to customize the page. Selected items will be targeted for customizing, creating, and saving. More tutorials and information can be accessed through Menu - Options - Info. <br><br> Enjoy <b class='close'>X</b><br><br><b>Tint OS \&copy 2017 <a href='https://www.linkedin.com/in/tinted' target='_blank'> Robert_Rose</a></b>",Find("game")[0]);
		
		//Make("a",{move:"L",href:"https://docs.google.com/document/d/1EywO4Tl_vgQWLDK0HbuwEMmKbJ7nMCRQZKYhgDktnSk/edit?usp=drivesdk"},{},"Tutorial");
	}else{
		Make("p").outerHTML = defaultLoad;
	};
	if(Find("template[name='profile']").length==0){Make("template",{move:"L",name:"profile"});};
	Find("message,menu,alert,bookmarks[name='Shared Files']").removeNodes();
	if(Params.append != undefined){Make("p").outerHTML = Params.append};
	if(Params.import != undefined){Make("p").outerHTML = GetFile(Params.import)};
	Find("import").map(function(x){
		try{
		if(!x.hasAttribute("src")){return};
		let type = x.hasAttribute("type")?x.getAttribute("type"):"html",
		src = x.getAttribute("src").split(",");
		switch(type){
			default:src.map(function(y){Make(type,{"src":y,controls:true}).insertBefore(x)});[x].removeNodes();break;
			case "html":x.outerHTML=src.map(function(y){return GetFile(y)}).join("");break;
		}}catch(err){}
	});
	if(Params.chat != undefined){
		setTimeout(function(){
			if(Find("chat").length==0){TintOS.chat();}
		},1000);
		setTimeout(function(){
			//Make("paper",{},{},);
			let chat = Find("chat").pop();
			Find("button[move='M']",undefined,chat)[0].click();
			//Find("menu>button")[0].click();
			TintOS.util.menuCrawl(["Join Lobby"]);
			setTimeout(function(){
				Find("message>textarea").pop().value = Params.chat;
				//TintOS.util.menuCrawl(["Connect"],{parent:chat});
			},500);
			//Find("message>div>button")[0].click();
		},2000);
	}else{
		setTimeout(function(){
			Find("chat[join]").map(function(c){
				Find("button[move='M']",undefined,c)[0].click();
				setTimeout(function(){
					TintOS.util.menuCrawl(["Join Lobby"],{parent:c});
					setTimeout(function(){
						Find("message>textarea",undefined,c).pop().value = c.getAttribute("join");
						TintOS.util.menuCrawl(["Connect"],{parent:c});
					},500);
				},500)
			});
		},1000);
		setTimeout(function(){
			Find("chat[auto]").map(function(c){
				if(c.RTC.connectionState=="new"){Find("button[move='M']",undefined,c)[0].click();setTimeout(function(){TintOS.util.menuCrawl(["Open Lobby"],{parent:c})},500)};
			});
		},5000);
	};
	if(Params.shareUrl != undefined){
		let BM = Find("bookmarks");
		if(BM.length==0){BM = [TintOS.bookmarks({},{move:"L"})]};
		BM.map(function(B){
			Make("option",{value:Params.shareUrl},{},Params.shareTitle,B.children[0]);
		});
		if(Params.shareText != undefined){Make("paper",{move:0},{},Params.shareText);}
	}else if(Params.shareText != undefined){
		Make("paper",{move:0},{},((Params.shareTitle != undefined)?"<b>"+Params.shareTitle+"</b><br>":"")+"<p>"+Params.shareText+"</p>");
	};
	if(Params.script != undefined){Make(["script"],{},{},Params.script).removeNodes()};
	
	if(TintOS.options.mainMenu){Make("button",{move:"M",class:"mainMenu"},{click:TintOS.mainMenu},"Menu");};
	if(TintOS.options.modeControl){TintOS.modeControl()};
	if(TintOS.options.voiceCommand){Make("button",{move:"M",class:"mainMenu",style:"left:20%;width:10%;max-width:50px;font-family:chicago;z-index:999999999"},{click:function(){TintOS.voiceCommand()}},"&#402")};
	if(TintOS.options.fullScreen){Make("button",{move:"M",class:"mainMenu",style:"top:5%;bottom:initial;right:5%;width:10%;max-width:50px;z-index:999999999"},{click:function(){TintOS.fullScreen(Find("*[move='1']")[0])}},"&#9974")};
	if(TintOS.options.apps){Make("button",{move:"M",class:"mainMenu",style:"right:20%;width:10%;max-width:50px;"},{click:function(e){
		let Selected = Find("*[move='1']");
		if(Selected.length==0){Selected = [document.body]};
		var AppSet = function(e){return Selected.map(function(x){TintOS[e.target.innerHTML.toLowerCase()]({},{parent:x}).style.zIndex = TintOS.zTop++});};
		TintOS.menu({
			Book:AppSet,
			Bookmarks:AppSet,
			Brain:AppSet,
			Browser:AppSet,
			Capture:AppSet,
			Chat:AppSet,
			Console:AppSet,
			Database:AppSet,
			Game:AppSet,
			Media:AppSet,
			Paint:AppSet,
			Profile:AppSet,
			Remote:AppSet,
			Scene:AppSet,
			Studio:AppSet,
			Synth:AppSet,
			Camera:function(e){
				var CAM = function(F,Q){
					let params = {advanced:[{facingMode:F}]};
					if(Q!=""){Q=Q.split(",");params.width=Q[0];params.height=Q[1]};
					TintOS.userMedia({video:params})
				};
				TintOS.message({Front:function(e){CAM("user",e.input.value)},Back:function(e){CAM("environment",e.input.value)}},{message:"Camera and Quality",placeholder:"Custom Quality: Width,Height"});
			},
			Microphone:function(e){TintOS.userMedia({video:false,callback:function(stream){Make("audio",{move:"0",/*src:TintOS.createURL(stream),*/autoplay:true,controls:true}).srcObject = stream}})},
			Screen:(navigator.mediaDevices.getDisplayMedia)?function(){
				navigator.mediaDevices.getDisplayMedia().then(function(s){
					Make("video",{},{},"",Selected).map(function(x){x.srcObject=s;x.play()});
				}).catch(TintOS.alert);
			}:undefined,
			Template:function(e){TintOS.util.visualSelect({title:"Load Template",targets:Find("template"),action:function(t){Selected.map(function(x){Make("p",{},{},"",x).outerHTML = t.innerHTML})}})},
			Embed:function(e){TintOS.message({Embed:function(e){
				Selected.map(function(x){Make("p",{},{},"",x).outerHTML = e.input.value});
			}},{message:"Embed",placeholder:"Put code here..."})}
			//Mirror:function(e){navigator.getUserMedia({video:{"mandatory":{"chromeMediaSource":"screen"}},audio:false},function(stream){Make("video",{move:"0",src:TintOS.createURL(stream),autoplay:true,controls:true})},function(){})}
		},{message:"Apps",input:"none"})
	}},"&#8704")};
	
	Make("img",{class:"menuToggle",move:"B",src:"https://tints-tech.com/TintOS/image/icon512.png"},{click:function(e){
		Find("body>*[move='M']").map(function(x){
			if(x.className == "adsbygoogle"){return};
			if(x.style.display == "none"){
				setTimeout(t=>x.style.display = "",1000);
				e.target.style.cssText="";
			}else{
				x.style.display = "none";
				e.target.style.cssText="right:44%;width:50px;transform:none";
			};
		});
	},"dblclick":function(e){
		Find(".menuToggle>*",undefined,e.target).set({},{},undefined,document.body);
		e.target.style.width="512px";
	}});
	
	Find("profile>script").map(function(x){return Make("script",{},{},x.innerHTML)}).removeNodes();
	Find("script[src]",undefined,document.body).map(function(x){setTimeout(function(){Make("script",{"src":x.src},{},x.innerHTML,document.head)},1000)});
	Find("head").map(function(h){lambda(function(x,k,d){Make("meta",{name:k,content:x},{},"",h)},TintOS.metaData)});
	Find("*[move='1']").set({move:0});
	try{Find("*[move='0'],*[move='L']").sortBy(function(x){return Number(x.style.zIndex)}).map(function(x){x.style.zIndex = TintOS.zTop++});}catch(err){};
	
	TintOS.util.canvasSRC();
	
	if(TintOS.options.terms){
		if(TintOS.data("acceptedPolicies")){
			
		}else{
			policyAlert = TintOS.alert("By using tints-tech.com, You acknowledge that you have read and agreed to these and all other amended <a move='M' style='position:relative' href='https://tints-tech.com/TintOS/terms.html' onClick='window.onbeforeunload=String()'>Policies</a><br /><button style='font-size:50px;color:green' move='M' onClick='TintOS.data({acceptedPolicies:(new Date())});[policyAlert].removeNodes()'>I ACCEPT</button><button style='font-size:50px;color:red' move='M' onClick='history.back()'>BACK OUT</button>",{to:"top:40%;bottom:10%;left:10%;width:80%;border-radius:0%;box-shadow:0px -50px 50px orange;",from:"top:-50%;border-radius:50%;",delay:9999999999});
		};
	};
	Make("a",{href:"https://tints-tech.com/TintOS/terms.html",move:"L",style:"bottom:0px;left:0px;z-index:999999999","Accepted":TintOS.data("acceptedPolicies")},{},"Policies");
	Find("body>a[href='https://tints-tech.com/TintOS/terms.html']").slice(TintOS.options.terms?1:0).removeNodes();
	
	if(Find("index").length==0){
		TintOS.index({
			"Home":function(e){},
			"Tutorial":function(e){TintOS.browser({},{src:"https://docs.google.com/document/d/1EywO4Tl_vgQWLDK0HbuwEMmKbJ7nMCRQZKYhgDktnSk?usp=sf_link"}).style.zIndex=TintOS.zTop++},
			"About":function(e){window.open("https://tints-tech.com/about","_blank")},
			"Social":{
				"Tint":function(e){TintOS.browser({},{src:"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIamTINTED%2F&tabs=timeline"}).style.zIndex=TintOS.zTop++},
				"Tint OS":function(e){TintOS.browser({},{src:"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTintedOS%2F&tabs=timeline"}).style.zIndex=TintOS.zTop++},
				"Tint's Tech":function(e){TintOS.browser({},{src:"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftintstech%2F&tabs=timeline"}).style.zIndex=TintOS.zTop++}
			},
			"Mods":{
				"RandomBG":function(e){document.body.style.backgroundColor = "rgb("+range(255).random(3).join(",")+")"},
				"Edit Icon":function(e){TintOS.paint({},{src:"https://tints-tech.com/TintOS/image/icon512.png"})},
				"Flip Body":function(e){document.body.style.cssText = (document.body.style.cssText=="")?"transition:2s;transform:rotate"+["X","Y","Z"].random()+"(180deg);":""},
				"Cover All":function(e){Make("glass",{move:"M",style:"background:"+["black","white","orange"].random()+";z-index:9999999999"})},
				"Edit Any":function(e){TintOS.paint({},{src:window.prompt("URL","https://tints-tech.com/TintOS/image/"+["TintFaceLogo.png","TaughtMeTemplate.png","TintsTechIcon512.png"].random())})},
				"Colorful":function(e){Find("*").map(x=>x.style.backgroundColor = (x.style.backgroundColor=="")?"rgba("+range(255).random(3).join(",")+","+Math.random()+")":"")}
			},"Contact":function(e){TintOS.browser({},{src:"https://docs.google.com/forms/d/e/1FAIpQLSfC2XQVpgnO5E8vjKLTFoQb64yVreQjJE8hU2iqCIIk1_YSuw/viewform?usp=sf_link"}).style.zIndex=TintOS.zTop++},
		});
	};
	
	TintOS.util.handleHash();
	
	// Google Ads
	// setTimeout(x=>Make("script",{async:true,crossorigin:"anonymous","data-ad-client":"ca-pub-8435459290711322",src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"},{},"",document.head),1000);
	// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8435459290711322" crossorigin="anonymous"></script>
	
	//TintOS.RTC();
	
	// Chrome Cast Services are suspended until more work is done to properly integrate
	if(false && TintOS.options.cast){
		
		if(Find("cast-media-player").length==0){Make("cast-media-player",{move:"M"});};
		
		TintOS.cast.receiver = {"context":cast.framework.CastReceiverContext.getInstance()};
		TintOS.cast.receiver.player = TintOS.cast.receiver.context.getPlayerManager();
		
		//TintOS.cast.receiver.messages = TintOS.cast.receiver.player.getCastMessageBus("urn:x-cast:com.google.cast.media");
		
		/*TintOS.cast.receiver.messages.onMessage(function(request){
			Make("p").outerHTML = request.media.contentId
		});*/
		
		TintOS.cast.receiver.player.setMessageInterceptor(cast.framework.messages.MessageType.LOAD,function(R){
			if(!R.media.entity){R.media.entity = R.media.contentId};
			return thirdparty.fetchAssetAndAuth(R.media.entity,R.credentials).then(function(A){
				R.media.contentUrl = A.url;
				TintOS.browser({},{src:A.url,protocol:""}).style.zIndex = TintOS.zTop++;
				return R;
			})
		});
		
		TintOS.cast.receiver.context.start({maxInactivity:3600,touchScreenOptimizedApp:true});
	};
	
};

var policyAlert;

//Make("div",{},{},"",document.head).outerHTML = "<!-- Google tag (gtag.js) --><script async src='https://www.googletagmanager.com/gtag/js?id=G-WD33WPMSJ6'></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-WD33WPMSJ6');</script>";

window.addEventListener("beforeinstallprompt",function(e){e.prompt();TintOS.util.install=function(evt){e.prompt()}});

window.addEventListener("hashchange",function(){TintOS.util.handleHash()});

document.addEventListener("DOMContentLoaded", TintOS.startupRoutine);