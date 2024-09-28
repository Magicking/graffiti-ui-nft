<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import Hero from "$lib/components/Hero.svelte";
  import Graveyard from "$lib/components/Graveyard.svelte";
  import { onMount } from "svelte";
  import { chainInfo } from "$lib/stores/chainInfo";
  import { useConnectToWallet } from "$lib/utils/useConnectToWallet";
  import InvalidChain from "$lib/components/InvalidChain.svelte";
  import Header from "../lib/components/Header.svelte";
  import { hasShownModal } from "$lib/stores/modal.js";

  let showModal = false;

  const handleToggleModal = () => {
    console.log("Toggle modal");
    showModal = !showModal;
  };


  $: if ($connected) {
    hasShownModal.subscribe((value) => {
      if (!value) {
        // setTimeout(() => {
        showModal = true;
        hasShownModal.set(true);
        // }, 2000); // Delay for 2 seconds - Uncomment this line to again add the delay
      }
    });
  }

  onMount(() => {
    useConnectToWallet();
  });
</script>

<svelte:head>
  <title>Graffiti</title>
  <meta name="description" content="Graffiti" />
</svelte:head>

<Header />
<div class="main bg-accent">
  <div class="background-container"></div>
  <div class="main-container">
    {#if $connected}
      {#if $chainId !== $chainInfo.chainId}
        <InvalidChain />
      {:else}
        <Graveyard />
      {/if}
    {:else}
      <Hero />
    {/if}
  </div>
</div>
