// Minimal offline-first service worker for Next.js PWA
// Cache version
const CACHE_VERSION = 'v1';
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// Core assets to pre-cache (add more if needed)
const PRECACHE_URLS = [
  '/',
  '/favicon.ico',
  '/next.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(RUNTIME_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('runtime-') && cacheName !== RUNTIME_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => self.clients.claim())
  );
});

// Network-first for html, cache-first for others
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Skip non-http(s) requests (e.g., chrome-extension://) and data blobs
  const requestUrl = new URL(request.url);
  if (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') return;

  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok && (response.type === 'basic' || response.type === 'cors')) {
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok && (response.type === 'basic' || response.type === 'cors')) {
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});

// Periodic Background Sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-refresh') {
    event.waitUntil(
      fetch('/')
        .then(() => undefined)
        .catch(() => undefined)
    );
  }
});

// One-off Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'retry-queue') {
    event.waitUntil(Promise.resolve());
  }
});

// Push Notifications placeholder
self.addEventListener('push', (event) => {
  try {
    const data = event.data ? event.data.json() : { title: 'Notification', body: 'Hello from PWA' };
    event.waitUntil(
      self.registration.showNotification(data.title || 'PWA', {
        body: data.body || '',
        icon: '/web-app-manifest-192x192.png',
        badge: '/web-app-manifest-192x192.png',
      })
    );
  } catch (e) {
    // ignore
  }
});


