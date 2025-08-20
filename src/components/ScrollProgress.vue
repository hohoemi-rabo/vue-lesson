<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// スクロール進捗状態
const scrollProgress = ref(0)

// スクロール進捗を計算
const updateScrollProgress = () => {
  const scrollTop = window.scrollY
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / documentHeight) * 100
  scrollProgress.value = Math.min(Math.max(progress, 0), 100)
}

// スロットリング用の関数
let ticking = false
const throttledUpdate = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', throttledUpdate, { passive: true })
  updateScrollProgress() // 初期値設定
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledUpdate)
})
</script>

<template>
  <div 
    class="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50"
    aria-hidden="true"
  >
    <div 
      class="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-150 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    ></div>
  </div>
</template>