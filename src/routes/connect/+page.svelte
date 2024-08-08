<script>
  import WalletSetup from "$lib/components/WalletSetup.svelte";
  import Header from "../../lib/components/Header.svelte";
</script>

<svelte:head>
  <title>Wallet</title>
</svelte:head>

<Header />
<div class="h-screen bg-accent">
  <div class="base-content grid items-center bg-darkBackground">
    <WalletSetup styleType="connect" />
  </div>
</div>
