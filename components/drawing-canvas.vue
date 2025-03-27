<script setup lang="ts">
import { ref, onMounted } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let drawing = false;

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
    console.log(canvasRef.value, canvasRef.value.scrollWidth, canvasRef.value.scrollHeight)
    canvasRef.value.width = canvasRef.value.scrollWidth
    canvasRef.value.height = canvasRef.value.scrollHeight
    if (ctx) {
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
    }
  }
});

function startDrawing(e: MouseEvent) {
  drawing = true;
  draw(e);
}

function endDrawing() {
  drawing = false;
  if (ctx) ctx.beginPath();
}

function draw(e: TouchEvent) {
    // console.log("baby dnt hold me", drawing, ctx, canvasRef.value)
  if (!drawing || !ctx || !canvasRef.value) return;

  const rect = canvasRef.value.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  const y = e.touches[0].clientY - rect.top;

  console.log(x, y, e, rect);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function exportImage() {
  if (!canvasRef.value) return;
  const dataUrl = canvasRef.value.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'drawing.png';
  link.click();
}

async function share(){
    canvasRef.value?.toBlob(async blob => {
        const shareData = {
            text: window.location.origin,
            title: 'Check out my cool art!',
            files: [new File([blob], 'art.png', { type: blob?.type })]
        }

        if (navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err.name, err.message)
                }
            }
        } else {
            console.warn('Sharing not supported', shareData)
        }
    })
}
</script>

<template>
  <div class="flex-grow py-8 w-full">
    <canvas
      ref="canvasRef"
      width="600"
      height="400"
      @touchstart="startDrawing"
      @touchend="endDrawing"
      @touchmove="draw"
      class="w-full h-full"
    ></canvas>
      <div class="flex gap-x-2 justify-center">
          <button class="underline" @click="share">Share Image</button>
          <button class="underline" @click="exportImage">Download Image</button>
      </div>
  </div>
</template>
