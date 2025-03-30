<script setup lang="ts">
import {onMounted, ref} from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let drawing = false;
let idleTimer: number | null = null;

const canvasHasContent = ref(false);
const showControls = ref(false);

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
        const width = canvasRef.value.scrollWidth;
        const height = canvasRef.value.scrollHeight;
        const dpr = window.devicePixelRatio || 1;

        // Set canvas width and height accounting for device pixel ratio
        canvasRef.value.width = width * dpr;
        canvasRef.value.height = height * dpr;
        canvasRef.value.style.width = `${width}px`;
        canvasRef.value.style.height = `${height}px`;


        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = getStrokeStyle(colorMode.preference);
            ctx.lineJoin = 'round';
        }
    }
});

function startDrawing(e: TouchEvent) {
    drawing = true;
    showControls.value = false;
    if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
    }
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.value?.getContext('2d');
    ctx.strokeStyle = getStrokeStyle(colorMode.preference);

    if (ctx) ctx.moveTo(x, y);
}

function draw(e: TouchEvent) {
    if (!drawing || !ctx) return;
    canvasHasContent.value = true;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function endDrawing() {
    drawing = false;
    if (ctx) ctx.beginPath(); // reset after drawing is done

    // start idle timer
    idleTimer = setTimeout(() => {
        showControls.value = true;
    }, 500);
}

function getCoordinates(e: TouchEvent) {
    const rect = canvasRef.value!.getBoundingClientRect();
    const touch = e.touches[0];
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
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
            text: `Cool easter egg on ${window.location.origin}`,
            title: window.location.origin,
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
    showControls.value = false;

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
                <typewriter :interval-between-letters="50" @finished="onRenderInstructions" text="This is a canvas (get creative!)"  class="text-gray" />
                <typewriter :interval-between-letters="25" v-if="showEasterEgg" text="I solemnly swear I am up to no good..." class="text-gray" />
            </div>
        </div>
        <div class="flex justify-between px-6 gap-x-2 opacity-0 pointer-events-none transition duration-300" :class="{'opacity-100 pointer-events-auto': showControls}">
            <button class="underline" @click="share">Share Image</button>
            <button class="underline" @click="exportImage">Download Image</button>
            <button class="underline" @click="resetCanvas">Reset canvas</button>
        </div>
    </div>
</template>
