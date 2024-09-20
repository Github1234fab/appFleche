const CACHE_NAME = "flech-cache-v4";
const urlsToCache = ["/", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

// Installer le service worker et mettre en cache les fichiers nécessaires
self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                        console.log("Cache ouvert");
                        return cache.addAll(urlsToCache);
                })
        );
        // Forcer l'activation du nouveau service worker immédiatement
        self.skipWaiting();
});

// Activer le service worker et supprimer les anciens caches
self.addEventListener("activate", (event) => {
        console.log("Service Worker activating.");
        event.waitUntil(
                caches.keys().then((cacheNames) => {
                        return Promise.all(
                                cacheNames.map((cacheName) => {
                                        if (cacheName !== CACHE_NAME) {
                                                console.log("Suppression de l'ancien cache :", cacheName);
                                                return caches.delete(cacheName);
                                        }
                                })
                        );
                })
        );
        // Forcer la prise en charge immédiate du nouveau service worker
        self.clients.claim();
});

// Intercepter les requêtes et servir les fichiers à partir du cache lorsque disponible
self.addEventListener("fetch", (event) => {
        if (event.request.method === "GET") {
                event.respondWith(
                        caches.match(event.request).then((response) => {
                                // Retourner la réponse du cache si disponible, sinon effectuer une requête réseau
                                return (
                                        response ||
                                        fetch(event.request).then((fetchResponse) => {
                                                return caches.open(CACHE_NAME).then((cache) => {
                                                        cache.put(event.request, fetchResponse.clone());
                                                        return fetchResponse;
                                                });
                                        })
                                );
                        })
                );
        }
});

// // Gérer les notifications push de Firebase Cloud Messaging (FCM)
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

// Gérer le clic sur une notification
self.addEventListener("notificationclick", (event) => {
        event.notification.close();
        event.waitUntil(
                clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
                        for (const client of clientList) {
                                if (client.url === event.notification.data.url && "focus" in client) {
                                        return client.focus();
                                }
                        }
                        if (clients.openWindow) {
                                return clients.openWindow(event.notification.data.url);
                        }
                })
        );
});

// Gérer les messages pour forcer l'activation immédiate du nouveau service worker
self.addEventListener("message", (event) => {
        if (event.data.action === "skipWaiting") {
                self.skipWaiting();
        }
});
