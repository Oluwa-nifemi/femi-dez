<script setup>
import {defaultMetaDescription, defaultOgImage} from "assets/seo";

const {client} = usePrismic();

const {data: about} = await useAsyncData("about", () => client.getSingle("about"));
const { data: spotify } = useFetch("/api/spotify", {
    server: true,
    lazy: true
});

useSeoMeta({
    title: 'about',
    ogTitle: 'about',
    ogDescription: about.value?.data.meta_description|| defaultMetaDescription,
    ogImage: about.value?.data.meta_image.url|| defaultOgImage
});
</script>

<template>
    <section class="flex gap-x-3 md:gap-x-5 w-full mb-6">
        <prismic-image class="flex-grow min-w-0" v-for="image in about.data.intro_images" :field="image.image"/>
    </section>
    <section class="flex flex-col gap-y-3 mb-8 md:mb-[57px]">
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
                           class="link-animate">
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
                        <a :href="award.link.url" target="_blank" class="link-animate">
                            {{ award.link.text }}
                        </a>
                    </div>
                </li>
            </ul>
        </section>
        <section>
            <p class="mb-4 text-gray">
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
            <div class="flex flex-col gap-y-3">
                <p class="text-gray">
                    Things I like
                </p>
                <component v-for="thing in about.data.things_like" :is="thing.link.url ? 'a' : 'p'" :href="thing.link.url" class="w-fit" target="_blank" :class="{'link-animate': thing.link.url}">
                    {{ thing.link.text }}
                </component>
            </div>
            <div class="flex flex-col gap-y-3">
                <p class="text-gray">
                    Things I don’t like
                </p>
                <component v-for="thing in about.data.things_not_like" class="w-fit" :is="thing.link.url ? 'a' : 'p'" :href="thing.link.url" target="_blank" :class="{'link-animate': thing.link.url}">
                    {{ thing.link.text }}
                </component>
            </div>
        </section>
        <section class="flex flex-col gap-y-3">
            <p class="text-gray">
                Favourite artists
            </p>
            <ul class="grid md:grid-cols-2 gap-x-2.5 gap-y-3">
                <component v-for="artist in about.data.favorite_artists" :is="artist.spotify_link.text ? 'a' : 'div'" :href="artist.spotify_link.text" target="_blank" class="flex items-center gap-x-2">
                    <prismic-image :field="artist.picture" class="size-12 rounded-full border-[0.5px] border-gray"/>
                    <div>
                        <p class="text-primary">{{artist.name}}</p>
                        <p class="text-gray">{{artist.genre}}</p>
                    </div>
                </component>
            </ul>
        </section>
        <section class="flex flex-col gap-y-3" v-if="spotify && spotify.data.length > 0">
            <p class="text-gray">
                Recently played
            </p>
            <ul class="grid md:grid-cols-2 gap-x-2.5 gap-y-3">
                <li v-for="song in spotify.data">
                    <a :href="song.href" target="_blank" class="flex items-center gap-x-2">
                        <img :src="song.image_url" :alt="song.name" class="size-12 rounded-[4px] border-[0.5px] border-gray">
                        <div>
                            <p class="text-primary w-[170px] md:w-[120px] truncate" :title="song.name">{{song.name}}</p>
                            <p class="text-gray">{{song.artist}}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
        <section class="flex flex-col gap-y-3">
            <p class="text-gray">
                More things I like
            </p>
            <component v-for="thing in about.data.more_things_like" :is="thing.link.url ? 'a' : 'p'" :href="thing.link.url" target="_blank" class="w-fit" :class="{'link-animate': thing.link.url}">
                {{thing.link.text}}
            </component>
        </section>
        <section class="flex flex-col gap-y-3">
            <p class="text-gray">
                More things I don’t like
            </p>
            <component class="w-fit" v-for="thing in about.data.more_things_dont_like" :is="thing.link.url ? 'a' : 'p'" :href="thing.link.url" target="_blank" :class="{'link-animate': thing.link.url}">
                {{thing.link.text}}
            </component>
        </section>
        <section class="flex flex-col gap-y-3">
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