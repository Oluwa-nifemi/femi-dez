<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

function throttle(fn: () => void, wait: number) {
  let lastTime = 0
  return () => {
    const now = new Date().getTime()
    if (now - lastTime >= wait) {
      lastTime = now
      fn()
    }
  }
}

const PAGE_THRESHOLD = 1.6

const handleScroll = throttle(() => {
  const scrollY = window.scrollY || window.pageYOffset
  const documentHeight = document.documentElement.scrollHeight
  const windowHeight = window.innerHeight

  if (documentHeight > windowHeight * PAGE_THRESHOLD) {
    const scrollPercent = (scrollY + windowHeight) / documentHeight
    showButton.value = scrollPercent > 0.7
  } else {
    showButton.value = false
  }
}, 200)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    class="fixed bottom-16 right-6 bg-primary text-white dark:text-black rounded-full px-4 py-2 shadow-lg duration-200"
    :class="{'pointer-events-none opacity-0': !showButton, 'opacity-100': showButton}"
    @click="scrollToTop"
  >
    ↑ Top
  </button>
</template>

<style scoped>
button {
  transition: opacity 0.3s ease;
}
</style>