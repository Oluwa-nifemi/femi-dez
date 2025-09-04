<script setup lang="ts">
const { client } = usePrismic();

const { data: pageHeader } = useAsyncData("page_headers", () => {
	return client.getSingle("page_headers");
});

const { data: explorations } = useAsyncData("explorations", async () => {
    const [allExplorations, orderedExplorations] = await Promise.all([
      client.getAllByType("exploration"),
      client.getSingle("exploration_page")
    ]);

  const explorationMap = Object.fromEntries(allExplorations.map(exploration => [exploration.uid, exploration.data]));

  return orderedExplorations.data.explorations.map(e => explorationMap[e.item.uid!]!)
});

const explorationItems = explorations.value || [];

useSeoMeta({
	title: "exploration",
	ogTitle: "exploration",
});
</script>

<template>
    <p class="mb-12">
        {{pageHeader?.data.exploration ?? "A curated space for ideas, experiments, and creative concepts"}}
    </p>
    <ul class="grid md:gap-y-[72px] gap-y-12 mb-12">
        <li v-for="exploration in explorationItems">
            <media
                :type="exploration.media?.kind === 'image' ? 'image' : 'video'"
                :src="exploration.media.url || ''"
                :thumbnail-src="exploration.thumbnail?.url || ''"
                class="max-w-full"
            />
            <p class="mt-2" v-if="!!exploration.caption">
                {{exploration.caption}}
            </p>
        </li>
    </ul>
</template>

<style scoped>

</style>
