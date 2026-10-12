const CACHE = "toolnest-v2-10lang";
const ASSETS = [
  "./", "./index.html", "./manifest.json", "./assets/styles.css",
  "./js/app.js", "./js/router.js", "./js/storage.js", "./js/toast.js",
  "./js/langs.js", "./js/i18n.js", "./js/registry.js",
  "./js/tools/base64.js", "./js/tools/color-converter.js",
  "./js/tools/color-picker.js", "./js/tools/hash-generator.js",
  "./js/tools/image-compressor.js", "./js/tools/json-formatter.js",
  "./js/tools/jwt-decoder.js", "./js/tools/lorem-ipsum.js",
  "./js/tools/password-generator.js", "./js/tools/pdf-to-txt.js",
  "./js/tools/qr-code.js", "./js/tools/text-case.js",
  "./js/tools/url-encoder.js", "./js/tools/uuid-generator.js",
  "./js/tools/word-counter.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
