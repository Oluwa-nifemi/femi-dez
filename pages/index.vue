<template>
    <section class="link-animate-children mb-6">
        <prismic-rich-text :field="home.data.main_text"/>
    </section>
    <section class="flex space-x-3">
        <a class="link link-animate" v-for="link in home.data.links" :href="link.link.url">
            {{link.label}}
        </a>
    </section>
</template>
<script setup>
    const { client } = usePrismic();

    const { data: home } = await useAsyncData("home", () => client.getSingle("homepage"));
</script>
<style>
</style>
