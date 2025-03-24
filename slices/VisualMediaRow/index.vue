<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.VisualImageRowSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const hasLandscapeImage = props.slice.primary.media.some(media => media.variant === "Landscape");
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="flex flex-col md:flex-row items-center h-[240px] gap-y-[100px]"
    :class="{'justify-between': hasLandscapeImage, 'justify-center gap-x-[200px]': !hasLandscapeImage}"
  >
      <prismic-image v-for="image in slice.primary.media" :field="image.media" class="max-md:h-[240px] h-full min-w-0" :class="{'max-w-[193px] md:max-w-unset': image.variant === 'Portrait'}"/>
  </section>
</template>
