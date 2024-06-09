<script>
  import WalletSetup from "$lib/components/WalletSetup.svelte";
  import Header from "../../lib/components/Header.svelte";
</script>

<svelte:head>
  <title>setProvider()</title>
</svelte:head>

<Header />
<div class="main">
  <div class="content">
    <WalletSetup />
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
    left: 3.55px;
    margin-top: -1%;

    background: #11140c;
  }
</style>
