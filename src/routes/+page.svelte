<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import Hero from "$lib/components/Hero.svelte";
  import Graveyard from "$lib/components/Graveyard.svelte";
  import { onMount } from "svelte";
  import { chainid } from "$lib/rge.conf.json";
  import { useConnectToWallet } from "$lib/utils/useConnectToWallet";
  import InvalidChain from "$lib/components/InvalidChain.svelte";
  import Header from "../lib/components/Header.svelte";
  import ValidChain from "../lib/components/ValidChain.svelte";
  import ValidHero from "../lib/components/ValidHero.svelte";

  onMount(() => {
    useConnectToWallet();
  });
</script>

<svelte:head>
  <title>Graffiti</title>
  <meta name="description" content="Graffiti" />
</svelte:head>

<div class="main">
  <div class="background-container">
    <div class="background-image"></div>
    <div class="overlay"></div>
    <!-- <div class="border-shadow"></div> -->
  </div>
  <div class="main-container">
    <Header style="hero" />

    {#if $connected}
      {#if $chainId !== chainid}
        <InvalidChain />
      {:else}
        <ValidHero />
      {/if}
    {:else}
      <Hero />
    {/if}
  </div>
</div>

<style>
  .main {
    height: 100vh;
    width: 100%;
    clip-path: polygon(
      0 -18%,
      0 0,
      15% 0%,
      63% 0,
      72% 8%,
      100% 8%,
      100% 81%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    background: #fcfc03;
  }

  .main-container {
    background: transparent;
    height: 99vh;
    /* width: %; */
    top: 3px;
    /* left: 3px; */
    position: relative;
    clip-path: polygon(
      0 -18%,
      0 0,
      15% 0%,
      63% 0,
      72% 8%,
      100% 8%,
      100% 81%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    z-index: 2;
  }

  .background-image {
    position: absolute;
    top: 3px;
    left: 3px;
    right: 0;
    bottom: 0;
    background: url("../lib/images/bg.jpg");
    clip-path: polygon(
      0 -18%,
      0 0,
      15% 0%,
      63% 0,
      72% 8%,
      100% 8%,
      100% 81%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
  }

  .overlay {
    position: absolute;
    top: 3px;
    left: 0.3%;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #11140c 1.54%, #2a2b1b);
    z-index: 1;
    opacity: 0.6;
    clip-path: polygon(
      0 -18%,
      0 0,
      15% 0%,
      63% 0,
      72% 8%,
      100% 8%,
      100% 81%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
  }

  @media (max-width: 639px) {
    .overlay {
      background: linear-gradient(
        180deg,
        rgba(17, 20, 12, 0.24) 27.54%,
        rgba(17, 20, 12, 0.37) 58.11%,
        rgba(17, 20, 12, 0.63) 100%
      );
    }
  }
</style>
