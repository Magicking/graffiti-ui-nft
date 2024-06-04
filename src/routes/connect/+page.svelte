<script>
  import WalletSetup from "$lib/components/WalletSetup.svelte";
  import Header from "../../lib/components/Header.svelte";
</script>

<svelte:head>
  <title>setProvider()</title>
</svelte:head>

<div class="main">
  <div class="content">
    <Header />
    <WalletSetup />
  </div>
</div>

<style>
  .main {
    height: 100vh;
    clip-path: polygon(
      0 16%,
      0 0,
      15% 0%,
      62% 0,
      75% 10%,
      100% 10%,
      100% 85%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    background: #fcfc03;
  }

  .content {
    height: 99.4%;
    width: 99.4%;
    position: relative;
    left: 0.3%;
    top: 0.3%;

    clip-path: polygon(
      0 16%,
      0 0,
      15% 0%,
      62% 0,
      75% 10%,
      100% 10%,
      100% 85%,
      100% 100%,
      85% 100%,
      15% 100%,
      0 100%,
      0% 85%
    );
    background: #11140c;
  }
</style>
