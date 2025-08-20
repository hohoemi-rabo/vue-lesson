<template>
  <div v-if="error" class="min-h-[400px] flex items-center justify-center">
    <div class="text-center max-w-md mx-auto px-4">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        エラーが発生しました
      </h2>
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
        ページの読み込み中に問題が発生しました。
      </p>
      <button 
        @click="retry"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mr-2"
      >
        再試行
      </button>
      <RouterLink 
        to="/"
        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        ホームに戻る
      </RouterLink>
      <details v-if="error" class="mt-4 text-left">
        <summary class="cursor-pointer text-xs text-gray-500">エラーの詳細</summary>
        <pre class="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">{{ error }}</pre>
      </details>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const error = ref(null)
const router = useRouter()

onErrorCaptured((err, instance, info) => {
  console.error('ErrorBoundary captured error:', err, info)
  error.value = {
    message: err.message,
    stack: err.stack,
    info,
    component: instance?.$options.name || 'Unknown'
  }
  return false // エラーの伝播を停止
})

const retry = () => {
  error.value = null
  router.go(0) // ページをリロード
}
</script>