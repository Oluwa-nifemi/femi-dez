<script setup lang="ts">
const {client} = usePrismic();

const {data: work} = useAsyncData("works", () => {
    return client.getByType("work")
})

const workItems = work.value?.results || [];
</script>

<template>
    <ul class="grid md:gap-y-[124px] px-6 gap-y-6">
        <li v-for="work in workItems">
            <figure>
                <prismic-image :field="work.data.main_image" class="w-fit mb-2"/>
                <figcaption>
                    <nuxt-link :to="`work/${work.uid}`">
                        {{ work.data.name }}
                    </nuxt-link>
                </figcaption>
            </figure>
        </li>
    </ul>
</template>

<style scoped>

</style>