<script>

    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";


</script>


<main>
        <Header />
        <slot />
        <Footer />
</main>

<style>
        main {
                min-height: 100vh;
        }
</style>
