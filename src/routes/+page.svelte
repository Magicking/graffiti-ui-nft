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
  import BlockchainSelectorModal from "$lib/components/shared/BlockchainSelectorModal.svelte";
  import Header from "../lib/components/Header.svelte";

  let showModal = false;

  const handleToggleModal = () => {
    console.log("Toggle modal");
    showModal = !showModal;
  };

  onMount(() => {
    useConnectToWallet();
  });
</script>

<svelte:head>
  <title>Graffiti</title>
  <meta name="description" content="Graffiti" />
</svelte:head>

<Header on:toggle={() => handleToggleModal()}/>
<div class="main bg-accent">
  <div class="background-container"></div>
  <div class="main-container">
    {#if $connected}
      {#if $chainId !== $chainInfo.chainId}
        <InvalidChain />
        <h1 class="btn-red text-center">Warning /!\ not on supported chain /!\</h1>
      {:else}
      <BlockchainSelectorModal
        title=""
        open={showModal}
        on:close={() => handleToggleModal()}
      >
        <svelte:fragment slot="body">
          This is content inside my modal! 👋
        </svelte:fragment>
      </BlockchainSelectorModal>
        <Graveyard />
      {/if}
    {:else}
      <Hero />
    {/if}
  </div>
</div>