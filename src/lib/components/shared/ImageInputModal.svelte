<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let open = false;
  export let functionOnSubmit = (imageData) => {};
  const dispatch = createEventDispatcher();
  let modalVisible = false;
  let img = null;

  onMount(() => {
    if (open) {
      setTimeout(() => {
        modalVisible = true;
      }, 10);
    }
  });

  $: if (!open) {
    modalVisible = false;
  }
    const fileInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        img = new Image();
        img.onload = () => {
          drawAndApplyThreshold();
        };
        img.src = URL.createObjectURL(file);
      }
    };

    const thresholdSliderInput = () => {
      const thresholdValueDisplay = document.getElementById("threshold-value");
      if (thresholdValueDisplay) {
        thresholdValueDisplay.textContent = document.getElementById("threshold-slider").value;
      }
      if (img) {
        drawAndApplyThreshold();
      }
    };

  function drawAndApplyThreshold() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const thresholdSlider = document.getElementById("threshold-slider");
    const thresholdValueDisplay = document.getElementById("threshold-value");
    // Resize the image to 128x128, maintaining aspect ratio
    const aspectRatio = img.width / img.height;
    let width, height;
    if (aspectRatio > 1) {
      width = 128;
      height = 128 / aspectRatio;
    } else {
      width = 128 * aspectRatio;
      height = 128;
    }

    // Draw the resized image on a temporary canvas
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(img, 0, 0, width, height);

    // Draw the final image to the main canvas (128x128)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0, 128, 128);

    // Apply threshold filter
    const imageData = ctx.getImageData(0, 0, 128, 128);
    const data = imageData.data;
    const threshold = parseInt(thresholdSlider.value);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      // Calculate the grayscale value
      const grayscale = 0.3 * red + 0.59 * green + 0.11 * blue;
      // Apply threshold
      const value = grayscale > threshold ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }

    ctx.putImageData(imageData, 0, 0);
  }
  function submitImage() {
    const canvas = document.getElementById("canvas");
    const imageData = ctx.getImageData(0, 0, 128, 128);
    functionOnSubmit(imageData.data);
  }
</script>

<div>
  {#if open}
    <div
      class="modal-overlay z-50 fixed w-full h-full bg-gray-900 flex items-center justify-center"
      class:opacity-80={open}
      class:opacity-0={!open}
    >
      <div
        class="modal-theme-bg text-accent bg-darkBackground z-50 flex items-center justify-center p-0"
        class:scale-100={modalVisible}
        class:scale-95={!modalVisible}
      >
        <div
          class="modal-container w-full h-max mx-auto pt-5 shadow-xl z-50 overflow-y-hidden"
        >
          <div class="content p-12 pt-20 bg-darkBackground">
            <h2>Upload and Transform an Image</h2>
            <input type="file" id="file-input" accept="image/*" on:change={fileInputChange}/>
            <br /><br />
            <label for="threshold-slider"
              >Threshold Value: <span id="threshold-value">128</span></label
            >
            <input
              type="range"
              id="threshold-slider"
              min="0"
              max="255"
              value="128"
              on:input={thresholdSliderInput}
            />
            <br /><br />
            <canvas id="canvas" width="128" height="128"></canvas>
            <br />
            <button
              class="mt-6 btn-green neon-btn"
              on:click={() => functionOnSubmit()}
            >
              ✓
            </button>
            <button
              class="mt-6 btn-red neon-btn"
              on:click={() => dispatch("close")}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
