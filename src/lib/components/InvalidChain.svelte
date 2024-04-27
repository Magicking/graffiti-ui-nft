<script>
  const addEthereumChain = async () => {
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
      } catch (addError) {
        console.error(addError);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };
</script>

<div>
  <h1 class="red text-center">
    <button on:click={addEthereumChain}>Go to Blast Chain</button>
  </h1>
  <h1 class="red text-center">Warning /!\ not on Blast chain /!\</h1>
</div>
