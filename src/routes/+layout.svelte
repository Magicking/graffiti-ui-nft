<script>
  import "../app.css";
  import { chainInfo } from "$lib/stores/chainInfo";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
  {#if $chainInfo.chainId === 81457}
    <link rel="stylesheet" href="./globals.css" />
  {:else if $chainInfo.chainId === 8453}
    <link rel="stylesheet" href="./globals-base.css" />
  {:else}
    <link rel="stylesheet" href="./globals.css" />
  {/if}
</svelte:head>
<div class="min-h-screen bg-darkBackground">
  <slot />
  <Footer />
</div>
