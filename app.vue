<script setup lang="ts">

import {defaultMetaDescription, defaultOgImage} from "assets/seo";

useSeoMeta({
    description: defaultMetaDescription,
    ogDescription: defaultMetaDescription,
    ogImage: defaultOgImage,
    twitterCard: 'summary_large_image',
})
</script>

<template>
 <NuxtLayout>
     <NuxtPage/>
 </NuxtLayout>
</template>

<style scoped>

</style>