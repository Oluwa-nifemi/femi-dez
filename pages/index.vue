<template>
    <section class="main-text mb-6">
        <prismic-rich-text :field="home.data.main_text"/>
    </section>
    <section class="flex space-x-2">
        <a class="link" v-for="link in home.data.links" :href="link.link.url">
            {{link.label}}
        </a>
    </section>
</template>
<script setup>
    const { client } = usePrismic();

    const { data: home } = await useAsyncData("home", () => client.getSingle("homepage"));
</script>
<style>
.main-text a{
    text-decoration: underline;
}

.link{
    text-decoration: underline;
}
</style>
