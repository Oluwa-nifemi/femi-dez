<template>
    <section class="link-animate-children mb-6">
        <prismic-rich-text :field="home.data.main_text"/>
    </section>
    <section class="flex space-x-3">
        <a class="link link-animate" v-for="link in home.data.links" :href="link.link.url" target="_blank">
            {{link.label}}
        </a>
    </section>
</template>
<script setup>
import {defaultMetaDescription, defaultOgImage} from "assets/seo";

    const { client } = usePrismic();

    const { data: home } = await useAsyncData("home", () => client.getSingle("homepage"));

    useSeoMeta({
        title: 'home',
        ogTitle: 'home',
        ogDescription: home.value.data.meta_description || defaultMetaDescription,
        ogImage: home.value.data.meta_image.url || defaultOgImage
    });
</script>
<style>
</style>
