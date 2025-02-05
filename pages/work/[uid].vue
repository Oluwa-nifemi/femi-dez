<script setup lang="ts">
import { components } from "~/slices";

const route = useRoute()
const { client } = usePrismic();

const { data: work } = useAsyncData(`work-${route.params.uid}`, () => client.getByUID("work", route.params.uid as string))
</script>

<template>
    <section class="pt-6 w-[452px] mx-auto pb-24" v-if="work">
        <prismic-image :field="work.data.main_image" class="w-fit mb-6" />
        <p class="mb-6">
            {{work.data.description}}
        </p>
        <slice-zone
            wrapper="div"
            :components="components"
            :slices="work.data.slices1"
            class="space-y-6 mb-[72px]"
        />
        <div class="flex gap-x-[84px]">
            <div>
                <p class="mb-2 text-gray">
                    Year
                </p>
                <p>
                    {{work.data.release_date}}
                </p>
            </div>
            <div v-if="work.data.people_worked.length > 0">
                <p class="mb-2 text-gray">
                    People
                </p>
                <ul class="space-y-1">
                    <li v-for="person in work.data.people_worked">
                        <a target="_blank" :href="person.link">
                            {{person.name}}
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <p class="mb-2 text-gray">
                    Services
                </p>
                <ul class="space-y-1">
                    <li v-for="service in work.data.services">
                        {{service.service}}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>