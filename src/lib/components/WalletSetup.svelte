<script>
  import { ethers } from "ethers";
  import {
    connected,
    chainData,
    chainId,
    signerAddress,
    defaultEvmStores as evm,
  } from "svelte-ethers-store";
  import Onboard from "@web3-onboard/core";
  import injectedModule from "@web3-onboard/injected-wallets";
  import walletConnectModule from "@web3-onboard/walletconnect";

  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  import Loader from "./shared/Loader.svelte";

  const injected = injectedModule();
  const wcV2InitOptions = {
    projectId: "b9f85888a5d74faa799c924ac2a06d68",
    requiredChains: [1],
    dappUrl: "https://g.6120.eu/",
  };
  const walletConnect = walletConnectModule(wcV2InitOptions);
  let isOpen = false;
  let selectedOption = "";
  let style = "";

  export let styleType = ""; // New prop

  function selectOption(option) {
    selectedOption = option.label;
    type = option.value;
    isOpen = false;
  }

  let onboard = Onboard({
    wallets: [injected, walletConnect],
    chains: [
      {
        id: "0x13e31",
        token: "ETH",
        label: "Blast",
        rpcUrl: "https://rpc.blast.io",
      },
    ],
    appMetadata: {
      name: "Graffiti",
      description: "Graffiti painting interface.",
      recommendedInjectedWallets: [
        { name: "MetaMask", url: "https://metamask.io" },
        { name: "WalletConnect", url: "https://walletconnect.com/" },
      ],
    },
    accountCenter: {
      desktop: {
        enabled: false,
        position: "topRight",
      },
      mobile: {
        enabled: false,
        position: "topRight",
      },
    },
  });
  const walletsSubscription = onboard.state.select("wallets");
  const { unsubscribe } = walletsSubscription.subscribe((wallets) => {
    const walletProvider = wallets[0]?.provider;
    if (walletProvider) {
      const provider = new ethers.providers.Web3Provider(walletProvider, "any");
      evm.setProvider(provider);
      evm.attachContract("rge", rgeConf["address"], rgeAbi);
    }
    updateAlreadyConnectedWallets();
  });

  if (typeof window !== "undefined") {
    const alreadyConnectedWallets = JSON.parse(
      window.sessionStorage.getItem("ConnectedWallets")
    );
    if (alreadyConnectedWallets && alreadyConnectedWallets.length > 0) {
      onboard
        .connectWallet({
          autoSelect: {
            label: alreadyConnectedWallets[0],
            disableModals: true,
          },
        })
        .then(() => {
          console.log(alreadyConnectedWallets);
        })
        .catch(console.error);
    }
  }

  export const connectOnBoard = async () => {
    const wallets = await onboard.connectWallet();
  };
  export const disconnectOnBoard = async () => {
    window.sessionStorage.removeItem("ConnectedWallets");
    const connectedWallet = onboard.state.get().wallets[0];
    await onboard.disconnectWallet({ label: connectedWallet.label });
    await evm.disconnect();
  };
  function updateAlreadyConnectedWallets() {
    const connectedWalletsLabels = onboard.state
      .get()
      .wallets.map(({ label }) => label);

    if (connectedWalletsLabels.length > 0) {
      console.log(connectedWalletsLabels);
      window.sessionStorage.setItem(
        "ConnectedWallets",
        JSON.stringify(connectedWalletsLabels)
      );
    }
  }

  let type;
  let pending = false;

  const connect = async () => {
    pending = true;
    try {
      const handler = {
        Congress: () => evm.setProvider("https://rge.6120.eu/anvilrpc", 6),
        Localhost: () => evm.setProvider("http://127.0.0.1:8545"),
        Browser: () => evm.setProvider(),
        Localhost3: () => evm.setProvider("http://127.0.0.1:8545", 3),
        Localhost4: () => evm.setProvider("http://127.0.0.1:8545", 4),
        LocalhostNull: () => evm.setProvider("http://127.0.0.1:8545", null),
        Gnosis: () => evm.setProvider("https://rpc.gnosischain.com"),
        Arbitrum: () => evm.setProvider("https://arb1.arbitrum.io/rpc"),
      };

      if (type === undefined || !handler[type]) {
        type = "Congress";
      }
      await handler[type]();
      pending = false;
    } catch (e) {
      console.log(e);
      pending = false;
    }
  };

  const options = [
    { label: "37c3 Anvil Mainnet Fork", value: "Congress" },
    { label: "37c3 Anvil Mainnet Fork - HTTP NO CORS", value: "CongressHTTP" },
    { label: "Browser (window.ethereum)", value: "Browser" },
    { label: "Localhost using account index 3", value: "Localhost3" },
    {
      label: "Localhost: (eg ganache or hardhat on http://127.0.0.1:8545)",
      value: "Localhost",
    },
    // Add any other options you need here
  ];

  const disconnect = async () => {
    await evm.disconnect();
    window.sessionStorage.removeItem("ConnectedWallets");
    pending = false;
  };

  console.log(styleType === "connect");
</script>

<div>
  {#if !$connected}
    <div
      class="flex items-center justify-center flex-col text-center pb-10 ${styleType ===
      'connect'
        ? 'h-[80vh]'
        : ''}"
    >
      <div class:theme-bg={styleType === "connect"}>
        <div
          class:main={styleType === "connect"}
          class="flex-col bg-darkBackground"
        >
          <p class="text-tertiary text-xl mr-2 mb-3">
            Use an external provider:
          </p>

          <button
            class=" px-2 py-3 md:px-4 md:py-2 text-base font-sm md:font-md text-secondary btn-secondary rounded-md neon-btn text-center md:text-start"
            disabled={pending}
            on:click={connectOnBoard}>Connect with On Board</button
          >
        </div>
      </div>
    </div>
    {#if pending}<Loader />{/if}
  {:else}
    <div
      class="flex items-center justify-center w-full pb-10 ${styleType ===
      'connect'
        ? 'h-[80vh]'
        : ''}"
    >
      <div class:theme-bg={styleType === "connect"}>
        <div
          class:main={styleType === "connect"}
          class="flex flex-col items-center h-screen text-white gap-y-2 bg-darkBackground"
        >
          <div class="flex items-center flex-col">
            You are now connected to the account: <p class="signeraddress">
              {$signerAddress}
            </p>
          </div>
          <p>On the network {$chainData.name} (chainId: {$chainId})</p>

          <button class="button neon-btn btn-red" on:click={disconnectOnBoard}>
            Disconnect OnBoard</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .main {
    clip-path: polygon(35% 0, 100% 0, 100% 65%, 65% 100%, 0 100%, 0 35%);
    height: 394px;
    top: 3px;
    left: 3px;
    position: relative;
    width: 394px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
