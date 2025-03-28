<script setup lang="ts">
import { components } from "~/slices";

const route = useRoute()
const { client } = usePrismic();

const { data: work } = useAsyncData(`work-${route.params.uid}`, () => client.getByUID("work", route.params.uid as string))
</script>

<template>
    <section v-if="work">
        <media
            :type="work.data.main_media?.kind === 'image' ? 'image' : 'video'"
            :src="work.data.main_media.url || ''"
            :thumbnail-src="work.data.thumbnail?.url || ''"
            class="w-fit mb-6"
        />
        <p class="mb-6">
            {{work.data.description}}
        </p>
        <slice-zone
            wrapper="div"
            :components="components"
            :slices="work.data.slices1"
            class="space-y-6 mb-[72px]"
        />
        <div class="flex gap-y-6 gap-x-[84px] flex-col md:flex-row">
            <a :href="work.data.project_link.url" target="_blank" class="md:!hidden link-animate">
                {{ work.data.project_link.text }}
            </a>
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
                <ul class="flex flex-col gap-y-1">
                    <li v-for="person in work.data.people_worked" class="flex">
                        <a v-if="person.link" target="_blank" class="link-animate" :href="person.link">
                            {{person.name}}
                        </a>
                        <p v-else>
                            {{person.name}}
                        </p>
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
        <a :href="work.data.project_link.url" target="_blank" class="max-md:!hidden md:!fixed left-6 bottom-14 link-animate">
            {{ work.data.project_link.text }}
        </a>
    </section>
</template>

<style scoped>

</style>