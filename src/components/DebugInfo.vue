<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)
const breakpoint = ref('')

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth
  
  if (windowWidth.value < 640) {
    breakpoint.value = 'xs'
  } else if (windowWidth.value < 768) {
    breakpoint.value = 'sm'
  } else if (windowWidth.value < 1024) {
    breakpoint.value = 'md'
  } else if (windowWidth.value < 1280) {
    breakpoint.value = 'lg'
  } else {
    breakpoint.value = 'xl'
  }
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})
</script>

<template>
  <div class="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50">
    <div>Width: {{ windowWidth }}px</div>
    <div>Breakpoint: {{ breakpoint }}</div>
    <div class="mt-2">
      <div class="sm:hidden">Mobile (&lt; 768px)</div>
      <div class="hidden sm:block md:hidden">Tablet (768px - 1023px)</div>
      <div class="hidden md:block lg:hidden">Desktop MD (1024px - 1279px)</div>
      <div class="hidden lg:block xl:hidden">Desktop LG (1280px - 1535px)</div>
      <div class="hidden xl:block">Desktop XL (&gt;= 1536px)</div>
    </div>
  </div>
</template>