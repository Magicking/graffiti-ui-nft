<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { chainInfo } from "$lib/stores/chainInfo";
  export let open = false;
  const dispatch = createEventDispatcher();
  let modalVisible = false;

  onMount(() => {
    if (open) {
      setTimeout(() => {
        modalVisible = true;
      }, 10);
    }
  });

  $: if (!open) {
    modalVisible = false;
  }

  function selectChain(chain) {
    chainInfo.set(chain);
    dispatch("close");
  }
  const blockchains = [
    {
      chainId: 81457,
      name: "Blast",
      logo: "/images/logo/blast.png",
      address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
    },
    {
      chainId: 8453,
      name: "Base",
      logo: "/images/logo/base.png",
      address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
    },
  ];
</script>

{#if open}
  <div
    class="modal-overlay z-50 fixed w-full h-full bg-gray-900 flex items-center justify-center"
    class:opacity-80={open}
    class:opacity-0={!open}
  >
    <div
      class="modal-theme-bg text-accent bg-darkBackground z-50 flex items-center justify-center p-0"
      class:scale-100={modalVisible}
      class:scale-95={!modalVisible}
    >
      <div
        class="modal-container w-full h-max mx-auto pt-5 shadow-xl z-50 overflow-y-hidden"
      >
        <div class="content p-12 pt-20 bg-darkBackground">
          Paint on the canvas below, hit save to pay gas to inscribe your of
          drawing on-chain (Blast.io) ethernarly. Use the erase button to remove
          pixels. Make sure the Mint button is blue by funding your Blast
          ethereum account.

          {#each blockchains as chain}
            <button
              on:click={() => selectChain(chain)}
              class="flex items-center neon-btn w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <img src={chain.logo} alt={chain.name} class="w-6 h-6 mr-2" />
              <span>{chain.name}</span>
              <span class="ml-auto text-xs text-gray-500"
                >ID: {chain.chainId}</span
              >
            </button>
          {/each}

          <br />
          <button
            class="mt-6 btn-red neon-btn"
            on:click={() => dispatch("close")}
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
