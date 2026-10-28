const C='compass-v24',SHELL=['./','./index.html','./manifest.webmanifest','./icon-v23-192.png','./icon-v23-512.png','./icon-v23-maskable-512.png','./icon-v23-apple-180.png','./favicon-v23-32.png','./favicon-v23-48.png','./vvi/index.json','./bounds/index.json','./bounds/states.json','./roads/index.json','./mx/index.json','./world/countries.json','./world/countries_geo.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL.map(s=>new Request(s,{cache:'reload'})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
// per-state VVI and boundary files (vvi/*_SS.json, bounds/*_SS.json, roads/roads_SS.json) are not precached; the fetch handler caches them at runtime when a route loads them
// network-first for the app shell; API calls (OSRM/TIGERweb/Nominatim/tiles) pass through untouched
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
