<script>
  import {
    connected
  } from "svelte-ethers-store";
  import "../app.css";
  import { chainInfo } from "$lib/stores/chainInfo";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
  {#if $connected}
  {#if $chainInfo.chainId === 81457}
    <link rel="stylesheet" href="./globals-81457.css" />
  {:else if $chainInfo.chainId === 8453}
    <link rel="stylesheet" href="./globals-8453.css" />
  {:else if $chainInfo.chainId === 1301}
    <link rel="stylesheet" href="./globals-1301.css" />
  {:else}
      <link rel="stylesheet" href="./globals.css" />
    {/if}
  {:else}
      <link rel="stylesheet" href="./globals.css" />
  {/if}
</svelte:head>
<div class="min-h-screen bg-darkBackground">
  <slot />
  <Footer />
</div>
