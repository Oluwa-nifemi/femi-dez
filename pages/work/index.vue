<script setup lang="ts">
const {client} = usePrismic();

const {data: work} = useAsyncData("works", () => {
    return client.getByType("work")
})

const {data: explorations} = useAsyncData("explorations", () => {
    return client.getByType("exploration")
})

const workItems = work.value?.results || [];
const explorationItems = explorations.value?.results || [];

useSeoMeta({
    title: 'work',
    ogTitle: 'work'
});
</script>

<template>
    <ul class="grid md:gap-y-[124px] gap-y-6 mb-40">
        <li v-for="work in workItems">
            <nuxt-link :to="`work/${work.uid}`">
                <figure>
                    <media
                        :type="work.data.main_media?.kind === 'image' ? 'image' : 'video'"
                        :src="work.data.main_media.url || ''"
                        :thumbnail-src="work.data.thumbnail?.url || ''"
                        class="w-fit mb-2"
                    />
                    <figcaption>

                            {{ work.data.name }}
                    </figcaption>
                </figure>
            </nuxt-link>
        </li>
    </ul>
    <p class="text-gray mb-3">
        Exploration
    </p>
    <p class="mb-[70px]">
        A curated space for ideas, experiments, and creative concepts
    </p>
    <ul class="grid md:gap-y-[124px] gap-y-12 mb-40">
        <li v-for="exploration in explorationItems">
            <media
                :type="exploration.data.media?.kind === 'image' ? 'image' : 'video'"
                :src="exploration.data.media.url || ''"
                :thumbnail-src="exploration.data.thumbnail?.url || ''"
                class="max-w-full"
            />
            <p class="mt-2">
                {{exploration.data.caption}}
            </p>
        </li>
    </ul>
</template>

<style scoped>

</style>