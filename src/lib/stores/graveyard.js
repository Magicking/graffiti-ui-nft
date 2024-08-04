import { derived } from 'svelte/store';
import { ethers } from 'ethers';
import { writable } from 'svelte/store';

import { provider, signer, signerAddress, contracts } from 'svelte-ethers-store';
function atob(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = '';
    let i = 0;

    while (i < input.length) {
        const encoded1 = chars.indexOf(input[i++]);
        const encoded2 = chars.indexOf(input[i++]);
        const encoded3 = chars.indexOf(input[i++]);
        const encoded4 = chars.indexOf(input[i++]);

        const decoded1 = (encoded1 << 2) | (encoded2 >> 4);
        const decoded2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        const decoded3 = ((encoded3 & 3) << 6) | encoded4;

        str += String.fromCharCode(decoded1);
        if (encoded3 !== 64) str += String.fromCharCode(decoded2);
        if (encoded4 !== 64) str += String.fromCharCode(decoded3);
    }

    return str;
}

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export const TotalSupply = writable(0);

let ProviderRunning = false;
let unsubscribe = null;
export const GraveyardStore1 = derived([provider, signerAddress, contracts], ([$provider, $signerAddress, $contracts], set) => {
	if (!$provider || !$contracts.rge || !$signerAddress) return set({});

	unsubscribe = provider.subscribe(async (provider) => {
		if (!provider || ProviderRunning) {
			if (unsubscribe) {
                unsubscribe();
                unsubscribe = null;
                console.log("Unsubscribed");
            }
			return;
		}

		let instanceId = Math.random();
        console.log("New Provider", ProviderRunning);
		ProviderRunning = true;
		let MaxIndex = 0;
		let currentIndex = -1;
		let ret = new Array(0);
		provider.on('block', async (_block) => {
			if ($contracts.rge) {
			console.log("New Block("+instanceId+")", _block);
				if (Number(_block) - MaxIndex  >= 40) {
					const totalSupply = await $contracts.rge.totalSupply();
				    console.log(currentIndex, _block);
					TotalSupply.set(totalSupply);
					currentIndex = Number(totalSupply) - 1;
					MaxIndex = Number(_block);
				}
				console.log(currentIndex,Number(_block) - MaxIndex, _block);
				const tokenURI = await $contracts.rge.tokenURI(Number(_block) - MaxIndex);
				const stripb64h = tokenURI.replace(/^data:\w+\/\w+;base64,/, '');
				const jobject = JSON.parse(b64DecodeUnicode(stripb64h));
				currentIndex = String(jobject['external_url']).split("=")[1];
				if (ret.length >= 50) {
					ret.shift(); // Remove the oldest item if we have more than 50 items
				}
				ret[currentIndex] = jobject;
				ret["minFloorPrice"] = 0;//await $contracts.rge.getMinFloorPrice();
				set(ret);
				currentIndex = currentIndex - 1;
				console.log(currentIndex, jobject, ret);
				
			}
		});
	});
});
