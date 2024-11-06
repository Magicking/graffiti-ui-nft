<script>
  import { chainInfo } from "$lib/stores/chainInfo";
  import { createEventDispatcher } from "svelte";
  import { defaultEvmStores as evm } from "svelte-ethers-store";

  import rgeAbi from "$lib/rge.abi.json";
    let reload = () => {
      window.location.reload();
    };
  const dispatch = createEventDispatcher();
  const blockchains = [
    {
      chainId: 81457,
      name: "Blast",
      logo: "/images/logo/blast.png",
      address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
      addChain: async () => {
        if (window.ethereum) {
          try {
            await window.ethereum
              .request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x13e31",
                    blockExplorerUrls: ["https://blastscan.io"],
                    chainName: "Blast Mainnet",
                    nativeCurrency: {
                      name: "Ethereum",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["https://rpc.blast.io"],
                  },
                ],
              })
              .then(() => {
                console.log("Added Blast chain");
                evm.attachContract(
                  "rge",
                  "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
                  rgeAbi["abi"],
                );
                chainInfo.set({
                  chainId: 0x13e31,
                  name: "Blast",
                  logo: "/images/logo/blast.png",
                  address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
                });
                reload();
              });
          } catch (addError) {
            console.error(addError);
          }
        } else {
          console.log("Ethereum object does not exist!");
        }
        dispatch("close");
      },
    },
    {
      chainId: 1301,
      name: "Unichain Testnet",
      logo: "/images/logo/unichaintestnet.svg",
      address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
      addChain: async () => {
        if (window.ethereum) {
          try {
            await window.ethereum
              .request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x515",
                    blockExplorerUrls: ["https://sepolia.uniscan.xyz/"],
                    chainName: "Unichain Testnet",
                    nativeCurrency: {
                      name: "Ethereum",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["https://sepolia.unichain.org"],
                  },
                ],
              })
              .then(() => {
                console.log("Added Blast chain");
                evm.attachContract(
                  "rge",
                  "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
                  rgeAbi["abi"],
                );
                chainInfo.set({
                  chainId: 0x515,
                  name: "Unichain Testnet",
                  logo: "/images/logo/unichaintestnet.svg",
                  address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
                });
                reload();
              });
          } catch (addError) {
            console.error(addError);
          }
        } else {
          console.log("Ethereum object does not exist!");
        }
        dispatch("close");
      },
    },
    {
      chainId: 8453,
      name: "Base",
      logo: "/images/logo/base.png",
      address: "0xCc39Fe145eECe8a733833D7A78dCa7f287996693",
      addChain: async () => {
        if (window.ethereum) {
          try {
            await window.ethereum
              .request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x2105",
                    blockExplorerUrls: ["https://base.blockscout.com/"],
                    chainName: "Base Mainnet",
                    nativeCurrency: {
                      name: "Ethereum",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["https://mainnet.base.org"],
                  },
                ],
              })
              .then(() => {
                console.log("Added Base chain");
                evm.attachContract(
                  "rge",
                  "0xCc39Fe145eECe8a733833D7A78dCa7f287996693",
                  rgeAbi["abi"],
                );
                chainInfo.set({
                  chainId: 0x2105,
                  name: "Base",
                  logo: "/images/logo/base.png",
                  address: "0xCc39Fe145eECe8a733833D7A78dCa7f287996693",
                });
                reload();
              });
          } catch (addError) {
            console.error(addError);
          }
        } else {
          console.log("Ethereum object does not exist!");
        }
        dispatch("close");
      },
    },
  ];
</script>

<div>
  {#each blockchains as chain}
    <h1>
      <button
        on:click={() => chain.addChain()}
        class="flex items-center btn-secondary neon-btn w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        <img src={chain.logo} alt={chain.name} class="w-6 h-6 mr-2" />
        <span>{chain.name}</span>
        <span class="ml-auto text-xs text-gray-500">ID: {chain.chainId}</span>
      </button>
    </h1>
  {/each}
</div>
