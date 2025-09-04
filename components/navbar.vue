<script setup lang="ts">
import ModeToggleDark from "assets/icon/mode-toggle-dark.svg";
import ModeToggleLight from "assets/icon/mode-toggle-light.svg";
import DrawingCanvas from "~/components/drawing-canvas.vue";

const colorMode = useColorMode();
const route = useRoute();

const toggleColorMode = () => {
	if (colorMode.preference === "dark") {
		colorMode.preference = "light";
	} else {
		colorMode.preference = "dark";
	}
};

const showMobileNav = ref(false);
const toggleMobileNav = () => {
	showMobileNav.value = !showMobileNav.value;
};

watch(showMobileNav, (val) => {
	if (val) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
});

defineProps({
	weatherInfo: String,
});

const { client } = usePrismic();

type DropdownItem = {
  label: string;
  link: string;
}

const { data: { value: navbarData } } = useAsyncData('navbar_counts', async (): Promise<{ works: DropdownItem[], exploration: DropdownItem[], catalog: DropdownItem[], visuals: number }> => {
  const [works, exploration, catalog, visuals] = await Promise.all([
    client.getAllByType("work"),
    client.getAllByType("exploration"),
    client.getAllByType("catalog", {
      orderings: {
          field: 'document.last_publication_date',
          direction: "desc"
      }
    }),
    client.getSingle("visual")
  ])

  return {
    works: works.map(item => ({
      label: String(item.data.name),
      link: `/work/${item.uid}`,
    })),
    exploration: exploration.map(item => ({
      label: String(item.data.caption),
      link: `/exploration#${item.uid}`,
    })),
    catalog: catalog.map(item => ({
      label: String(item.data.name),
      link: `/catalogue/${item.uid}`,
    })),
    visuals: visuals.data.slices.map(slice => slice.primary.media.length).reduce((a, b) => a + b)
  }
})


type NavbarLink = {
  link: string;
  label: string;
  statistics: string;
  items?: DropdownItem[];
  external?: boolean;
}

const pluralizeWords = (word: string, count: number) => `${count} ${word}${count === 1 ? "" : "s"}`

const links: NavbarLink[] = [
	{
		link: "/work",
		label: "Work",
		statistics: pluralizeWords("project", navbarData?.works.length ?? 0),
		items: navbarData?.works ?? []
	},
	{
		link: "/exploration",
		label: "Exploration",
		statistics: pluralizeWords("idea", navbarData?.exploration.length ?? 0),
	},
	{
		link: "/about",
		label: "About",
		statistics: "100 years",
		items: [
    		{
        		label: "Cosmos",
        		link: "https://www.cosmos.so/beingfemi"
    		},
    		{
        		label: "Inventory",
        		link: "https://inventory.beingfemi.com/"
    		},
      {
        		label: "Twitter",
        		link: "https://x.com/femidasilvaa"
    		},
    		{
        		label: "Pinterest",
        		link: "https://www.pinterest.com/beingfemi/"
    		}
		],
		external: true
	},
	{
		link: "/visuals",
		label: "Visuals",
		statistics: pluralizeWords("jpeg", navbarData?.visuals ?? 0)
	},
	{
		link: "/catalogue",
		label: "Catalogs",
		statistics: `${navbarData?.catalog.length} entries`,
		items: navbarData?.catalog ?? []
	},
];

const isExpanded = (link: NavbarLink) => {
  return !!link.items?.length && route.path.startsWith(link.link)
}
</script>

<template>
    <nav class="pt-9 md:pt-10 px-6 md:fixed top-0 z-20 w-screen">
        <div class="flex h-10 items-start justify-between">
            <div>
                <nuxt-link to="/" class="mb-2 text-primary">
                    Oluwafemi Soetan
                </nuxt-link>
                <p class="text-gray">
                    Digital Designer
                </p>
            </div>
            <ul class="hidden md:flex gap-y-2 z-30 justify-between flex-col w-[222px]">
                <li v-for="link in links">
                    <nuxt-link
                        :to="link.link"
                        class="flex justify-between w-full group"
                    >
                        <span
                            :class="{'text-gray': route.path !== link.link, 'text-primary': route.path === link.link}"
                            class="group-hover:text-primary duration-75"
                        >
                            {{link.label}}
                        </span>
                        <span class="text-gray">{{link.statistics}}</span>
                    </nuxt-link>
                    <ul v-if="isExpanded(link)" class="pt-2 pl-4 grid gap-y-2">
                        <li v-for="item in link.items">
                            <nuxt-link
                                :to="item.link"
                                :class="{'text-gray': route.path !== item.link, 'text-primary': route.path === item.link}"
                                class="hover:text-primary duration-75"
                                :target="link.external ? '_blank' : undefined"
                            >
                                {{item.label}}
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </ul>
            <button class="md:hidden" @click="toggleMobileNav">
                Menu
            </button>
        </div>
    </nav>
    <aside class="md:opacity-0 md:pointer-events-none fixed top-0 left-0 h-[100dvh] w-full z-20 bg-background pt-8 flex flex-col pb-8" :class="{'pointer-events-none opacity-0': !showMobileNav}">
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
        <ul class="flex flex-col gap-y-4 mt-5 px-6">
            <li v-for="link in links" class="w-[48px]" @click="toggleMobileNav">
                <nuxt-link
                    :to="link.link"
                    :class="{'text-gray': !route.path.startsWith(link.link), 'text-primary': route.path.startsWith(link.link)}"
                >
                    {{link.label}}
                </nuxt-link>
            </li>
        </ul>
        <drawing-canvas v-if="showMobileNav"/>
        <div class="flex items-center justify-between px-6">
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
