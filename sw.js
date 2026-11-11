// Offline cache for the fair sign-up page. Serves from the cache first so the
// page opens with no Wi-Fi; refreshes the cache in the background when online,
// so an updated page shows up on the next launch. Bump VERSION to force it.
var VERSION = 'fair-signup-v7';
var FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png', './liu-logo-white.png', './public-sans.woff2', './zipcodes.json'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  var key = req.mode === 'navigate' ? './index.html' : req;
  e.respondWith(caches.open(VERSION).then(function (cache) {
    return cache.match(key, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok) cache.put(key, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
