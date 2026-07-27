/* Yenlog Muhasebe — çevrimdışı kabuk */
const CACHE = 'yenlog-muhasebe-v1';
const KABUK = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.hostname === 'api.github.com') return;           // senkron her zaman ağdan
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && u.origin === location.origin) {
        const kopya = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopya));
      }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
