import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false)
  const target = ref(null)
  let observer = null
  
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        
        // 一度だけ実行する場合はobserverを停止
        if (options.once && observer) {
          observer.unobserve(entry.target)
        }
      } else if (!options.once) {
        isVisible.value = false
      }
    })
  }
  
  onMounted(() => {
    if (target.value) {
      observer = new IntersectionObserver(callback, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        root: options.root || null
      })
      
      observer.observe(target.value)
    }
  })
  
  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
    }
  })
  
  return {
    isVisible,
    target
  }
}