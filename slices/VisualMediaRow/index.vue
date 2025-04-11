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

const hasLandscapeImageAndIsRow = props.slice.primary.media.some(media => media.variant === "Landscape") && props.slice.primary.media.length > 1;
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="flex flex-col md:flex-row items-center md:h-[240px] gap-y-[100px]"
    :class="{'justify-between': hasLandscapeImageAndIsRow, 'justify-center gap-x-[200px]': !hasLandscapeImageAndIsRow}"
  >
      <media
          v-for="media in slice.primary.media"
          :type="media.media.kind === 'image' ? 'image' : 'video'"
          :src="media.media.url || ''"
          :thumbnail-src="media.thumbnail?.url || ''"
          inner-class="h-full w-full object-cover"
          class="max-md:h-[240px] h-full min-w-0 >img:h-full w-fit" :class="{'md:w-[193px]': media.variant === 'Portrait', 'md:w-[360px]': media.variant === 'Landscape'}"
      />
  </section>
</template>
