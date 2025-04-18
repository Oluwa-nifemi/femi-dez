<template>
    <section class="link-animate-children mb-6">
        <prismic-rich-text :field="home.data.main_text"/>
    </section>
    <section class="flex space-x-8">
        <a class="link link-animate" v-for="link in home.data.links" :href="link.link.url" target="_blank">
            {{link.label}}
        </a>
    </section>
    <div class="yapping-text mt-11" v-if="home.data.yapping">
        <prismic-rich-text :field="home.data.yapping"/>
    </div>
</template>
<script setup>
import { defaultMetaDescription, defaultOgImage } from "assets/seo";

const { client } = usePrismic();

const { data: home } = await useAsyncData("home", () =>
	client.getSingle("homepage"),
);

useSeoMeta({
	title: "Oluwafemi Soetan",
	ogTitle: "Oluwafemi Soetan",
	ogDescription: home.value.data.meta_description || defaultMetaDescription,
	ogImage: home.value.data.meta_image.url || defaultOgImage,
});
</script>
<style>
.yapping-text > * {
    color: #FB4545;
}
</style>
