<script setup lang="ts">
import {components} from "~/slices";
import {defaultMetaDescription, defaultOgImage} from "assets/seo";

const { client } = usePrismic();

const { data: visuals } = await useAsyncData("visuals", () => client.getSingle("visual"));

useSeoMeta({
    title: 'visuals',
    ogTitle: 'visuals',
    ogDescription: visuals.value?.data.meta_description|| defaultMetaDescription,
    ogImage: visuals.value?.data.meta_image.url|| defaultOgImage
});

definePageMeta({
    layout: 'visuals'
})
</script>

<template>
    <slice-zone
        wrapper="div"
        :components="components"
        :slices="visuals?.data.slices || []"
        class="space-y-[120px] md:space-y-[200px]"
    />
</template>

<style scoped>

</style>