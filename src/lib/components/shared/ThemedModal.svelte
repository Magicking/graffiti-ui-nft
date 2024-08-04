<script>
  import { createEventDispatcher, onMount } from "svelte";
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
</script>

{#if open}
  <div
    class="modal-overlay z-50 fixed w-full h-full bg-gray-900 flex items-center justify-center"
    class:opacity-80={open}
    class:opacity-0={!open}
  >
    <div
      class="theme-bg text-yellow bg-camoDark z-50 flex items-center justify-center p-0"
      class:scale-100={modalVisible}
      class:scale-95={!modalVisible}
    >
      <div
        class="main w-full h-max mx-auto pt-5 shadow-xl z-50 overflow-y-hidden"
      >
        <div class="content p-12 pt-20 bg-camoDark">
          Paint on the canvas below, hit save to pay gas to inscribe your of
          drawing on-chain (Blast.io) ethernarly. Use the erase button to remove
          pixels. Make sure the Mint button is blue by funding your Blast
          ethereum account.

          <br />

          <button class="mt-6 red neon-btn" on:click={() => dispatch("close")}>
            Get Started!
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .theme-bg {
    background: #fcfc03;
    width: 410px;
    clip-path: polygon(35% 0, 100% 0, 100% 65%, 65% 100%, 0 100%, 0 35%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main {
    clip-path: polygon(35% 0, 100% 0, 100% 65%, 65% 100%, 0 100%, 0 35%);
    margin: 10px;
    height: 90%;
    background-color: #11140c;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
  }
  @media (max-width: 768px) {
    .theme-bg {
      width: 370px;
    }
  }
</style>
