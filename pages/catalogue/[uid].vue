<script setup lang="ts">
import { components } from "~/slices";
import {format} from "date-fns";

const route = useRoute()
const { client } = usePrismic();

const { data: catalog } = useAsyncData(`catalog-${route.params.uid}`, () => client.getByUID("catalog", route.params.uid as string))
</script>

<template>
    <div v-if="catalog">
        <p class="mb-2">
            {{catalog.data.name}}
        </p>
        <p class="text-gray mb-11">
            Last updated {{format(new Date(catalog.last_publication_date), 'MMM dd, yyyy')}}
        </p>
        <p class="mb-11">
            {{catalog.data.description}}
        </p>
        <slice-zone
            wrapper="div"
            :components="components"
            :slices="catalog.data.slices"
            class="space-y-6 mb-[72px]"
        />
    </div>
</template>

<style scoped>

</style>