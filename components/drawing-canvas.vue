<script setup lang="ts">
import {onMounted, ref} from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let drawing = false;

const canvasHasContent = ref(false);

const colorMode = useColorMode();

watch(colorMode, (mode) => {
    if (canvasRef.value) {
        ctx = canvasRef.value.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = getStrokeStyle(mode.preference);
        }
    }
})

const getStrokeStyle = (mode: string) => mode === 'dark' ? 'white' : 'black';


onMounted(() => {
    if (canvasRef.value) {
        ctx = canvasRef.value.getContext('2d');
        canvasRef.value.width = canvasRef.value.scrollWidth
        canvasRef.value.height = canvasRef.value.scrollHeight
        if (ctx) {
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = getStrokeStyle(colorMode.preference);
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
    canvasHasContent.value = true;
    if (!drawing || !ctx || !canvasRef.value) return;

    const rect = canvasRef.value.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

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

async function share() {
    canvasRef.value?.toBlob(async blob => {
        const shareData = {
            text: window.location.origin,
            title: 'Check out my cool art!',
            files: [new File([blob], 'artwork.png', {type: blob?.type})]
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

function resetCanvas() {
    canvasHasContent.value = false;
    if (canvasRef.value) {
        const ctx = canvasRef.value?.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    }
}

const showEasterEgg = ref(false);

function onRenderInstructions(){
    if(Math.random() < 0.1){
        showEasterEgg.value = true
    }
}
</script>

<template>
    <div class="flex-grow pb-11 pt-6 w-full flex flex-col">
        <div class="relative flex-grow mb-4">
            <canvas
                ref="canvasRef"
                width="600"
                height="400"
                @touchstart="startDrawing"
                @touchend="endDrawing"
                @touchmove="draw"
                class="w-full h-full"
            />
            <div class="w-full pointer-events-none gap-y-1 flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition duration-200" :class="{'opacity-0': canvasHasContent}">
                <typewriter :interval-between-letters="50" @finished="onRenderInstructions" text="This is a canvas (get creative!)"  class="text-primary" />
                <typewriter :interval-between-letters="25" v-if="showEasterEgg" text="I solemnly swear I am up to no good..." class="text-gray" />
            </div>
        </div>
        <div class="flex justify-between px-6 gap-x-2">
            <button class="underline" @click="share">Share Image</button>
            <button class="underline" @click="exportImage">Download Image</button>
            <button class="underline" @click="resetCanvas">Reset canvas</button>
        </div>
    </div>
</template>
