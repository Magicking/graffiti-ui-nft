import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultChainInfo = {
    chainId: 0x2105,
    name: "Blast",
    logo: "/images/logo/blast.png",
    address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
};

let storedChainInfo = browser && localStorage.getItem("chainInfo");
storedChainInfo = storedChainInfo ? JSON.parse(storedChainInfo) : defaultChainInfo;

export const chainInfo = writable(storedChainInfo);

chainInfo.subscribe(value => {
    if (browser) {
        localStorage.setItem("chainInfo", JSON.stringify(value));
    }
});
