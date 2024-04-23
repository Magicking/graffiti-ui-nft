<script>
  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";
  import { page } from "$app/stores";
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  import { ethers } from "ethers";
  import { rgbToHex, getRgbString } from "$lib/utils/useColorCode.js";
  evm.attachContract("rge", rgeConf["address"], rgeAbi);

  import { GraveyardStore1 } from "$lib/stores/graveyard.js";
  import { onMount } from "svelte";
  import Loading from "$lib/components/shared/Loading.svelte";

  function getIndex() {
    let i = $page.url.searchParams.get("i");
    if (i === undefined) return 0;
    return i;
  }

  // For adding a color changer
  let showRgb = false;
  let isLoading = true;
  let minFloorPrice = 0;

  onMount(async () => {
    // Check if the contract is available and if the data is loaded
    if ($contracts.rge && $GraveyardStore1.length > 0) {
      isLoading = false;
      // Get the floor price
      const FloorPrice = await $contracts.rge.getMinFloorPrice();
      obtainBtn.addEventListener("click", async () => {
      // Call the smart contract function
      try {
          await $contracts.rge[
            "obtainNFT(uint256)"
          ](getIndex(), {
          value: FloorPrice,
        }).then((e) => {
            console.log("Message sent using Provider: ", e);
            goto("/");
          })
        } catch (error) {
        console.error("An error occurred when calling obtainNFT:", error);
      }
    });
      minFloorPrice = ethers.utils.formatUnits(FloorPrice, "ether");
	  console.log($GraveyardStore1[getIndex()]);
    }
  });
</script>

<div>
  {#if isLoading}
    <Loading />
  {:else if $contracts.rge}
    <div class="text-white p-10">
      <h2>
        Graffiti {getIndex()}ª
      </h2>

      <h2 class="my-3">Details</h2>
      <p>
         Soon (tm)
       </p>
       <p>
          Obtain: <button id="obtainBtn">{minFloorPrice}</button>
        </p>
    </div>
    <img
      class="pxl justify-center items-center mx-auto my-4 px-4"
      alt="NFT {getIndex()}"
      src={$GraveyardStore1[getIndex()].image}
    />
  {:else}
    <p class="text-white text-center">
      Unable to load data. Please check the contract status or network
      connection.
    </p>
  {/if}
</div>

<style>
  .okayText {
    color: #00ff00;
  }
  .dangerText {
    color: #ff0000;
  }

  .technoText {
    color: #4cc9f0;
  }

  p {
    font-size: 12px;
    font-weight: 400;
  }
</style>
