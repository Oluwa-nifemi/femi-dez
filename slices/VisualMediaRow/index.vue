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
    class="flex flex-col md:flex-row items-center md:h-[240px] gap-y-[100px]"
    :class="{'justify-between': hasLandscapeImage, 'justify-center gap-x-[200px]': !hasLandscapeImage}"
  >
      <media
          v-for="media in slice.primary.media"
          :type="media.media.kind === 'image' ? 'image' : 'video'"
          :src="media.media.url || ''"
          :thumbnail-src="media.thumbnail?.url || ''"
          inner-class="h-full"
          class="max-md:h-[240px] h-full min-w-0 >img:h-full" :class="{'max-w-[193px] md:max-w-unset': media.variant === 'Portrait'}"
      />
  </section>
</template>
