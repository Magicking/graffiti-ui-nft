<script>
  export let index = 0;

  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";
  import { writable } from "svelte/store";
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  import { ethers } from "ethers";
  evm.attachContract("rge", rgeConf["address"], rgeAbi);

  import { onMount } from "svelte";
  import Loading from "$lib/components/shared/Loading.svelte";

  let showRgb = false;
  let isLoading = true;
  let minFloorPrice = 0;
  const NFT = writable(null);
  let graffiti;

  function rgbToHex(NFT) {
    const red = NFT.attributes[0].Red;
    const green = NFT.attributes[1].Green;
    const blue = NFT.attributes[2].Red; // Red => Green after patch submission
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
      const FloorPrice = await $contracts.rge.getMinFloorPrice();
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

<div class="min-h-screen bg-camoDark p-4 font-sans">
  {#if isLoading}
    <Loading />
  {:else if $NFT != null}
    <div class="text-white p-10 max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-4 font-geom">Graffiti {index}ª</h2>
      <div class="bg-camo p-4 rounded-lg shadow-lg">
        <img
          class="w-full h-auto object-cover rounded-lg"
          alt="NFT {index}"
          src={$NFT.image}
        />
        <div class="mt-4">
          <h3 class="text-xl font-semibold">Details</h3>
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
              class="text-blue-500">{graffiti.creator}</a
            >
          </p>
          <p class="mt-2">
            Owner: <a
              href="https://blastscan.io/address/{graffiti.owner}"
              class="text-blue-500">{graffiti.owner}</a
            >
          </p>
          <p class="mt-4">
            Obtain:
            <button
              id="obtainBtn"
              class="neon-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

<style>
  .neon-btn {
    background-color: #3498db;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
  }

  .neon-btn:hover {
    background-color: #2980b9;
  }

  .font-sans {
    font-family: sans-serif;
  }

  p {
    font-size: 14px;
  }
</style>
