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
  import ThemedModal from "../../lib/components/shared/ThemedModal.svelte";
  import BlockchainSelectorModal from "$lib/components/shared/BlockchainSelectorModal.svelte";
  import ImageInputModal from "$lib/components/shared/ImageInputModal.svelte";
  import { hasShownModal } from "$lib/stores/modal.js";

  if ($chainInfo) {
    evm.attachContract("rge", $chainInfo.address, abi);
  }

  onMount(() => {
    useConnectToWallet();
  });

  let showModal = false;
  let showModalBlockchainSelector = false;
  let showModalImageInput = false;

  const handleToggleModal = () => {
    console.log("Toggle modal");
    showModal = !showModal;
  };

  const handleToggleModalBlockchainSelector = () => {
    console.log("Toggle modal blockchain selector");
    showModalBlockchainSelector = !showModalBlockchainSelector;
  };

  const toggleImageInputModal = () => {
    console.log("Toggle modal image input");
    showModalImageInput = !showModalImageInput;
  };

  $: if ($connected) {
    hasShownModal.subscribe((value) => {
      if (!value) {
        // setTimeout(() => {
        //showModal = true;
        hasShownModal.set(true);
        // }, 2000); // Delay for 2 seconds - Uncomment this line to again add the delay
      }
    });
  }
</script>

<Header on:toggle={() => handleToggleModalBlockchainSelector()} />
<div class="main bg-accent min-h-screen">
  <div class="base-content bg-darkBackground">
    {#if $connected}
      {#if $chainId !== $chainInfo.chainId}
        <InvalidChain />
        <h1 class="btn-red text-center">
          Warning /!\ not on supported chain /!\
        </h1>
      {:else}
        <ThemedModal open={showModal} on:close={() => handleToggleModal()} />
        <BlockchainSelectorModal
          open={showModalBlockchainSelector}
          on:close={() => handleToggleModalBlockchainSelector()}
        />
        <ImageInputModal
          open={showModalImageInput}
          on:close={() => toggleImageInputModal()}
        />
        <Mint
          on:toggle={() => handleToggleModal()}
          on:imageInputModalToggle={() => toggleImageInputModal()}
        />
      {/if}
    {:else}
      <Hero />
    {/if}
  </div>
</div>
