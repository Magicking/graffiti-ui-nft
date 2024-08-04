<div class="flex justify-center items-center h-56">
  <div
    class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"
  ></div>
</div>

<style>
  .loader {
    border-top-color: #fcfc03;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
