<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  type: 'image' | 'video'
  src: string
  thumbnailSrc?: string
  innerClass?: string
  disableOptimization?: boolean;
}

const props = defineProps<Props>()

const mediaRef = ref<HTMLElement | null>(null)
const isVisible = ref(props.disableOptimization ?? false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '80px' }
  )
  if (mediaRef.value) observer.observe(mediaRef.value)
})
</script>

<template>
  <div ref="mediaRef">
    <template v-if="props.type === 'image'">
      <img loading="lazy" v-if="isVisible" :src="props.src" alt="Media Image" :class="innerClass"/>
    </template>

    <template v-else-if="props.type === 'video'">
      <div class="video-wrapper" v-if="isVisible">
        <video
          v-if="isVisible"
          autoplay
          muted
          loop
          playsinline
          :poster="props.thumbnailSrc"
          :class="innerClass"
        >
          <source :src="props.src" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>