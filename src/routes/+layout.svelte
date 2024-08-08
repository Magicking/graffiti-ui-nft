<script>
  import "../app.css";
  import "../cyber.css";
  import Footer from "$lib/components/Footer.svelte";
</script>

<div class="min-h-screen bg-darkBackground">
  <!-- All the Content falls here -->
  <slot />

  <!-- Footer -->
  <Footer />
</div>
