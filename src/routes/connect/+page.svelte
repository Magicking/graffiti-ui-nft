<script>
  import WalletSetup from "$lib/components/WalletSetup.svelte";
  import Header from "../../lib/components/Header.svelte";
</script>

<svelte:head>
  <title>Wallet</title>
</svelte:head>

<Header />
<div class="main">
  <div class="content">
    <WalletSetup styleType="connect" />
  </div>
</div>

<style>
  .main {
    height: 100vh;
    background: #fcfc03;
  }

  .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 3.55px;
    margin-top: -1%;

    background: #11140c;
  }
</style>
