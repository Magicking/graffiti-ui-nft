<script>
    export let index = 0;

    import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";
    import rgeConf from "$lib/rge.conf.json";
    import rgeAbi from "$lib/rge.abi.json";
    import { ethers } from "ethers";
    import { rgbToHex, getRgbString } from "$lib/utils/useColorCode.js";
    evm.attachContract("rge", rgeConf["address"], rgeAbi);

    import { GraveyardStore1 } from "$lib/stores/graveyard.js";
    import { onMount } from "svelte";
    import Loading from "$lib/components/shared/Loading.svelte";

    // For adding a color changer
    let showRgb = false;
    let isLoading = true;
    let minFloorPrice = 0;

    $: GraveyardStore1;

    async function obtainGraffiti() {
        // Call the smart contract function
        try {
            await $contracts.rge["obtainNFT(uint256)"](index, {
                value: FloorPrice,
            }).then((e) => {
                console.log("Message sent using Provider: ", e);
                goto("/");
            });
        } catch (error) {
            console.error("An error occurred when calling obtainNFT:", error);
        }
    }

    onMount(async () => {
        // Check if the contract is available and if the data is loaded
        console.log("GraveyardStore1", $GraveyardStore1);
        if ($contracts.rge) {
            // Get the floor price
            const FloorPrice = await $contracts.rge.getMinFloorPrice();
            minFloorPrice = ethers.utils.formatUnits(FloorPrice, "ether");
            isLoading = false;
        }
    });
</script>

<div>
    {#if isLoading}
        <Loading />
    {:else}
        <h2>
            Graffiti {index}ª
        </h2>
        {#if $GraveyardStore1 && $GraveyardStore1.length > 0}
            <div class="text-white p-10">
                <h2 class="my-3">Details</h2>
                <!--
            Items to display nicely:
             - Color
             - Owner
             - Description
             - External URL
         -->
                <div class="flex items-center justify-start gap-y-3">
                    <p class="w-[28rem]">
                        Color:
                        {#if showRgb}
                            {rgbToHex(
                                $GraveyardStore1[index].attributes[0].Red,
                                $GraveyardStore1[index].attributes[1].Green,
                                $GraveyardStore1[index].attributes[2].Blue,
                            )}
                        {:else}
                            {getRgbString(
                                $GraveyardStore1[index].attributes[0].Red,
                                $GraveyardStore1[index].attributes[1].Green,
                                $GraveyardStore1[index].attributes[2].Blue,
                            )}
                        {/if}
                    </p>
                    <button on:click={() => (showRgb = !showRgb)}>
                        {#if showRgb}Show RGB{:else}Show HEX Code{/if}
                    </button>
                </div>
                <p>&nbsp;</p>
                <p>Soon (tm)</p>
                <p>&nbsp;</p>
                <p>
                    Obtain: <button id="obtainBtn" on:click={obtainGraffiti}
                        >{minFloorPrice}</button
                    >
                </p>
            </div>
            <img
                class="pxl justify-center items-center mx-auto my-4 px-4"
                alt="NFT {index}"
                src={$GraveyardStore1[index].image}
            />
        {/if}
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
