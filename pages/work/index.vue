<script setup lang="ts">
const { client } = usePrismic();

const { data: work } = useAsyncData("works", () => {
	return client.getByType("work");
});

const workItems = work.value?.results || [];

useSeoMeta({
	title: "work",
	ogTitle: "work",
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
</template>

<style scoped>

</style>
