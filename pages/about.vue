<script setup>
const {client} = usePrismic();

const {data: about} = await useAsyncData("about", () => client.getSingle("about"));
</script>

<template>
    <section class="flex gap-x-3 md:gap-x-5 w-full mb-6">
        <prismic-image class="flex-grow min-w-0" v-for="image in about.data.intro_images" :field="image.image"/>
    </section>
    <section class="space-y-3 mb-8 md:mb-[57px]">
        <prismic-rich-text :field="about.data.description"/>
    </section>
    <div class="flex flex-col gap-y-8 md:gap-y-[72px]">
        <section>
            <p class="text-gray mb-3 md:mb-6">
                Experience
            </p>
            <ul class="grid gap-y-6 md:gap-y-9">
                <li class="flex flex-col md:flex-row gap-y-2" v-for="experience in about.data.experience">
                    <p class="w-[96px] flex-shrink-0 mr-5">
                        {{ experience.time }}
                    </p>
                    <div>
                        <a v-if="!!experience.company.url" :href="experience.company.url" target="_blank"
                           class="underline">
                            {{ experience.company.text }}
                        </a>
                        <p v-else>
                            {{ experience.company.text }}
                        </p>
                        <p class="mt-2 text-gray">
                            {{ experience.description }}
                        </p>
                    </div>
                </li>
            </ul>
        </section>
        <section>
            <p class="text-gray mb-3 md:mb-6">
                Awards
            </p>
            <ul class="grid gap-y-6 md:gap-y-9">
                <li class="flex flex-col md:flex-row gap-y-2" v-for="award in about.data.awards">
                    <p class="w-[96px] flex-shrink-0 mr-5">
                        {{ award.time }}
                    </p>
                    <div>
                        <a :href="award.link.url" target="_blank" class="underline">
                            {{ award.link.text }}
                        </a>
                    </div>
                </li>
            </ul>
        </section>
        <section>
            <p class="mb-4">
                Currently reading
            </p>
            <div class="grid md:grid-cols-2 gap-x-2.5 gap-y-3">
                <div v-for="book in about.data.currently_reading" class="flex space-x-2 items-center">
                    <prismic-image :field="book.image" class="w-8 h-12 rounded border-[0.5px] border-gray"/>
                    <div>
                        <p>
                            {{ book.name }}
                        </p>
                        <p class="text-gray">
                            {{ book.author }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="grid md:grid-cols-2 gap-y-5 gap-x-8">
            <div class="space-y-3">
                <p class="text-gray">
                    Things i like
                </p>
                <p v-for="thing in about.data.things_like">
                    {{ thing.label }}
                </p>
            </div>
            <div class="space-y-3">
                <p class="text-gray">
                    Things i don’t like
                </p>
                <p v-for="thing in about.data.things_not_like">
                    {{ thing.label }}
                </p>
            </div>
        </section>
        <section class="space-y-3">
            <p class="text-gray">
                More things I like
            </p>
            <slot v-for="thing in about.data.more_things_like">
                <a v-if="thing.link.url" :href="thing.link.url" target="_blank">
                    {{thing.link.text}}
                </a>
                <p v-else>
                    {{thing.link.text}}
                </p>
            </slot>
        </section>
        <section class="space-y-3">
            <p class="text-gray">
                More things I don’t like
            </p>
            <slot v-for="thing in about.data.more_things_dont_like">
                <a v-if="thing.link.url" :href="thing.link.url" target="_blank">
                    {{thing.link.text}}
                </a>
                <p v-else>
                    {{thing.link.text}}
                </p>
            </slot>
        </section>
        <section class="space-y-3">
            <p class="text-gray">
                Bucket list
            </p>
            <p v-for="item in about.data.bucket_list" class="strike" :class="{'line-through text-red': item.done}">
                {{ item.text }}
            </p>
        </section>
    </div>
</template>

<style scoped>

</style>