<script>
  import { chainInfo } from "$lib/stores/chainInfo";
  const addBlastChain = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13e31",
              blockExplorerUrls: ["https://blastscan.io"],
              chainName: "Blast Mainnet",
              nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
              rpcUrls: ["https://rpc.blast.io"],
            },
          ],
        });
        chainInfo.set({
          chainId: 0x13e31,
          name: "Blast",
          logo: "/images/logo/blast.png",
          address: "0x971b2d96eFc3cffb8bAcE89A17AbfEd0b8743cD1",
        });
      } catch (addError) {
        console.error(addError);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };
  const addBaseChain = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x2105",
              blockExplorerUrls: ["https://base.blockscout.com/"],
              chainName: "Base Mainnet",
              nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
              rpcUrls: ["https://mainnet.base.org"],
            },
          ],
        });
        chainInfo.set({
          chainId: 0x2105,
          name: "Base",
          logo: "/images/logo/base.png",
          address: "0xCc39Fe145eECe8a733833D7A78dCa7f287996693",
        });
        } catch (addError) {
        console.error(addError);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };
</script>

<div>
  <h1 class="btn-red text-center">
    <button class="neon-btn btn-primary" on:click={addBlastChain}
      >Add Blast Chain</button
    >
  </h1>
  <h1 class="btn-red text-center">
    <button class="neon-btn btn-primary" on:click={addBaseChain}
      >Add Base Chain</button
    >
  </h1>
  <h1 class="btn-red text-center">Warning /!\ not on supported chain /!\</h1>
</div>
