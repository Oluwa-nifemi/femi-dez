<script setup lang="ts">
const {client} = usePrismic();

const {data: work} = useAsyncData("works", () => {
    return client.getByType("work")
})

const workItems = work.value?.results || [];
</script>

<template>
    <ul class="grid md:gap-y-[124px] gap-y-6">
        <li v-for="work in workItems">
            <nuxt-link :to="`work/${work.uid}`">
                <figure>
                    <prismic-image :field="work.data.main_image" class="w-fit mb-2"/>
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