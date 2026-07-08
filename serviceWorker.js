// Copyright Robert Rose "TINTED" 2019-2020, © Tints Tech LLC 2020-2022

const mainCache = "TintOS";
const runCache = "run";
var cFiles = undefined,
	sData = {};
	
self.importScripts("script/Tint.js");

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

const mainCacheURLs = [
  'main.html',
  'manifest.js',
  'terms.html',
  './',
  'style/Style.css',
  'script/Tint.js',
  'script/TintOS.js',
  'script/EventSheet.js',
  'template/TintIndex.html'
];

var sendMessage = async function(data){
	clients.matchAll().then(function(C){C.forEach(function(x){x.postMessage(data);})});
};

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(mainCache).then(function(c){c.addAll(mainCacheURLs)}).then(self.skipWaiting()));
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
    	keys.map(function(c){caches.delete(c)});
    }).then(function(){
    	sendMessage({alert:"<a href='https://docs.google.com/document/d/1M-cskB2fN6KIKMrnCAPn0ZcPuMI54dK3eScTyBCu0rY/edit?usp=drivesdk'>Updated</a>, Reloading...",update:true});
    	return self.clients.claim()
    })
  );
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

self.addEventListener('fetch',function(e){
  if(e.request.method=="POST"){
  	e.respondWith(
  		caches.match("main.html").then(function(mainPage){
  			e.request.formData().then(function(f){
  				//["img","video","audio","misc","title","text","url"]
  				var msg = {};
  				["img","video","audio","misc"].map(function(k){
  					if(f.has(k)){
  						if(!cFiles){cFiles={}};
  						if(!cFiles[k]){cFiles[k]={}};
  						f.getAll(k).map(function(c){cFiles[k][c.name] = c});
  						msg["files"]=cFiles;
  					}
  				});
  				if(f.has("text")){msg["sharedText"] = f.get("text")};
  				setTimeout(function(){
  					sendMessage(msg);
  				},1000);
  			});
  			return mainPage;
  			/*return clients.matchAll({type:"window"}).then(function(C){
  				if(C.length == 0){
  					return  mainPage;
  				}else{
  					return C[0].focus().then(function(x){return x});
  				}
  			})*/
  		})
  	);
  };
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      caches.match(e.request).then(function(cR){
        if(cFiles){setTimeout(function(){sendMessage({files:cFiles})},1000);};
        if(cR){return cR;};
        return caches.open(runCache).then(function(c){
          return fetch(e.request).then(function(r){
            return c.put(e.request, r.clone()).then(function(){return r;});
          });
        });
      })
    );
  }else{
  	
  };
  /*
  
  */
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

self.addEventListener("message",function(e){
	//sendMessage({alert:"received"});
	//if(e.data.get){sendMessage({explore:cFiles});};
	try{
	if(e.data.clearCache){
		caches.keys().then(function(keys){
			let ii=0;
			keys.map(function(c){caches.delete(c);ii++});
			sendMessage({alert:"Caches Cleared: "+ii});
		});
	};
	if(e.data.data){
		//sendMessage({explore:{worker:e.data.data}});
		if(e.data.data.constructor==Object){;
			lambda(function(x,k,d){
				sData[k] = x;
			},e.data.data)
		};
		if(e.data.data=="list"){
			var dList = [];
			lambda(function(x,k,d){dList.push(k)},sData);
			return sendMessage({data:dList})
		};
		if(e.data.data.constructor==String){e.data.data = [e.data.data]};
		if(e.data.data.constructor==Array){
			e.data.data.map(function(x){
				sendMessage({data:sData[x]})
			});
		};
	};
	}catch(err){sendMessage({alert:err})};
});

self.addEventListener("notificationclick",function(e){
	e.notification.action = e.action;
	let notifyInfo = {action:e.notification.action,data:e.notification.data};
	if(notifyInfo.data.options.close){e.notification.close();};
	//e.waitUntil(async function(){return clients.matchAll({type:"window"}).then(function(C){return C.forEach(function(x){return x.focus();})});});
	e.waitUntil(clients.matchAll({type:"window"}).then(function(C){
		//sendMessage({notify:e.notification,explore:e.notification});
		let sm = function(){sendMessage({notify:notifyInfo});};
		if(!notifyInfo.data.options.focus){
			sm()
		}else if(C.length == 0){
			return clients.openWindow("/TintOS").then(function(x){sm(); return x});
		}else{
			return C[0].focus().then(function(x){sm(); return x});
		}
	}));
});