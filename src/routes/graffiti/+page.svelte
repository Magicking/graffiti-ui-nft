<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import { page } from "$app/stores";
  import Hero from "$lib/components/Hero.svelte";
  import Graffiti from "$lib/components/Graffiti.svelte";
  import { onMount } from "svelte";
  import { useConnectToWallet } from "$lib/utils/useConnectToWallet";
  import { chainInfo } from "$lib/stores/chainInfo";
  import InvalidChain from "$lib/components/InvalidChain.svelte";
  import abi from "$lib/rge.abi.json";
  import Header from "../../lib/components/Header.svelte";

  onMount(() => {
    useConnectToWallet();
    evm.attachContract("rge", $chainInfo.address, abi);
  });

  function getIndex() {
    let i = $page.url.searchParams.get("i");
    if (i === undefined) return 0;
    return i;
  }
</script>

<div>
  <Header />
  {#if $connected}
    {#if $chainId !== $chainInfo.chainId}
      <InvalidChain />
      <h1 class="btn-red text-center">Warning /!\ not on supported chain /!\</h1>
    {:else}
      <Graffiti index={getIndex()} />
    {/if}
  {:else}
    <Hero />
  {/if}
</div>
