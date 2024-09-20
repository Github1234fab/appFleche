<script>
    import Calendar from "../components/Calendar.svelte";
    import UpLoadJson from "../components/UpLoadJson.svelte";
    import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
    import "../routes/styles.css";
    import { onMount } from "svelte";
    import { initMessaging, initAnalytics } from "$lib/firebase";
    import { requestNotificationPermission } from "../lib/firebase.js";


    if ("serviceWorker" in navigator) {
    // Fonction pour gérer l'installation du nouveau service worker
    const handleUpdate = (installingWorker) => {
        installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                const userConfirmed = confirm("Une nouvelle version est disponible. Voulez-vous l'utiliser ?");
                if (userConfirmed) {
                    // Envoyer un message au service worker pour le forcer à s'activer immédiatement
                    installingWorker.postMessage({ action: "skipWaiting" });
                    // Recharger la page une seule fois
                    window.location.reload(true); // Ajout de 'true' pour forcer le rechargement sans cache
                }
            }
        };
    };

    // Enregistrer le service worker pour FCM
    navigator.serviceWorker.register("/firebase-messaging-sw.js")
        .then((fcmRegistration) => {
            console.log("FCM Service Worker enregistré avec succès");

            fcmRegistration.onupdatefound = () => {
                const installingWorker = fcmRegistration.installing;
                if (installingWorker) {
                    handleUpdate(installingWorker);
                }
            };
        })
        .catch((err) => {
            console.error("FCM Service Worker enregistrement échoué", err);
        });

    // Enregistrer le service worker pour le cache et autres tâches
    navigator.serviceWorker.register("/service-worker.js")
        .then((cacheRegistration) => {
            console.log("Service Worker pour cache enregistré avec succès");

            cacheRegistration.onupdatefound = () => {
                const installingWorker = cacheRegistration.installing;
                if (installingWorker) {
                    handleUpdate(installingWorker);
                }
            };
        })
        .catch((err) => {
            console.error("Service Worker pour cache enregistrement échoué", err);
        });
}

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
