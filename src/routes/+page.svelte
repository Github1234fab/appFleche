<script>
    import Calendar from "../components/Calendar.svelte";
    import UpLoadJson from "../components/UpLoadJson.svelte";
    import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
    import "../routes/styles.css";
    import { onMount } from "svelte";
    import { initMessaging, initAnalytics } from "$lib/firebase";
    import { requestNotificationPermission } from "../lib/firebase.js";


    onMount(() => {
        // Exécuter uniquement côté client
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/path/to/your/service-worker.js').then(registration => {
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // Une nouvelle version est disponible
                        console.log('Nouvelle version disponible!');
                        // Affichez une notification ou un pop-up à l'utilisateur
                        // Vous pouvez également envoyer un message au service worker
                        installingWorker.postMessage({ action: 'SKIP_WAITING' });
                    }
                }
            };
        };
    }).catch(error => {
        console.error('Service Worker registration failed:', error);
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
