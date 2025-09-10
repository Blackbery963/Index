// part 2 
// const STATIC_CACHE = 'pwa-static-v3';
// const DYNAMIC_CACHE = 'pwa-dynamic-v2';

// // Define which assets to cache immediately
// const STATIC_ASSETS = [
//   '/',
//   '/index.html',
//   '/offline.html',
//   '/styles.css',
//   '/app.js',
//   '/manifest.json',
//   '/logo_192x192.png',
//   '/logo_512x512.png'
// ];

// // Define routes that should NOT be cached (API endpoints, etc.)
// const NO_CACHE_ROUTES = [
//   '/api/',
//   '/auth/',
//   '/graphql',
//   '/socket.io/'
// ];

// // ✅ Install event
// self.addEventListener('install', event => {
//   console.log('[Service Worker] Installing...');
  
//   // Force the waiting service worker to become the active one
//   self.skipWaiting();
  
//   event.waitUntil(
//     caches.open(STATIC_CACHE)
//       .then(cache => {
//         console.log('[Service Worker] Pre-caching static assets');
//         return cache.addAll(STATIC_ASSETS);
//       })
//       .catch(err => {
//         console.error('[Service Worker] Pre-caching failed:', err);
//       })
//   );
// });

// // ✅ Activate event - clean up old caches
// self.addEventListener('activate', event => {
//   console.log('[Service Worker] Activating...');
  
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           // Delete old caches that aren't the current ones
//           if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
//             console.log('[Service Worker] Deleting old cache:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
  
//   // Take control of all clients immediately
//   return self.clients.claim();
// });

// // ✅ Fetch event - improved strategy
// self.addEventListener('fetch', event => {
//   // Skip non-GET requests and browser extensions
//   if (event.request.method !== 'GET' || 
//       event.request.url.startsWith('chrome-extension://') ||
//       event.request.url.includes('extension')) {
//     return;
//   }
  
//   // Check if this is an API request that shouldn't be cached
//   const isApiRequest = NO_CACHE_ROUTES.some(route => 
//     event.request.url.includes(route)
//   );
  
//   // For API requests, use network-only strategy
//   if (isApiRequest) {
//     event.respondWith(fetch(event.request));
//     return;
//   }
  
//   // For static assets, use cache-first with network fallback
//   event.respondWith(
//     caches.match(event.request)
//       .then(cachedResponse => {
//         // Return cached version if available
//         if (cachedResponse) {
//           return cachedResponse;
//         }
        
//         // Otherwise, fetch from network
//         return fetch(event.request)
//           .then(networkResponse => {
//             // Only cache successful responses
//             if (networkResponse && networkResponse.status === 200) {
//               // Don't cache large files or non-cacheable content
//               const contentType = networkResponse.headers.get('content-type');
//               const isCacheable = contentType && (
//                 contentType.includes('font/') ||
//                 contentType.includes('image/') ||
//                 contentType.includes('script/') ||
//                 contentType.includes('style/') ||
//                 contentType.includes('text/html')
//               );
              
//               if (isCacheable) {
//                 const responseClone = networkResponse.clone();
//                 caches.open(DYNAMIC_CACHE)
//                   .then(cache => {
//                     cache.put(event.request, responseClone);
//                   });
//               }
//             }
//             return networkResponse;
//           })
//           .catch(error => {
//             // If offline and request was HTML page → return offline fallback
//             if (event.request.headers.get('accept').includes('text/html')) {
//               return caches.match('/offline.html');
//             }
            
//             // For other file types, you might return a placeholder
//             if (event.request.destination === 'image') {
//               return caches.match('/placeholder.png');
//             }
            
//             throw error;
//           });
//       })
//   );
// });

// // ✅ Background sync example (if needed)
// // self.addEventListener('sync', event => {
// //   if (event.tag === 'background-sync') {
// //     event.waitUntil(doBackgroundSync());
// //   }
// // });

// // ✅ Push notifications
// self.addEventListener('push', event => {
//   const data = event.data ? event.data.json() : {};
//   const title = data.title || "Painters' Diary";
//   const options = {
//     body: data.body || "You have a new notification!",
//     icon: "/logo_192x192.png",
//     badge: "/logo_192x192.png",
//     tag: 'painters-diary-notification'
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

// // ✅ Handle notification click
// self.addEventListener('notificationclick', event => {
//   event.notification.close();
  
//   event.waitUntil(
//     clients.matchAll({ type: 'window' })
//       .then(clientList => {
//         if (clientList.length > 0) {
//           return clientList[0].focus();
//         }
//         return clients.openWindow('/');
//       })
//   );
// });


const CACHE_NAME = "pwa-static-v3";   // bump version when static files change
const RUNTIME_CACHE = "pwa-runtime-v1";

// ✅ Only cache critical static assets (no over-caching)
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "/logo_192x192.png",
  "/logo_512x512.png"
];

// ✅ Install event → cache critical assets only
self.addEventListener("install", event => {
  console.log("[SW] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ✅ Activate event → cleanup old caches
self.addEventListener("activate", event => {
  console.log("[SW] Activate");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ Fetch strategy: Network-first for HTML, Cache-first for static assets, Network-only for APIs
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);

  // HTML pages → network first (so updates load quickly)
  if (event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match(event.request).then(res => res || caches.match("/offline.html")))
    );
    return;
  }

  // Static assets (css, js, images) → cache first
  if (STATIC_ASSETS.some(asset => requestUrl.pathname.endsWith(asset))) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached ||
        fetch(event.request).then(response => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return response;
        })
      )
    );
    return;
  }

  // API or other dynamic requests → network first but limit caching
  if (requestUrl.origin === location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok && response.type === "basic") {
            const cloned = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, cloned);
              limitCacheSize(RUNTIME_CACHE, 30); // keep max 30 entries
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});

// ✅ Cache size limiter (avoid bloating dynamic cache)
function limitCacheSize(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
      }
    });
  });
}

// ✅ Push notifications
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Painters' Diary";
  const options = {
    body: data.body || "You have a new notification!",
    icon: "/logo_192x192.png",
    badge: "/logo_512x512.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ Notification click
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
