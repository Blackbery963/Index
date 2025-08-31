const CACHE_NAME = 'pwa-demo-v2'; // update version when you change files
const DYNAMIC_CACHE = 'pwa-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html', // fallback page
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/logo_pd_192x192.png',
  '/logo_pd_512x512.png'
];

// ✅ Install event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // activate worker immediately
});

// ✅ Activate event
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// ✅ Fetch event
self.addEventListener('fetch', event => {
  // Handle only GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Cache hit → return from cache
        return cachedResponse;
      }

      // Otherwise, fetch from network
      // return fetch(event.request)
      //   .then(networkResponse => {
      //     // Save a copy in dynamic cache (only for valid responses)
      //     if (networkResponse && networkResponse.status === 200) {
      //       caches.open(DYNAMIC_CACHE).then(cache => {
      //         cache.put(event.request, networkResponse.clone());
      //       });
      //     }
      //     return networkResponse;

      //   })
      
      return fetch(event.request)
  .then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone(); // 👈 create a clone

      caches.open(DYNAMIC_CACHE).then(cache => {
        cache.put(event.request, responseClone);
      });
    }
    return networkResponse; // return the untouched response
  })

        .catch(() => {
          // If offline and request was HTML page → return offline fallback
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// ✅ Listen for push notifications
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Painters' Diary";
  const options = {
    body: data.body || "You have a new notification!",
    icon: "/icons/logo-192.jpg",
    badge: "/icons/logo-512.jpg"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ Optional: Handle notification click
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // redirect user back to homepage
  );
});
