<script setup lang="ts">
import {components} from "~/slices";

const { client } = usePrismic();

const { data: visuals } = await useAsyncData("visuals", () => client.getSingle("visual"));

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