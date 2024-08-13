<script>
  import "../app.css";
  import "../globals.css";
  import Footer from "$lib/components/Footer.svelte";
</script>

<div class="min-h-screen bg-darkBackground">
  <slot />
  <Footer />
</div>
