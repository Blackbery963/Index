// const CACHE_NAME = "pwa-static-v3";   // bump version when static files change
// const RUNTIME_CACHE = "pwa-runtime-v1";

// // ✅ Only cache critical static assets (no over-caching)
// const STATIC_ASSETS = [
//   "/",
//   "/index.html",
//   "/offline.html",
//   "/styles.css",
//   "/app.js",
//   "/manifest.json",
//   "/logo_192x192.png",
//   "/logo_512x512.png"
// ];

// // ✅ Install event → cache critical assets only
// self.addEventListener("install", event => {
//   console.log("[SW] Install");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
//   );
//   self.skipWaiting();
// });

// // ✅ Activate event → cleanup old caches
// self.addEventListener("activate", event => {
//   console.log("[SW] Activate");
//   event.waitUntil(
//     caches.keys().then(keys =>
//       Promise.all(
//         keys.map(key => {
//           if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
//             console.log("[SW] Removing old cache:", key);
//             return caches.delete(key);
//           }
//         })
//       )
//     )
//   );
//   self.clients.claim();
// });

// // ✅ Fetch strategy: Network-first for HTML, Cache-first for static assets, Network-only for APIs
// self.addEventListener("fetch", event => {
//   if (event.request.method !== "GET") return;

//   const requestUrl = new URL(event.request.url);

//   // HTML pages → network first (so updates load quickly)
//   if (event.request.headers.get("accept")?.includes("text/html")) {
//     event.respondWith(
//       fetch(event.request)
//         .then(response => {
//           const cloned = response.clone();
//           caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
//           return response;
//         })
//         .catch(() => caches.match(event.request).then(res => res || caches.match("/offline.html")))
//     );
//     return;
//   }

//   // Static assets (css, js, images) → cache first
//   if (STATIC_ASSETS.some(asset => requestUrl.pathname.endsWith(asset))) {
//     event.respondWith(
//       caches.match(event.request).then(cached =>
//         cached ||
//         fetch(event.request).then(response => {
//           const cloned = response.clone();
//           caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
//           return response;
//         })
//       )
//     );
//     return;
//   }

//   // API or other dynamic requests → network first but limit caching
//   if (requestUrl.origin === location.origin) {
//     event.respondWith(
//       fetch(event.request)
//         .then(response => {
//           if (response.ok && response.type === "basic") {
//             const cloned = response.clone();
//             caches.open(RUNTIME_CACHE).then(cache => {
//               cache.put(event.request, cloned);
//               limitCacheSize(RUNTIME_CACHE, 30); // keep max 30 entries
//             });
//           }
//           return response;
//         })
//         .catch(() => caches.match(event.request))
//     );
//   }
// });

// // ✅ Cache size limiter (avoid bloating dynamic cache)
// function limitCacheSize(cacheName, maxItems) {
//   caches.open(cacheName).then(cache => {
//     cache.keys().then(keys => {
//       if (keys.length > maxItems) {
//         cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
//       }
//     });
//   });
// }

// // ✅ Push notifications
// self.addEventListener("push", event => {
//   const data = event.data ? event.data.json() : {};
//   const title = data.title || "Painters' Diary";
//   const options = {
//     body: data.body || "You have a new notification!",
//     icon: "/logo_192x192.png",
//     badge: "/logo_512x512.png"
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });

// // ✅ Notification click
// self.addEventListener("notificationclick", event => {
//   event.notification.close();
//   event.waitUntil(clients.openWindow("/"));
// });

const CACHE_NAME = "pwa-static-v3";
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

// ✅ Enhanced Push Notification Handling
self.addEventListener("push", function(event) {
  console.log('[SW] Push Received');
  
  // Check if notification permission is granted
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    console.log('[SW] Notifications not granted');
    return;
  }

  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    console.log('[SW] Push data parsing error:', error);
    data = {
      title: 'Painters\' Diary',
      body: event.data ? event.data.text() : 'You have a new notification!'
    };
  }

  const title = data.title || 'Painters\' Diary';
  const options = {
    body: data.body || 'You have a new notification!',
    icon: data.icon || '/logo_192x192.png',
    badge: data.badge || '/logo_512x512.png',
    image: data.image,
    data: data.data || { url: data.url || '/' },
    actions: data.actions,
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false,
    vibrate: data.vibrate || [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => console.log('[SW] Notification shown successfully'))
      .catch(error => console.error('[SW] Notification error:', error))
  );
});

// ✅ Enhanced Notification Click Handling
self.addEventListener("notificationclick", function(event) {
  console.log('[SW] Notification clicked');
  
  event.notification.close();

  const notificationData = event.notification.data || {};
  const targetUrl = notificationData.url || '/';

  event.waitUntil(
    clients.matchAll({ 
      type: 'window',
      includeUncontrolled: true 
    }).then(windowClients => {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        const clientUrl = new URL(client.url);
        const targetUrlObj = new URL(targetUrl, self.location.origin);
        
        // If same origin and path, focus it
        if (clientUrl.origin === targetUrlObj.origin && 
            clientUrl.pathname === targetUrlObj.pathname) {
          console.log('[SW] Focusing existing client');
          return client.focus();
        }
      }
      
      // If not, open a new window/tab
      if (clients.openWindow) {
        console.log('[SW] Opening new window:', targetUrl);
        return clients.openWindow(targetUrl);
      }
    })
    .catch(error => console.error('[SW] Notification click error:', error))
  );
});

// ✅ Notification Close Event (for analytics)
self.addEventListener("notificationclose", function(event) {
  console.log('[SW] Notification closed');
  // You can send analytics here if needed
  const notification = event.notification;
  console.log('Closed notification:', notification.tag, notification.data);
});

// ✅ Handle Push Subscription Changes (important for reliability)
self.addEventListener("pushsubscriptionchange", function(event) {
  console.log('[SW] Push subscription changed');
  
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: event.oldSubscription.options.applicationServerKey
    })
    .then(function(newSubscription) {
      console.log('[SW] New subscription:', newSubscription);
      // Send new subscription to your server
      // This would typically involve a fetch to your backend
      return fetch('/api/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldSubscription: event.oldSubscription,
          newSubscription: newSubscription
        })
      });
    })
    .catch(error => console.error('[SW] Subscription renewal failed:', error))
  );
});

// ✅ Background Sync for Failed Requests (enhanced reliability)
self.addEventListener('sync', function(event) {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implement your background sync logic here
      // This could retry failed API calls, sync data, etc.
      doBackgroundSync()
    );
  }
});

async function doBackgroundSync() {
  console.log('[SW] Performing background sync');
  // Add your sync logic here
}

// ✅ Message Handling (communication from main thread)
self.addEventListener('message', function(event) {
  console.log('[SW] Message received:', event.data);
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_SUBSCRIPTION':
      self.registration.pushManager.getSubscription()
        .then(subscription => {
          event.ports[0].postMessage({ subscription });
        });
      break;
      
    case 'SHOW_NOTIFICATION':
      if (self.Notification.permission === 'granted') {
        self.registration.showNotification(
          event.data.title,
          event.data.options
        );
      }
      break;
      
    default:
      console.log('[SW] Unknown message type:', event.data.type);
  }
});