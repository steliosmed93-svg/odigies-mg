const C="odigies-mg-v29";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["manifest.json","icon.svg"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=="GET")return;
 const nav=e.request.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
 e.respondWith(fetch(e.request,nav?{cache:"no-store"}:{cache:"no-cache"}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(nav?"index.html":e.request,cp))}return r}).catch(()=>caches.match(nav?"index.html":e.request).then(r=>r||caches.match("index.html"))))});
