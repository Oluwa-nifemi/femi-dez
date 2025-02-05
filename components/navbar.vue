<script setup lang="ts">
import ModeToggleDark from "assets/icon/mode-toggle-dark.svg";
import ModeToggleLight from "assets/icon/mode-toggle-light.svg";

const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

const toggleColorMode = () => {
    if(colorMode.preference === 'dark'){
        colorMode.preference = 'light'
    }else{
        colorMode.preference = 'dark'
    }
}

const links = [
    {
        link: "/work",
        label: "Work"
    },
    {
        link: "/about",
        label: "About"
    },
    {
        link: "/notes",
        label: "Notes"
    },
    {
        link: "/journal",
        label: "Journal"
    },
]
</script>

<template>
    <nav class="flex pt-10 px-6">
        <div>
            <nuxt-link to="/" class="mb-2 text-primary">
                Oluwafemi Soetan
            </nuxt-link>
            <p class="text-gray">
                Digital Designer
            </p>
        </div>
        <ul class="mx-auto flex gap-x-6">
           <li v-for="link in links" class="w-[96px]">
               <nuxt-link :to="link.link" class="text-gray">
                   {{link.label}}
               </nuxt-link>
           </li>
        </ul>
        <button @click="toggleColorMode" class="self-start">
            <ModeToggleDark  width="25" height="25" filled v-if="isDarkMode"/>
            <ModeToggleLight width="25" height="25"  filled v-else/>
        </button>
    </nav>
</template>

<style scoped>

</style>