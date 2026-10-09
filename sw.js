/* Akshat Estate service worker.
   Keeps the page shell, fonts and images for quick repeat visits and shows offline.html when
   there is no connection. Listings and enquiries always come live from the internet.
   Change VERSION whenever you want every visitor's saved copy cleared. */
const VERSION = "ae-v9";
const CORE = ["offline.html", "css/style.css", "images/logo.png", "fonts/poppins-400.woff", "fonts/poppins-600.woff"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

function put(request, response) {
  if (response && response.ok && response.type === "basic") {
    const copy = response.clone();
    caches.open(VERSION).then((c) => c.put(request, copy));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           /* Firebase, Maps, CDN: leave to the browser */
  if (/admin/i.test(url.pathname)) return;                   /* never keep the admin page */

  /* Pages: network first, then the saved copy, then the offline page */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then((res) => put(req, res)).catch(() =>
        caches.match(req).then((hit) => hit || caches.match("offline.html"))
      )
    );
    return;
  }

  /* Fonts and images: saved copy first (they rarely change) */
  if (req.destination === "font" || req.destination === "image") {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => put(req, res)))
    );
    return;
  }

  /* Styles and scripts: network first so a new release shows straight away */
  event.respondWith(
    fetch(req).then((res) => put(req, res)).catch(() => caches.match(req))
  );
});
