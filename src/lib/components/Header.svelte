<script>
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { locale, translation } from "$lib/stores/i18n";

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
</script>

<header class=" text-camo font-geom main">
  <div class="content flex">
    <div class="px-10 py-6">
      <div class="flex w-full md:flex-row h-16">
        <div class="flex items-center">
          <h4 class="text-2xl outline-2 font-geom logo">
            <a href="/">Graffiti NFT</a>
          </h4>
        </div>
        <div class="hidden md:flex items-center">
          <div class="ml-10 flex items-center space-x-4 text-xl">
            <p
              class="menu-item"
              aria-current={$page.url.pathname === "/gallery"
                ? "page"
                : undefined}
            >
              <a href="/gallery"> {t("Header.Graveyard")} </a>
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
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div class="mr-2 flex md:hidden">
      <!-- Mobile menu button -->
      <button
        on:click={toggleMenu}
        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
      >
        <span class="sr-only">Open main menu</span>
        <!-- Icon when menu is closed. -->
        <svg
          class="{menuOpen ? 'hidden' : 'block'} h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <div class="{menuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <!-- Duplicate Navigation links for mobile -->
            <a href="/" class="block px-3 py-2 rounded-md text-sm menu-item">
              {t("Header.Graveyard")}
            </a>
            <a
              href="/mint"
              class="block px-3 py-2 rounded-md text-sm menu-item"
            >
              {t("Header.Souldraw")}
            </a>
            <a
              href="/connect"
              class="block px-3 py-2 rounded-md text-sm menu-item"
            >
              {t("Header.Wallet")}
            </a>
          </div>
        </div>
      </button>
    </div>
  </div>
</header>

<style>
  .logo {
    padding: 10px 20px;
    clip-path: polygon(
      20px 0,
      100% 0,
      100% 50%,
      calc(100% - 20px) 100%,
      0 100%,
      0 50%
    );
    color: #f8f32b;
    border: 2px solid #f8f32b;
  }
  .logo:hover {
    color: #f8f32b; /* White text */
    cursor: pointer;
    text-shadow:
      0 0 10px #fff,
      /* First layer of shadow */ 0 0 5px rgba(246, 255, 0, 0.6),
      /* Second layer */ 0 0 10px rgba(242, 255, 0, 0.6),
      /* Third layer */ 0 0 20px rgba(208, 255, 0, 0.6),
      /* Fourth layer */ 0 0 25px rgba(212, 255, 0, 0.6),
      /* Fifth layer */ 0 0 80px rgba(212, 255, 0, 0.6); /* Sixth layer */
    transition: box-shadow 0.3s ease;
    border: 2px solid #f8f32b;
  }

  .menu-item:hover {
    color: #f8f32b;
  }

  /* Experimental */
  /* .main {
    clip-path: polygon(76% 0, 84% 37%, 100% 37%, 100% 100%, 0 100%, 0 0);
    height: 120px;
    width: 100%;
    background: #fcfc03;
  }

  .content {
    height: 114px;
    width: 99%;
    position: relative;
    left: 0.5%;
    top: 3px;

    clip-path: polygon(76% 0, 84% 37%, 100% 37%, 100% 100%, 0 100%, 0 0);

    background: #11140c;
  } */
</style>
