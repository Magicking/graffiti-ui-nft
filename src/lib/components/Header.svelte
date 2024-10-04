<script>
  import {
    connected
  } from "svelte-ethers-store";
  import { page } from "$app/stores";
  import { createEventDispatcher, onMount } from "svelte";
  import { locale, translation } from "$lib/stores/i18n";
  import { chainInfo } from "$lib/stores/chainInfo";

  export let style = "";
  $: t = $translation;
  $: lang = $locale;

  let menuOpen = false;
  let deviceWidth;
  let device;

  function updateDeviceWidth() {
    deviceWidth = window.innerWidth;
    device = deviceWidth > 768 ? "desktop" : "mobile";
  }

  onMount(() => {
    if (typeof window !== "undefined") {
      updateDeviceWidth();

      window.addEventListener("resize", updateDeviceWidth);
    }
  });

  // onDestroy(() => {
  //   window.removeEventListener("resize", updateDeviceWidth);
  // });

  function setLanguage(lang) {
    locale.set(lang);
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  const dispatch = createEventDispatcher();
</script>

<header
  class="text-tertiary flex font-geom main bg-accent {style === 'hero'
    ? 'hero'
    : ''}"
>
  <div
    class="content bg-darkBackground flex {style === 'hero'
      ? 'bg-transparent'
      : ''}"
  >
    <div class="md:px-10 py-6">
      <div class="flex w-full flex-col md:flex-row h-16">
        <div class="flex items-center pl-4">
          <h4 class="text-2xl outline-2 font-geom logo">
            <a href="/">Graffiti NFT</a>
          </h4>
        </div>

        <!-- Mobile menu, show/hide based on menu state -->
        <div class="flex md:hidden pl-4 mt-2">
          <!-- Mobile menu buttons -->
          <div class="block md:hidden bg-accent">
            <div
              class=" flex items-center justify-center px-2 space-y-1 sm:px-3 text-darkBackground"
            >
              <!-- Duplicate Navigation links for mobile -->
              <a href="/" class="block px-3 rounded-md text-sm menu-item">
                {t("Header.Graveyard")}
              </a>
              <a href="/mint" class="block px-3 rounded-md text-sm menu-item">
                {t("Header.Souldraw")}
              </a>
              <a
                href="/connect"
                class="block px-3 rounded-md text-sm menu-item"
              >
                {t("Header.Wallet")}
              </a>
          {#if $connected}
          <a href="#" on:click={() => dispatch("toggle")} class="block px-3 rounded-md text-sm menu-item">
            {#if $chainInfo}
              <span>Network: {$chainInfo.name}</span>
            {:else}
              <span>Select network</span>
            {/if}
          </a>
          {/if}
        </div>
      </div>
        </div>

        <div class="hidden md:flex items-center">
          <div class="ml-10 flex items-center space-x-4 text-xl">
            <p
              class="menu-item"
              aria-current={$page.url.pathname === "/" ? "page" : undefined}
            >
              <a href="/"> {t("Header.Graveyard")} </a>
            </p>
            <p
              class="menu-item"
              aria-current={$page.url.pathname === "/mint" ? "page" : undefined}
            >
              <a href="/mint">{t("Header.Souldraw")}</a>
            </p>
            <p
              class="menu-item"
              aria-current={$page.url.pathname.startsWith("/connect")
                ? "page"
                : undefined}
            >
              <a href="/connect">{t("Header.Wallet")}</a>
            </p>
          </div>
        </div>
        <!-- ... existing header content ... -->
        {#if $connected}
        <!-- Add this new blockchain selector -->
        <div class="hidden md:flex items-center ml-4 relative">
          <button
            on:click={() => dispatch("toggle")}
            class="flex items-center space-x-2 btn-secondary neon-btn px-3 py-2 rounded-md"
          >
            {#if $chainInfo}
              <img
                src={$chainInfo.logo}
                alt={$chainInfo.name}
                class="w-6 h-6"
              />
              <span>{$chainInfo.name}</span>
            {:else}
              <span>Select network</span>
            {/if}
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          </div>
          {/if}
      </div>
    </div>
  </div>
</header>

<style>
  /* ----------- Header Styles are rather too specific ------------------  */
  /* 
  
  The main focus is that the colors are change able, at places where I think the styles can not be changed much I am 
  adding the tailwind classes with the theme color names.

  */
  .main {
    clip-path: polygon(63% 0, 72% 49%, 100% 51%, 100% 100%, 0 100%, 0 0);
    height: 120px;
    width: 100%;
  }

  .hero {
    background: transparent;
  }

  .content {
    height: 94%;
    width: 99.4%;
    position: relative;
    left: 3.3px;
    top: 2%;
    clip-path: polygon(63% 0, 72% 53%, 100% 55%, 100% 100%, 0 100%, 0 0);
  }
</style>
