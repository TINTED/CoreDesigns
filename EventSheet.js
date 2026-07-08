/*
This document is intellectual property of Robert Rose aka TINTED
© 2017-2020 Robert Rose
© Tints Tech LLC 2020-2022
*/

TintOS.eventSheet = {
	"a[href]":{"click":function(e){TintOS.browser({},{move:1,src:e.target.href}).style.zIndex = TintOS.zTop++}},
	".close":{"click":function(evt){
		var P = evt.target.parentNode;
		var LP = P.parentNode;
		//Find("video,audio",undefined,P).map(function(x){x.muted=true});
		//[P].set({},{},"",Make("template",{},{},"",TintOS.alert({"&#8634":function(e){[P].set({},{},"",LP);[e.target.parentNode].removeNodes()}},{from:"width:20px;top:45%;left:50%",to:("width:"+P.offsetWidth+"px;top:"+P.offsetTop+"px;left:"+P.offsetLeft+"px"),parent:P.parentNode})));
		TintOS.alert({"&#8634":function(e){[P].set({},{},"",LP);TintOS.delList.pop();[e.target.parentNode].removeNodes()}},{from:"width:20px;top:45%;left:50%",to:("width:"+P.offsetWidth+"px;top:"+P.offsetTop+"px;left:"+P.offsetLeft+"px"),parent:P.parentNode});
		[P].removeNodes();
		TintOS.delList.push(P);
	}},
	"glass":{"click":function(e){TintOS.menu({Break:function(evt){[e.target].removeNodes()}},{parent:e.target})}},
	".typeTimer":{"keydown":function(e){
		var tar = e.target;
		if(tar.value.length==1){
			clearTimeout(tar.timer);
			tar.timer=setTimeout(function(){
				let wpm = (tar.value.split(" ").length/5)+" WPM";
				TintOS.message({Keep:function(e){
					Make("button",{move:0},{},wpm);
				}},{message:wpm,value:tar.value});
				tar.placeholder=tar.value;
				tar.value="";
			},300000);
		};
	}},
	"body":{
		"keydown":function(e){
			switch(e.key){
				case "F11":TintOS.fullScreen();break;
				case "F12":TintOS.injectSpeech();break;
			};
			TintOS.key[e.key] = true;
		},
		"keyup":function(e){
			TintOS.key[e.key] = false;
		},
		"mousedown":function(e){
			if(!e.target.hasAttribute("move")){[e.target].set({move:0})};
			var move = e.target.getAttribute("move"), ctrl = (e.ctrlKey || TintOS.key.Control), alt = (e.altKey || TintOS.key.Alt), shift = (e.shiftKey || TintOS.key.Shift);
			if(!shift || move=="B"){switch(e.target.getAttribute("move")){case "1":case "0":case "B":Find('*[move="T"]').set({move:"0"},{},undefined,e.target);};};
			switch(e.target.getAttribute("move")){
				case "1":e.target.setAttribute("move","0");break;
				case "0":e.target.setAttribute("move","1");e.target.style.zIndex=++TintOS.zTop;break;
				case "B":Find('*[move="1"]').set({'move':'0'});case "M":case "T":return;break;
			};
			//if(e.target.getAttribute('move')=="M"){return};
			//Find("*[move='T']").each(function(x,i,a){e.target.appendChild(x);x.setAttribute("move","0");i*=5;x.style.top=i;x.style.left=i});
			//if(e.target.getAttribute('move')=="B"){TintOS.select("body");return};
			if(ctrl){
				if(alt){
					TintOS.delList.push(e.target);
					[e.target].removeNodes()
				}else if(shift){
					if(e.target.getAttribute('move')=='L'){e.target.setAttribute('move','1')}else{e.target.setAttribute('move','L')};return;
				}else if(e.target.getAttribute("move")=="1"){
					//[e.target].set({'move':'0'});return;
					Make("div",{},{},"",e.target.parentNode).outerHTML=e.target.outerHTML;
				};
			}else{
				if(alt){
					e.target.toggleAttribute("contentEditable");
					//e.target.contentEditable=(e.target.isContentEditable)?false:true;return;
				}else if(shift){
					e.target.setAttribute('move',((e.target.getAttribute("move")=="T")?"1":"T"));return;
				}else{
					//Find('*[move="1"]').map(function(x){x.setAttribute('move','0')});
				};
			};
			if(e.target.getAttribute('move')=='L'){return};
			//e.target.setAttribute('move',(e.target.getAttribute("move")=="1"?0:1));
			TintOS.SEL=Find('*[move="1"]').map(function(x){x.pos=[e.clientX-x.offsetLeft,e.clientY-x.offsetTop];return x});
		},
		"mousemove":function(e){
			TintOS.SEL.map(function(x){x.style.left=(Math.floor((e.clientX-x.pos[0])/TintOS.grid)*TintOS.grid)+"px";x.style.top=(Math.floor((e.clientY-x.pos[1])/TintOS.grid)*TintOS.grid)+"px"})
		},
		"mouseup":function(e){
			TintOS.SEL=[];
			TintOS.autoSave(e);
			let ms = e.target.getAttribute("move");
			if(TintOS.options.proportional && ms=="1"){TintOS.util.proportional([e.target])};
		},
		/*
		"mousedown":function(e){
			TintOS.touch.active = true;
			//if(e.target.getAttribute("move")=="1"){e.target.setAttribute("move",0);TintOS.touch.targets.push(e.target)};
			//TintOS.touch.targets = [e];
			TintOS.SEL = [e];
			//TintOS.SEL = TintOS.touch.targets.map(function(x){e.target=x;return e});
			e.touches = TintOS.SEL;
			TintOS.eventSheet.body.touchstart(e);
			TintOS.touch.targets = Find("*[move='1']");
		},
		"mousemove":function(e){if(TintOS.touch.active == true){
			//var p=[e.target.pos[0]/e.target.offsetWidth,e.target.pos[1]/e.target.offsetHeight];
			//var p = [e.target.clientX-e.target.offsetLeft,e.target.clientY-e.target.offsetTop];
			TintOS.SEL = TintOS.touch.targets.map(function(x){
				let E = lambda(undefined,e);
				E.target=x;
				//E.clientX=(e.clientX-(e.target.offsetLeft-x.offsetLeft));
				//E.clientY=(e.clientY-(e.target.offsetTop-x.offsetTop));
				//E.clientX=(x.offsetLeft+(x.offsetWidth*p[0]));
				//E.clientY=(x.offsetTop+(x.offsetHeight*p[1]));
				//E.clientX=Number(x.offsetLeft);
				//E.clientY=Number(x.offsetTop);
				return E
			});
			e.touches = TintOS.SEL;
			TintOS.eventSheet.body.touchmove(e)
		}},
		"mouseup":function(e){
			TintOS.touch.active = false;
			TintOS.SEL = TintOS.touch.targets.map(function(x){e.target=x;return e});
			e.touches = TintOS.SEL.copy();
			TintOS.SEL=[];
			TintOS.eventSheet.body.touchend(e);
			TintOS.touch.targets=Find("*[move='1']");},
		*/
		"touchstart":function(e){
			lambda(function(x,k,d){return x},e.touches,Array).map(function(x,k,d){
				switch(x.target.getAttribute("move")){
					case "1":if(d.length==1){x.target.setAttribute("move","0")};break;
					case "0":x.target.setAttribute("move","1");x.target.style.zIndex=++TintOS.zTop;break;
					case "B":Find('*[move="1"]').set({'move':'0'});case "M":case "T":return;break;
				};
				var ctrl = (e.ctrlKey || TintOS.key.Control), alt = (e.altKey || TintOS.key.Alt), shift = (e.shiftKey || TintOS.key.Shift);
				if(ctrl){
					if(alt){
						TintOS.delList.push(x.target);
						[x.target].removeNodes();
					}else if(shift){
						if(x.target.getAttribute('move')=='L'){x.target.setAttribute('move','1')}else{x.target.setAttribute('move','L')};return;
					}else{
						Make("div",{},{},"",x.target.parentNode).outerHTML=x.target.outerHTML;
					};
				}else{
					if(alt){
						x.target.contentEditable=(x.target.isContentEditable)?false:true;return;
					}else if(shift){
						x.target.setAttribute('move',((x.target.getAttribute("move")=="T")?"1":"T"));return;
					}else{
						//Find('*[move="1"]').map(function(x){x.setAttribute('move','0')});
					};
				};
				let pos = [x.clientX-x.target.offsetLeft,x.clientY-x.target.offsetTop];
				let offset = TintOS.util.offsetCrawl(x.target);
				let RW = ((x.clientX-offset.left)>(x.target.offsetWidth*TintOS.RF)), RH = ((x.clientY-offset.top)>(x.target.offsetHeight*TintOS.RF));
				if(RW || RH){return};
				x.target.pos=pos;
			});
			switch(e.touches[0].target.getAttribute("move")){case "1":case "0":case "B":Find('*[move="T"]').set({move:"0"},{},undefined,e.touches[0].target);};
		},
		"touchmove": function(e){
			lambda(undefined,e.touches,Array).map(function(x){
				switch(x.target.getAttribute("move")){
					case "0":return;x.target.setAttribute("move","1");break;
					case "B":case "L":case "T":case "M":return;break;
				};
				let offset = TintOS.util.offsetCrawl(x.target);
				let RW = ((x.clientX-offset.left)>(x.target.offsetWidth*TintOS.RF)), RH = ((x.clientY-offset.top)>(x.target.offsetHeight*TintOS.RF));
				if(RW || RH){
					if(RW){
						x.target.style.width=(x.clientX-offset.left-10)+"px";
					}; 
					if(RH){
						x.target.style.height=(x.clientY-offset.top-10)+"px";
					};
				}else{
					let nC = [(x.clientX-x.target.pos[0]),(x.clientY-x.target.pos[1])]
					x.target.style.left=(nC[0]-nC[0]%TintOS.grid)+"px";
					x.target.style.top=(nC[1]-nC[1]%TintOS.grid)+"px";
				}
			})
		},
		"touchend":function(e){
			TintOS.autoSave();
			let ms = e.target.getAttribute("move");
			if(TintOS.options.proportional && ms=="1"){TintOS.util.proportional([e.target])};
		},
		"dblclick":function(e){
			let tar = e.target;
			while(tar.getAttribute("move")=="L" || tar.getAttribute("move")=="M"){
				tar=tar.parentNode
			};
			switch(tar.getAttribute("move")){
				case "1":tar.setAttribute("move",0);break;
				case "0":tar.setAttribute("move",1);break;
				case "B":Find("*[move='0']",undefined,tar).set({move:1});break;
				case "M":;break;
			};
		}
	},
////// Paint
	"paint":{touchmove:function(e){
			
		}},
	"paint>img,paint>video,paint>canvas":{dblclick:function(e){
		Find("canvas",undefined,e.target.parentNode).map(function(c){
			if(c.ctx){}else{c.ctx=c.getContext("2d",{willReadFrequently:true})};
			if(c.history){}else{c.history=[]};
			c.history.push(c.ctx.getImageData(0,0,c.width,c.height));
			if(c.history.length > 20){c.history.shift()};
			c.ctx.drawImage(e.target,(e.target.offsetLeft - c.offsetLeft),(e.target.offsetTop - c.offsetTop),e.target.offsetWidth,e.target.offsetHeight);
			if(c.meta.sel.active){
				var img = c.ctx.getImageData(0,0,c.width,c.height);
				c.meta.sel.mat.map(function(y,j){
					if(!y){
						for(let i=(j*4);i<(j*4+4);i++){
							img.data[i] = c.meta.image.data[i];
						}
					};
				});
				c.ctx.putImageData(img,0,0);
			};
		});
	}},
	"paint>button[move='M']":{
		click:function(e){
			var P = e.target.parentNode;
			var mapC = function(F){return Find("canvas",undefined,P).map(F)};
			mapC(function(c){if(c.ctx){}else{c.ctx=c.getContext("2d",{willReadFrequently:true});}});
			
			TintOS.menu({
				"Set...":{
					"Style":function(e){
						var M = Make("p",{style:"margin:0px;box-align:center",move:"0"}),
						makeBox = function(){return Make("a",{style:"position:relative;display:block;left:10%;width:80%",move:"M"},{},"",M)};
						lambda(function(x,k,d){
							let D = makeBox();
							Make("b",{class:"close",style:"position:relative;display:inline;color:#aa0000",move:"M"},{},"X",D);
							Make("b",{style:"position:relative;display:inline",move:"M"},{},"  "+k+":",D);
							var S = Make("select",{style:"position:relative;display:inline",name:k,move:"M"},{},"",D);
							var sel = P.getAttribute(k);
							x.map(function(x){
								let atts = (x==sel?{selected:1}:{});
								if(k=="font"){atts.style="font-family:"+x};
								Make("option",atts,{},x,S);
							});
						},{
							mode:["hand","pen","line","box","circle","erase","text","fill","eyedropper","select-auto","select-rect","select-color"],
							size:range(1,100),
							path:["stroke","fill"],
							shape:["round","square"],
							GCO:["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","xor"],
							font:TintOS.fonts,
							//font:["chicago","arial","comic sans ms","courier","cursive","fantasy","georgia","impact","marlett","monospace","symbol","tahoma","Webdings","Wingdings"],
							textAlign:["start","end","left","center","right"],
							textBaseline:["bottom","top","middle","alphabetic","hanging","ideographic"]
						});
						let D = makeBox();
						Make("b",{class:"close",style:"position:relative;display:inline;color:#aa0000",move:"M"},{},"X",D);
						Make("b",{style:"position:relative;display:inline",move:"M"},{},"  color:",D);
						Make("input",{type:"color",name:"color",style:"position:relative",value:P.getAttribute("color"),move:"M"},{},"",D);
						D = makeBox();
						Make("b",{class:"close",style:"position:relative;display:inline;color:#aa0000",move:"M"},{},"X",D);
						Make("b",{style:"position:relative;display:inline",move:"M"},{},"  opacity:",D);
						Make("input",{type:"range",name:"opacity",style:"position:relative",value:P.getAttribute("opacity"),move:"M",min:0,max:1,step:0.01},{},"",D);
						TintOS.message({"Set Style":function(e){
							Find("select,input",undefined,M).map(function(x){P.setAttribute(x.name,x.value)});
						}},{message:"Set Style",input:M,parent:P});
						Make("button",{move:"M",style:"position:absolute;top:10px;z-index:100000000"},{click:function(evt){
							Find("select[move='M']",undefined,P).map(function(pSet){
								Make("option",{value:Find("select,input",undefined,M).map(function(x){return (x.name + ":" + x.value)}).join(";")},{},Find("select[name='mode'],input[name='color']","value",M).join(","),pSet);
							});
						}},"Add to Presets",M.parentNode);
					},
					/*
					"Fill":{
						"Color":function(e){TintOS.menu({Set:function(e){P.setAttribute("fill",e.input.value)}},{parent:P,input:Make("input",{type:"color"})})},
						"Reset":function(e){P.removeAttribute("fill")}
					},
					*/
					"Text":function(e){TintOS.menu({
						"Set":function(e){[P].set({text:e.input.value,tHistory:(P.hasAttribute("tHistory")?P.getAttribute("tHistory"):" ")+";;"+e.input.value})},
						"History":P.hasAttribute("tHistory")?function(e){
							let hR=[], H = {};
							P.getAttribute("tHistory").split(";;").map(function(x){H[x]=function(e){[P].set({text:x})}});
							for(let h in H){hR.push(h)};
							P.setAttribute("tHistory",hR.join(";;"));
							H["Delete History"]={"Delete All?":function(e){P.removeAttribute("tHistory")}};
							TintOS.menu(H,{parent:P});
						}:undefined,
					},{placeholder:"Set Text",input:true,value:P.getAttribute("text"),parent:P})},
					"Filter":function(e){
						TintOS.message({Set:function(e){
							P.setAttribute("filter",e.input.value);
						}},{message:"Filter Options",value:P.getAttribute("filter"),parent:P,placeholder:TintOS.util.filter.join(" ")});
					},
					"Transform":function(e){mapC(function(x){
						TintOS.menu({
							"Set":function(e){let t=e.input.value.split(",").map(Number);x.ctx.setTransform(t[0],t[1],t[2],t[3],t[4],t[5]);P.setAttribute("transform",e.input.value);x.scale=[1,1]},
							"Clear":function(e){x.ctx.resetTransform();x.scale=[1,1]}
						},{input:true,value:P.getAttribute("transform"),placeholder:"H Scale,V Skew,H Skew,V Scale,H Trans, V Trans",parent:P});
					})},
					"Shadow":function(e){
						let inMenu = Make("p",{move:"B",style:"width:100%;height:80%;border:1px solid black"}),
							getShadow = function(i){
								return [(i.offsetLeft-(i.parentNode.offsetWidth/2))/2,(i.offsetTop-(i.parentNode.offsetHeight/2))/2,i.offsetHeight/4,i.value];
							},
							sInput = Make("input",{type:"color",style:"left:50%;top:50%;height:30px"},{},"",inMenu),
							sI = setInterval(function(){
								let sInput = Find("input[type='color']",undefined,inMenu)[0];
								sInput.style.boxShadow = getShadow(sInput).join("px ");
							},100);
						setTimeout(function(){
							if(P.hasAttribute("shadow")){
								let sh = P.getAttribute("shadow").split(";");
								if(sh.join("") != '0000'){
									with(Find("input[type='color']",undefined,inMenu)[0]){
										style.left = ((parentNode.offsetWidth/2)+(Number(sh[0])*2))+"px";
										style.top = ((parentNode.offsetHeight/2)+(Number(sh[1])*2))+"px";
										style.height = (sh[2]*4)+"px";
										value = sh[3];
									};
								};
							};
						},0001);
						TintOS.message({
							Set:function(e){
								let sInput = Find("input[type='color']",undefined,inMenu)[0];
								P.setAttribute("shadow",getShadow(sInput).join(";"));
								clearInterval(sI);
							},
							Clear:function(e){
								P.setAttribute("shadow","0;0;0;0");
								clearInterval(sI);
							}
						},{message:"Shadow Color, Offset, and Blur",input:inMenu,parent:P,cancel:false});
					},
					"Pattern":{
						"Image":function(e){TintOS.util.visualSelect({targets:Find("canvas,video,img"),multiple:false,action:function(x){
							mapC(function(c){
								c.patt = c.ctx.createPattern(x,"repeat");
							})
						}})},
						"Gradient":function(e){
							let cScale = Make("p",{move:"B",style:"border:1px solid black"});
							Make("input",{type:"color",style:"left:0%"},{},"",cScale);
							Make("input",{type:"color",style:"left:90%"},{},"",cScale);
							let angle = function(a,b){return Math.sqrt(Math.pow(a,2)+Math.pow(b,2))},
								Gradient = function(e){
									let cStops = Find("input",undefined,e.input).sortBy(function(x){return x.offsetLeft+x.offsetTop});
									mapC(function(c){
										let fl = cStops.items([0,-1]),
										dist = angle(fl[1].offsetLeft,fl[1].offsetTop),
										gr = (e.target.innerHTML=="Linear")?c.ctx.createLinearGradient(fl[0].offsetLeft,fl[0].offsetTop,fl[1].offsetLeft,fl[1].offsetTop):c.ctx.createRadialGradient(fl[0].offsetLeft+(fl[0].offsetWidth/2),fl[0].offsetTop+(fl[0].offsetHeight/2),angle(fl[0].offsetWidth,fl[0].offsetHeight)/2,fl[1].offsetLeft+(fl[1].offsetWidth/2),fl[1].offsetTop+(fl[1].offsetHeight/2),angle(fl[1].offsetWidth,fl[1].offsetHeight)/2);
										cStops.map(function(cs){
											gr.addColorStop(angle(cs.offsetLeft,cs.offsetTop)/dist,cs.value);
										});
										c.patt = gr;
									})
								};
							TintOS.message({
								Linear:Gradient,
								Radial:Gradient
							},{message:"Move, Copy, and Set Gradient",input:cScale,parent:P})
						},
						"Off":function(e){mapC(function(c){c.patt=undefined})}
					},
					//"Offset":{Set:P.offset,Save:function(e){P.setAttribute("offset",)}},
					"Size":function(e){TintOS.message({"Set":function(e){mapC(function(x){
						var size = e.input.value.split(",").map(Number),
						pic = Make("img",{src:x.toDataURL(),move:0},{},"",x.parentNode);
						x.width = size[0]; x.height = size[1];
						x.scale=undefined;
					})}},{message:"Set Size",placeholder:"width,height common:(360,240 - 480,360 - 720,480 - 1280,720 - 1920,1080 - 3840,2160 - 7680,4320)",parent:P})},
					"As Camera":function(e){
						TintOS.user.camera=Find("canvas",undefined,P)[0].captureStream();
						Find("video,audio",undefined,P).map(function(x){
							TintOS.user.camera.addTrack((x.srcObject==undefined?x.captureStream().getAudioTracks()[0]:x.srcObject.getAudioTracks()[0]))
						});
					},
				},
				"Undo":function(e){mapC(function(x){
					x.redo.push(x.ctx.getImageData(0,0,x.width,x.height));
					x.ctx.putImageData(x.history.pop(),0,0);
					TintOS.alert({Redo:function(e){
						if(x.redo.length>0){
							x.history.push(x.ctx.getImageData(0,0,x.width,x.height));
							x.ctx.putImageData(x.redo.pop(),0,0)
						}else{[e.target.parentNode].removeNodes()}
					}},{parent:P,delay:10,to:("top:"+(x.offsetTop-30)+"px;left:"+x.offsetLeft+"px")});
				})},
				"Save":function(e){mapC(function(x){
					TintOS.message({
						"Save":function(e){Make("img",{name:e.input.value,title:e.input.value,move:0,src:x.toDataURL()})},
						"Set as default":function(e){[x].set({src:x.toDataURL()})}
					},{message:"Save Image",placeholder:"Name of Image",parent:P})
				})},
				"Load":function(e){
					let firstTime = true;
					TintOS.load({parent:P,maxSize:999999999999999,accept:"image/*",callback:function(add){
						if(firstTime){Find("canvas",undefined,P).removeNodes();firstTime=false};
						//max-height:"+(document.body.offsetHeight)+"px;max-width:"+(document.body.offsetWidth-P.offsetWidth)+"px;
						Make("img",{style:"width:initial;height:initial;left:100%",src:add},{load:function(e){
							Make("canvas",{move:"L",width:e.target.offsetWidth,height:e.target.offsetHeight},{},undefined,P).getContext("2d",{willReadFrequently:true}).drawImage(e.target,0,0,e.target.offsetWidth,e.target.offsetHeight);
							[e.target].removeNodes();
							//delete e.target;
						}},"",P);
					}});
				},
				"Temp":{
					"Save":function(e){
						let newTemps = [];
						mapC(function(x){
							newTemps.push(x.ctx.getImageData(0,0,x.width,x.height));
						});
						if(!P.tempSaves){P.tempSaves = {}};
						P.tempSaves[String(new Date()).split(" ")[4]] = newTemps;
					},
					"Load":P.tempSaves?lambda(function(t,k){
						return function(e){
							mapC(function(x,i){
								x.history.push(x.ctx.getImageData(0,0,x.width,x.height));
								x.ctx.putImageData(t[i],0,0)
							});
						}
					},P.tempSaves):undefined,
					"Clear":P.tempSaves?{"Clear Temps":function(){P.tempSaves=undefined}}:undefined
				},
				"Record":function(e){TintOS.record({targets:Find("canvas",undefined,P)})},
				/*"Stamp Stream":function(e){
					Find("canvas",undefined,P).slice(0,1).map(function(c){
						if(c.stamps!=undefined){c.stamps.map(clearInterval)};
						c.stamps = Find("canvas,video,img",undefined,P).slice(1).map(function(m){
							return setInterval(async function(){
								c.getContext("2d").drawImage(m,(m.offsetLeft - c.offsetLeft),(m.offsetTop - c.offsetTop),m.offsetWidth,m.offsetHeight);
							},33);
						})
					});
				},*/
				//"Full Screen":function(e){mapC(function(x){x.requestFullscreen()})},
				"Selection...":{
					"Turn Off":function(e){mapC(function(x){x.meta.sel.active=false})},
					"Reset":function(e){mapC(function(x){x.meta.sel.mat.map(function(y,i,d){d[i]=false})})},
					"Invert":function(e){mapC(function(x){x.meta.sel.mat.map(function(y,i,d){d[i]=!y})})},
					"Thresholds":P.thresholds
				},
				"(Un)Fit Canvas":function(e){
					mapC(function(x){
						x.style.width="";
						x.style.height="";
						if(x.width==x.offsetWidth){
							x.style.maxWidth="";
							x.style.maxHeight="";
							x.style.left="";
							x.style.top="";
						}else{
							x.style.maxWidth="initial";
							x.style.maxHeight="initial";
						};
					});
				},
				"Edit Layout":{
					"Rotate":function(e){
						TintOS.message({Rotate:function(e){
							mapC(function(x){
								TintOS.imageEditer(x).rotate(4-e.input.value).set();
								x.history.push(x.ctx.getImageData(0,0,x.width,x.height));
								x.scale=undefined;
							})
						}},{message:"Clockwise Rotations",input:Make("input",{type:"range",min:1,max:3}),value:2,parent:P});
					},
					"Flip":{
						"Horizontal":function(e){
							mapC(function(x){
								TintOS.imageEditer(x).flip(true).set();
								x.history.push(x.ctx.getImageData(0,0,x.width,x.height));
								x.scale=undefined;
							})
						},
						"Vertical":function(e){
							mapC(function(x){
								TintOS.imageEditer(x).flip(false).set();
								x.history.push(x.ctx.getImageData(0,0,x.width,x.height));
								x.scale=undefined;
							})
						},
					},
				},
				"Clear":{
					"Clear Image":function(e){mapC(function(x){x.history.push(x.ctx.getImageData(0,0,x.width,x.height));x.ctx.clearRect(0-x.width,0-x.height,x.width*2,x.height*2)})}
				},
				"New Presets":function(e){
					let pSets = Find("select",undefined,P);
					if(pSets.length>0){
						Make("select",{},{},"",P).outerHTML = pSets[0].outerHTML;
					}else{
						Make("select",{move:"M"},{},"<option>Presets</option><option value='Options'>Options</option><option value='color:black'>Black</option><option value='color:white'>White</option><option value='color:red'>Red</option><option value='color:green'>Green</option><option value='color:blue'>Blue</option>",P);
					}
				}
			},{parent:P});
		}
	},
	"paint>select":{
		change:function(e){
			let P = e.target.parentNode,
				setAtts = function(A){A.split(";").map(function(x){x = x.split(":");P.setAttribute(x[0],x[1])})};
			switch(e.target.value){
				default:
					setAtts(e.target.value)				
				break;
				case "Options":
					TintOS.message({
						Edit:function(evt){
							TintOS.util.optEdit(e.target,{message:"Edit Presets",skip:2,parent:P})
						},
						"In Menu":function(evt){
							let mData = {};
							lambda(undefined,e.target,Array).slice(2).map(function(x){mData[x.innerHTML]=function(e){setAtts(x.value)}});
							TintOS.menu(mData,{parent:P,move:0});
						},
						"Rename":function(evt){TintOS.message({Change:function(evt){e.target[0].innerHTML=evt.input.value}},{message:"Rename Presets...",value:e.target[0].innerHTML})},
						"Copy":function(evt){Make("p",{},{},"",P).outerHTML=e.target.outerHTML},
						"Delete":{"Are You Sure?":function(evt){[e.target].removeNodes()}}
					},{message:"Options",input:"p",parent:P});
				break;
			};
			e.target.selectedIndex = 0;
		}
	},
	"paint>canvas":{
		"mousedown":function(e){TintOS.touch.active = true; e.touches = [e] ;TintOS.touch.targets = [e.target] ;TintOS.eventSheet["paint>canvas"].touchstart(e)},
		"mousemove":function(e){if(TintOS.touch.active == true){e.touches = [e]; e.touches[0].target = TintOS.touch.targets[0] ;TintOS.eventSheet["paint>canvas"].touchmove(e)}},
		"mouseup":function(e){TintOS.touch.active = false; e.touches = [e]; TintOS.touch.targets = [] ;TintOS.eventSheet["paint>canvas"].touchend(e)},
		touchstart:function(e){
			//e.target.ctx = e.target.getContext("2d");
			var P = e.target.parentNode;
			Find("canvas",undefined,P).map(function(x){
				var crawl = TintOS.util.offsetCrawl(x);
				var att = lambda(function(x,k,d){return P.getAttribute(k)},{mode:"",size:"",color:"",opacity:"",shape:"",GCO:"",filter:"",font:"",textAlign:"",textBaseline:"",text:""});
				if(x.ctx){}else{x.ctx=x.getContext("2d",{willReadFrequently:true})};
				lambda(function(x2,k,d){x.ctx[k] = att[x2]},{
					globalCompositeOperation:"GCO",globalAlpha:"opacity",
					strokeStyle:"color",fillStyle:"color",filter:"filter",
					lineWidth:"size",lineCap:"shape",lineJoin:"shape",
					textAlign:"textAlign",textBaseline:"textBaseline"
				});
				//if(P.hasAttribute("fill")){x.ctx.fillStyle = P.getAttribute("fill")};
				if(P.hasAttribute("shadow")){
					let sh = P.getAttribute("shadow").split(";");
					x.ctx.shadowOffsetX = Number(sh[0]);
					x.ctx.shadowOffsetY = Number(sh[1]);
					x.ctx.shadowBlur = Number(sh[2]);
					x.ctx.shadowColor = sh[3];
				};
				if(x.patt){x.ctx.strokeStyle=x.patt;x.ctx.fillStyle=x.patt};
				if(att.mode=="hand"){e.target.setAttribute("move",0);return};
				if(x.history==undefined){x.history=[]};
				x.history.push(x.ctx.getImageData(0,0,x.width,x.height));
				x.redo = [];
				if(x.history.length > 20){x.history.shift()};
				let C1 = e.touches[0].clientX - crawl.left ,
				C2 = e.touches[0].clientY - crawl.top;
				x.cPath = [];
				////// Scale Code
				if(x.scale==undefined){x.scale = [1,1]};x.ctx.scale(x.scale[0],x.scale[1]);
				x.scale = [Number(x.width/x.offsetWidth),Number(x.height/x.offsetHeight)];
				x.ctx.scale(x.scale[0],x.scale[1]);
				x.scale = [Number(x.offsetWidth/x.width),Number(x.offsetHeight/x.height)];				
				if(x.meta==undefined){
					x.meta={sel:{active:false,mat:[]}};
					if(P.thresholds==undefined){P.thresholds={"select":30}}
				};
				x.meta.image = x.history.items(-1);
				if(x.meta.sel.mat.length!=(x.meta.image.width*x.meta.image.height)){
					x.meta.sel.mat = new Uint8Array(x.meta.image.width*x.meta.image.height);
				};
				x.meta.index = ((Math.floor((C1)/(x.scale[0]))*4)+(Math.floor((C2)/(x.scale[1]))*x.meta.image.width*4));
				x.meta.color = x.meta.image.data.slice(x.meta.index,x.meta.index+4);
				switch(att.mode){
					case "pen":case "line":
						x.ctx.beginPath();
						x.ctx.moveTo( C1 , C2 );
						x.ctx.lineTo( C1 , C2 );
						x.cPath.push([C1,C2]);
					break;
					case "box":case "circle":
						x.cPath.push([C1,C2]);
					break;
					case "erase":
						x.ctx.clearRect((C1 - (att.size/2)), (C2 - (att.size/2)), att.size, att.size);
					break;
					case "text":
						x.ctx.font = att.size + "px " + att.font;
						x.ctx.fillText(att.text, C1, C2);
					break;
					case "eyedropper":
						P.setAttribute("color","rgba("+x.meta.color.slice(0,3)+","+(x.meta.color[3]/255)+")");
						Find("button[move='M']",undefined,P)[0].style.backgroundColor=P.getAttribute("color");
						//TintOS.message({},{value:P.getAttribute("color")});
					break;
					case "fill":
					case "select-auto":
						x.meta.sel.active = true;
						var iStack = [x.meta.index],
						colorCrawl = function(index){
							if(x.meta.sel.mat[index/4]||(index<0)||(index>=x.meta.image.data.length)){return};
							let diff = x.meta.image.data.slice(index,index+4).map(function(y,i){
								return Math.abs(y-x.meta.color[i])
							});
							if(Math.max(diff[0],diff[1],diff[2],diff[3])<P.thresholds.select){
								x.meta.sel.mat[index/4] = true;
								iStack.push(index-4);
								iStack.push(index+4);
								iStack.push(index-(x.meta.image.width*4));
								iStack.push(index+(x.meta.image.width*4));
							};
						};
						//colorCrawl(x.meta.index);
						while(iStack.length>0){
							colorCrawl(iStack.shift())
						};
					break;
					case "select-color":
						x.meta.sel.active = true;
						for(let i=0;i<x.meta.image.data.length;i+=4){
							let diff = x.meta.image.data.slice(i,i+3).map(function(y,j){
								return Math.abs(y-x.meta.color[j])
							});
							if(Math.max(diff[0],diff[1],diff[2])<P.thresholds.select){
								x.meta.sel.mat[i/4] = true;
							};
						};
					break;
				};
			});
		},
		touchmove:function(e){
			var P = e.target.parentNode;
			Find("canvas",undefined,P).map(function(x){
				var crawl = TintOS.util.offsetCrawl(x);
				var att = {mode:P.getAttribute("mode"),size:P.getAttribute("size"),text:P.getAttribute("text"),path:P.getAttribute("path")};
				let C1 = e.touches[0].clientX - crawl.left ,
				C2 = e.touches[0].clientY - crawl.top;
				switch(att.mode){
					case "hand":
						//x,.ctx.scale(Number([x.width/x.offsetWidth].check()[0]),Number(x.height/x.offsetHeight));
						//[,x.width,x.offsetWidth].check();
					break;
					case "line":
						x.ctx.beginPath();
						x.ctx.moveTo(x.cPath[0][0],x.cPath[0][1]);
					case "pen":
						x.ctx.putImageData(x.history.items(-1),0,0);
						x.ctx.lineTo( C1 , C2 );
						x.ctx[att.path]();
						x.cPath.push([C1,C2]);
					break;
					case "box":
						x.ctx.putImageData(x.history.items(-1),0,0);
						x.ctx.beginPath();
						x.ctx.rect(x.cPath[0][0],x.cPath[0][1],C1-x.cPath[0][0],C2-x.cPath[0][1]);
						x.ctx[P.getAttribute("path")]();
					break;
					case "circle":
						x.ctx.putImageData(x.history.items(-1),0,0);
						x.ctx.beginPath();
						x.ctx.arc(x.cPath[0][0],x.cPath[0][1],Math.sqrt(Math.pow(C1-x.cPath[0][0],2)+Math.pow(C2-x.cPath[0][1],2)),0,2*Math.PI);
						x.ctx[P.getAttribute("path")]();
					break;
					case "text":
						x.ctx.putImageData(x.history.items(-1),0,0);
						x.ctx.fillText(att.text, C1, C2);
					break;
					case "erase":
						x.ctx.clearRect((C1 - (att.size/2)), (C2 - (att.size/2)), att.size, att.size);
					break;
					case "select-rect":
						x.meta.endIndex = ((Math.floor((C1)/(x.scale[0]))*4)+(Math.floor((C2)/(x.scale[1]))*x.meta.image.width*4));
					break;
				};
			});
		},
		touchend:function(e){
			var P = e.target.parentNode;
			Find("canvas",undefined,P).map(function(x){
				switch(P.getAttribute("mode")){
					case "hand":
						e.target.setAttribute("move","L");
					break;
					case "line":
						x.cPath = [x.cPath[0],x.cPath[x.cPath.length-1]];
					case "pen":
						x.ctx.putImageData(x.history.items(-1),0,0);
						x.ctx.beginPath();
						x.ctx.moveTo(x.cPath[0][0],x.cPath[0][1]);
						x.cPath.map(function(cPath){x.ctx.lineTo(cPath[0],cPath[1])});
						x.ctx[P.getAttribute("path")]();
					break;
					case "select-rect":
						x.meta.sel.active = true;
						let xRange = [(x.meta.index%(x.meta.image.width*4)),(x.meta.endIndex%(x.meta.image.width*4))].sortBy().map(function(x){return x/4}),
						yRange = [Math.floor(x.meta.index/(x.meta.image.width*4)),Math.floor(x.meta.endIndex/(x.meta.image.width*4))].sortBy();
						for(let j=(yRange[0]*x.meta.image.width);j<=(yRange[1]*x.meta.image.width);j+=x.meta.image.width){
							for(let i=xRange[0];i<=xRange[1];i++){
								x.meta.sel.mat[i+j] = true;
							};
						};
					case "select-auto":
					case "select-color":
					case "fill":
						setTimeout(function(){
							if(P.getAttribute("mode")=="fill"){
								x.meta.sel.mat.map(function(y,i,d){d[i]=false});
								x.meta.sel.active = false;
							}else{
								TintOS.util.menuCrawl(["Menu","Undo"],{parent:P});
							};
						},1000);
						x.ctx.fillRect(0,0,x.width,x.height);
					break;
				};
				if(x.meta.sel.active){
					var img = x.ctx.getImageData(0,0,x.width,x.height);
					x.meta.sel.mat.map(function(y,j){
						if(!y){
							for(let i=(j*4);i<(j*4+4);i++){
								img.data[i] = x.meta.image.data[i];
							}
						};
					});
					x.ctx.putImageData(img,0,0);
				};
			});
		}
	},
////// Profile
	"profile>button":{
		click:function(e){
			var NS = e.target.nextSibling;
			TintOS.message({
				Set:function(e){NS.innerHTML=e.input.value}
			},{message:("Page "+e.target.innerHTML),value:NS.innerHTML,parent:e.target.parentNode.parentNode,move:0});
		},
	},
////// Book
	"book select[move='M']":{
		change:function(e){
			//lambda(function(x,k,d){console.log(k+" : "+x)},e.target);
			var P = e.target.parentNode;
			//TintOS.menu(e,{explore:true});
			switch(e.target.value){
				default:
					lambda(undefined,P.children,Array).slice(1).removeNodes();
					var shell = Make("shell",{},{},"",P);
					shell.outerHTML = e.target.getAttribute("scheme") + e.target.value;
					Find("message",undefined,P).removeNodes();
				break;
				case "Options":
					TintOS.message({
						"Add Page":function(evt){
							Make("option",{value:P.innerHTML.slice(e.target.outerHTML.length)},{},((evt.input.value=="")?(Find("option",undefined,e.target).length-1):evt.input.value),e.target);
							e.target.selectedIndex = e.target.length-1;
						},
						"Book Selected":function(evt){
							let SEL = Find("*[move='1']").filter(function(x){return x!=P});
							SEL.map(function(x){
								Make("option",{value:x.outerHTML},{},((x.name==undefined)?x.tagName:x.name),e.target);
							});
							SEL.removeNodes();
							e.target.selectedIndex = 0;
						},
						"Set Scheme":function(evt){
							[e.target].set({scheme:P.innerHTML.slice(e.target.outerHTML.length)});
							e.target.selectedIndex = 0;
						},
						Edit:function(evt){
							TintOS.util.optEdit(e.target,{message:"Edit Pages",skip:2,parent:P});
							e.target.selectedIndex = 0;
						},
						"Change Name":function(evt){
							[P].set({name:evt.input.value});
							Find("select>option",undefined,P)[0].innerHTML = evt.input.value;
							e.target.selectedIndex = 0;
						},
						Cancel:function(evt){e.target.selectedIndex = 0;}
					},{message:"Options",placeholder:"Name?",cancel:false,parent:P});
				break;
			};
		}
	},
	////// Bookmarks
	"bookmarks>select[name='bookmarks']":{
		change:function(e){
			//lambda(function(x,k,d){console.log(k+" : "+x)},e.target);
			var P = e.target.parentNode;
			switch(e.target.value){
				default:
					let URL = (((e.target.value.split("://").length>1)?"":e.target.getAttribute("protocol")) + e.target.value.split(" ").items(-1));
					if(e.target.getAttribute("target")=="browser"){TintOS.browser({},{parent:e.target.parentNode.parentNode,src:URL,node:e.target.getAttribute("node")})}
					else if(e.target.getAttribute("target")=="paint"){TintOS.paint({},{parent:e.target.parentNode.parentNode,src:URL,node:e.target.getAttribute("node")})}
					else{window.open(URL,e.target.getAttribute("target"))};
					e.target.selectedIndex=0;
				break;
				case "Options":
					TintOS.message({
						"Add Bookmark":function(evt){
							TintOS.message({
								"Save Bookmark":function(evt2){
									Make("option",{value:evt2.input.value},{},evt.input.value,e.target);
								}
							},{message:"Set Address",placeholder:"Address"})
						},
						"Set Protocol":function(evt){
							TintOS.message({
								Set:function(evt2){[e.target].set({protocol:evt2.input.value})}
							},{message:"Set Protocol",value:e.target.getAttribute("protocol"),placeholder:"https://, ftp://, file://"});
						},
						"Set Node":function(evt){
							TintOS.message({
								Set:function(evt2){[e.target].set({node:evt2.input.value})}
							},{message:"Set Node Type",value:e.target.getAttribute("node"),placeholder:"iframe, embed, webview"});
						},
						"Open in...":function(evt){
							TintOS.message({
								Set:function(evt2){[e.target].set({target:evt2.input.value})}
							},{message:"Open Links in...",value:e.target.getAttribute("target"),placeholder:"browser, paint, _blank, _self, same"});
						},
						"Edit":function(evt){
							TintOS.util.optEdit(e.target,{message:"Edit Bookmarks",skip:2,parent:P.parentNode})
						},
						"Change Name":function(evt){
							TintOS.message({"Set":function(evt){e.target.children[0].innerHTML = evt.input.value}},{"message":"Change Name","value":e.target.children[0].innerHTML});
						}
					},{message:"Options",placeholder:"Webpage Name?"});
				break;
			};
			e.target.selectedIndex = 0;
		}
	},
	////// Brain
	"brain>button[move='M']":{click:function(e){
		var P = e.target.parentNode;
		var data = function(x,N=P){return N.getAttribute(x)};
		let sett = function(e){TintOS.message({Set:function(evt){P.setAttribute(e.target.innerHTML,evt.input.value)}},{message:e.target.innerHTML,value:P.getAttribute(e.target.innerHTML),placeholder:({
			"input":"Array | JavaScript",
			"output":"Array | JavaScript",
			"type":"sequential | model(support in development)",
			"loss":"",
			"optimizer":""
		})[e.target.innerHTML]})};
		Find("model",undefined,P).filter(function(M){return M.model==undefined}).map(function(M){M.click();setTimeout(function(){TintOS.util.menuCrawl(["(CANCEL)"],{parent:Find("message")[0]})},1000)});
		TintOS.menu({
			"Add Layer":function(e){
				let layers = Find("layer",undefined,P);
				Make("layer",{type:"dense",units:1,move:0,style:"top:"+(layers.length*30)+"px"},{},"Layer "+(layers.length+1),P)
			},
			"Add Model":function(e){
				let models = Find("model",undefined,P);
				Make("model",{move:0,type:data("type"),loss:data("loss"),optimizer:data("optimizer"),batchSize:32,shuffle:false,validationSplit:1,style:"top:"+(models.length*50)+"px"},{},"Model "+(models.length+1),P);
			},
			"Options":{
				"Production Mode":{"Enable":function(){tf.enableProdMode()}},
				"Debug Mode":{"Enable":function(){tf.enableDebugMode()}},
				"Set Backend":function(e){
					let setBE = function(evt){tf.setBackend(evt.target.innerHTML)};
					TintOS.message({"webgl":setBE,"cpu":setBE},{"message":"Set Backed...","input":"output","value":"Currently is "+tf.getBackend()});
				},
				"Information":{
					"About TensorFlow":function(e){
						TintOS.bookmarks({
							"Official Website":"https://www.tensorflow.org",
							"JavaScript API":"https://js.tensorflow.org/api/latest",
							"Layer Creation":"https://js.tensorflow.org/api/latest/#layers.dense"
						},{"name":"TensorFlow","target":"_blank"});
					},
					"Explore tf":function(e){TintOS.menu(tf,{parent:P,explore:true})},
					"Memory":tf.memory()
				},
				"Clean Up":{"Delete Variables":function(){tf.disposeVariables()}}
				
			},
			"Settings":{
				"input":sett,
				"output":sett,
				"type":sett,
				"loss":sett,
				"optimizer":sett
			}
		},{parent:P});
	}},
	"brain layer":{click:function(e){
		//https://js.tensorflow.org/api/latest/#layers.dense
		var E = e.target;
		var P = E.parentNode,
			MBA = ["dtype","activation","name","trainable"],
			MBO = {},
			ph = {
				"bool":"true | false",
				"act":"elu | hardSigmoid | linear | relu | relu6 | selu | sigmoid | softmax | softplus | softsign | tanh",
				"init":"constant | glorotNormal | glorotUniform | heNormal | heUniform | identity | leCunNormal | leCunUniform | ones | orthogonal | randomNormal | randomUniform | truncatedNormal | varianceScaling | zeros",
				"const":"maxNorm | minMaxNorm | nonNeg | unitNorm"
			};
		var sett = function(e){TintOS.message({Set:function(evt){E.setAttribute(e.target.innerHTML,evt.input.value)}},{message:e.target.innerHTML,value:E.getAttribute(e.target.innerHTML),placeholder:({
			"type":"Basic: activation | dense | dropout | embedding | flatten | permute | repeatVector | reshape; Recurrent: gru | lstm | rnn | simpleRNN; Convolutional: conv1d | conv2d | conv2dTranspose | conv3d | cropping2D | depthwiseConv2d | separableConv2d | upSampling2d; Advanced Activation: elu | leakyReLU | prelu | reLU | softMax | thresholdedReLU; Merge: add | average | concatenate | dot | maximum | minimum | multiply",
			// Basic
			"units":"Positive Integer",
			"rate":"0...1",
			"n":"Positive Integer",
			"noiseShape":"Integer Array",
			"seed":"Integer",
			"dims":"Integer Array",
			"inputDim":"Integer > 0",
			"outputDim":"Integer >= 0",
			"name":"identifying string",
			"dtype":"float32 | int32 | bool | complex64 | string",
			"activation":ph.act,
			"useBias":ph.bool,
			"maskZero":ph.bool,
			"trainable":ph.bool,
			"kernelInitializer":ph.init,
			"biasInitializer":ph.init,
			"embeddingsInitializer":ph.init,
			"kernelConstraint":ph.const,
			"biasConstraint":ph.const,
			"embeddingsConstraint":ph.const,
			"kernelRegularizer":"l1l2",
			"biasRegularizer":"l1l2",
			"embeddingsRegularizer":"l1l2",
			"activityRegularizer":"l1l2",
			// Recurrent
			"recurrentActivation":ph.act,
			"recurrentInitialization":ph.init,
			"recurrentConstraint":ph.const,
			"recurrentRegularizer":"l1l2",
			"dropout":"0...1",
			"recurrentDropout":"0...1",
			"returnSequences":ph.bool,
			"returnState":ph.bool,
			"goBackwards":ph.bool,
			"stateful":ph.bool,
			"unroll":ph.bool,
			"unitForgetBias":ph.bool,
			// Convolutional
			"filters":"Number",
			"kernelSize":"Number | Array",
			"strides":"Number | Array",
			"padding":"valid | same | casual",
			"dataFormat":"channelsFirst | channelsLast",
			"dilationRate":"Number | [N,?N,?N]",
			"cropping":"Number | [N,N] | [[N,N],[N,N]]",
			"size":"Number Array",
			"depthMultiplier":"Number",
			"depthwiseInitializer":ph.init,
			"depthwiseConstraint":ph.const,
			"depthwiseRegularizer":"l1l2",
			"pointwiseInitializer":ph.init,
			"pointwiseConstraint":ph.const,
			"pointwiseRegularizer":"l1l2",
			// Advanced Activation
			"alpha":"0...1",
			"alphaInitializer":ph.init,
			"sharedAxes":"Number | Array",
			"maxValue":"0...1",
			"axis":"Integer",
			"theta":"0...1",
			// Merge
			"axes":"Number | [N,N]",
			"normalize":ph.bool
		})[e.target.innerHTML]})};
		switch(E.getAttribute("type")){
			// Basic + Recurrent
			case "lstm":
				MBA.unshift("unitForgetBias");
			case "gru":
			case "simpleRNN":
				MBA.unshift("recurrentActivation","recurrentInitialization","recurrentConstraint","recurrentRegularizer","dropout","recurrentDropout");
			case "rnn":
				MBA.unshift("returnSequences","returnState","goBackwards","stateful","unroll");
			case "dense":
				MBA.unshift("units","useBias","activityRegularizer","kernelInitializer","biasInitializer","kernelConstraint","biasConstraint","kernelRegularizer","biasRegularizer");
			break;
			case "dropout":
				MBA.unshift("rate","noiseShape","seed");
			break;
			case "embedding":
				MBA.unshift("inputDim","outputDim","maskZero","embeddingsInitializer","embeddingsConstraint","embeddingsRegularizer","activityRegularizer");
			break;
			case "permute":
				MBA.unshift("dims");
			break;
			case "repeatVector":
				MBA.unshift("n");
			break;
			case "reshape":
				MBA.unshift("targetShape");
			break;
			// Convolutional
			case "separableConv2d":
				MBA.unshift("pointwiseInitializer","pointwiseConstraint","pointwiseRegularizer");
			case "depthwiseConv2d":
				MBA.unshift("depthMultiplier","depthwiseInitializer","depthwiseConstraint","depthwiseRegularizer");
			case "conv1d":
			case "conv2d":
			case "conv2dTranspose":
			case "conv3d":
				MBA.unshift("filters","kernelSize","strides","padding","dataFormat","dilationRate");
				MBA.unshift("units","useBias","activityRegularizer","kernelInitializer","biasInitializer","kernelConstraint","biasConstraint","kernelRegularizer","biasRegularizer");
			break;
			case "cropping2D":
			case "upSampling2d":
				MBA.unshift(((E.getAttribute("type")=="cropping2D")?"cropping":"size"),"dataFormat");
			break;
			// Advanced Activation
			case "elu":
			case "leakyReLU":
				MBA.unshift("alpha");
			break;
			case "prelu":
				MBA.unshift("alphaInitializer","alphaRegularizer","alphaConstraint","sharedAxes");
			break;
			case "reLU":
				MBA.unshift("maxValue");
			break;
			case "softMax":
				MBA.unshift("axis");
			break;
			case "thesholdedReLU":
				MBA.unshift("theta");
			break;
			// Merge
			case "dot":
				MBA.unshift("axes","normalize");
			break;
		};
		MBA.unshift("type");
		MBA.map(function(x){MBO[x]=sett});
		TintOS.menu(MBO,{parent:P});
	}},
	"brain model":{click:async function(e){
		var P = e.currentTarget.parentNode,
		M = e.currentTarget;
		var data = function(x,N=P){
			if(N.hasAttribute(x)){
				return N.getAttribute(x);
			};
			return "";
		};
		if(M.model == undefined){
			let inShape = 1,
			inData = data("input",M),
			outShape = 1,
			outData = data("output",M),
			CP = M.parentNode,
			iter;
			while(inData==""){inData=data("input",CP);CP=CP.parentNode};
			CP=M.parentNode;
			while(outData==""){outData=data("input",CP);CP=CP.parentNode};
			inData = eval(inData);
			outData = eval(outData);
			//if(inData==""){inData = eval(data("input"))};
			//if(outData==""){outData = eval(data("output"))};
			M.in = inData;
			M.out = outData;
			["in","out"].map(function(io){
				try{
				if(M[io].tagName=="VIDEO"){
					if(M[io].nerve==undefined){
						tf.data.webcam(M[io]).then(function(vt){M[io].nerve=vt;M[io] = vt.capture()})
					}else{
						M[io] = M[io].nerve.capture();
					};
				};
				if(M[io].constructor!=Array){M[io] = M[io].arraySync()};
				}catch(err){TintOS.alert(err)}
			});
			iter = M.in[0];
			while(iter.constructor==Array){inShape++;iter=iter[0]};
			iter = M.out[0];
			while(iter.constructor==Array){outShape++;iter=iter[0]};
			if(M.hasAttribute("load")){
				M.model = await tf.loadLayersModel(M.getAttribute("load"));
				M.click();
				Find("message textarea")[0].value=1;
				TintOS.util.menuCrawl(["Train"]);
				M.innerHTML = M.getAttribute("load").split("://").pop();
				//await M.model.compile({loss:data("loss",M),optimizer:data("optimizer",M)});
				/*await M.model.fit(M.in,M.out,{
					epochs:1,
					batchSize:Number(M.getAttribute("batchSize")),
					shuffle:eval(M.getAttribute("shuffle")),
					validationSplit:eval(M.getAttribute("validationSplit")),
					callbacks:{onTrainEnd:function(e){M.style.background="rgba(0,255,0,0.5)";}}
				});*/
			}else{
			M.model = tf[data("type",M)]();
			Find("layer",undefined,CP).sortBy(function(x){return TintOS.util.offsetCrawl(x).top}).map(function(x){
				var args={},
					atts = {};
					["name","units","rate","n","noiseShape","targetShape","seed","dims","inputDim",
					"outputDim","name","dtype","trainable","activation","useBias","maskZero",
					"alpha","theta","sharedAxes","axes","maxValue","axis","normalize",
					"recurrentActivation","recurrentInitialization","recurrentConstraint","recurrentRegularizer",
					"dropout","recurrentDropout","returnSequences","returnState","goBackwards","stateful","unroll","unitForgetBias",
					"filters","kernelSize","strides","padding","dataFormat","dilationRate","cropping","size",
					"depthMultiplier","depthwiseInitializer","depthwiseConstraint","depthwiseRegularizer",
					"pointwiseInitializer","pointwiseConstraint","pointwiseRegularizer",
					"kernelInitializer","biasInitializer","embeddingsInitializer","alphaInitializer",
					"kernelConstraint","biasConstraint","embeddingsConstraint","alphaConstraint",
					"kernelRegularizer","biasRegularizer","embeddingsRegularizer","activityRegularizer","alphaRegularizer"].map(function(y){atts[y] = data(y,x)});
					["units","rate","seed","useBias","maskZero","inputDim","outputDim","trainable",
					"noiseShape","dims","targetShape","alpha","theta",
					"maxValue","sharedAxes","axes","normalize",
					"dropout","recurrentDropout","returnSequences","returnState",
					"goBackwards","stateful","unroll","unitForgetBias",
					"filters","kernelSize","strides","dilationRate","cropping","size",
					"depthMultiplier"].map(function(y){atts[y] = eval(atts[y])});
					atts.inputShape = [inShape];
				lambda(function(x,k,d){if(x!="" && x!=undefined){args[k]=x}},atts);
				M.model.add(tf.layers[data("type",x)](args));
			});
			};
			M.model.compile({loss:data("loss",M),optimizer:data("optimizer",M)});
			M.predict = function(PR,F){
				if(F!=undefined){
					return M.model.predict(tf.tensor(PR)).array().then(F);
				}else{
					return M.model.predict(tf.tensor(PR)).arraySync();
				};
			};
		};
		M.inShape = M.model.inputs[0].shape[1];
		M.outShape = M.model.outputs[0].shape[1];
		let sett = function(e){TintOS.message({Set:function(evt){M.setAttribute(e.target.innerHTML,evt.input.value)}},{message:e.target.innerHTML,value:M.getAttribute(e.target.innerHTML)})};
		TintOS.message({
			"Train":function(e){
				//https://js.tensorflow.org/api/latest/#tf.Sequential.fit
				M.style.background="";
				let inData = data("input",M),
				outData = data("output",M),
				CP=M.parentNode;
				while(inData==""){inData=data("input",CP);CP=CP.parentNode};
				CP=M.parentNode;
				while(outData==""){outData=data("output",CP);CP=CP.parentNode};
				inData = eval(inData);
				outData = eval(outData);
				if(M.trainable_==false){M.model.compile({loss:data("loss",M),optimizer:data("optimizer",M)});};
				//if(M.hasAttribute("input")){inData = eval(M.getAttribute("input"))}else{inData = eval(P.getAttribute("input"))};
				//if(M.hasAttribute("output")){outData = eval(M.getAttribute("output"))}else{outData = eval(P.getAttribute("output"))};
				//M.in = tf["tensor"+(M.inShape+1)+"d"](inData,[inData.length, M.inShape]);
				//M.out = tf["tensor"+(M.outShape+1)+"d"](outData,[outData.length, M.outShape]);
				M.in = (inData.constructor==Array)?tf.tensor(inData):inData;
				M.out = (outData.constructor==Array)?tf.tensor(outData):outData;
				["in","out"].map(async function(io){
					if(M[io].tagName=="VIDEO"){
						if(M[io].nerve==undefined){
							await tf.data.webcam(M[io],{resizeWidth:M.offsetWidth,resizeHeight:M.offsetHeight}).then(function(vt){M[io].nerve=vt;M[io] = vt.capture()})
						}else{
							M[io] = M[io].nerve.capture();
						};
					};
				});
				M.inShape = M.model.inputs[0].shape[1];
				M.outShape = M.model.outputs[0].shape[1];
				M.model.fit(M.in,M.out,{
					epochs:Number(e.input.value),
					batchSize:Number(M.getAttribute("batchSize")),
					shuffle:eval(M.getAttribute("shuffle")),
					validationSplit:eval(M.getAttribute("validationSplit")),
					callbacks:{onTrainEnd:function(e){M.style.background="rgba(0,255,0,0.5)";}}
				});
			},
			"Predict":function(e){
				try{
				let ANS = eval(e.input.value);
				if(ANS.constructor!=Array){ANS = [ANS]};
				M.predict(ANS,function(ANS){
					TintOS.message({Save:function(e){Make("paper",{move:0},{},ANS)}},{message:M.innerHTML+" prediction",input:Make("textarea",{disabled:true}),value:ANS});
				});
				}catch(err){Make("paper",{},{},err)}
			},
			"Save":{
				Files:function(e){M.model.save(("downloads://"+e.input.value),{"includeOptimizer":true})},
				IndexedDB:function(e){[M].set({load:"indexeddb://"+e.input.value});M.model.save(("indexeddb://"+e.input.value),{"includeOptimizer":true});M.innerHTML=e.input.value}
			},
			"Load":{
				Files:function(e){
					var mInput = Make("p",{move:"M"});
					["JSON File:","Weights:"].map(function(x,i){
						Make("b",{move:"M","style":"position:relative"},{},x,mInput);
						Make("input",{move:"M",type:"file","style":"position:relative"},{},"",mInput);
						Make("br",{},{},"",mInput);
					});
					TintOS.message({"Load":function(e){
						try{
						let MI = Find("input",undefined,e.input).map(function(x){return x.files[0]});
						tf.loadLayersModel(tf.io.browserFiles(MI)).then(function(x){M.model = x;});
						}catch(err){TintOS.alert(err)}
					}},{"message":"Load Model Files",input:mInput})
				},
				IndexedDB:function(e){[M].set({load:"indexeddb://"+e.input.value});M.model=undefined},
				URL:function(e){[M].set({load:e.input.value});M.model=undefined/*tf.loadLayersModel(e.input.value).then(function(x){M.model = x;});*/}
			},
			"Options":{
				"Explore Model":function(e){TintOS.menu(M.model,{parent:P,explore:true})}
			},
			"Settings":{
				"input":sett,
				"output":sett,
				"load":sett,
				"type":sett,
				"loss":sett,
				"optimizer":sett,
				"batchSize":sett,
				"shuffle":sett,
				"validationSplit":sett
			}
		},{message:M.innerText,parent:P,placeholder:"Iterations / Prediction input / Save Data Name"});
	}},
	////// Browser
	"browser>button[move='M']":{
		click:function(e){
			var P = e.target.parentNode;
			var W = Find("*[name='browser']",undefined,P)[0];
			var B = {
				Go:function(e){[W].set({src:e.input.value})},
				"<<":function(e){window.history.go(-1)},
				">>":function(e){window.history.go(1)},
				"Full":function(e){if(W.className=="fullscreen"){W.className=""}else{W.className="fullscreen"}},
				"Sandbox":function(e){
					TintOS.message({
						Set:function(e){[W].set({sandbox:e.input.value})},
						Remove:function(e){W.removeAttribute("sandbox")}
					},{message:"Sandbox Settings",value:W.getAttribute("sandbox"),parent:P})
				},
				"Open":function(e){window.open(W.src)},
				"Save":function(e){
					TintOS.message(undefined,{message:"Download",parent:P,cancel:false,"input":Make("a",{target:"_blank","href":W.src,"download":W.src.slice(0,30)},{},W.src.slice(0,30))});
				}
			};
			if(W.contentWindow!=undefined){
				B.Extract = function(e){P.outerHTML=W.contentWindow.document.body.innerHTML}
			};
			TintOS.menu(B,{input:Make("input",{move:"M",type:"url"}),value:W.src,parent:P});
		}
	},
	////// Capture
	"capture>canvas[move='M']":{click:function(e){
		var P = e.target.parentNode;
		if(P.getAttribute("facing")=="user"){
			var flash = Make("paper",{style:"left:0%;top:0%;width:100%;height:100%;z-index:999999"},{},"",P);
			setTimeout(function(){[flash].removeNodes()},500);
		};
		setTimeout(function(){Find("img[move='M']",undefined,P).map(function(pv){pv.src = Find("canvas",undefined,P)[0].toDataURL()})},0250);
	}
	/*,dblclick:function(e){Find("img[move='M']",undefined,e.target.parentNode).map(function(img){img.click()})}*/
	},
	"capture>video[move='M']":{resize:function(e){
		var P = e.target.parentNode,
		C = Find("canvas",undefined,P)[0];
		[C].set({width:e.target.videoWidth,height:e.target.videoHeight});
	}},
	"capture>img[move='M']":{click:function(e){
		TintOS.browser({},{node:"img",src:e.target.src});
	}},
	"capture>button[move='M']":{click:async function(e){
		var P = e.target.parentNode,
		C = Find("canvas",undefined,P)[0],
		V = Find("video",undefined,P),
		PP = P.parentNode;
		while(V.length==0){V = Find("video",undefined,PP);PP=PP.parentNode};
		V=V.pop();
		if(C.srcObject==undefined){
			if(TintOS.user.camera==undefined){
				await TintOS.userMedia({setCamera:false,video:{advanced:[{facingMode:P.getAttribute("facing")}]},callback:function(s){V.srcObject=s}});
				if(P.getAttribute("facing")=="user"){C.style.transform="rotateY(180deg)"};
			}else{V.srcObject=TintOS.user.camera;};
			setTimeout(function(){
				C.width = Number(V.videoWidth);
				C.height = Number(V.videoHeight);
				C.srcObject = C.captureStream();
				TintOS.user.camera = C.srcObject;
				C.greenScreen = C.ctx.getImageData(0,0,C.width,C.height);
				V.srcObject.getAudioTracks().forEach(function(t){C.srcObject.addTrack(t)});
				C.ctx.fillStyle = "red";
				/*C.ctx.shadowStyle = "white";
				C.ctx.shadowBlur = 1;
				C.ctx.shadowOffsetX = 0;
				C.ctx.shadowOffsetY = 0;*/
				var prevImage = C.ctx.getImageData(0,0,C.width,C.height),
					imgFilter = function(img,prev){
						var R = img.data,
						r = img.data.slice(0),
						L = prev.data,
						G = C.greenScreen.data,
						T = [0,0,0,0];
						for(var i=0; i<(img.width*img.height*4);i+=4){
							/*R.slice(i,i+3).forEach(function(r,j,d){
								if(C.filters["Green Screen"].active){
									T[j] = Math.abs(r-G[i+j]);
								};
								if(C.filters["Edge Detection"].active){
									R[i+j] = 5*(Math.max(Math.abs(r-R[(i+j+4)%R.length]),Math.abs(r-R[(i+j+(img.width*4))%R.length]))-C.filters["Edge Detection"].threshold/3);
								};
								if(C.filters["Motion Detection"].active){
									R[i+j] = 255-Math.abs(r-L[i+j]);
								};
							});*/
							// Color Depth
							if(C.filters["Color Depth"].active){
								[0,1,2].map(function(j){R[i+j] = Math.round(R[i+j]/(255/C.filters["Color Depth"].shades))*(255/C.filters["Color Depth"].shades) });
							};
							// Trails
							if(C.filters["Trails"].active){
								[0,1,2].map(function(j){R[i+j] = ((r[i+j]*(1-Number(C.filters["Trails"].threshold)))+(L[i+j]*Number(C.filters["Trails"].threshold)))/2});
							};
							// Edge Detection
							if(C.filters["Edge Detection"].active){
								[0,1,2].map(function(j){R[i+j] = 5*(Math.max(Math.abs(r[i+j]-r[(i+j+4)%R.length]),Math.abs(r[i+j]-r[(i+j+(img.width*4))%r.length]))-C.filters["Edge Detection"].threshold/3); });
								//[0,1,2].map(function(j){R[i+j] = (Math.max(Math.abs(R[i+j]-R[(i+j+4)%R.length]),Math.abs(R[i+j]-R[(i+j+(img.width*4))%R.length]))>C.filters["Edge Detection"].threshold)?255:0; });
								if(Math.max(R[i+0],R[i+1],R[i+2])<(3*C.filters["Edge Detection"].threshold)){
									R[i+3] = 0;
								};
							};
							// Motion Detection
							if(C.filters["Motion Detection"].active){
								//[0,1,2].map(function(j){R[i+j] = 255-Math.abs(R[i+j]-L[i+j])});
								//[0,1,2].map(function(j){R[i+j] = 127+((R[i+j]-L[i+j])/2)});
								[0,1,2].map(function(j){R[i+j] = Math.abs(R[i+j]-L[i+j])});
								//R[i+3] = 255;
								//R[i+3] = Math.pow(Math.min(R[i],R[i+1],R[i+2]),2)-20;
								//R[i+3] = Math.abs(R[i+2]-L[i+2]);
								R[i+3] = (Math.min(R[i],R[i+1],R[i+2])<20)?0:255;
							};
							// Green Screen
							if(C.filters["Green Screen"].active){
								/*var r2 = r.slice(i,i+3).map(function(x,j,d){return x/d[(j+1)%d.length]}),
									G2 = r.slice(i,i+3).map(function(x,j,d){return x/d[(j+1)%d.length]});*/
								[0,1,2].map(function(j){
									T[j] = Math.abs(r[i+j]-G[i+j]);
									if(C.filters["Green Screen"].revert){R[i+j] = r[i+j]};
								});
								if(Math.max(T[0],T[1],T[2])<C.filters["Green Screen"].threshold){
									R[i+3] = 0;
									//R.slice(i,i+2).forEach(function(x,j){G[i+j] = x});
								}else{
									//R[i+3]=255;
								};
							};
							//[0,1,2].map(function(j){R[i+j] = r[((i+j)+(0.5*img.height*img.width*4)+(0.5*img.width*4))%r.length]});
							
						};
						return img;
					};
					var Action = setInterval(function(){
						//C.ctx.clearRect(0,0,C.width,C.height);
						if(P.parentNode==null){window.clearInverval(Action)};
						C.ctx.clearRect(0,0,C.width,C.height);
						C.ctx.drawImage(V,0,0,C.width,C.height);
						let newImage = C.ctx.getImageData(0,0,C.width,C.height);
						let filtImage = imgFilter(newImage,prevImage);
						prevImage = C.ctx.getImageData(0,0,C.width,C.height);
						C.ctx.putImageData(filtImage,0,0);
						if(C.filters["Green Screen"].set){C.greenScreen = C.ctx.getImageData(0,0,C.width,C.height);C.filters["Green Screen"].set = false};
						if(C.filters["Stamp"].active){
							let stamp = [], yStart = 25;
							C.ctx.font = C.filters["Stamp"].font;
							C.ctx.fillStyle = C.filters["Stamp"].color;
							if(C.filters["Stamp"].time){stamp.push(new Date())};
							if(C.filters["Stamp"].gps){
								if(TintOS.user.gps){
									lambda(function(x,k,d){stamp.push(k+":"+x)},TintOS.user.gps.coords);
								}else{
									navigator.geolocation.watchPosition(function(x){TintOS.user.gps = x});
								};
							};
							if(C.filters["Stamp"].title){
								let temp = "Tint OS";
								Find("title").map(x => temp = x.innerHTML);
								stamp.push(temp);
							};
							if(C.filters["Stamp"].name && TintOS.user.name){
								stamp.push(TintOS.user.name);
							};
							if(C.filters["Stamp"].custom != ""){stamp.push(C.filters["Stamp"].custom)};
							if(C.filters["Stamp"].eval != ""){stamp.push(eval(C.filters["Stamp"].eval))};
							stamp.map(function(x){
								C.ctx.fillText(x,0,yStart,C.width);
								yStart+=C.filters["Stamp"].gap;
							});
						};
						C.srcObject.getVideoTracks()[0].requestFrame();
					},Math.floor(1000/30));
					if(P.hasAttribute("filter")){C.ctx.filter=P.getAttribute("filter")};
			},1000);
			//[C].set({width:V.width,height:V.height});
			C.ctx = C.getContext("2d",{willReadFrequently:true});
			V.muted = true;
			if(P.hasAttribute("default")){
				C.filters = JSON.parse(P.getAttribute("default"))
			}else{
				C.filters = {
					"Motion Detection":{active:false,type:"standard"},
					"Edge Detection":{active:false,type:"standard",threshold:15},
					"Trails":{active:false,threshold:0.5},
					"Green Screen":{active:false,set:false,revert:false,threshold:50},
					"Color Depth":{active:false,shades:8},
					"Stamp":{active:false,title:true,name:true,custom:"",eval:"",time:true,gps:false,font:"20px georgia",color:"red",gap:25}
				};
			}
		};
		TintOS.menu({
			"Record":function(e){TintOS.record({targets:[C],type:"video/webm"})},
			"Switch":function(e){
				P.setAttribute("facing",((P.getAttribute("facing")=="user")?"environment":"user"));
				V.srcObject.getTracks().map(function(x){x.stop()});
				C.srcObject.getAudioTracks().map(function(x){x.stop();C.srcObject.removeTrack(x)});
				TintOS.userMedia({setCamera:false,video:{advanced:[{facingMode:P.getAttribute("facing")}]},callback:function(s){
					V.srcObject=s;
					C.srcObject = C.captureStream();
					V.srcObject.getAudioTracks().forEach(function(t){C.srcObject.addTrack(t)});
				}});
				if(P.getAttribute("facing")=="user"){C.style.transform="rotateY(180deg)"}else{C.style.transform=""};
				//V.srcObject = TintOS.user.camera;
			},
			"Set...":{
				"Constraints":function(e){
					var vC = V.srcObject.getVideoTracks()[0].getSettings(),
						aC = C.srcObject.getAudioTracks()[0].getSettings(),
						vD = lambda(undefined,vC),
						aD = lambda(undefined,aC),
						diff = function(a,b){var d={};lambda(function(aa,k){if(aa!=b[k]){d[k]=aa}},a);return d};
						TintOS.menu({
							Video:vC,
				 			Audio:aC,
							Apply:function(e){
								//V.srcObject.getVideoTracks().map(function(x){lambda(function(y,j){let temp = {};temp[j]=y;x.applyConstraints(temp).catch(function(err){TintOS.alert(err)})},vC)});
								//C.srcObject.getAudioTracks().map(function(x){lambda(function(y,j){let temp = {};temp[j]=y;x.applyConstraints(temp).catch(function(err){TintOS.alert(err)})},aC)});
								V.srcObject.getVideoTracks().map(function(x){x.applyConstraints(diff(vC,vD)).catch(function(err){TintOS.menu(err,{explore:true})})});
								C.srcObject.getAudioTracks().map(function(x){x.applyConstraints(diff(aC,aD)).catch(function(err){TintOS.alert(err)})});
							}
						},{parent:P});
				},
				"Functions":C.filters,
				"Filter":function(e){TintOS.message({Set:function(e){C.ctx.filter=e.input.value}},{message:"Set Native Filters",value:C.ctx.filter,parent:P,placeholder:TintOS.util.filter.join(" ")})},
				"Default":{
					Set:function(e){P.setAttribute("default",JSON.stringify(C.filters));P.setAttribute("filter",C.ctx.filter)},
					Remove:function(e){P.removeAttribute("default");P.removeAttribute("filter")}
				},
				"As Camera":function(e){TintOS.user.camera=C.srcObject},
				"Green Screen":function(e){C.filters["Green Screen"].set = true}
			},
			"Tools":{
				"Flip View":function(e){if(C.style.transform==""){C.style.transform="rotateY(180deg)"}else{C.style.transform=""}},
				"Capture Screen":function(e){
					//V.srcObject.getTracks().map(function(x){x.stop()});
					//C.srcObject.getTracks().map(function(x){x.stop();C.srcObject.removeTrack(x)});
					var at = C.srcObject.getAudioTracks().map(function(x){return x});
					navigator.mediaDevices.getDisplayMedia().then(function(s){
						V.srcObject=s;
						C.srcObject = C.captureStream();
						at.forEach(function(t){C.srcObject.addTrack(t);V.srcObject.addTrack(t)});
						//V.srcObject.getAudioTracks().forEach(function(t){C.srcObject.addTrack(t)});
					}).catch(TintOS.alert);
					C.style.transform="";
				},
				"Custom Feed":function(e){
					navigator.mediaDevices.enumerateDevices().then(function(D){
						var vMenu={},aMenu={},vOpt={},aOpt={},
						vDef={},
						aDef={};
						D.filter(function(x){return x.kind[0]=="v"}).map(function(xv){
							vMenu[xv.label] = function(e){
								D.filter(function(x){return x.kind[0]=="a"}).map(function(xa){
									aMenu[xa.label] = function(e){
										V.srcObject.getTracks().map(function(x){x.stop()});
										C.srcObject.getTracks().map(function(x){x.stop();C.srcObject.removeTrack(x)});
										if(vOpt!=false){vOpt.deviceId=xv.deviceId};
										if(aOpt!=false){aOpt.deviceId=xa.deviceId};
										TintOS.userMedia({setCamera:false,video:vOpt,audio:aOpt,callback:function(s){
											V.srcObject=s;
											C.srcObject = C.captureStream();
											V.srcObject.getAudioTracks().forEach(function(t){C.srcObject.addTrack(t)});
										}});
									};
								});
								aMenu["None"]=function(e){aOpt=false;e.target.previousSibling.click()};
								/*aMenu["Options"]=lambda(function(xo,k,d){
									return function(e){
										TintOS.menu({Set:function(e){
											aOpt[k]=e.input.value;
											TintOS.menu(aMenu,{parent:P});
										}},{parent:P,input:true,placeholder:k,back:[aMenu,{parent:P}]});
									};
								},aDef);*/
								TintOS.menu(aMenu,{parent:P});
								C.style.transform="";
							};
						});
						vMenu["None"]=function(e){vOpt=false;e.target.previousSibling.click()};
						/*vMenu["Options"]=lambda(function(xo,k,d){
							return function(e){
								TintOS.menu({Set:function(e){
									vOpt[k]=e.input.value;
									TintOS.menu(vMenu,{parent:P});
								}},{parent:P,input:true,placeholder:k,back:[vMenu,{parent:P}]});
							};
						},vDef);*/
						/*function(e){
							TintOS.menu(lambda(function(x,k,d){
								
							},vDef),{parent:P,back:[vMenu,{parent:P},input:true]});
						};*/
						TintOS.menu(vMenu,{parent:P});
					});
				},
				"Eject":{
					"Canvas":function(e){[C].set({move:0},{},"",P.parentNode)},
					"Video":function(e){[V].set({move:0,controls:true},{},"",P.parentNode)}
				}
			}
		},{parent:P});
	}},
	////// Chat
	"chat>button[move='M']":{click:function(e){
		var P = e.target.parentNode;
		if(P.RTC==undefined){
			TintOS.alert("The Chat app can be used by connected users to record the video and audio feeds you transmit, do not use Chat of you don't consent.",{delay:10,to:"left:0px;width:100%"});
			TintOS.RTC({node:P});
			setTimeout(function(){
				P.RTC.socket.addEventListener("open",function(){
					Find("template[name='chat']",undefined,P).removeNodes();
					P.RTC.socket.send("<template name='chat' user='"+P.getAttribute("name")+"'>"+Find("template[name='profile']","innerHTML").join("")+"</template>")
				})
			},2000);
		};
		let autoToggle = function(att){
			TintOS.menu((P.hasAttribute(att)?{"Turn Off":function(e){P.removeAttribute(att)}}:{"Turn On":function(e){P.setAttribute(att,true)}}),{parent:P})
		};
		TintOS.menu({
			"Join Lobby":function(e){
				TintOS.message({"Connect":function(e){
					let S = P.RTC.server({type:"search",name:e.input.value});
					if(S!=false){
						TintOS.user.name = P.getAttribute("name");
						TintOS.chat({},{parent:P});
						TintOS.alert("Joining "+e.input.value,{from:"top:-200%",parent:P});
						P.RTC.setRemoteDescription(S.desc).then(function(){
							S.ice.map(function(x){try{P.RTC.addIceCandidate(x)}catch(e){Make("paper",{},{},e+"/n"+JSON.stringify(x))}});
							P.RTC.createAnswer().then(function(offer){return P.RTC.setLocalDescription(offer)}).then(function(){
								setTimeout(function(){
									let A = P.RTC.server({type:"answer",name:e.input.value,from:P.getAttribute("name"),answer:{from:P.getAttribute('name'),desc:P.RTC.localDescription,ice:P.RTC.ICL}});
									if(A!=true){TintOS.alert("Failed: "+A,{parent:P});
									}else{
										Find("button[move='M']",undefined,P)[0].innerHTML = (P.getAttribute("name") + " - " + e.input.value);
									};
								},2000);
							});
						});
					}else{TintOS.alert(("Lobby "+e.input.value+" not found..."))}
				}},{message:"Connect to...",parent:P});
			},
			"Open Lobby":function(e){
				P.RTC.createOffer({offerToReceiveVideo:1,offerToReceiveAudio:1}).then(function(offer){return P.RTC.setLocalDescription(offer)}).then(function(){
					setTimeout(async function(){
						let O = P.RTC.server({type:"offer",name:P.getAttribute("name"),offer:{desc:P.RTC.localDescription,ice:P.RTC.ICL}});
						if(O){
							P.lobby = setInterval(async function(){
								let C = P.RTC.server({type:"connect",name:P.getAttribute("name")});
								if(C!=false){
									TintOS.menu({"Answer":function(e){
										TintOS.alert("Joining "+C.from,{from:"top:-200%",parent:P});
										P.RTC.setRemoteDescription(C.desc).then(function(){
											C.ice.map(function(x){try{P.RTC.addIceCandidate(x)}catch(e){Make("paper",{},{},e+"/n"+JSON.stringify(x))}});
										});
										Find("button[move='M']",undefined,P)[0].innerHTML = (P.getAttribute("name") + " - " + C.from);
										clearInterval(P.lobby);
										let newChat = TintOS.chat({},{parent:P});
										if(P.hasAttribute("answer")){[newChat].set({answer:true})};
										setTimeout(function(){TintOS.util.menuCrawl([P.getAttribute("name"),"Open Lobby"],{parent:newChat})},2000);
									},"Reject":function(e){O = P.RTC.server({type:"offer",name:P.getAttribute("name"),offer:{desc:P.RTC.localDescription,ice:P.RTC.ICL}});}},{input:true,value:C.from,parent:P,cancel:false});
									if(P.hasAttribute("answer")){TintOS.util.menuCrawl(["Answer"],{parent:P})};
									if(!document.hasFocus()){TintOS.notify({"Answer":function(){TintOS.util.menuCrawl(["Answer"])}},{title:"Tint OS Chat App", body:("Call Received from "+C.from)})};
									window.focus();
								};
							},5000);
						}else{TintOS.alert("Failed to create lobby...")}
					},2000)
				});
				TintOS.user.name = P.getAttribute("name");
				if(navigator.share){
					TintOS.menu({"Share Invite":function(e){
						navigator.share({url:window.location.origin+window.location.pathname+"?chat="+escape(P.getAttribute("name"))});
					}},{parent:P});
				}
			},
			"Change Name":function(evt){
				TintOS.message({
					"Set":function(evt){[P].set({name:evt.input.value});e.target.innerHTML=evt.input.value},
					"+Random":function(evt){[P].set({name:evt.input.value+"-"+range("a","z").random((4).random(1)).join("")});e.target.innerHTML=P.getAttribute("name")}
				},{message:"Name/Password...",value:P.getAttribute("name"),parent:P});
			},
			"Send":function(e){
				TintOS.menu({
					"Selected":function(e){
						P.RTC.socket.send(Find("*[move='1']","outerHTML").join(""));
					},
					"Files":function(e){
						TintOS.load({maxSize:999999999999,readAs:"ArrayBuffer",callback:function(add,type,result,file){
							//Make("folder",{},{},add);
							//P.RTC.socket.send(add);
							var Q=false,
							i=0,
							gap=1000;
							while(Q==false){
								if((i+gap)>add.byteLength){gap=add.byteLength-i;Q=true};
								P.RTC.socket.send(add.slice(i,i+gap));
								i+=gap;
							};
							P.RTC.socket.send(("last"+file.type));
						}});
					},
					"Media":function(e){
						Find("audio[move='1'],video[move='1'],canvas[move='1'],studio[move='1']").map(function(x){
							x=(x.srcObject!=undefined)?x.srcObject:x.captureStream();
							x.getTracks().forEach(function(track){
								P.RTC.addTrack(track,x);
							});
							//P.RTC.addTrack(lambda(undefined,P.RTC.mediaTrack),x.captureStream())
						})
					}
				},{parent:P});
			},
			"View":{
				//// Shared Profile Code
				"Profile":function(e){
					let template = Find("template[name='chat']",undefined,P)[0],
						userName = template.getAttribute("user"),
						profile = template.innerHTML;
					TintOS.message({
						"Save":function(e){
							if(Find("book[name='Saved Profiles']").length==0){
								TintOS.book({[userName]:profile},{name:"Saved Profiles"})
							}else{
								Find("book[name='Saved Profiles']>select").map(function(bs){Make("option",{value:profile},{},userName,bs)});
							};
						}
					},{message:userName+"'s Profile",input:Make("tab",{move:0},{},profile)});
				},
				"My Cam":function(e){Make("video",{move:0,style:"left:-100%",muted:true,autoplay:true,controls:true},{},"",P).srcObject = TintOS.user.camera;}
			},
			"Toggle":{
				"Video":function(e){TintOS.user.camera.getVideoTracks().map(function(x){x.enabled = !x.enabled;TintOS.alert(x.kind+(x.enabled?" on":" off"))})},
				"Audio":function(e){TintOS.user.camera.getAudioTracks().map(function(x){x.enabled = !x.enabled;TintOS.alert(x.kind+(x.enabled?" on":" off"))})},
				"Both":function(e){var AA=[];TintOS.user.camera.getTracks().map(function(x){x.enabled = !x.enabled;AA.push(x.kind+(x.enabled?" on":" off"))});TintOS.alert(AA)}
			},
			"Serverless":{
				"Connect":function(e){
					let data = JSON.parse(e.input.value);
					let RD = data.desc,
					ICL = data.ice;
					//Make("paper",{},{},ICL);
					//Make("video",{style:"left:-100%",muted:true,autoplay:true},{},"",P).srcObject = TintOS.user.camera;
					P.RTC.setRemoteDescription(RD).then(function(){
						ICL.map(function(x){try{P.RTC.addIceCandidate(x)}catch(e){Make("paper",{},{},e+"/n"+JSON.stringify(x))}});
						if(RD.type == "offer"){
							P.RTC.createAnswer().then(function(offer){return P.RTC.setLocalDescription(offer)}).then(function(){
								setTimeout(function(){
									Make("a",{href:"data:text/html,"+JSON.stringify({desc:P.RTC.localDescription,ice:P.RTC.ICL})},{},"Answer");
								},1000);
							});
						};
					});
				},
				"Get Invite":function(e){
					P.RTC.createOffer({offerToReceiveVideo:1,offerToReceiveAudio:1}).then(function(offer){return P.RTC.setLocalDescription(offer)}).then(function(){
						setTimeout(function(){Make("a",{href:"data:text/html,"+JSON.stringify({desc:P.RTC.localDescription,ice:P.RTC.ICL})},{},"Invite");},1000)
					});
				}
			},
			"Settings":{
				"Auto Open":function(e){autoToggle("auto")},
				"Auto Join":function(e){autoToggle("join")},
				"Auto Answer":function(e){autoToggle("answer")},
				"Auto Data":function(e){autoToggle("acceptData")}
			},
			"Clear Chat":function(e){Find("i",undefined,P).removeNodes()},
			"Hang Up":function(e){
				P.RTC.server({type:"search",name:P.getAttribute("name")});
				P.RTC.server({type:"connect",name:P.getAttribute("name")});
				P.RTC.close();
				P.RTC = undefined;
				Find("*",undefined,P).slice(3).removeNodes()
			}
		},{input:true,parent:P});
	}},
	"chat>paper[move='B']":{dblclick:function(e){
		var P = e.target.parentNode,
		data = "<i ts='"+(new Date())+"'>"+e.target.innerHTML+"</i><br>";
		P.RTC.socket.send(data);
		Make("i",{class:"chatSelf",ts:(new Date())},{},e.target.innerHTML,P);
		Make("br",{},{},"",P);
		e.target.innerHTML="";
	}},
	////// Console
	"console>button[move='M']":{click:function(e){
		let P = e.target.parentNode,
			disp = Find("p",undefined,P)[0],
			comm = Find("textarea",undefined,P)[0],
			selStart = comm.selectionStart,
			insertArray = ["window","document","location","navigator","function(){return };","for(){};","switch(){};","if(){}","else{};","?:","Params","Find()","Make()","range()","lambda",".map",".then",".forEach",".filter",".sortBy","(function(x){return })",".items()",".random()",".swap(0,0)","check()",".removeNodes()","TintOS",".menuCrawl()",".menu()",".message()",".alert()","()","{}","[]","''",";"],
			menuFunc = function(A){
				let rList = {};
				A.map(function(x){
					rList[x] = function(e){
						selStart += e.target.innerText.length;
						comm.value = comm.value.slice(0,comm.selectionStart)+e.target.innerText+comm.value.slice(comm.selectionEnd);
						comm.focus();
						comm.selectionEnd = selStart;
					};
				});
				return rList;
			},
			sList = menuFunc(P.hasAttribute("saved")?P.getAttribute("saved").split(";;;").filter(function(x){return x!=""}):[]),
			hList = menuFunc(P.hasAttribute("history")?P.getAttribute("history").split(";").filter(function(x){return x!=""}):[]);
		sList["Delete..."] = lambda(function(x,k){
			return {"Are you sure?":function(e){
				P.setAttribute("saved",P.getAttribute("saved").replace(k+";;;",""));
			}}
		},sList);
		sList["Add Current"] = {"Are you sure?":function(e){P.setAttribute("saved",P.getAttribute("saved")+";;;"+comm.value)}};
		hList["Clear All"] = {"Are you sure?":function(e){P.setAttribute("history","Find()")}};
		TintOS.menu({
			Clear:function(e){Find("p>*",undefined,P).removeNodes()},
			Insert:menuFunc(insertArray),
			Saved:sList,
			History:hList
		},{parent:P});
	}},
	"console>input[move='M']":{click:function(e){
		var P = e.target.parentNode;
		var disp = Find("p",undefined,P)[0];
		var comm = Find("textarea",undefined,P)[0];
		var commVal = comm.value;
		try{
			if(P.hasAttribute("history")){
				let hist = P.getAttribute("history").split(";"),
				cv = comm.value.split(";");
				cv = cv.filter(function(x){
					return hist.every(function(y){return x!=y})
				});
				hist.push(cv.join(";"));
				[P].set({history:hist.join(";")})
			}else{[P].set({history:comm.value})}
			ans = eval(comm.value);
		}catch(err){ans = err};
		//TintOS.message({},{message:code});
		var output = Make("details",{move:"M"},{},"<a class='close'>X</a>",disp);
		Make("summary",{move:"M"},{},comm.value+": "+ans,output);
		TintOS.menu({Explore:ans},{explore:true,parent:disp});
		comm.value = "";
		TintOS.alert({"Create Button":function(e){
			Make("button",{move:"T",onclick:commVal},{},commVal,P);
		}},{delay:10,parent:P});
		//comm.focus();
		//if(ans.constructor == Array || ans.constructor == Object){
		if(true || ans.constructor != String){
			lambda(function(x,k,d){
				Make("b",{move:"M"},{dblclick:function(e){
					comm.value = commVal + '["'+k+'"]'
				}},">"+k+": "+x,output);
			},ans);
		};
	}},
	////// Database
	"database button[move='M']:first-of-type":{click:function(e){
		var P = e.target.parentNode;
		indexedDB.databases().then(function(x){
			var btns = {};
			btns["New Database"] = function(e){TintOS.message({Add:function(e){indexedDB.open(e.input.value)}},{message:"Database Name",parent:P})};
			x.map(function(DB){
				var db,upgrade = function(f){if(db){db.close()};let R = indexedDB.open(DB.name,DB.version+1);R.onupgradeneeded = function(e){db = e.target.result;return f(db);}; return R};
				btns["Open: " + DB.name] = function(e){
					indexedDB.open(DB.name).onsuccess = function(e){
						db = e.target.result;
						//////TintOS.menu(db,{explore:true});
						var DBbtns = {};
						DBbtns["New Object Store"] = function(e){TintOS.message({Add:function(e){
							var val = e.input.value,
								opts = {},
								add = {};
							val = val.split(";");
							if(val.length>1){
								opts = eval("new Object("+val[1]+")");
								if(opts.keyPath){add[opts.keyPath]=""};
								val.slice(2).map(function(v){add[v]=""});
							};
							//TintOS.menu({Val:val,opts:opts},{explore:true});
							upgrade(function(db){
								var OS = db.createObjectStore(val[0],opts);
								val.slice(2).map(function(ind){
									let unq = false;
									if(ind[0]=="!"){unq = true; ind = ind.slice(1)};
									OS.createIndex(ind,ind,{unique:unq})
								});
								OS.add(add);
							});
						}},{message:"New Object Store",value:'MyStore;{keyPath:"data",autoIncrement:false}',placeholder:"Name;{keyPath,autoIncrement};index;index...",parent:P})};
						for(var i=0;i<db.objectStoreNames.length;i++){
							var osn = db.objectStoreNames[i];
							DBbtns["Open: " + osn] = function(e){
								//var TR = db.transaction(osn,"readwrite");
								//var OS = TR.objectStore(osn);
								var store = function(x,r="readwrite"){return db.transaction(osn,r).objectStore(x)};
								var cursor = function(f,r,d){
										return store(osn,"readonly").openCursor(r,d).onsuccess = function(e){
											var c = e.target.result;
											if(c){
												f(c,e);
												c.continue();
											};
										};
									};
								var ex = {};
								//var OS = store(osn);
								var msg = function(evt){
								TintOS.message({
									Add:function(e){
										//var TR = db.transaction(osn,"readwrite");
										//var OS = TR.objectStore(osn);
										store(osn).add(eval("new Object("+e.input.value+")"));
									},
									Put:function(e){
										store(osn).put(eval("new Object("+e.input.value+")"));
									},
									Get:function(e){
										var OSN = [];
										store(osn).getAll().onsuccess = function(e){e.target.result.map(function(r){OSN.push(r)})};
										//data["(Update)"] = function(e){store(osn).put(OSN)})};
										TintOS.menu({Explore:OSN,"(Update)":function(e){OSN.map(function(x){store(osn).put(x)})}},{explore:true,parent:P})
									},
									Display:function(e){
										var div = Make("paper",{move:"B"});
										cursor(function(c){
											lambda(function(x,k,d){
												let B = Find("book[name='"+k+"']",undefined,div);
												if(B.length==0){
													B.push(TintOS.book({},{name:k,parent:div}));
													B[0].style.left=((Find("book",undefined,div).length-1)*100)+"px";
												};
												let S = Find("select",undefined,B[0])[0];
												Make("option",{value:x},{},S.children.length-1,S);
											},c.value);
											//TintOS.menu(c,{explore:true,parent:P})
										});
										TintOS.message({
											Update:function(e){
												var list = Find("book>select",undefined,div).map(function(x){return Find("option",undefined,x).slice(2)}),
													st = store(osn);
												list = list.transpose();
												list.map(async function(O){
													var data = {};
													O.map(function(o){
														data[o.parentNode.parentNode.getAttribute("name")] = o.value;
													});
													st.put(data);
												});
											},
											Spreadsheet:function(e){
												var list = Find("book>select",undefined,div).map(function(x){return Find("option",undefined,x).slice(2)});
												var table = Make("table",{move:"M",style:"position:absolute;width:100%;height:80%;background:blue;overflow:auto"});
													list.map(function(x){Make("button",{move:"M",style:"position:relative;background:blue;left:10%;height:30px;width:"+Math.floor(80/Number(list.length))+"%"},{},x[0].parentNode.parentNode.getAttribute("name"),table)});
													list.transpose().map(function(L){
														var entry = Make("a",{move:"L",style:"position:relative;width:100%;height:10%;background:red"},{},"",table);
														L.map(function(l){
															Make("button",{name:l.parentNode.parentNode.getAttribute("name"),move:"B",contentEditable:true,style:"position:relative;background:green;left:10%;height:30px;width:"+Math.floor(80/Number(list.length))+"%"},{},l.getAttribute("value"),entry);
														});
													});
													//Make("button",{move:"M",style:"display:block;font-size:xx-large"},{click:function(e){let pS = e.target.previousSibling;pS.outerHTML=pS.outerHTML+pS.outerHTML}},"+",table);
													TintOS.message({
														Update:function(e){
															var st = store(osn);
															Find("a",undefined,table).map(async function(tr){
																var op={};
																Find("button",undefined,tr).filter(function(x){return x.parentNode==tr}).map(async function(x){op[x.getAttribute("name")] = x.innerHTML});
																//TintOS.menu(op,{explore:true});
																//if(op.null){return};
																st.put(op);
																return op;
															})
														}
													},{message:(DB.name +": " +osn),input:table,move:0,parent:P});
													
											}
										},{message:(DB.name +": "+ osn),input:div,move:0,parent:P});
									},
									"Delete Store":{"Delete Object Store?":function(e){
										upgrade(function(db){db.deleteObjectStore(OS.name);});
									}}
								},{message:("Object Store: "+osn),value:JSON.stringify(evt.target.result[0]),parent:P});
								};
								if(store(osn).count==0){msg({target:{result:[{}]}})}else{store(osn).getAll(undefined,1).onsuccess = msg};
								//////TintOS.menu(OS,{explore:true,parent:P});
							};
						};
						DBbtns["Delete"] = {"Delete Database?":function(e){indexedDB.deleteDatabase(DB.name).onsuccess(function(e){TintOS.alert((DB.name + " Deleted"),{parent:P})})}};
						TintOS.menu(DBbtns,{parent:P});
					};
				};
			});
			
			TintOS.menu(btns,{parent:P});
		});
	}},
	////// Game
	"game>button[move='M']":{click:function(e){
		var P = e.target.parentNode;
		if(P.data==undefined){P.data = {decel:0.999,gravity:1,wind:0};};
		P.gameEvent = {collide:[]};
		if(P.objects==undefined){P.objects = []};
		P.addObjects = function(Nodes,opt2){
			Nodes.filter(function(n){return n.getAttribute("move")!="M"}).map(function(x){
				var opt = TintOS.setDefaults(opt2,{velocity:[10,-10],bounce:0.8,friction:0.8,density:1});
				if(x.hasAttribute("gameObject")){
					var att = x.getAttribute("gameObject").split(";").map(function(x){let X = x.split(",").map(Number);if(X.length==1){X = X[0]};return X});
					opt = lambda(function(x,k,d){return att.shift()},opt);
				};
				x.vel = opt.velocity;
				x.bounce = opt.bounce;
				x.friction = opt.friction;
				x.density = opt.density;
				x.lastPos = [x.offsetLeft,x.offsetTop];
				P.objects.push(x);
				[x].set({move:0,gameObject:(opt.velocity.join(",")+";"+opt.bounce+";"+opt.friction+";"+opt.density)});
				return x;
			});	
		};
		P.updatePos = function(e){
			//P.pos = [[e.touches[0].clientX,e.touches[0].clientY]]
		},
		P.updateVel = async function(){
			P.objects.filter(function(x){return x.getAttribute("move") == "1"}).map(function(x){
				x.vel = [x.offsetLeft - x.lastPos[0],x.offsetTop - x.lastPos[1]];
				x.lastPos = [x.offsetLeft,x.offsetTop];
			});
		};
		P.updatePhysics = async function(){
			P.objects.filter(function(x){return x.getAttribute("move") != "1"}).map(function(x){
				x.style.left = (x.offsetLeft + x.vel[0]) + "px";
				x.style.top = (x.offsetTop + x.vel[1]) + "px";
				if(x.offsetLeft <= 0){
					x.style.left = "0px";
					x.vel[0] = Math.abs(x.vel[0]) * x.bounce;
					x.vel[1] *= x.friction;
				}else if(x.offsetLeft >= (x.parentNode.offsetWidth-x.offsetWidth)){
					x.style.left = (x.parentNode.offsetWidth-x.offsetWidth)+"px";
					x.vel[0] = -Math.abs(x.vel[0]) * x.bounce;
					x.vel[1] *= x.friction;
				};
				if(x.offsetTop <= 0){
					x.style.top = "0px";
					x.vel[1] = Math.abs(x.vel[1]) * x.bounce; 
					x.vel[0] *= x.friction;
				}else if(x.offsetTop >= (x.parentNode.offsetHeight-x.offsetHeight)){
					x.style.top = (x.parentNode.offsetHeight-x.offsetHeight)+"px";
					x.vel[1] = -Math.abs(x.vel[1]) * x.bounce;
					x.vel[0] *= x.friction;
				};
				x.vel[0] *= P.data.decel;
				x.vel[1] *= P.data.decel;
				x.vel[0] += P.data.wind;
				x.vel[1] += P.data.gravity;
			});
			P.objects.sortBy("offsetTop").each(function(x,i,d){d.slice(i+1).filter(function(y){return ((x.offsetTop+x.offsetHeight)>=y.offsetTop) && x.parentNode==y.parentNode}).filter(function(y){return (y.offsetLeft+y.offsetWidth>=x.offsetLeft) && (y.offsetLeft<=(x.offsetLeft+x.offsetWidth))}).map(function(y){
				let flip = false, xv0 = x.vel[0],xv1 = x.vel[1], yv0 = y.vel[0],yv1 = y.vel[1],B = x.bounce * y.bounce, F = (x.friction*y.friction), xMass = x.offsetWidth*x.offsetHeight*x.density, yMass = y.offsetWidth*y.offsetHeight*y.density;
				//if(y.offsetLeft<x.offsetLeft){flip=true;var X = x;x=y;y=X};
				if((Math.abs(y.offsetTop-(x.offsetTop+x.offsetHeight))>=(xv1-yv1+20))){
					if(y.offsetLeft<x.offsetLeft){flip=true;var X = x;x=y;y=X};
					let lD = x.offsetLeft + x.offsetWidth - y.offsetLeft;
					x.style.left = (x.offsetLeft - lD/2) + "px";
					y.style.left = (y.offsetLeft +1+ lD/2) + "px";
					x.vel[0] = (yv0*B*(yMass/xMass));
					y.vel[0] = (xv0*B*(xMass/yMass));
					x.vel[1] = (((1-F)*yv1)+(F*xv1));
					y.vel[1] = (((1-F)*xv1)+(F*yv1));
				};
				if((Math.abs(y.offsetLeft-(x.offsetLeft+x.offsetWidth))>=(xv0-yv0+20))){
					if(flip){var X = x;x=y;y=X}
					let tD = x.offsetTop + x.offsetHeight - y.offsetTop;
					x.style.top = (x.offsetTop -1- tD/2) + "px";
					y.style.top = (y.offsetTop + tD/2) + "px";
					x.vel[1] = (yv1*B*(yMass/xMass));
					y.vel[1] = (xv1*B*(xMass/yMass));
					x.vel[0] = (((1-F)*yv0)+(F*xv0));
					y.vel[0] = (((1-F)*xv0)+(F*yv0));
				};
				P.gameEvent.collide.map(function(f){return (x.tagName<y.tagName)?f(x,y):f(y,x)});
			})});
		};
		if(P.gameAction==undefined){P.gameAction = setInterval(async function(){P.updateVel();P.updatePhysics();},33);}
		TintOS.menu({
			Sandbox:{		//// velocity; bounce; friction; density
				"Ball":function(e){P.addObjects(Make(["ball"],{move:0,gameObject:"10,-10;0.9;0.9;0.5"},{},"",P));},
				"Box":function(e){P.addObjects(Make(["box"],{move:0,gameObject:"0,0;0.1;0.7;0.2"},{},"",P));},
				"Brick":function(e){P.addObjects(Make(["brick"],{move:0,gameObject:"0,0;0.2;0.5;0.9"},{},"",P));},
			},
			eHockey:function(e){
				P.data.gravity = 0;
				P.addObjects([Make("ball",{gameObject:"0,0;1;0.5;1",style:"background:black;border:solid white"},{},"",P),
				Make("box",{gameObject:"0,0;0;0;100",style:"background:red;top:25%;height:50%;width:2%;left:100%"},{},"0",P),
				Make("box",{gameObject:"0,0;0;0;100",style:"background:blue;top:25%;height:50%;width:2%;left:0px"},{},"0",P),
				Make("brick",{gameObject:"0,0;1;0.5;2",style:"background:red;right:30%"},{},"",P),
				Make("brick",{gameObject:"0,0;1;0.5;2",style:"background:blue;left:30%"},{},"",P),]);
				P.gameEvent.collide.push(function(x,y){if(x.tagName=="BALL"){
					if(y.tagName=="BOX"){
						[x].set({style:"top:45%;left:45%;border:solid white;background:"+y.style.background});
						y.innerHTML=Number(y.innerHTML)+1;
					};
					if(y.tagName=="BRICK"){x.vel = y.vel};
				}});
			},
			"Ball Breaker":function(e){
				P.data.gravity = 0;
				P.addObjects(Make(["box"].copy(20),{gameObject:"0,0;1;1;1",style:"background:white;width:20%;height:10%;left:0%;top:0%"},{},"",P));
				P.addObjects([Make("ball",{gameObject:"0,0;1;1;1",style:"background:blue;border:solid white"},{},"",P),
				Make("brick",{gameObject:"0,0;1;1;1",style:"background:black;top:90%;height:5%;width:40%;left:30%"},{},"",P),
				Make("brick",{gameObject:"0,0;0;0;10",style:"background:red;top:99%;height:1%;width:100%;left:0%",name:"floor"},{},"",P)]);
				P.gameEvent.collide.push(function(x,y){
					if(x.tagName == "BALL"){
						if(y.tagName == "BOX"){[y].set({},{},"",x)};
						if(y.tagName == "BRICK"){
							if(y.getAttribute("name")=="floor"){
								Find("*",undefined,x).set({},{},"X",x.parentNode)
							}else{
								x.vel = [y.vel[0],-Math.abs(x.vel[1])];
							}
						}else{x.vel = [y.vel[0],10];};
					};
				});
			},
			Options:{
				"Add":{
					"Selected":function(e){P.addObjects(Find("*[move='1']"))},
					"Game Objects":function(e){P.addObjects(Find("*[gameObject]"))},
					"Game Area":{
						"All":function(e){P.addObjects(Find("*",undefined,P).slice(1))},
						"Top":function(e){P.addObjects(Find("game>*",undefined,P).slice(1))}
					}
				},
				"Globals":function(e){
					let div = Make("div",{move:"M",style:"position:relative"});
					TintOS.message({Set:function(e){Find("input",undefined,e.input).map(function(x){P.data[x.name] = Number(x.value)})}},{message:"Set Global Variables",input:div,parent:P});
					lambda(function(x,k,d){Make("b",{move:"M",style:"position:relative"},{},k,div);Make("input",{move:"M",name:k,value:x,style:"position:relative"},{},"",div);Make("br",{},{},"",div);},P.data);
				},
				"(Un)Pause":function(e){if(P.gameAction=="paused"){P.gameAction = setInterval(function(){P.updateVel();P.updatePhysics();},33);}else{clearInterval(P.gameAction);P.gameAction = "paused"}},
				"Clear Data":function(e){P.objectsn=[];P.gameEvent = {collide:[]}},
				"Clear Game":function(e){Find("*",undefined,P).slice(1).removeNodes()}
			}
		},{parent:P});
	}},
	"game":{
		touchstart:function(e){e.currentTarget.RF = TintOS.RF;TintOS.RF*=10;},
		touchend:function(e){TintOS.RF = e.currentTarget.RF},
		touchmove:function(e){e.currentTarget.updatePos(e)}
	},
	"game *[gameObject]":{
		touchstart:function(e){},
		touchend:function(e){[e.currentTarget].set({move:0})},
		touchmove:function(e){[e.currentTarget].set({move:1})},
		"mousedown":function(e){TintOS.touch.active = true; e.touches = [e] ;TintOS.touch.targets = [e.target] ;TintOS.eventSheet["game *[gameObject]"].touchstart(e);TintOS.eventSheet["game"].touchstart(e)},
		"mousemove":function(e){if(TintOS.touch.active == true){e.touches = [e]; e.touches[0].target = TintOS.touch.targets[0] ;TintOS.eventSheet["game *[gameObject]"].touchmove(e);TintOS.eventSheet["game"].touchmove(e)}},
		"mouseup":function(e){TintOS.touch.active = false; e.touches = [e]; TintOS.touch.targets = [] ;TintOS.eventSheet["game *[gameObject]"].touchend(e);TintOS.eventSheet["game"].touchend(e)}
	},
	/*"":{},
	"":{},*/
	////// Index
	"index":{
		focus:function(e){
			let tag = e.currentTarget.getAttribute("tag");
			if(e.target==e.currentTarget){
				Find(tag+",i",undefined,e.target).removeNodes();
				let makeLink = function(x){
					if(x.tagName=="DIV"){
						let dt = Make("i",{move:"L",tabIndex:0},{},x.getAttribute("name")+" +",e.target);
						for(let i in x.children){[makeLink(x.children[i])].set({},{},undefined,dt)};
						//return lambda(makeLink,x.children,Array).set({},{},undefined,dt);
					}else{
						return Make(tag,{move:"L",tabIndex:0,onclick:"location.hash='"+escape(x.innerHTML)+"';"},{},x.innerHTML,e.target);
					};
				};
				for(let i in e.target.children){makeLink(e.target.children[i])};
			}else{
				
			};
		},
		"click":function(e){
			let P = e.currentTarget.parentNode;
			if(e.target==e.currentTarget&&e.target.f){e.target.blur();e.target.f=false}else{e.target.f=true};
			switch(e.target.getAttribute("name")){
				case "options":
					let editBtns = {},
						eM = function(btn){
							TintOS.message({
								"Set":function(E){
									let att = E.input.value.split("\n=>\n");
									[btn].set({"onclick":att.slice(1).join("")});
									btn.innerHTML = att[0];
								},
								"Delete":{"Confirm Delete":function(E){[btn].removeNodes()}}
							},{value:btn.innerHTML+"\n=>\n"+btn.getAttribute("onclick"),parent:P});
						};
					Find("button",undefined,e.currentTarget).map(function(x){editBtns[x.innerHTML]=function(E){eM(x)}});
					let m = {
						"Add":{
							"Custom":function(E){eM(Make("button",{move:0,onclick:'TintOS.alert(range("a","Z").random(10))'},{},"New Hash Code",e.target.parentNode))},
							"Copy":function(E){TintOS.util.visualSelect({"targets":Find("button[onclick]"),identifier:"innerHTML",multiple:true,action:function(x){
								Make("button",{move:"L",onclick:x.getAttribute("onclick")},{},x.innerHTML,e.target.parentNode);
							}})}
						},
						"Edit":editBtns,
						"Reorder":function(E){
							let struct = Find("index>div,index>button",undefined,e.target.parentNode);
							e.target.parentNode.focus();
							if(struct[0].style.cssText==""){
								Find("index>i,index>"+e.target.parentNode.getAttribute("tag"),undefined,e.target.parentNode).removeNodes();
								struct.set({style:"display:block"});
								struct.forEach(function(x,i){x.style.top = ((i+2)*30)+"px"});
								let g = {"Add Group":function(E){Make("div",{name:E.input.value,style:"display:block",move:0,tabIndex:0},{},E.input.value+": ",e.target.parentNode).focus();TintOS.menu(g,{input:true,placeholder:"Name",parent:P});},"Confirm":m["Reorder"]};
								TintOS.menu(g,{input:true,placeholder:"Name",parent:P});
							}else{
								struct.sortBy(function(x){return Number(x.offsetTop)}).set({},{},"",e.target.parentNode);
								struct.set({style:""});
								e.target.parentNode.blur();
								e.target.parentNode.focus();
							};
						}
					};
					TintOS.menu(m,{parent:P});
				break;
			};
		}
	},
	////// Media
	"media>button":{
		click:function(e){
			var P = e.target.parentNode,
			addP = function(e){
				let M = Make(e.target.innerHTML,{move:"L"},{},"",P);
				["loop","autoplay","controls","muted"].map(function(x){if(P.hasAttribute(x)){M.setAttribute(x,"")}});
				var V = Find("img,audio,video",undefined,P);
				var D = (100/Math.floor(Math.sqrt(V.length)))+"%"
				V.map(function(x){x.style.width=D});
				/*window.mediaManager = new cast.receiver.MediaManager(M);
				window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
				window.castReceiverManager.start();
			*/},
			loadT = function(e){
				let mS = undefined;
				switch(e.target.innerHTML){case "All URLs":mS=0;break;case "No URLs":mS=9999999999999999999;break;};
				TintOS.load({maxSize:mS,callback:function(data,type,result,file){
					if(type=="image"){type="img"};
					if(type!="img"&&type!="audio"&&type!="video"){type="iframe"};
					Make("option",{value:data},{},file.name,Find("select[name='"+type+"']",undefined,P)[0]);
				}})
			},
			addList={};
			Find("select[name]","name",P).map(function(x){addList[x]=addP});
			TintOS.menu({
				"Add Player":addList,
				"Load Tracks":{"Auto":loadT,"All URLs":loadT,"No URLs":loadT},
				/*
				"New Tracks":function(e){
					var addT = function(evt){
						let tracks = {}, i = 0;
						evt.input.value.split("\n").map(function(x){
							let data = x.split("::");
							if(data.length==1){data.unshift(i++)};
							Make("option",{value:data[1]},{},data[0],Find("select[name='"+evt.target.innerHTML+"']",undefined,P)[0]);
						});
						
					};
					TintOS.message({img:addT,audio:addT,video:addT},{message:"Add Media URL",placeholder:"Name::URL per each line"});
				},
				*/
				"Edit Tracks":function(e){
					var bList={};
					Find("select[name]",undefined,P).map(function(x){
						bList[x.name]=function(e){TintOS.util.optEdit(x,{message:"Edit Media",skip:1,parent:P})};
					});
					TintOS.menu(bList,{parent:P});
				},
				"Delete Tracks":{
					"Delete All?":function(e){
						Find("select[name]",undefined,P).map(function(x){
							x.innerHTML = x[0].outerHTML;
						});
					}
				},
				"Row Count":function(e){TintOS.message({"Set":function(e){
					Find("video,img,iframe,embed",undefined,P).set({"style":("width:"+(100/Number(e.input.value))+"%")})
				}},{parent:P,"input":Make("input",{"type":"number"})})},
				"(Un)Lock":function(e){
					Find(Find("select[name]","name",P).join(",")).map(function(x){
						if(x.getAttribute("move")=="L"){
							[x].set({move:0,style:"position:absolute"})
						}else{
							[x].set({move:"L",style:""})
						};
					});
				},
				"Slideshow":function(e){
					TintOS.message({
						Set:function(e){
							clearInterval(P.slideshow)
							P. slideshow = setInterval(function(){
								Find("select[name]",undefined,P).map(function(S){
									Find(S.getAttribute("name"),undefined,P).map(function(pl){
										pl.src = S.value;
										S.selectedIndex = (S.selectedIndex+1)%S.length;
									})
								});
							},Number(e.input.value)*1000)
						},
						Clear:function(e){clearInterval(P.slideshow)}
					},{message:"Seconds",value:2,input:Make("input",{type:"number"})});
				},
				"Settings":function(e){
					let SEL = Find("video,audio",undefined,P),
						setATT = function(e){return TintOS.menu({ON:function(evt){SEL.map(function(x){x.setAttribute(e.target.innerHTML,true)})},OFF:function(evt){SEL.map(function(x){x.removeAttribute(e.target.innerHTML)})}})};
					SEL.push(P);
					TintOS.menu({"Playback...":function(e){
						let targets = Find("select",undefined,P).filter(function(x){return x.selectedIndex!=0}).map(function(x){return x[x.selectedIndex]});
						targets.map(function(tar){
							let txt = tar.text,
								pAdd = [],
								inp = Make("p",{style:"width:100%",move:"M"}),
								p = {start:"",stop:"",rate:"",volume:"",filter:""};
							txt = txt.split("{");
							if(txt.length==2){
								txt[1] = txt[1].split("}")[0];
								txt[1].split(",").map(function(x){return x.split("=")}).map(function(x){p[x[0]]=x[1]});
							};
							lambda(function(x,k,d){Make("i",{style:"position:relative;display:block;width:20%",move:"M"},{},k,inp);Make("input",{name:k,value:x,style:"position:relative;width:80%",move:"M"},{},"",inp);},p);
							TintOS.message({Set:function(e){
								Find("input",undefined,inp).map(function(x){if(x.value!=""){pAdd.push(x.name+"="+x.value)}});
								if(pAdd.length>0){tar.text=txt[0]+"{"+pAdd.join(",")+"}"};
							}},{message:(tar.parentNode.name+": "+tar.text.slice(0,15)),input:inp,parent:P});
						});
					},autoplay:setATT,controls:setATT,loop:setATT,muted:setATT,sync:setATT},{parent:P});
				}
			},{parent:P})
		}
	},
	"media>select":{
		"change":function(e){
			let tar = e.target;
			e.target.selectedIndex--;
			let plr = Find(e.target.name,undefined,e.target.parentNode);
			if(plr.length==0){plr = Find("iframe",undefined,e.target.parentNode)};
			plr.map(function(x){
				if(tar.selectedIndex+1==tar.length){tar.selectedIndex=1}else{tar.selectedIndex++};
				[x].set({src:e.target.value});
			});
			TintOS.cast.go(e.target.value);
		}
	},
	"media>img,media>audio,media>video,media>iframe":{
		"dblclick":function(e){
			var tar = Find("option[value='"+e.target.src+"']",undefined,e.target.parentNode)[0].parentNode,
			halfMark = TintOS.util.offsetCrawl(e.target).left+(e.target.offsetWidth/2);
			if(e.clientX>halfMark){tar.selectedIndex++;}else{tar.selectedIndex--};
			[e.target].set({src:tar.value});
			TintOS.cast.go(tar.value);
		},
		"load": function(e){TintOS.eventSheet["media>img,media>audio,media>video,media>iframe"].loadeddata(e)},
		"loadeddata":function(e){
			let tar = e.target,
				P = tar.parentNode,
				txt = Find("option",undefined,P).filter(function(x){return x.getAttribute("value")==tar.getAttribute("src")})[0].text,
				params = txt.split("{"),
				p = {};
			tar.stopTime = 9999999999999999;
			if(params.length==2){
				params = params[1].split("}")[0];
				params.split(",").map(function(x){return x.split("=")}).map(function(x){p[x[0]]=x[1]});
				//TintOS.menu(p,{explore:true});
				if(p.filter){
					tar.style.filter=p.filter;
				};
				if(p.rate){
					tar.playbackRate=Number(p.rate);
				};
				if(p.volume){
					tar.volume=Number(p.volume);
				};
				if(p.stop){
					if(tar.tagName == "VIDEO" || tar.tagName == "AUDIO"){
						tar.stopTime = Number(p.stop);
					}else{
						setTimeout(function(){TintOS.eventSheet["media>img,media>audio,media>video,media>iframe"].ended({target:tar})},Number(p.stop)*1000);
					};
				};
				if(p.start){
					tar.currentTime=Number(p.start);
				};
			};
		},
		"timeupdate":function(e){
			if(e.target.currentTime >= e.target.stopTime){TintOS.eventSheet["media>img,media>audio,media>video,media>iframe"].ended(e)};
		},
		"ended":function(e){
			//var tar = Find("select[name='"+e.target.tagName.toLowerCase()+"']",undefined,e.target.parentNode)[0];
			var tar = Find("option[value='"+e.target.src+"']",undefined,e.target.parentNode)[0].parentNode;
			if(!e.target.hasAttribute("sync")){
				if(tar.selectedIndex+1==tar.length){tar.selectedIndex=1}else{tar.selectedIndex++;};
				[e.target].set({src:tar.value});
			}else{
				Find("select",undefined,e.target.parentNode).map(function(x){x.selectedIndex++});
				Find("img,video,audio",undefined,e.target.parentNode).map(function(x){[x].set({src:Find("select[name='"+x.tagName.toLowerCase()+"']","value",e.target.parentNode)[0]})});
			};
			TintOS.cast.go(tar.value);
		}
	},
	////// Remote
	"remote button[move='M']":{"click":function(e){
		Find("video,audio",undefined,e.target.parentNode.parentNode).map(function(x){
			if(x.paused){x.play()}else{x.pause()}
		})
	}},
	"remote button[move='L']":{"click":function(e){
		let MRA = TintOS.record({controls:false,targets:Find("canvas,video,audio",undefined,e.target.parentNode.parentNode)}),
			MR = function(x){MRA.map(function(m){m[x]()})};
		MR("start");
		TintOS.alert({
			Stop:function(e){MR("stop");[e.target.parentNode].removeNodes();delete MRA},
			Pause:function(e){if(e.target.innerHTML=="Pause"){MR("pause");e.target.innerHTML="Resume"}else{MR("resume");e.target.innerHTML="Pause"}}
		},{auto:false,parent:e.target.parentNode.parentNode});
	}},
	"remote select[move='M']":{"change":function(e){
		var V = e.target.value,
		tar = Find("video,audio",undefined,e.target.parentNode.parentNode);
		if(tar[0][V]===false||tar[0][V]===true){tar.map(function(x){x[V]=!x[V]})}else{
			TintOS.message({Set:function(evt){
				tar.map(function(x){
					x[V]=eval(evt.input.value);
				});
			}},{message:V,input:Make("input",{type:"number"}),value:tar[0][V],parent:e.target.parentNode.parentNode});
		}
		e.target.selectedIndex=0;
	}},
	////// Scene
	"scene>button[move='M']":{click:function(e){
		var P = e.target.parentNode,
			C = function(){return Find("*[scene]",undefined,P.parentNode)},
			F = function(x){
				var s = {};
				if(x.hasAttribute("scene")){s = JSON.parse(x.getAttribute("scene"))};
				if(IN.value==""){IN.value="5"};
				s[IN.value]={"style":x.style.cssText,"script":""};
				[x].set({scene:JSON.stringify(s)});
			},
			IN,
			sett = function(evt){TintOS.menu({"Set":function(e){P.setAttribute(evt.target.innerHTML,e.input.value)}},{parent:P,input:true,value:P.getAttribute(evt.target.innerHTML)})};
			TintOS.menu({
				"Play":function(e){
					var t = [],
						maxTime = 0,
						factor = Number(P.hasAttribute("factor")?P.getAttribute("factor"):1)*1000,
						offset = Number(P.hasAttribute("offset")?P.getAttribute("offset"):0)*1000;
					C().map(function(x){
						lambda(function(s,k,d){
							k = eval("let sV = ["+k+"];sV");
							while(k[0].constructor == Array){k = k[0]};
							k.map(function(ki){
								if(Number(ki)>maxTime){maxTime=Number(ki)};
								t.push(setTimeout(function(){
									if(s.style[0]=="{"){
										lambda(function(xs,k,d){x.style[k]=xs},eval("let sv = "+s.style+";sv"))
									}else{
										x.style.cssText = s.style;
									};
									if(s.script.slice(0,8)=="function"){
										eval("let sV = "+s.script+";sV")(x,ki,d,e);
									}else{eval(s.script)};
								},Number(ki)*factor-offset));
							});
						},JSON.parse(x.getAttribute("scene")));
					});
					TintOS.alert({"Stop":function(e){t.map(function(x){clearInterval(x)});[e.target.parentNode].removeNodes()}},{parent:P,delay:(maxTime*Number(P.getAttribute("factor")))});
				},
				"Add":{
					"Selected":function(e){IN=e.input;Find("*[move='1']",undefined,P.parentNode).map(F)},
					"Visual":function(e){
						IN=e.input;
						TintOS.util.visualSelect({title:("Add at "+IN.value+" Seconds"),targets:Find("*",undefined,P.parentNode),action:F})
					}
				},
				"Edit":function(e){
					TintOS.util.visualSelect({title:"Scene Edit",targets:C(),action:function(x){
						var s = JSON.parse(x.getAttribute("scene"));
						TintOS.menu({
							"Set":function(e){x.setAttribute("scene",JSON.stringify(s))},
							"Edit":s
						});
					}});
				},
				"Settings":{
					"factor":sett,
					"offset":sett
				}
			},{input:Make("textarea"),placeholder:"Seconds: Number / Array / JS",parent:P});
	}},
	////// Studio
	"studio>button[move='M']":{click:function(e){
		var P = e.target.parentNode,
			C = Find("canvas",undefined,P)[0],
			S = Find("canvas,video,img",undefined,P).slice(1);
			//tempVid = Make("video",{src:"data:video/mp4;base64",style:"position:absolute;display:none"},{},"",P);  
		if(P.srcObject==undefined){
			//if(false || Find("video,audio",undefined,P).length==0){
				//P.audio.createMediaElementSource(Make("video",{src:"data:video/mp4;base64",style:"display:none"},{},"",P)).connect(P.audioMerger);
				//setTimeout(function(){[tempVid].removeNodes()},3000);
			//};
			P.srcObject = C.captureStream();
			//console.log(P.srcObject);
			P.audio = new AudioContext();
			P.audioNode = P.audio.createMediaStreamDestination();
			P.audioMerger = P.audio.createChannelMerger(32);
			P.audioMerger.connect(P.audioNode);
			P.audioNode.stream.getAudioTracks().forEach(function(x){
				P.srcObject.addTrack(x);
			});
			//[P.srcObject,P.audio,P.audioNode,P.audioMerger].check();
			setTimeout(function(){
				P.audio.createMediaElementSource(Make("video",{src:"data:video/mp4;base64",style:"display:none"},{},"",P)).connect(P.audioMerger);
				//P.audio.createMediaElementSource(tempVid).connect(P.audioMerger);
				//[tempVid].removeNodes();
			},3000);
			//TintOS.util.menuCrawl(["|||","Set","Audio"],{parent:P});
			C.ctx = C.getContext("2d",{willReadFrequently:true});
			P.play = function(o){Find("video,audio",undefined,P).map(function(x){x.play(o)})};
			P.pause = function(o){Find("video,audio",undefined,P).map(function(x){x.pause(o)})};
			P.frame = async function(){
				if(P.parentNode==null){P.audio.close();P.srcObject=undefined;window.clearInterval(P.shutter);};
				if(C.scale==undefined){C.scale = [1,1]};C.ctx.scale(C.scale[0],C.scale[1]);
				C.scale = [Number(C.width/C.offsetWidth),Number(C.height/C.offsetHeight)];
				C.ctx.scale(C.scale[0],C.scale[1]);
				C.scale = [Number(C.offsetWidth/C.width),Number(C.offsetHeight/C.height)];
				if(P.customBG!=undefined){
					C.ctx.putImageData(P.customBG,0,0);
				}else{
					C.ctx.clearRect(0,0,C.offsetWidth,C.offsetHeight);
				};
				let cOff = TintOS.util.offsetCrawl(C);
				Find("canvas,video,img,input",undefined,P).slice(1).filter(function(x){
					if(x==undefined){return false};
					x.oC = TintOS.util.offsetCrawl(x);
					return !(
						(x.oC.top>(cOff.top+C.offsetHeight+20)) ||
						(x.oC.left>(cOff.left+C.offsetWidth+20)) ||
						(cOff.top>(x.oC.top+x.offsetHeight+20)) ||
						(cOff.left>(x.oC.left+x.offsetWidth+20))
					);
				}).sortBy(function(x){if(x.getAttribute("move")=="L"){return Number(x.parentNode.style.zIndex)}else{return Number(x.style.zIndex)}}).map(function(x){
					//let xOff = TintOS.util.offsetCrawl(x);
					let xOff = x.oC;
					C.ctx.filter="none";
					C.ctx.filter=x.style.filter;
					switch(x.tagName){
						default:
							C.ctx.drawImage(x,(xOff.left - cOff.left),(xOff.top - cOff.top),x.offsetWidth,x.offsetHeight);
						break;
						case "INPUT":
							C.ctx.font = x.style.font;
							C.ctx.fillStyle = x.style.color;
							C.ctx.fillText(x.value,(xOff.left - cOff.left),(xOff.top - cOff.top),x.offsetWidth);
						break;
					}
				});
				P.srcObject.getVideoTracks()[0].requestFrame();
			};
			P.shutter = setInterval(P.frame,Math.floor(1000/Number(P.getAttribute("fps"))));
		};
		var sizes = {"Flip":function(e){
				let CH = C.height;
				C.height = C.width;
				C.width = CH;
				C.scale = undefined; 
			},
			"Custom":function(e){TintOS.menu({Set:function(evt){
				let x = evt.input.value.split(",");
				C.width=x[0];C.height=x[1];
				C.scale = undefined;
			}},{input:true,placeholder:"Width,Height",parent:P})}};
		[[360,240],[480,360],[720,480],[1280,720],[1920,1080],[3840,2160],[7680,4320]].map(function(x){
			sizes[x[1]]=function(e){
				C.width=x[0];C.height=x[1];
				//P.srcObject = undefined;
				C.scale = undefined;
			}
		});
		var GCO = {};
		["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","xor"].map(function(x){
			GCO[x]=function(e){C.ctx.globalCompositeOperation=x}
		});
		
		TintOS.menu({
			"Record":function(e){TintOS.record({targets:[P]})},
			"Stream":{
				"View":function(e){Make("video",{move:0,autoplay:true}).srcObject=P.srcObject},
				"Stop":function(e){clearInterval(P.shutter),P.srcObject=undefined}
			},
			"Set":{
				"Background":function(e){P.customBG=C.ctx.getImageData(0,0,C.width,C.height)},
				"As Camera":function(e){TintOS.user.camera=P.srcObject},
				"Size":sizes,
				"FPS":function(e){
					TintOS.menu({Set:function(e){
						[P].set({"fps":e.input.value});
						clearInterval(P.shutter);
						P.shutter = setInterval(P.frame,Math.floor(1000/Number(P.getAttribute("fps"))));
					}},{placeholder:"Frames Per Second",input:true,value:P.getAttribute("fps")})
				},
				"Composition":GCO,
				"Audio":function(e){
					TintOS.util.visualSelect({targets:Find("video,audio").filter(function(x){return x.audioMergedStudio!=true}),action:function(x){
						x.audioMergedStudio=true;
						if(x.src){
							P.audio.createMediaElementSource(x).connect(P.audioMerger);
						}else{
							let xStream = (x.srcObject)?x.srcObject:x.captureStream();
							P.audio.createMediaStreamSource(xStream).connect(P.audioMerger);
						};
					},title:"Select Audio Sources"});
					/*
					TintOS.alert("Due to a new glitch, only 1 audio may be selected until fixed",{to:"top:50px"});
					TintOS.util.visualSelect({targets:Find("video,audio",undefined,P).filter(function(x){return x.audioMerged!=true}),action:function(x){
						
						x.audioMerged=true;
						P.audio.createMediaElementSource(x).connect(P.audioMerger);
						
						console.log(P.audio);
						
						P.srcObject.getAudioTracks().forEach(function(t){P.srcObject.removeTrack(t)});
						x.srcObject.getAudioTracks().forEach(function(t){
							P.srcObject.addTrack(t)
						});
						
					},title:"Select Audio Feeds",multiple:false});
					
					
					Find("video,audio",undefined,P).filter(function(x){return x.audioMerged!=true}).map(function(x){
						x.audioMerged=true;
						P.audio.createMediaElementSource(x).connect(P.audioMerger);
					});
					*/
				}
			},
			"Tools":{
				"Fit Selected":function(e){Find("*[move='1']",undefined,P).set({style:"top:10%;left:10%;width:"+C.offsetWidth+"px;height:"+C.offsetHeight+"px"})},
				"Take Picture":function(e){TintOS.browser({},{src:C.toDataURL()})},
				"Add Input":function(e){
					TintOS.menu({
						"Create Input":function(e){Make("input",{value:e.input.value,style:"height:30px;font:30px Chicago;color:orange",move:0},{touchmove:function(e){e.target.style.fontSize=e.target.offsetHeight+"px"}},"",P)}
					},{input:true,placeholder:"default text...",parent:P});
				},
				"Clear Background":function(e){P.customBG=undefined}
			}
		},{parent:P});
	}},
	////// Synth
	"synth>button[move='M']":{"click":function(e){
		var P=e.target.parentNode;
		var A=Find("audio",undefined,P)[0],
		C=Find("canvas",undefined,P)[0];
		if(P.srcObject==undefined){
			C.ctx = C.getContext("2d",{willReadFrequently:true});
			var cStream = C.captureStream(),
			AC = new AudioContext();
			var aStream = AC.createMediaStreamDestination();
			A.srcObject=aStream.stream;
			A.play();
			P.timers = {t:[],i:[]};
			P.srcObject=cStream;
			P.audioNode=AC.createChannelMerger(32);
			P.filter = {
				"convolver":AC.createConvolver(),
				"compressor":AC.createDynamicsCompressor(),
				"biquad":AC.createBiquadFilter(),
				//"IIR":AC.createIIRFilter([1],[1]),
				"delay":AC.createDelay(150),
				"gain":AC.createGain()
			};
			P.filter.biquad.frequency.value = 24000;
			//P.audioFilter=AC.createBiquadFilter();
			//P.audioFilter=AC.createIIRFilter([1],[1]);
			//TintOS.menu(P.filter,{explore:true});
			//P.filter.convolver.buffer = AC.createBuffer(2,22050,44100);
			//P.audioNode.connect(P.filter.convolver);
			//P.filter.convolver.connect(P.filter.biquad);
			P.audioNode.connect(P.filter.biquad);
			P.filter.biquad.connect(P.filter.compressor);
			//P.filter.compressor.connect(aStream);
			P.filter.compressor.connect(P.filter.delay);
			P.filter.delay.connect(P.filter.gain);
			P.filter.gain.connect(aStream);
			A.srcObject.getAudioTracks().forEach(function(x){
				cStream.addTrack(x);
			});
			//P.filter.delay.delayTime.value = 5;
			//P.biquadFilter = AC.createBiquadFilter();
			//P.audioNode.connect(P.biquadFilter);
			//P.biquadFilter.connect(aStream);
			//P.biquadFilter.type = "highpass";
			P.context=AC;
			//// Analyser
			P.analyser = AC.createAnalyser();
			//P.analyser.fftSize = 256;
			P.filter.gain.connect(P.analyser);
			//P.analyser.smoothingTimeConstant = 0;
			//P.analyser.maxDecibels = -10;
			let hW = C.width/2,
				hH = C.height/2,
				PI2 = Math.PI*2,
				rSet = range(-1,1,0.5);
			P.v = P.hasAttribute("visualizer")?JSON.parse(P.getAttribute("visualizer")):{"type":4,"color":"orange","size":1,"factor":C.height/256,precision:2,"filter":"none"};
			P.visFunc = async function(){
				let bufferSize = P.analyser.frequencyBinCount,
					aData = new Uint8Array(bufferSize),
					WBDiff = C.width/bufferSize,
					factor = P.v.factor/2;
				//P.analyser.getByteFrequencyData(aData);
				P.analyser.getByteTimeDomainData(aData);
				//if(aData[0]==aData[1]&&aData[0]==aData[2]){aData = new Uint8Array(0)};
				//TintOS.menu({"byteData":aData},{explore:true});
				C.ctx.fillStyle = P.v.color;
				C.ctx.strokeStyle = P.v.color;
				C.ctx.filter = P.v.filter;
				C.ctx.clearRect(0,0,C.width,C.height);
				C.ctx.lineWidth = P.v.size;
				//C.ctx.rotate(45*Math.PI/180);
				//C.ctx.globalCompositionOperation = P.v.GCO;
				C.ctx.beginPath();
				C.ctx.moveTo(-P.v.size,C.height/2);
				switch(P.v.type){
					case 1:for(let i=0;i<bufferSize;i+=P.v.precision){C.ctx.lineTo(i*WBDiff,aData[i]*P.v.factor)};break;
					case 2:for(let i=0;i<bufferSize;i+=P.v.precision){C.ctx.fillRect(i*WBDiff,aData[i]*P.v.factor,P.v.size,P.v.size)};break;
					case 3:for(let i=0;i<bufferSize;i+=P.v.precision){C.ctx.fillRect(i*WBDiff,0,P.v.size,aData[i]*P.v.factor)};break;
					case 4:for(let i=0;i<bufferSize;i+=P.v.precision){C.ctx.arc(i*WBDiff,hH,aData[i]*factor,0,PI2)};break;
					case 5:C.ctx.moveTo(hW,hH);for(let i=0;i<bufferSize;i+=P.v.precision){C.ctx.lineTo(hW+WBDiff*aData[i]*P.v.factor*rSet[i%rSet.length],hH+aData[i]*factor*rSet.random())};break;
					
				};
				C.ctx.stroke();
				//C.ctx.drawImage(C,-bufferSize,0);
			};
			P.visualizer = setInterval(P.visFunc,1000/30);
			P.key = [""].copy(10).map(function(x){
				let OSC = P.context.createOscillator();
				OSC.type="sine";
				OSC.frequency.setValueAtTime(0,0);
				//OSC.connect(P.audioNode);
				OSC.gain = P.context.createGain();
				OSC.connect(OSC.gain);
				//OSC.gain.connect(P.audioNode);
				OSC.sP = P.context.createStereoPanner();
				OSC.gain.connect(OSC.sP);
				OSC.sP.connect(P.audioNode);
				OSC.start();
				return OSC;
			});
		};
		let sett = function(e){TintOS.message({Set:function(evt){P.setAttribute(e.target.innerHTML,evt.input.value)}},{message:e.target.innerHTML,value:P.getAttribute(e.target.innerHTML),placeholder:({
			"offset":"Lowest Note Frequency/Offset All Frequencies",
			"harmonic":"Multiplier for Frequencies",
			"riff":"seconds until it repeats"
		})[e.target.innerHTML]})};
		TintOS.menu({
			"Start":function(e){
				P.context.resume();
				var mod={};
				["harmonic","offset"].map(function(x){mod[x]=Number(P.getAttribute(x))})
				Find("note",undefined,P).map(async function(n){
					var OSC = P.context.createOscillator(),
					gain = P.context.createGain(),
					melody = eval("'"+n.getAttribute("melody")+"'"),
					/*compressor = P.context.createDynamicsCompressor(),*/
					stereoPanner = P.context.createStereoPanner();
					n.context = OSC;
					melody = (melody[melody.length-1]=="}")?eval("let synthEval = "+melody+";synthEval"):eval(melody);
					gain.gain.setValueAtTime(Number(n.getAttribute("gain")),0);
					stereoPanner.pan.setValueAtTime(Number(n.getAttribute("stereoPanner")),0);
					OSC.type=n.getAttribute("type");
					var gSlope = (n.offsetWidth/n.offsetHeight);
					var TR=range(n.offsetLeft,(n.offsetLeft+n.offsetWidth),gSlope);
					switch(n.getAttribute("glide")){
						default:TR=[0].copy(TR.length);break;
						case "-1":TR=TR.reverse();
						case "1":;
					};
					TR.forEach(function(t,i,r){
						TR[i] = [((((i*gSlope)*(n.offsetHeight/n.offsetWidth))+n.offsetTop+mod.offset)*mod.harmonic),t];
					});
					//Make("paper",{},{},TR[0]);
					switch(melody.constructor){
						case Object:
							TR = [TR[0]];
							lambda(function(x,k,d){
								TR.push([Number(x)+TR[0][0],Number(k)+TR[0][1]])
							},melody);
						break;
						case String:
							melody = melody.split(",");
						case Array:
							TR.forEach(function(x,i,d){
								TR[i][0]=x[0]+Number(melody[Math.floor(i*(melody.length/d.length))]);
							});
						break;
						case Function:
							TR.forEach(function(x,i,d){TR[i][0] = melody(x[0],i,d,i/gSlope,n)});
						break;
					};
					TR.forEach(function(x,i,d){TR[i][0]=Math.floor(x[0])});
					//Make("paper",{},{},TR[0]);
					TR.forEach(function(t,i,r){
						OSC.frequency.setValueAtTime(t[0],t[1]+P.context.currentTime);
					});
					/*lambda(function(x,k,d){compressor[k]=x},JSON.parse(n.getAttribute("compressor")));*/
					OSC.connect(gain);
					/*compressor.connect(gain);*/
					gain.connect(stereoPanner);
					stereoPanner.connect(P.audioNode);
					OSC.start(n.offsetLeft+P.context.currentTime);
					OSC.stop(n.offsetLeft+n.offsetWidth+P.context.currentTime);
					//n.style.background="";
					P.timers.t.push(setTimeout(function(){n.style.background="rgba(0,255,0,0.7)"},n.offsetLeft*1000));
					P.timers.t.push(setTimeout(function(){n.style.background=""},(n.offsetLeft+n.offsetWidth)*1000));
				});
				var clock=Make("clock",{move:"L"},{},"0:00",P);
				P.timers.i.push(setInterval(async function(){
					clock.style.left=clock.offsetLeft+1+"px";
					let cData = {min:Math.floor(clock.offsetLeft/60),sec:clock.offsetLeft%60};
					if(cData.sec<10){cData.sec="0"+cData.sec};
					clock.innerHTML=(cData.min+":"+cData.sec);
				},1000));
				P.timers.t.push(setTimeout(function(){
					TintOS.util.menuCrawl(["|||","Start"],{parent:P});
				},Number(P.getAttribute("riff"))*1000));
			},
			"Stop":function(e){
				//P.context.suspend();
				Find("note",undefined,P).map(function(n){n.context.stop()});
				/*delete P.context;
				P.srcObject=undefined;
				A.srcObject=undefined;*/
				P.timers.t.map(clearTimeout);
				P.timers.i.map(clearInterval);
				P.timers={t:[],i:[]};
				Find("clock",undefined,P).removeNodes();
				Find("note",undefined,P).map(function(x){x.style.background=""});
			},
			"Record...":{
				"Video":function(e){TintOS.record({"targets":[C]})},
				"Audio":function(e){TintOS.record({"targets":[A]})}
			},
			"Add Note":function(e){Make("note",{move:0,type:"sine",gain:1/*,compressor:JSON.stringify({threshold:0,knee:0,ratio:0,attack:0,release:0})*/,stereoPanner:0,glide:1,melody:"[0]"},{},"",P)},
			"Add Sources":function(e){
				TintOS.util.visualSelect({targets:Find("video,audio").filter(function(x){return x.audioMergedSynth!=true}),action:function(x){
					x.audioMergedSynth=true;
					if(x.src){
						P.context.createMediaElementSource(x).connect(P.audioNode);
					}else{
						let xStream = (x.srcObject)?x.srcObject:x.captureStream();
						P.context.createMediaStreamSource(xStream).connect(P.audioNode);
					};
				},title:"Select Audio Sources"});
			},
			"Filters":{
				"Convolver":{
					"Load":function(e){
						TintOS.load({accept:"audio/*",readAs:"ArrayBuffer",callback:async function(AB){
							P.filter.convolver.buffer = await AC.decodeAudioData(AB);
							P.audioNode.disconnect(P.filter.biquad);
							P.audioNode.connect(P.filter.convolver);
							P.filter.convolver.connect(P.filter.biquad);
						}});
					},
					//"Select":function(){},
					"Normalize":{[P.filter.convolver.normalize?"Turn Off Normalize":"Turn On Normalize"]:function(e){P.filter.convolver.normalize=!P.filter.convolver.normalize}},
					"Clear":function(e){
						P.audioNode.disconnect(P.filter.convolver);
						P.filter.convolver.disconnect(P.filter.biquad);
						P.audioNode.connect(P.filter.biquad);
					}
				},
				"Biquad":function(e){
					let filterForm = Make("form",{"move":"M"}),
						bF = P.filter.biquad,
						bFRanges = {"frequency":" (hz 0+)","detune":" (cents 0+)","Q":" (Quality Factor 0.0001-1000)","gain":" (volume 0+)"};
					Make("select",{"move":"M","style":"position:relative"},{"change":function(e){
						//bF.type = e.target.value;
					}},["lowpass","highpass","bandpass","allpass","lowshelf","highshelf","peaking","notch"].map(function(x){return "<option "+(bF.type==x?"selected ":"")+"value='"+x+"'>"+x+"</option>"}).join(""),filterForm),
					["frequency","detune","Q","gain"].forEach(function(att){
						Make("input",{"move":"M","style":"position:relative","value":bF[att].value,"placeholder":att+bFRanges[att]},{},"",filterForm);
					});
					
					TintOS.menu({
						"Set":function(e){
							bF.type = e.input[0].value;
							["frequency","detune","Q","gain"].forEach(function(att,i){bF[att].value = e.input[i+1].value});
						},
						"Clear":function(e){bF.type="lowpass";bF.frequency.value=24000},
						"Info":function(e){window.open("https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode","info")}
					},{"input":filterForm,"parent":P});
				},
				"Compressor":function(e){
					let filterForm = Make("form",{"move":"M"}),
						cF = P.filter.compressor,
						cFRanges = {"threshold":" -100-0","knee":" 0-40","ratio":" 1-20","attack":" 0-1","release":" 0-1"};
					["threshold","knee","ratio","attack","release"].forEach(function(att){
						Make("input",{"move":"M","style":"position:relative","value":cF[att].value,"placeholder":att+cFRanges[att]},{},"",filterForm);
					});
					
					TintOS.menu({
						"Set":function(e){
							["threshold","knee","ratio","attack","release"].forEach(function(att,i){cF[att].value = e.input[i].value});
						},
						//"Clear":function(e){bF.type="lowpass";bF.frequency.value=24000},
						"Info":function(e){window.open("https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode","info")}
					},{"input":filterForm,"parent":P});
				},
				"Delay":function(e){
					let setDelay = function(e, dVal = 0, CD){
						P.filter.delay.delayTime.value = e.input.value;
						if(CD){P.filter.delay[CD](P.audioNode)};
					};
					TintOS.menu({
						"Set":function(e){setDelay(e,e.input.value)},
						"...as loop":function(e){setDelay(e,e.input.value,"connect")},
						"clear loop":function(e){setDelay(e,e.input.value,"disconnect")}
					},{placeholder:"Delay time in seconds",input:Make("input",{move:"M",type:"number"}),value:P.filter.delay.delayTime.value,parent:P});
				},
				"Gain":function(e){
					TintOS.menu({
						"Set":function(e){P.filter.gain.gain.value = e.input.value}
					},{placeholder:"Volume Factor (multiplier)",input:Make("input",{move:"M",type:"number"}),value:P.filter.gain.gain.value,parent:P});
				}
			},
			"Visualizer":{
				"Set...":P.v,
				"Default":{
					"Save":function(e){P.setAttribute("visualizer",JSON.stringify(P.v))},
					"Clear":function(e){P.removeAttribute("visualizer")}
				},
				"Power":{
					"On":function(e){P.visualizer = setInterval(P.visFunc,1000/30);},
					"Off":function(e){clearInterval(P.visualizer);C.ctx.fillRect(0,0,C.width,C.height)}
				}
			},
			"Settings":{
				"offset":sett,
				"harmonic":sett,
				"riff":sett
			}
		},{parent: P});
	}},
	"synth note":{click:function(e){
		var P=e.target.parentNode,
		E=e.target,
		fOffset=Number(P.getAttribute("offset")),
		fHarmonic=Number(P.getAttribute("harmonic"));
		let sett = function(e){TintOS.message({Set:function(evt){E.setAttribute(e.target.innerHTML,evt.input.value)}},{message:e.target.innerHTML,value:E.getAttribute(e.target.innerHTML),placeholder:({
			"melody":"Object{time:+value}, Array[proportionally +value], Function(value,index,array,seconds,note), or code evaluated into such to chronologically modify the hz",
			"type":"sine | square | sawtooth | triangle | custom",
			"gain":"",
			"stereoPanner":"[-1:1]==(Left:Right)",
			"glide":"[-1,0,1]==(high to low, none, low to high)"
		})[e.target.innerHTML]})};
		TintOS.menu({
			"Set":{
				"Frequency":function(e){TintOS.message({"Set":function(e){
					let val = e.input.value.split(":").map(Number).map(function(x){return x/fHarmonic});
					if(val.length==1){val.push(value[0]+50)};
					E.style.top=val[0]-fOffset+"px";
					E.style.height=val[1]-E.offsetTop-fOffset+"px";
				}},{message:"Set Note Frequency in hz",value:(fHarmonic*(E.offsetTop+fOffset)+":"+(fHarmonic*(E.offsetTop+E.offsetHeight+fOffset))),placeholder:"Low:High"})},
				"Timing":function(e){TintOS.message({"Set":function(e){
					let val = e.input.value.split(":").map(Number);
					if(val.length==1){val.push(value[0]+10)};
					E.style.left=val[0]+"px";
					E.style.width=val[1]-E.offsetLeft+"px";
				}},{message:"Set Note Timing in Seconds",value:((E.offsetLeft)+":"+(E.offsetLeft+E.offsetWidth)),placeholder:"Start:End"})}
			},
			"Settings":{
				"melody":sett,
				"type":sett,
				"gain":sett,
				/*"compressor":sett,*/
				"stereoPanner":sett,
				"glide":sett
			}
		},{parent:P});
	}},
	"synth>canvas":{
		"dblclick":function(e){TintOS.fullScreen(e.target)},
		"click":function(e){
			var P=e.target.parentNode,
			E=e.target;
			let sett = function(e){TintOS.message({Set:function(evt){E.setAttribute(e.target.innerHTML,evt.input.value)}},{message:e.target.innerHTML,value:E.getAttribute(e.target.innerHTML),placeholder:({
				"type":"sine | square | sawtooth | triangle | custom",
				"stereoPanner":"[-1:1]==(Left:Right)",
				"harmonic":"multiplier for frequency"
			})[e.target.innerHTML]})};
			TintOS.menu({
				"Settings":{
					"type":sett,
					"stereoPanner":sett,
					"harmonic":sett
				}
			},{parent:P});
		},
		"touchstart":function(e){
			var P=e.target.parentNode,E=e.target,S={};
			["type","stereoPanner","harmonic"].map(function(s){S[s]=e.target.getAttribute(s).split(",");});
			E.harmonic=S.harmonic.map(Number).copy(Math.ceil(e.touches.length/S.harmonic.length));
			lambda(undefined,e.touches,Array).forEach(function(x,i,d){
				P.key[i].type=S.type.rotate(i)[0];
				P.key[i].sP.pan.setValueAtTime(S.stereoPanner.rotate(i)[0],0);
				P.key[i].frequency.setValueAtTime(x.clientX*E.harmonic[i],0);
				P.key[i].gain.gain.setValueAtTime(1-(x.clientY/document.body.offsetHeight),0);
			});
		},
		"touchmove":async function(e){
			var P=e.target.parentNode,E=e.target;
			lambda(undefined,e.touches,Array).forEach(function(x,i,d){
				P.key[i].frequency.setValueAtTime(x.clientX*E.harmonic[i],0);
				P.key[i].gain.gain.setValueAtTime(1-(x.clientY/document.body.offsetHeight),0);
			});
		},
		"touchend":function(e){
			var P=e.target.parentNode;
			P.key.forEach(function(x,i,d){
				x.frequency.setValueAtTime(0,0);
			});
		},
		"mousedown":function(e){TintOS.touch.active = true; e.touches = [e] ;TintOS.touch.targets = [e.target] ;TintOS.eventSheet["synth>canvas"].touchstart(e)},
		"mousemove":function(e){if(TintOS.touch.active == true){e.touches = [e]; e.touches[0].target = TintOS.touch.targets[0] ;TintOS.eventSheet["synth>canvas"].touchmove(e)}},
		"mouseup":function(e){TintOS.touch.active = false; e.touches = [e]; TintOS.touch.targets = [] ;TintOS.eventSheet["synth>canvas"].touchend(e)}
	}
};