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
  import { chainInfo } from "$lib/stores/chainInfo";
  import InvalidChain from "$lib/components/InvalidChain.svelte";
  import abi from "$lib/rge.abi.json";
  import Header from "../../lib/components/Header.svelte";
  import BlockchainSelectorModal from "../../lib/components/shared/BlockchainSelectorModal.svelte";
  import { hasShownModal } from "$lib/stores/modal.js";

  if ($chainInfo) {
    evm.attachContract("rge", $chainInfo.address, abi);
  }


  onMount(() => {
    useConnectToWallet();
  });

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

<Header on:toggle={() => handleToggleModal()}/>
<div class="main bg-accent min-h-screen">
  <div class="base-content bg-transparent md:bg-darkBackground">
    {#if $connected}
      {#if $chainId != $chainInfo.chainId}
        <InvalidChain />
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
        <Mint on:toggle={() => handleToggleModal()} />
      {/if}
    {:else}
      <Hero />
    {/if}
  </div>
</div>
