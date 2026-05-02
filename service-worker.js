const CACHE_NAME = "preposition-pwa-v1";

const PRECACHE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",

  "./above.mp3",
  "./across.mp3",
  "./against.mp3",
  "./against.png",
  "./along.mp3",
  "./among.mp3",
  "./around.mp3",
  "./at.mp3",
  "./behind.mp3",
  "./below.mp3",
  "./beside.mp3",
  "./between.mp3",
  "./down.mp3",
  "./from_to.mp3",
  "./image_0.png",
  "./in.mp3",
  "./in_front_of.mp3",
  "./into.mp3",
  "./near.mp3",
  "./off.mp3",
  "./on.mp3",
  "./onto.mp3",
  "./opposite.mp3",
  "./out_of.mp3",
  "./over.mp3",
  "./past.mp3",
  "./through.mp3",
  "./towards.mp3",
  "./under.mp3",
  "./up.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
