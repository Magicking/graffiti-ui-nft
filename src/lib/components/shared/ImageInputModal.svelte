<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { CanvasStore } from "$lib/stores/image";

  export let open = false;
  const dispatch = createEventDispatcher();
  let modalVisible = false;
  let img = null;

  let redWeight = 0.3;
  let greenWeight = 0.59;
  let blueWeight = 0.11;

  let inverted = false;

  onMount(() => {
    if (open) {
      setTimeout(() => {
        modalVisible = true;
      }, 10);
    }
  });

  $: if (!open) {
    modalVisible = false;
    redWeight = 0.3;
    greenWeight = 0.59;
    blueWeight = 0.11;
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

    const weightSliderInput = () => {
      redWeight = parseFloat(document.getElementById("red-weight-slider").value);
      greenWeight = parseFloat(document.getElementById("green-weight-slider").value);
      blueWeight = parseFloat(document.getElementById("blue-weight-slider").value);

      if (img) {
        drawAndApplyThreshold();
      }
    };

    function invertImage() {
      inverted = !inverted;
      if (img) {
        drawAndApplyThreshold();
      }
    }

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
    tempCanvas.willReadFrequently = true;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(img, 0, 0, width, height);

    // Draw the final image to the main canvas (128x128)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0, 128, 128);
    ctx.willReadFrequently = true;
    // Apply threshold filter
    const imageData = ctx.getImageData(0, 0, 128, 128);
    const data = imageData.data;
    const threshold = parseInt(thresholdSlider.value);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      // Calculate the grayscale value using the adjustable weights
      const grayscale = redWeight * red + greenWeight * green + blueWeight * blue;
      // Apply threshold
      let value = grayscale > threshold ? 255 : 0;
      // Invert if necessary
      if (inverted) {
        value = 255 - value;
      }
      data[i] = data[i + 1] = data[i + 2] = value;
    }

    ctx.putImageData(imageData, 0, 0);

    // Update CanvasStore with the new image data
    const canvasData = new Array(128).fill(null).map(() => new Array(128).fill(false));
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        const index = (y * 128 + x) * 4;
        canvasData[y][x] = data[index] === 255;
      }
    }
    CanvasStore.set(canvasData);
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
            <label for="red-weight-slider">
              Red Weight: <span id="red-weight-value">{redWeight.toFixed(2)}</span>
            </label>
            <input
              type="range"
              id="red-weight-slider"
              min="0"
              max="1"
              step="0.01"
              value={redWeight}
              on:input={weightSliderInput}
            />
            <br />
            <label for="green-weight-slider">
              Green Weight: <span id="green-weight-value">{greenWeight.toFixed(2)}</span>
            </label>
            <input
              type="range"
              id="green-weight-slider"
              min="0"
              max="1"
              step="0.01"
              value={greenWeight}
              on:input={weightSliderInput}
            />
            <br />
            <label for="blue-weight-slider">
              Blue Weight: <span id="blue-weight-value">{blueWeight.toFixed(2)}</span>
            </label>
            <input
              type="range"
              id="blue-weight-slider"
              min="0"
              max="1"
              step="0.01"
              value={blueWeight}
              on:input={weightSliderInput}
            />
            <br />
            <div class="flex justify-center items-center my-4">
              <canvas id="canvas" width="128" height="128" class="border border-gray-600"></canvas>
            </div>
            <div class="flex justify-center mt-4">
              <button
                class="btn-blue neon-btn"
                on:click={invertImage}
              >
                {inverted ? 'Revert' : 'Invert'}
              </button>
            </div>
            <br />
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
