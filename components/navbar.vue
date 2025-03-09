<script setup lang="ts">
import ModeToggleDark from "assets/icon/mode-toggle-dark.svg";
import ModeToggleLight from "assets/icon/mode-toggle-light.svg";

const colorMode = useColorMode();

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
</script>

<template>
    <div class="pt-[60px] md:pt-10 px-6">
        <nav class="flex h-10 relative">
            <!-- I used absolute positioning for this and the dark mode toggle because trying to centralize the nav links relative
            to other content within the div is rather tricky it always veers off in a direction instead of having even margin when using mx-auto -->
            <div class="absolute left-0">
                <nuxt-link to="/" class="mb-2 text-primary">
                    Oluwafemi Soetan
                </nuxt-link>
                <p class="text-gray">
                    Digital Designer
                </p>
            </div>
            <ul class="mx-auto hidden md:flex gap-x-6">
                <li v-for="link in links" class="w-[96px]">
                    <nuxt-link :to="link.link" class="text-gray">
                        {{link.label}}
                    </nuxt-link>
                </li>
            </ul>
            <button @click="toggleColorMode" class="hidden md:block absolute top-0 right-0">
                <ModeToggleDark class="dark-toggle"  width="25" height="25" filled/>
                <ModeToggleLight class="light-toggle" width="25" height="25"  filled/>
            </button>
            <button class="absolute right-0 md:hidden" @click="toggleMobileNav">
                Menu
            </button>
        </nav>
        <aside class="fixed top-0 left-0 h-dvh w-full z-20 bg-background pt-[60px] px-6" :class="{'pointer-events-none opacity-0': !showMobileNav}">
            <div class="flex justify-between items-start">
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
            <ul class="flex gap-x-6 mt-9">
                <li v-for="link in links" class="w-[48px]" @click="toggleMobileNav">
                    <nuxt-link :to="link.link" class="text-gray">
                        {{link.label}}
                    </nuxt-link>
                </li>
            </ul>
        </aside>
    </div>
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