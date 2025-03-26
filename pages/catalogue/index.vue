<script setup lang="ts">
import {useAsyncData} from "#app";
import format from "date-fns/format";

const {client} = usePrismic();

const {data: cataloguePage} = useAsyncData("catalog_page", () => {
    return client.getSingle("catalog_page")
})

const {data: catalogs} = useAsyncData("catalogues", async () => {
    return client.getByType("catalog", {
        orderings: {
            field: 'document.last_publication_date',
            direction: "desc"
        }
    });
});

const description = cataloguePage.value?.data.description;
</script>

<template>
    <p class="mb-8">
        {{ description }}
    </p>
    <div class="flex flex-col gap-y-8">
        <nuxt-link v-for="catalog in catalogs?.results" :to="`/catalogue/${catalog.uid}`">
            <article class="relative grid gap-y-3">
                <p class="text-gray absolute left-[-236px]">
                    {{ format(new Date(catalog.last_publication_date), 'MMM dd, yyyy') }}
                </p>
                <p class="link-animate">
                    {{ catalog.data.name }}
                </p>
                <prismic-image :field="catalog.data.cover_image" class="mb-3 max-w-full min-w-0"/>
                <p>
                    {{ catalog.data.description }}
                </p>
            </article>
        </nuxt-link>
    </div>
</template>

<style scoped>

</style>