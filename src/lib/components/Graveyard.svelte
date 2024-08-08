<script>
  import { range } from "$lib/range.js";
  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";

  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  import { GraveyardStore1, TotalSupply } from "$lib/stores/graveyard.js";
  import { locale, translation } from "$lib/stores/i18n";

  import Loader from "./shared/Loader.svelte";

  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);

  $: totalSupply = TotalSupply;
  $: t = $translation;
  $: GraveyardStore1;
  let owners = {};

  const getRecentTokens = (count) => {
    const start = totalSupply > count ? totalSupply - count : 0;
    return range(start, totalSupply - 1, 1).reverse();
  };

  const getOwnerOfToken = async (tokenId) => {
    try {
      const owner = await $contracts.rge.ownerOf(tokenId);
      owners = { ...owners, [tokenId]: owner };
    } catch (error) {
      console.error(`Error fetching owner for token ${tokenId}:`, error);
    }
  };

  const shortAddress = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;
</script>

<div class="main">
  <div class=" content min-h-screen p-4 font-geom">
    {#if $contracts.rge}
      {#await $contracts.rge.totalSupply()}
        <Loader />
      {:then totalSupply}
        <div class="flex items-center flex-col">
          <div class="w-full flex items-center">
            <p class="py-4 neon-btn lime text-center text-3xl xl:ml-20">
              {t("Graveyard.ArtTillNow")} : {totalSupply}
            </p>
          </div>

          <h1 class="text-accent text-center text-2xl uppercase mt-10">
            {t("Graveyard.TopArt")}
          </h1>
          <!-- Carousel Section for Top 10 Most Recent Images -->
          <div class="w-[90%] overflow-x-auto mb-20 custom-scrollbar">
            <div class="flex space-x-4 p-4">
              {#each range(totalSupply - 0, totalSupply - 10, 1) as tokenId}
                {#if tokenId >= 0 && tokenId < totalSupply && $GraveyardStore1}
                  <div
                    class="min-w-[250px] bg-gray-700 rounded-lg overflow-hidden"
                  >
                    <a href="/graffiti/?i={tokenId}" class="block">
                      {#if $GraveyardStore1[tokenId]}
                        <img
                          class="class-{tokenId} w-full h-64 object-cover"
                          alt="NFT"
                          src={$GraveyardStore1[tokenId].image}
                        />
                      {:else}
                        <div
                          class="w-full h-64 bg-gray-600 flex justify-center items-center"
                        >
                          <span class="text-white"
                            >{t("Graveyard.Loading")}</span
                          >
                        </div>
                      {/if}
                    </a>
                    <div
                      class="details bg-accent p-2 text-center text-black border-2 border-accent"
                    >
                      <p>№&nbsp;{tokenId}</p>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
          <h1 class="text-accent text-2xl uppercase text-center md:text-start">
            {t("Graveyard.CommunityArt")}
          </h1>

          <!-- Grid Gallery Section -->
          <div
            class="gallery grid grid-cols-2 mt-4 mb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {#each range(-1, totalSupply, 1) as tokenId}
              {#if tokenId >= 0 && tokenId < totalSupply && $GraveyardStore1}
                <div class="gallery-item bg-gray-700 rounded-lg overflow mb-4">
                  <a href="/graffiti/?i={tokenId}" class="block">
                    {#if $GraveyardStore1[tokenId]}
                      <img
                        class="w-full h-64 object-cover"
                        alt="NFT"
                        src={$GraveyardStore1[tokenId].image}
                      />
                    {:else}
                      <div
                        class="w-full h-64 bg-gray-600 flex justify-center items-center"
                      >
                        <span class="text-white">
                          {t("Graveyard.Loading")}
                        </span>
                      </div>
                    {/if}
                  </a>
                  <div
                    class="details bg-accent p-2 text-center text-black border-2 border-accent"
                  >
                    <p>№&nbsp;{tokenId}</p>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/await}
    {/if}
  </div>
</div>

<style>
  .main {
    width: 100%;
    height: 100%;
    /* background: #fcfc03; */
  }
  .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    left: 3.5px;
    margin-top: -1%;
    padding-top: 3%;
  }

  .gallery {
    display: grid;
    gap: 1rem;
  }

  .gallery-item {
    display: inline-block;
    width: 100%;
    height: auto;
  }

  /* Custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    height: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #fcfc03;
    border-radius: 5px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #fcfc03;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #98dd28;
    border-radius: 5px;
  }
</style>
