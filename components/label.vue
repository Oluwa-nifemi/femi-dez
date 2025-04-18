<script setup lang="ts">
defineProps(getRichTextComponentProps("label"));
</script>

<template>
  <s v-if="node.data.label === 'strikethrough'"><slot /></s>
  <span v-else-if="node.data.label === 'underline'" class="underline"><slot /></span>
  <span v-else :class="node.data.label"><slot /></span>
</template>
