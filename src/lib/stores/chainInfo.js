import { writable } from "svelte/store";
import { browser } from "$app/environment";

let storedChainInfo = browser && localStorage.getItem("chainInfo");
storedChainInfo = storedChainInfo ? JSON.parse(storedChainInfo) : undefined;

export const chainInfo = writable(storedChainInfo);

chainInfo.subscribe(value => {
    if (browser) {
        localStorage.setItem("chainInfo", JSON.stringify(value));
    }
});
