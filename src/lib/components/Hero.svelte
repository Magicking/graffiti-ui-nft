<script>
  import { locale, translation } from "$lib/stores/i18n";
  import WalletSetup from "./WalletSetup.svelte";

  $: t = $translation;
  $: lang = $locale;
</script>

<section class="h-[90vh] hero">
  <div class="flex items-center p-5 h-full w-full justify-between">
    <div class="flex-1 flex items-center justify-center">
      <div class="">
        <h1
          class="text-6xl font-geom text-yellow uppercase mb-2 flex flex-col md:items-center justify-center items-start"
        >
          <span class="widest-tracking"> Graffiti </span>
          <span class="text-lime epitaph font-geom widest-tracking"
            >Graffiti</span
          ><br />
          <span class="text-yellow epitaph font-geom text-4xl md:text-6xl"
            >Ethernal NFT</span
          >
        </h1>
        <h2
          class="text-lg text-white tracking-widest uppercase md:min-w-[30rem] sm:text-start md:text-center"
        >
          {t("Hero.Welcome")}<br />
        </h2>
        <div class="flex mt-10 w-56 flex items-center justify-center w-full">
          <WalletSetup styleType="" />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .widest-tracking {
    letter-spacing: 20px;
  }
  @media (max-width: 639px) {
    .widest-tracking {
      letter-spacing: 2px;
    }
  }
  .epitaph:hover {
    color: #fff; /* White text */
    cursor: pointer;
    text-shadow:
      0 0 10px #fff,
      /* First layer of shadow */ 0 0 5px rgba(246, 255, 0, 0.6),
      /* Second layer */ 0 0 10px rgba(242, 255, 0, 0.6),
      /* Third layer */ 0 0 20px rgba(208, 255, 0, 0.6),
      /* Fourth layer */ 0 0 25px rgba(212, 255, 0, 0.6),
      /* Fifth layer */ 0 0 80px rgba(212, 255, 0, 0.6); /* Sixth layer */
    border-radius: 10px; /* Match container's border radius */
    transition: box-shadow 0.3s ease;
  }
</style>
