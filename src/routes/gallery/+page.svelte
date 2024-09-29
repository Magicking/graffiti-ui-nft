<script>
  import Graveyard from "../../lib/components/Graveyard.svelte";
  import Header from "../../lib/components/Header.svelte";
  import BlockchainSelectorModal from "../../lib/components/shared/BlockchainSelectorModal.svelte";
  import { hasShownModal } from "$lib/stores/modal.js";
  import Hero from "$lib/components/Hero.svelte";
  import InvalidChain from "$lib/components/InvalidChain.svelte";
  import { chainInfo } from "$lib/stores/chainInfo";
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";

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
</script>

<div>
  <Header on:toggle={() => handleToggleModal()} />
  {#if $connected}
    {#if $chainId != $chainInfo.chainId}
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
