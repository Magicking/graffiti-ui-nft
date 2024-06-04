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
    showModal = !showModal;
  };

  onMount(() => {
    useConnectToWallet();
    handleToggleModal(); 
  });
</script>

<div class="main">
  <div class="content">
    <Header />
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
    min-height: 100vh;
    clip-path: polygon(
      0 16%,
      0 0,
      15% 0%,
      62% 0,
      75% 10%,
      100% 10%,
      100% 85%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    background: #fcfc03;
  }

  .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    left: 0.3%;
    top: 3px;

    clip-path: polygon(
      0 16%,
      0 0,
      15% 0%,
      62% 0,
      75% 10%,
      100% 10%,
      100% 85%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    background: #11140c;
  }
</style>
