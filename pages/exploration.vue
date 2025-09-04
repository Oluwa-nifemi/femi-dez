<script setup lang="ts">
const { client } = usePrismic();

const { data: pageHeader } = useAsyncData("page_headers", () => {
	return client.getSingle("page_headers");
});

const { data: explorations } = useAsyncData("explorations", () => {
	return client.getByType("exploration");
});

const explorationItems = explorations.value?.results || [];

useSeoMeta({
	title: "exploration",
	ogTitle: "exploration",
});
</script>

<template>
    <p class="mb-12">
        {{pageHeader?.data.exploration ?? "A curated space for ideas, experiments, and creative concepts"}}
    </p>
    <ul class="grid md:gap-y-[72px] gap-y-12 mb-40">
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
