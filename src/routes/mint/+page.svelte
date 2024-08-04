<script>
  import {
    defaultEvmStores as evm,
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
  import { hasShownModal } from "$lib/stores/modal.js";
  evm.attachContract("rge", address, abi);

  let showModal = false;

  const handleToggleModal = () => {
    console.log("Toggle modal");
    showModal = !showModal;
  };

  onMount(() => {
    useConnectToWallet();
  });

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
</script>

<Header />
<div class="main min-h-screen">
  <div class="content">
    {#if $connected}
      {#if $chainId !== chainid}
        <InvalidChain />
      {:else}
        <ThemedModal
          title=""
          open={showModal}
          on:close={() => handleToggleModal()}
        >
          <svelte:fragment slot="body">
            This is content inside my modal! 👋
          </svelte:fragment>
        </ThemedModal>
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

  @media (max-width: 639px) {
    .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    left: 3.55px;
    margin-top: -1%;

    background: #11140c;
  }
  }
  
</style>
