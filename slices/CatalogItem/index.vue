<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.CatalogItemSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const activePreview = ref<string | undefined | null>();

const availableImages = props.slice.primary.items.filter(item => item.image?.url).map(item => item.image.url!);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="grid gap-y-2"
  >
      <p class="text-gray">
          {{slice.primary.title}}
      </p>
      <component
          v-for="{ link, image } in slice.primary.items"
          :is="link.url ? 'a' : 'p'"
          :href="link.url || undefined"
          target="_blank"
          class="w-fit py-0.5 after:!bottom-[3px]"
          :class="{'link-animate': !!link.url}"
          @mouseenter="() => activePreview = image.url"
          @mouseleave="() => activePreview = null"
      >
          {{ link.text }}
      </component>
      <img
          v-for="image in availableImages"
          class="max-md:hidden fixed bottom-[72px] right-[36px] w-[134px] h-auto transition-opacity duration-200"
          :class="{'opacity-0': image !== activePreview, 'opacity-100': image === activePreview}"
          :src="image"
          alt="Preview image for hovered item"
      >
  </section>
</template>
