<script>
    import Calendar from "../components/Calendar.svelte";
    import UpLoadJson from "../components/UpLoadJson.svelte";
    import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
    import "../routes/styles.css";
    import { onMount } from "svelte";
    import { initMessaging, initAnalytics } from "$lib/firebase";
    import { requestNotificationPermission } from "../lib/firebase.js";

    // // Fonction pour gérer l'installation du nouveau service worker
    // const handleUpdate = (installingWorker) => {
    //     initMessaging(); // Appelle la fonction pour initialiser le service de messagerie
    //     initAnalytics(); // Initialise Firebase Analytics si nécessaire

    //     installingWorker.onstatechange = () => {
    //         if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
    //             // Vérifier si l'utilisateur a déjà accepté la mise à jour
    //             const updateAccepted = localStorage.getItem('updateAccepted');

    //             if (!updateAccepted) {
    //                 const userConfirmed = confirm("Une nouvelle version est disponible. Voulez-vous l'utiliser ?");
    //                 if (userConfirmed) {
    //                     // Stocker l'acceptation dans localStorage
    //                     localStorage.setItem('updateAccepted', 'true');
    //                     // Envoyer un message au service worker pour le forcer à s'activer immédiatement
    //                     installingWorker.postMessage({ action: "skipWaiting" });
    //                     // Recharger la page une seule fois
    //                     window.location.reload(true); // Ajout de 'true' pour forcer le rechargement sans cache
    //                 }
    //             }
    //         }
    //     };
    // };
    //     onMount(() => {
    //     if ("serviceWorker" in navigator) {
    //         navigator.serviceWorker.register("/onesignal-service-worker.js")
    //             .then(() => {
    //                 console.log("OneSignal Service Worker enregistré avec succès");
    //                 // Initialise OneSignal ici si nécessaire
    //                 OneSignal.push(() => {
    //                     OneSignal.init({
    //                         appId: "YOUR_ONESIGNAL_APP_ID",
    //                         // Autres options de configuration
    //                     });
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.error("Échec de l'enregistrement du service worker OneSignal", error);
    //             });
    //     }
    // });


    // onMount(() => {
    //     // Exécuter uniquement côté client
    //     if ("serviceWorker" in navigator) {
    //         // Enregistrer le service worker pour FCM
    //         navigator.serviceWorker.register("/firebase-messaging-sw.js")
    //             .then((fcmRegistration) => {
    //                 console.log("FCM Service Worker enregistré avec succès");

    //                 fcmRegistration.onupdatefound = () => {
    //                     const installingWorker = fcmRegistration.installing;
    //                     if (installingWorker) {
    //                         handleUpdate(installingWorker);
    //                     }
    //                 };
    //             })
    //             .catch((err) => {
    //                 console.error("FCM Service Worker enregistrement échoué", err);
    //             });

    //         // Enregistrer le service worker pour le cache et autres tâches
    //         navigator.serviceWorker.register("/service-worker.js")
    //             .then((cacheRegistration) => {
    //                 console.log("Service Worker pour cache enregistré avec succès");

    //                 cacheRegistration.onupdatefound = () => {
    //                     const installingWorker = cacheRegistration.installing;
    //                     if (installingWorker) {
    //                         handleUpdate(installingWorker);
    //                     }
    //                 };
    //             })
    //             .catch((err) => {
    //                 console.error("Service Worker pour cache enregistrement échoué", err);
    //             });
    //     }
    // });
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
