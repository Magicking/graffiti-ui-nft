<script>
  export let index = 0;

  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";
  import { writable } from "svelte/store";
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  import { ethers } from "ethers";
  evm.attachContract("rge", rgeConf["address"], rgeAbi);

  import { onMount } from "svelte";
  import Loader from "./shared/Loader.svelte";

  let showRgb = false;
  let isLoading = true;
  let minFloorPrice = 0;
  const NFT = writable(null);
  let graffiti;

  function rgbToHex(NFT) {
    const red = NFT.attributes[0].Red;
    const green = NFT.attributes[1].Green;
    // Check if the Blue attribute exists, otherwise use Red
    const blue = NFT.attributes[2].Blue !== undefined ? NFT.attributes[2].Blue : NFT.attributes[2].Red;
    const toHex = (c) => c.toString(16).padStart(2, "0");
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  }

  function getRgbString(NFT) {
    const red = NFT.attributes[0].Red;
    const green = NFT.attributes[1].Green;
    const blue = NFT.attributes[2].Red; // Red => Green after patch submission
    return `rgb(${red}, ${green}, ${blue})`;
  }

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

  async function obtainGraffiti() {
    try {
      await $contracts.rge["obtainNFT(uint256)"](index, {
        value: ethers.utils.parseUnits(minFloorPrice.toString(), "ether"),
      }).then((e) => {
        console.log("Message sent using Provider: ", e);
        goto("/");
      });
    } catch (error) {
      console.error("An error occurred when calling obtainNFT:", error);
    }
  }

  onMount(async () => {
    if ($contracts.rge) {
      const FloorPrice = 0;//await $contracts.rge.getMinFloorPrice();
      minFloorPrice = ethers.utils.formatUnits(FloorPrice, "ether");
      graffiti = await $contracts.rge.getGraffitiBase(index);
      const tokenURI = await $contracts.rge.tokenURI(index);
      const stripb64h = b64DecodeUnicode(
        tokenURI.replace(/^data:\w+\/\w+;base64,/, "")
      );
      const parsedNFT = JSON.parse(stripb64h);
      NFT.set(parsedNFT);
      isLoading = false;
    }
  });
</script>

<div class=" main min-h-screen bg-camoDark">
  <div class="content">
    {#if isLoading}
      <Loader />
    {:else if $NFT != null}
      <div class=" text-camoDark p-10 max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4 font-geom">Graffiti {index}ª</h2>
        <div class="bg-camo p-4 rounded-lg shadow-lg">
          <img
            class="w-full h-auto object-cover rounded-lg"
            alt="NFT {index}"
            src={$NFT.image}
          />
          <div class="mt-4 font-chakra">
            <h3 class="text-xl font-geom font-semibold">Details</h3>
            <p class="mt-2">
              Color:
              <a
                href
                style="color:{rgbToHex($NFT)}"
                on:click={() => (showRgb = !showRgb)}
              >
                {#if showRgb}
                  {rgbToHex($NFT)}
                {:else}
                  {getRgbString($NFT)}
                {/if}
              </a>
            </p>
            <p class="mt-2">
              Creator: <a
                href="https://blastscan.io/address/{graffiti.creator}"
                class="text-yellow">{graffiti.creator}</a
              >
            </p>
            <p class="mt-2">
              Owner: <a
                href="https://blastscan.io/address/{graffiti.owner}"
                class="text-brightGreen">{graffiti.owner}</a
              >
            </p>
            <p class="mt-4">
              Obtain:
              <button
                id="obtainBtn"
                class="neon-btn lime"
                on:click={obtainGraffiti}
              >
                {minFloorPrice} ETH
              </button>
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  p {
    font-size: 14px;
  }

  .main {
    margin-top: -1%;
    background: #fcfc03;
    position: relative;
  }
  .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    left: 3.55px;
    margin-top: -1%;

    background: #11140c;
  }
</style>
