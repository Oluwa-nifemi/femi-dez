<template>
    <div :class="{dark: isDarkMode}">
        <div class="bg-background min-h-screen w-screen">
            <button @click="toggleColorMode">
                <ModeToggleDark filled v-if="isDarkMode"/>
                <ModeToggleLight filled v-else/>
            </button>
            <slot />
            <button @click="toggleColorMode" class="text-primary">
                Toggle Mode
            </button>
        </div>
    </div>
</template>
<script setup>
import ModeToggleDark from "~/assets/icon/mode-toggle-dark.svg"
import ModeToggleLight from "~/assets/icon/mode-toggle-light.svg"
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

const toggleColorMode = () => {
    if(colorMode.preference === 'dark'){
        colorMode.preference = 'light'
    }else{
        colorMode.preference = 'dark'
    }
}
</script>