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
    class="modal-overlay z-50 fixed w-full h-[100vh] bg-gray-900 opacity-80"
    class:opacity-50={open}
    class:opacity-0={!open}
  ></div>
  <div
    class="theme-bg text-yellow bg-camoDark z-50 fixed top-0 left-0 flex items-center justify-center p-8 lg:p-0"
    class:scale-100={modalVisible}
    class:scale-95={!modalVisible}
  >
    <div
      class="main w-full lg:h-max lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
    >
      <div class="head bg-camoDark py-5 px-8 text-2xl font-extrabold">
        <button
          class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
          on:click={() => dispatch("close")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            />
          </svg>
        </button>
      </div>
      <div class="content p-8 bg-camoDark">
        Paint on the canvas below, hit save to pay gas to inscribe your of
        drawing on-chain (Blast.io) ethernarly. Use the erase button to remove
        pixels. Make sure the Mint button is blue by funding your Blast ethereum
        account.

        <br />

        <button class="mt-10 red neon-btn" on:click={() => dispatch("close")}
          >Get Started!</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .theme-bg {
    background: #fcfc03;
    height: 410px;
    width: 410px;
    clip-path: polygon(35% 0, 100% 0, 100% 65%, 65% 100%, 0 100%, 0 35%);
    top: 28%;
    left: 35%;
  }
  .main {
    clip-path: polygon(35% 0, 100% 0, 100% 65%, 65% 100%, 0 100%, 0 35%);
    height: 390px;
    top: 2.5px;
    left: 2.5px;
    position: relative;
    width: 390px;
    background-color: #11140c;
  }
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: -webkit-fill-available;
  }
</style>
