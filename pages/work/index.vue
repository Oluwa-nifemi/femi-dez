<script setup lang="ts">
const { client } = usePrismic();

const { data: work } = useAsyncData("works", () => {
    return client.getByType("work")
})

const workItems = work.value?.results || [];
</script>

<template>
    <section class="pt-8 w-[452px] mx-auto">
        <ul class="grid gap-y-[124px]">
            <li v-for="work in workItems">
                <figure>
                    <prismic-image :field="work.data.main_image" class="w-fit mb-2" />
                    <figcaption>
                        <nuxt-link :to="`work/${work.uid}`">
                            {{work.data.name}}
                        </nuxt-link>
                    </figcaption>
                </figure>
            </li>
        </ul>
    </section>
</template>

<style scoped>

</style>