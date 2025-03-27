<script setup lang="ts">
import ModeToggleDark from "assets/icon/mode-toggle-dark.svg";
import ModeToggleLight from "assets/icon/mode-toggle-light.svg";
import DrawingCanvas from "~/components/drawing-canvas.vue";

const colorMode = useColorMode();
const route = useRoute();

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
        link: "/visuals",
        label: "Visuals"
    },
    {
        link: "/catalogue",
        label: "Catalogue"
    },
]

const showMobileNav = ref(false);
const toggleMobileNav = () => showMobileNav.value = !showMobileNav.value;

defineProps({
    weatherInfo: String
})
</script>

<template>
    <nav>
        <ul class="mx-auto hidden md:flex gap-x-6 absolute top-[60px] md:top-10 left-1/2 -translate-x-1/2">
            <li v-for="link in links" class="w-[96px]">
                <nuxt-link :to="link.link" :class="{'text-gray': !route.path.startsWith(link.link), 'text-primary': route.path.startsWith(link.link)}">
                    {{link.label}}
                </nuxt-link>
            </li>
        </ul>
    </nav>
    <div class="pt-[60px] md:pt-10 px-6  sticky top-0">
        <div class="flex h-10 items-start justify-between">
            <!-- I used absolute positioning for this and the dark mode toggle because trying to centralize the nav links relative
            to other content within the div is rather tricky it always veers off in a direction instead of having even margin when using mx-auto -->
            <div class="left-0">
                <nuxt-link to="/" class="mb-2 text-primary">
                    Oluwafemi Soetan
                </nuxt-link>
                <p class="text-gray">
                    Digital Designer
                </p>
            </div>
            <button @click="toggleColorMode" class="hidden md:block">
                <ModeToggleDark class="dark-toggle"  width="25" height="25" filled/>
                <ModeToggleLight class="light-toggle" width="25" height="25"  filled/>
            </button>
            <button class="md:hidden" @click="toggleMobileNav">
                Menu
            </button>
        </div>
    </div>
    <aside class="md:opacity-0 md:pointer-events-none fixed top-0 left-0 h-dvh w-full z-20 bg-background pt-[60px] flex flex-col pb-10" :class="{'pointer-events-none opacity-0': !showMobileNav}">
        <div class="flex justify-between items-start px-6">
            <div>
                <nuxt-link to="/" class="mb-2 text-primary" @click="toggleMobileNav">
                    Oluwafemi Soetan
                </nuxt-link>
                <p class="text-gray">
                    Digital Designer
                </p>
            </div>
            <button @click="toggleMobileNav">
                Close
            </button>
        </div>
        <ul class="flex gap-x-6 mt-9 px-6">
            <li v-for="link in links" class="w-[48px]" @click="toggleMobileNav">
                <nuxt-link
                    :to="link.link"
                    :class="{'text-gray': !route.path.startsWith(link.link), 'text-primary': route.path.startsWith(link.link)}"
                >
                    {{link.label}}
                </nuxt-link>
            </li>
        </ul>
        <drawing-canvas/>
        <div class="mt-auto flex items-center justify-between px-6">
            <div class="grid gap-y-1">
                <nuxt-link to="/colophon" class="text-gray underline">
                    Colophon
                </nuxt-link>
                <p v-if="weatherInfo" class="text-gray">
                    {{weatherInfo}}
                </p>
            </div>
            <button @click="toggleColorMode">
                <ModeToggleDark class="dark-toggle"  width="25" height="25" filled/>
                <ModeToggleLight class="light-toggle" width="25" height="25"  filled/>
            </button>
        </div>
    </aside>
</template>

<style scoped>
.dark-toggle, .light-toggle{
    display: none;
}

.dark-mode .dark-toggle{
    display: block;
}

.light-mode .light-toggle{
    display: block;
}
</style>