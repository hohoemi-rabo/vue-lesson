import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * Intersection Observer用のコンポーザブル
 * 要素が画面内に入った時の検知とアニメーション制御
 */
export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    immediate = false
  } = options

  const isVisible = ref(immediate)
  const target = ref(null)
  let observer = null

  const observe = () => {
    if (!target.value || !window.IntersectionObserver) {
      // Intersection Observer非対応ブラウザの場合は即座に表示
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          
          // 一度だけ実行する場合は監視を停止
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          // 継続監視の場合は非表示状態も検知
          isVisible.value = false
        }
      })
    }, {
      threshold,
      rootMargin
    })

    observer.observe(target.value)
  }

  const unobserve = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
  }

  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    if (target.value) {
      observe()
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    target,
    isVisible,
    observe,
    unobserve,
    disconnect
  }
}

/**
 * スクロールアニメーション用の便利なコンポーザブル
 */
export function useScrollAnimation(animationType = 'fade-up', options = {}) {
  const { isVisible, target } = useIntersectionObserver(options)
  
  const animationClass = ref('')
  
  // アニメーションタイプに応じたクラス名を設定
  const animationMap = {
    'fade-up': 'animate-fade-up',
    'fade-down': 'animate-fade-down',
    'fade-left': 'animate-fade-left',
    'fade-right': 'animate-fade-right',
    'scale-up': 'animate-scale-up',
    'slide-up': 'animate-slide-up'
  }

  // 可視状態に応じてアニメーションクラスを更新
  const updateAnimationClass = () => {
    if (isVisible.value) {
      animationClass.value = animationMap[animationType] || 'animate-fade-up'
    } else {
      animationClass.value = ''
    }
  }

  // 可視性の変化を監視
  onMounted(() => {
    const unwatch = watch(isVisible, updateAnimationClass, { immediate: true })
    onUnmounted(unwatch)
  })

  return {
    target,
    isVisible,
    animationClass
  }
}

/**
 * ステージングアニメーション（要素を順番にアニメーション）
 */
export function useStaggerAnimation(elements, delay = 100) {
  const animatedElements = ref(new Set())
  
  const observers = []

  onMounted(() => {
    elements.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.value.has(index)) {
            setTimeout(() => {
              animatedElements.value.add(index)
              entry.target.classList.add('animate-fade-up')
            }, index * delay)
            
            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px'
      })

      observer.observe(element)
      observers.push(observer)
    })
  })

  onUnmounted(() => {
    observers.forEach(observer => observer.disconnect())
  })

  return {
    animatedElements
  }
}