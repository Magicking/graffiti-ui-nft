<script>
  import {
    defaultEvmStores as evm,
    contracts,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import Hero from "$lib/components/Hero.svelte";
  import Mint from "$lib/components/Mint.svelte";
  import { onMount } from "svelte";
  import { useConnectToWallet } from "$lib/utils/useConnectToWallet";
  import { address, chainid } from "$lib/rge.conf.json";
  import InvalidChain from "$lib/components/InvalidChain.svelte";
  import abi from "$lib/rge.abi.json";
  import Header from "../../lib/components/Header.svelte";
  import ThemedModal from "../../lib/components/shared/ThemedModal.svelte";
  evm.attachContract("rge", address, abi);

  let showModal = false;
  const handleToggleModal = () => {
    console.log("Toggle modal");
    // if ($connected ) {
    showModal = !showModal;
    // }
  };

  onMount(() => {
    useConnectToWallet();
    handleToggleModal();
  });
</script>

<Header />
<div class="main min-h-screen">
  <div class="content">
    <ThemedModal title="" open={showModal} on:close={() => handleToggleModal()}>
      <svelte:fragment slot="body">
        This is content inside my modal! 👋
      </svelte:fragment>
    </ThemedModal>

    {#if $connected}
      {#if $chainId !== chainid}
        <InvalidChain />
      {:else}
        <Mint on:toggle={() => handleToggleModal()} />
      {/if}
    {:else}
      <Hero />
    {/if}
  </div>
</div>

<style>
  .main {
    background: #fcfc03;
  }

  .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    left: 3.55px;
    margin-top: -1%;

    background: #11140c;
  }
</style>
