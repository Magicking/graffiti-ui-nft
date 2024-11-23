import { writable } from "svelte/store";
import { browser } from "$app/environment";

import { chainConfigs } from "$lib/config/chains";

let storedChainInfo = browser && localStorage.getItem("chainInfo");
storedChainInfo = storedChainInfo ? JSON.parse(storedChainInfo) : undefined;

if (!storedChainInfo) {
    storedChainInfo = chainConfigs.BASE;
}

export const chainInfo = writable(storedChainInfo);

chainInfo.subscribe(value => {
    if (browser) {
        localStorage.setItem("chainInfo", JSON.stringify(value));
    }
});
