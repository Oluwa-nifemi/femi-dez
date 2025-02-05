<script setup>
import exp from "node:constants";

const { client } = usePrismic();

const { data: about } = await useAsyncData("about", () => client.getSingle("about"));

console.log(about.value.data.experience)
</script>

<template>
    <div class="w-[449px] mx-auto pt-7 mb-4 homepage pb-[120px]">
        <section
            class="flex space-x-5 w-full mb-6"
        >
            <prismic-image class="flex-grow min-w-0" v-for="image in about.data.intro_images" :field="image.image" />
        </section>
        <section class="space-y-5 mb-[72px]">
            <prismic-rich-text :field="about.data.description"/>
        </section>
        <section class="mb-[72px]">
            <p class="text-gray mb-6">
                Experience
            </p>
            <ul class="grid gap-y-9">
               <li class="flex" v-for="experience in about.data.experience">
                   <p class="w-[96px] flex-shrink-0 text-gray mr-5">
                       {{experience.time}}
                   </p>
                   <div>
                       <a v-if="!!experience.company.url" :href="experience.company.url" target="_blank">
                         {{experience.company.text}}
                       </a>
                       <p v-else>
                         {{experience.company.text}}
                       </p>
                       <p class="mt-2">
                           {{experience.description}}
                       </p>
                   </div>
               </li>
            </ul>
        </section>
        <section class="mb-[72px]">
            <p class="mb-4">
                Currently reading
            </p>
            <div class="grid grid-cols-2 gap-x-2.5 gap-y-4">
                <div v-for="book in about.data.currently_reading" class="flex space-x-2 items-center">
                    <prismic-image :field="book.image" class="w-8 h-12 rounded border-[0.5px] border-gray"/>
                    <div>
                        <p>
                          {{book.name}}
                        </p>
                        <p class="text-gray">
                          {{book.author}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="grid grid-cols-2 gap-x-8 mb-[72px]">
            <div class="space-y-3">
                <p class="text-gray">
                    Things i like
                </p>
                <p v-for="thing in about.data.things_like">
                    {{thing.label}}
                </p>
            </div>
            <div class="space-y-3">
                <p class="text-gray">
                    Things i don’t like
                </p>
                <p v-for="thing in about.data.things_not_like">
                    {{thing.label}}
                </p>
            </div>
        </section>
        <section class="space-y-3">
            <p class="text-gray">
                Bucket list
            </p>
            <p v-for="item in about.data.bucket_list" class="strike" :class="{'line-through text-red': item.done}">
                {{item.text}}
            </p>
        </section>
    </div>
</template>

<style scoped>

</style>