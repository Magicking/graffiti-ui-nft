<script>
  import { range } from "$lib/range.js";
  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";
  import { onMount } from "svelte";

  import rgeAbi from "$lib/rge.abi.json";
  import { GraveyardStore1, TotalSupply } from "$lib/stores/graveyard.js";
  import { chainInfo } from "$lib/stores/chainInfo";
  import { locale, translation } from "$lib/stores/i18n";
    import { writable } from "svelte/store";


  import Loader from "./shared/Loader.svelte";

  if ($chainInfo) {
    console.log(rgeAbi);
    evm.attachContract("rge", $chainInfo.address, rgeAbi);
  }
  $: totalSupply = TotalSupply;
  $: t = $translation;
  $: GraveyardStore1;
  let last1 = writable(null);
  let last2 = writable(null);
  let last3 = writable(null);
  let last4 = writable(null);
  let owners = {};

  function b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  function getLast(index, store) {
    if ($contracts.rge) {
      $contracts.rge.tokenURI(index).then((tokenURI) => {
        const stripb64h = b64DecodeUnicode(
          tokenURI.replace(/^data:\w+\/\w+;base64,/, "")
      );
      const parsedNFT = JSON.parse(stripb64h);
      store.set(parsedNFT);
      });
    } else {
      console.log("Waiting for contract");
      setTimeout(() => getLast(index, store), 1000);
    }
  }

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

  onMount(() => {
    $contracts.rge.totalSupply().then((totalSupply) => {
      if (totalSupply > 1)
        getLast(totalSupply-1, last1);
    if (totalSupply > 2)
      getLast(totalSupply-2, last2);
    if (totalSupply > 3)
      getLast(totalSupply-3, last3);
    if (totalSupply > 4)
        getLast(totalSupply-4, last4);
    });
  });
</script>

<div class="main">
  <div class=" content min-h-screen p-4 font-geom pt-[3%]">
    {#if $contracts.rge}
      {#await $contracts.rge.totalSupply()}
        <Loader />
      {:then totalSupply}
        <div class="flex items-center flex-col">
          <div class="w-full flex items-center">
            <p class="py-4 neon-btn btn-secondary text-center text-3xl xl:ml-20">
              {t("Graveyard.ArtTillNow")} : {totalSupply}
            </p>
          </div>

          <h1 class="text-accent text-center text-2xl uppercase mt-10">
            {t("Graveyard.TopArt")}
          </h1>

          <!-- Carousel Section for Top 10 Most Recent Images -->
          <div class="w-[90%] overflow-x-auto mb-20 custom-scrollbar flex justify-center">
            <div class="flex space-x-4 p-4 mx-auto">
              <div
                class="min-w-[250px] bg-gray-700 rounded-lg overflow-hidden"
              >
                <a href="/graffiti/?i={totalSupply-1}" class="block">
                  {#if $last1 != null}
                    <img
                      class="class w-full h-64 object-cover"
                      alt="NFT"
                      src={$last1.image}
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
                  <p>№&nbsp;{totalSupply-1}</p>
                </div>
              </div>
              <div
                class="min-w-[250px] bg-gray-700 rounded-lg overflow-hidden"
              >
                <a href="/graffiti/?i={totalSupply-2}" class="block">
                  {#if $last2 != null}
                    <img
                      class="class w-full h-64 object-cover"
                      alt="NFT"
                      src={$last2.image}
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
                  <p>№&nbsp;{totalSupply-2}</p>
                </div>
              </div>
              <div
                class="min-w-[250px] bg-gray-700 rounded-lg overflow-hidden"
              >
                <a href="/graffiti/?i={totalSupply-3}" class="block">
                  {#if $last3 != null}
                    <img
                      class="class w-full h-64 object-cover"
                      alt="NFT"
                      src={$last3.image}
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
                  <p>№&nbsp;{totalSupply-3}</p>
                </div>
              </div>
              <div
                class="min-w-[250px] bg-gray-700 rounded-lg overflow-hidden"
              >
                <a href="/graffiti/?i={totalSupply-4}" class="block">
                  {#if $last4 != null}
                    <img
                      class="class w-full h-64 object-cover"
                      alt="NFT"
                      src={$last4.image}
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
                  <p>№&nbsp;{totalSupply-4}</p>
                </div>
              </div>
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