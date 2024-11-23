import { defaultEvmStores as evm } from "svelte-ethers-store";
import { chainInfo } from "$lib/stores/chainInfo";
import rgeAbi from "$lib/rge.abi.json";

export async function addChain(chainConfig) {
  if (!window.ethereum) {
    console.log("Ethereum object does not exist!");
    return false;
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainConfig.chainId,
          blockExplorerUrls: [chainConfig.blockExplorer],
          chainName: chainConfig.name,
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [chainConfig.rpcUrl],
        },
      ],
    });

    console.log(`Added ${chainConfig.name} chain`);
    
    evm.attachContract(
      "rge",
      chainConfig.address,
      rgeAbi["abi"]
    );

    chainInfo.set({
      chainId: parseInt(chainConfig.chainId),
      name: chainConfig.shortName,
      logo: chainConfig.logo,
      address: chainConfig.address,
      viewUrl: chainConfig.viewUrl,
      blockExplorer: chainConfig.blockExplorer,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
} 