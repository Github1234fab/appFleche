<script>
    import Calendar from "../components/Calendar.svelte";
    import UpLoadJson from "../components/UpLoadJson.svelte";
    import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
    import "../routes/styles.css";
    import { onMount } from "svelte";
    import { initMessaging, initAnalytics } from "$lib/firebase";
    import { requestNotificationPermission } from "../lib/firebase.js";


    onMount(async () => {
        // Initialiser Firebase Analytics et Messaging
        initAnalytics();
        initMessaging();

        const deviceToken = await requestNotificationPermission();
        if (deviceToken) {
            console.log("Token de l'appareil:", deviceToken);
            await sendNotification(deviceToken);
        }

 if ("serviceWorker" in navigator) {
    // Enregistrer le service worker pour FCM
    const fcmRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("FCM Service Worker enregistré avec succès");

    // Gestion des mises à jour pour FCM Service Worker
    fcmRegistration.onupdatefound = () => {
        const installingWorker = fcmRegistration.installing;
        installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                // Nouvelle version disponible pour le service worker FCM
                const userConfirmed = confirm("Une nouvelle version est disponible. Voulez-vous l'utiliser ?");
                if (userConfirmed) {
                    // Envoyer un message au service worker pour activer la nouvelle version
                    if (fcmRegistration.waiting) {
                        fcmRegistration.waiting.postMessage({ action: "skipWaiting" });
                    }
                    // Recharger la page pour utiliser la nouvelle version
                    window.location.reload();
                }
            }
        };
    };

    // Enregistrer le service worker pour le cache et autres tâches
    const cacheRegistration = await navigator.serviceWorker.register("/service-worker.js");
    console.log("Service Worker pour cache enregistré avec succès");

    // Gestion des mises à jour pour Cache Service Worker
    cacheRegistration.onupdatefound = () => {
        const installingWorker = cacheRegistration.installing;
        installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                // Nouvelle version disponible pour le service worker de cache
                const userConfirmed = confirm("Une nouvelle version pour le cache est disponible. Voulez-vous l'utiliser ?");
                if (userConfirmed) {
                    // Envoyer un message au service worker pour activer la nouvelle version
                    if (cacheRegistration.waiting) {
                        cacheRegistration.waiting.postMessage({ action: "skipWaiting" });
                    }
                    // Recharger la page pour utiliser la nouvelle version
                    window.location.reload();
                }
            }
        };
    };

    // Gestion du changement de contrôleur pour forcer le rechargement lors de l'activation d'un nouveau SW
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}
    });
</script>

<main>
    <Calendar />
    <UpLoadJson />
    <UpLoadJsonAdvertisement />
</main>

<style>
    main {
        height: auto;
    }
</style>
