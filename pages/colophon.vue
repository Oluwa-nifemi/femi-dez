<script setup lang="ts">
import {defaultMetaDescription, defaultOgImage} from "assets/seo";

const { client } = usePrismic();

const { data: colophon } = await useAsyncData("colophon", () => client.getSingle("colophon"));

useSeoMeta({
    title: 'colophon',
    ogTitle: 'colophon',
    ogDescription: colophon.value?.data.meta_description|| defaultMetaDescription,
    ogImage: colophon.value?.data.meta_image.url|| defaultOgImage
});
</script>

<template>
    <div class="space-y-6 md:space-y-9" v-if="colophon">
        <section>
            <p class="text-gray mb-3">
                Typography
            </p>
            <prismic-image :field="colophon.data.typography[0]!.image" class="min-w-0 w-full mb-3" />
            <p>
                {{colophon.data.typography[0]!.description}}
            </p>
        </section>
        <section>
            <p class="text-gray mb-3">
                Photography
            </p>
            <p>
                {{colophon.data.photography}}
            </p>
        </section>
        <section>
            <p class="text-gray mb-3">
                Technicalities
            </p>
            <!-- Yeah I hard coded this. I'm bad like that 🤷🏾‍♂️ -->
            <p class="flex whitespace-pre">Developed by <a href="https://www.linkedin.com/in/oluwanifemi-adeyemi-600758174/" target="_blank" class="link-animate flex">Oluwanifemi Adeyemi</a></p>
        </section>
        <section class="space-y-3">
            <p class="text-gray">
                Inspiration
            </p>
            <p>
                {{colophon.data.inspiration_description}}
            </p>
            <a target="_blank" class="!block link-animate" :href="link.link.url" v-for="link in colophon.data.inspiration_links">
                {{link.link.text}}
            </a>
        </section>
        <section class="space-y-3">
            <p class="text-gray">
                Good people
            </p>
            <p>
                {{colophon.data.good_people_description}}
            </p>
            <a target="_blank" class="!block link-animate" :href="person.link.url" v-for="person in colophon.data.good_people">
                {{person.link.text}}
            </a>
        </section>
    </div>
</template>

<style scoped>

</style>