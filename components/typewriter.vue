<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps<{
  text: string;
  intervalBetweenLetters: number;
}>()

const displayedText = ref('')
let index = 0

const emit = defineEmits<{
    (e: 'finished'): void
}>()

onMounted(() => {
  const interval = setInterval(() => {
    if (index < props.text.length) {
      displayedText.value += props.text[index]
      index++
    } else {
      clearInterval(interval);
      console.log('finished')
      emit('finished')
    }
  }, props.intervalBetweenLetters) // adjust typing speed here
})
</script>

<template>
  <p>{{ displayedText }}</p>
</template>

<style scoped>

</style>