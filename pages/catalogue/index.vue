<script setup lang="ts">
import { Content } from "@prismicio/client";
import {format} from "date-fns";

const { client } = usePrismic();

const { data: cataloguePage, error } = useAsyncData("works", () => {
    return client.getSingle("catalog_page", {
            graphQuery: `
        {
          catalog_page {
            description
            catalogs {
              catalog {
                ...on catalog {
                  name
                  description
                }
              }
            }
          }
        }
            `
        }
    )
})

const linkedCatalogues = cataloguePage.value?.data.catalogs as Array<{
    catalog: {
        data: Pick<Content.CatalogDocument["data"], "name" | "description">,
        uid: Content.CatalogDocument["uid"]
    }
}>

const lastUpdated = cataloguePage.value?.last_publication_date;
const description = cataloguePage.value?.data.description;
</script>

<template>
    <div class="pt-[56px] md:pt-7 md:w-[449px] mx-auto mb-4">
        <p class="mb-2">
            {{description}}
        </p>
        <p class="text-gray mb-[72px]" v-if="lastUpdated">
            Last updated {{format(new Date(lastUpdated), 'MMM dd, yyyy')}}
        </p>
        <div class="flex flex-col gap-y-8">
            <article v-for="{catalog} in linkedCatalogues">
                <nuxt-link class="text-gray underline grid gap-y-3" :to="`/catalogue/${catalog.uid}`">
                    {{catalog.data.name}}
                </nuxt-link>
                <p>
                    {{catalog.data.description}}
                </p>
            </article>
        </div>
    </div>
</template>

<style scoped>

</style>