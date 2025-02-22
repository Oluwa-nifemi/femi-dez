<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.WorkContentSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <div
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="slice.variation === 'imageRow'"
    class="flex gap-x-4 md:gap-x-5 w-full"
  >
      <prismic-image class="flex-grow min-w-0" v-for="image in slice.primary.image_row" :field="image.image" />
  </div>
    <p v-else>
        {{slice.primary.description}}
    </p>
</template>
