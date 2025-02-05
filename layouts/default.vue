<template>
    <div :class="{dark: isDarkMode}">
        <div class="bg-background min-h-screen w-screen">
            <Navbar/>
        </div>
    </div>
</template>
<script setup>
import Navbar from "~/components/navbar.vue";
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');
</script>