// // Dans votre service worker

// // Installer le service worker et mettre en cache les fichiers nécessaires
// self.addEventListener("install", (event) => {
//         console.log("Service Worker installing.");
//         event.waitUntil(
//                 caches.open(CACHE_NAME).then((cache) => {
//                         console.log("Cache ouvert");
//                         return cache.addAll(urlsToCache);
//                 })
//         );
// });

// // Activer le service worker et supprimer les anciens caches
// self.addEventListener("activate", (event) => {
//         console.log("Service Worker activating.");
//         event.waitUntil(
//                 caches.keys().then((cacheNames) => {
//                         return Promise.all(
//                                 cacheNames.map((cacheName) => {
//                                         if (cacheName !== CACHE_NAME) {
//                                                 console.log("Suppression de l'ancien cache :", cacheName);
//                                                 return caches.delete(cacheName);
//                                         }
//                                 })
//                         );
//                 })
//         );
//         // Prendre le contrôle des clients actuels
//         self.clients.claim();
// });

// // Gérer les mises à jour
// self.addEventListener("message", (event) => {
//         if (event.data && event.data.action === "SKIP_WAITING") {
//                 self.skipWaiting();
//         }
// });

// // Gérer les notifications push
// self.addEventListener("push", (event) => {
//         const data = event.data.json();
//         console.log("Push reçu : ", data);
//         const options = {
//                 body: data.notification.body,
//                 icon: "/icon-192x192.png",
//                 badge: "/badge-icon.png",
//                 data: {
//                         url: data.notification.click_action || "/",
//                 },
//         };

//         event.waitUntil(self.registration.showNotification(data.notification.title, options));
// });

// // Gérer le clic sur une notification
// self.addEventListener("notificationclick", (event) => {
//         event.notification.close();
//         event.waitUntil(
//                 clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//                         for (const client of clientList) {
//                                 if (client.url === event.notification.data.url && "focus" in client) {
//                                         return client.focus();
//                                 }
//                         }
//                         if (clients.openWindow) {
//                                 return clients.openWindow(event.notification.data.url);
//                         }
//                 })
//         );
// });
// // Dans votre service worker

// // Installer le service worker et mettre en cache les fichiers nécessaires
// self.addEventListener("install", (event) => {
//     console.log("Service Worker installing.");
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log("Cache ouvert");
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// // Activer le service worker et supprimer les anciens caches
// self.addEventListener("activate", (event) => {
//     console.log("Service Worker activating.");
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (cacheName !== CACHE_NAME) {
//                         console.log("Suppression de l'ancien cache :", cacheName);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
//     // Prendre le contrôle des clients actuels
//     self.clients.claim();
// });

// // Gérer les mises à jour
// self.addEventListener('message', (event) => {
//     if (event.data && event.data.action === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
// });

// // Gérer les notifications push
// self.addEventListener("push", (event) => {
//     const data = event.data.json();
//     console.log("Push reçu : ", data);
//     const options = {
//         body: data.notification.body,
//         icon: "/icon-192x192.png",
//         badge: "/badge-icon.png",
//         data: {
//             url: data.notification.click_action || "/",
//         },
//     };

//     event.waitUntil(self.registration.showNotification(data.notification.title, options));
// });

// // Gérer le clic sur une notification
// self.addEventListener("notificationclick", (event) => {
//     event.notification.close();
//     event.waitUntil(
//         clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//             for (const client of clientList) {
//                 if (client.url === event.notification.data.url && "focus" in client) {
//                     return client.focus();
//                 }
//             }
//             if (clients.openWindow) {
//                 return clients.openWindow(event.notification.data.url);
//             }
//         })
//     );
// });

// // Dans votre service worker

// // Installer le service worker et mettre en cache les fichiers nécessaires
// self.addEventListener("install", (event) => {
//     console.log("Service Worker installing.");
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log("Cache ouvert");
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// // Activer le service worker et supprimer les anciens caches
// self.addEventListener("activate", (event) => {
//     console.log("Service Worker activating.");
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (cacheName !== CACHE_NAME) {
//                         console.log("Suppression de l'ancien cache :", cacheName);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
//     // Prendre le contrôle des clients actuels
//     self.clients.claim();
// });

// // Gérer les mises à jour
// self.addEventListener('message', (event) => {
//     if (event.data && event.data.action === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
// });

// // Gérer les notifications push
// self.addEventListener("push", (event) => {
//     const data = event.data.json();
//     console.log("Push reçu : ", data);
//     const options = {
//         body: data.notification.body,
//         icon: "/icon-192x192.png",
//         badge: "/badge-icon.png",
//         data: {
//             url: data.notification.click_action || "/",
//         },
//     };

//     event.waitUntil(self.registration.showNotification(data.notification.title, options));
// });

// // Gérer le clic sur une notification
// self.addEventListener("notificationclick", (event) => {
//     event.notification.close();
//     event.waitUntil(
//         clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//             for (const client of clientList) {
//                 if (client.url === event.notification.data.url && "focus" in client) {
//                     return client.focus();
//                 }
//             }
//             if (clients.openWindow) {
//                 return clients.openWindow(event.notification.data.url);
//             }
//         })
//     );
// });

