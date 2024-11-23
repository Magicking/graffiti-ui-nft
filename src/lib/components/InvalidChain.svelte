<script>
  import { createEventDispatcher } from "svelte";
  import { chainConfigs } from "$lib/config/chains";
  import { addChain } from "$lib/utils/chainUtils";

  const dispatch = createEventDispatcher();
  
  const blockchains = Object.values(chainConfigs).map(config => ({
    chainId: config.decimalId,
    name: config.shortName,
    logo: config.logo,
    address: config.address,
    addChain: async () => {
      const success = await addChain(config);
      if (success) {
        window.location.reload();
      }
      dispatch("close");
    }
  }));
</script>

<div>
  {#each blockchains as chain}
    <h1>
      <button
        on:click={() => chain.addChain()}
        class="flex items-center btn-secondary neon-btn w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        <img src={chain.logo} alt={chain.name} class="w-6 h-6 mr-2" />
        <span>{chain.name}</span>
        <span class="ml-auto text-xs text-gray-500">ID: {chain.chainId}</span>
      </button>
    </h1>
  {/each}
</div>
