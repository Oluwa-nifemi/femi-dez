<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.CatalogItemSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
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
      <a v-for="{link} in slice.primary.items" :href="link.url" target="_blank" class="underline">
          {{link.text}}
      </a>
  </section>
</template>
