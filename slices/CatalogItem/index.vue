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

const activePreview = ref<string | null>(null);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="grid gap-y-3"
  >
      <p class="text-gray">
          {{slice.primary.title}}
      </p>
      <slot v-for="{link, image} in slice.primary.items">
          <a v-if="link.url" :href="link.url" target="_blank" class="underline w-fit" @mouseenter="activePreview = image.url" @mouseleave="activePreview = null">
              {{link.text}}
          </a>
          <p v-else class="w-fit" @mouseenter="activePreview = image.url" @mouseleave="activePreview = null">
              {{link.text}}
          </p>
      </slot>
      <img v-if="activePreview" class="max-md:hidden fixed bottom-[72px] right-[36px] w-[134px] h-auto" :src="activePreview" alt="Preview image for hovered item">
  </section>
</template>
