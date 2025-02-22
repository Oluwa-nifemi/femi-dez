<script setup lang="ts">
import {components} from "~/slices";

const { client } = usePrismic();

const { data: visuals } = await useAsyncData("about", () => client.getSingle("visual"));

</script>

<template>
    <div class="px-6 md:w-[820px] mx-auto pt-[56px] md:pt-7 mb-4 homepage" v-if="visuals">
        <slice-zone
            wrapper="div"
            :components="components"
            :slices="visuals.data.slices"
            class="space-y-[120px] md:space-y-[200px]"
        />
    </div>
</template>

<style scoped>

</style>