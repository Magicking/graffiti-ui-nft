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
      class="modal-theme-bg text-accent bg-darkBackground z-50 flex items-center justify-center p-0"
      class:scale-100={modalVisible}
      class:scale-95={!modalVisible}
    >
      <div
        class="modal-container w-full h-max mx-auto pt-5 shadow-xl z-50 overflow-y-hidden"
      >
        <div class="content p-12 pt-20 bg-darkBackground">
          Paint on the canvas below, hit SAVE to pay gas to inscribe your of
          drawing on-chain ethernarly. Use the erase button to remove
          pixels. Make sure the SAVE button is blue by funding your ethereum account.

          <br />

          <button class="mt-6 btn-red neon-btn" on:click={() => dispatch("close")}>
            Get Started!
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
