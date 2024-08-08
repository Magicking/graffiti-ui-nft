<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { locale, translation } from "$lib/stores/i18n";

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
</script>

<header
  class="text-tertiary flex font-geom main {style === 'hero' ? 'hero' : ''}"
>
  <div class="content flex {style === 'hero' ? 'hero-content' : ''}">
    <div class="md:px-10 py-6">
      <div class="flex w-full flex-col md:flex-row h-16">
        <div class="flex items-center pl-4">
          <h4 class="text-2xl outline-2 font-geom logo">
            <a href="/">Graffiti NFT</a>
          </h4>
        </div>

        <!-- Mobile menu, show/hide based on menu state -->
        <div class=" flex md:hidden pl-4 mt-2">
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
      </div>
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

  /* Experimental */
  .main {
    clip-path: polygon(63% 0, 72% 49%, 100% 51%, 100% 100%, 0 100%, 0 0);
    height: 120px;
    width: 100%;
    background: #fcfc03;
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
    background: #11140c;
  }

  .hero-content {
    background: transparent;
  }
</style>
