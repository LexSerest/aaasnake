"use strict";var precacheConfig=[["./android-icon-144x144.d2c70875.png","8ee0b33328f6b7ae6af6bd76510562c2"],["./android-icon-192x192.e21a118c.png","46dab03e0e1c3e5e8a66a76f1847036d"],["./android-icon-36x36.d8d72503.png","db5dbd758ee2abc41c0e9238fd7e0eaa"],["./android-icon-48x48.6e37c404.png","2724b20a5accd23d4b224ce780cf0b8c"],["./android-icon-72x72.22521168.png","710b2695c295a5d122135b451aa7cbdd"],["./android-icon-96x96.6ed3e0ae.png","3e11344b1c60c313df870c97a762d3d0"],["./app.0b5fcd24.css","0c5a82e2dc9ac6a3cbd420b1855ab750"],["./app.8a27cd7b.js","0891f2e9cbce28b45ad52135e2efafaa"],["./apple-icon-114x114.a183aed5.png","2a9239a48209de8d3469af6aee4214ae"],["./apple-icon-120x120.00c673fc.png","9018c9e18e2fae6ef174062ca3ff4409"],["./apple-icon-144x144.d2c70875.png","8ee0b33328f6b7ae6af6bd76510562c2"],["./apple-icon-152x152.7a203ea5.png","33120307e778dfc7fa73d3f48d0ddab3"],["./apple-icon-180x180.764b5c47.png","aef7f1b064b49a7a0a45ad4dfea092dc"],["./apple-icon-57x57.747384b6.png","5140cb97b4a8666f18c0d990da9397a4"],["./apple-icon-60x60.4c6d2e4e.png","d030056c57e755de17eb60c45eef9b7e"],["./apple-icon-72x72.22521168.png","710b2695c295a5d122135b451aa7cbdd"],["./apple-icon-76x76.f4dcf7d4.png","ee792bbfffad9f5e03b182ab508f6c0a"],["./favicon-16x16.d4d2f051.png","711af4035c84a720b0407e6ea98b02cb"],["./favicon-32x32.b649bbcc.png","ddd512673b944069df6c11579d149019"],["./favicon-96x96.6ed3e0ae.png","3e11344b1c60c313df870c97a762d3d0"],["./index.html","4c3cedb8c078682c3b7d44dd98402f78"],["./manifest.webmanifest","b30a1d0c416bf7db7f89c50845333c59"],["./ms-icon-144x144.d2c70875.png","8ee0b33328f6b7ae6af6bd76510562c2"],["./pixel.f9b73068.otf","19ed71331e6cfa6a7e6c8cd7fa0b6e8b"]],cacheName="sw-precache-v3-snake-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=n),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,a,t){var c=new URL(e);return t&&c.pathname.match(t)||(c.search+=(c.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var a=new URL(n).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,n){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],a=e[1],t=new URL(n,self.location),c=createCacheKey(t,hashParamName,a,/\.\w{8}\./);return[t.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!n.has(a)){var t=new Request(a,{credentials:"same-origin"});return fetch(t).then(function(n){if(!n.ok)throw new Error("Request for "+a+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(a,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!n.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),n=urlsToCacheKeys.has(a));!n&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("./index.html",self.location).toString(),n=urlsToCacheKeys.has(a)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});