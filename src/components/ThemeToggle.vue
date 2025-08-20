<script setup>
import { useGlobalTheme } from '@/composables/useTheme'

const { theme, setTheme } = useGlobalTheme()

// ツールチップのテキスト
const getTooltipText = () => {
  switch (theme.value) {
    case 'light':
      return 'ダークモードに切り替え'
    case 'dark':
      return 'ライトモードに切り替え'
    case 'auto':
      return 'オートモード（右クリックで切り替え）'
    default:
      return 'テーマを切り替え'
  }
}

// シンプルなライト/ダークトグル
const toggleThemeSimple = () => {
  if (theme.value === 'dark') {
    setTheme('light')
  } else {
    setTheme('dark')
  }
}

// 右クリックでオートモードに切り替え
const handleRightClick = (event) => {
  event.preventDefault()
  setTheme('auto')
}
</script>

<template>
  <div class="relative group">
    <!-- テーマ切り替えボタン -->
    <button
      @click="toggleThemeSimple"
      @contextmenu="handleRightClick"
      class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      :aria-label="getTooltipText()"
      :title="getTooltipText()"
    >
      <!-- ライトモードアイコン -->
      <svg
        v-if="theme === 'light'"
        class="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:rotate-45"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
      
      <!-- ダークモードアイコン -->
      <svg
        v-else-if="theme === 'dark'"
        class="w-5 h-5 text-blue-400 transition-transform duration-300 hover:rotate-12"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
      </svg>
      
      <!-- オートモードアイコン -->
      <svg
        v-else
        class="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </button>
    
    <!-- テーマインジケーター -->
    <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 transition-colors duration-200"
         :class="{
           'bg-yellow-400': theme === 'light',
           'bg-blue-500': theme === 'dark',
           'bg-gray-400': theme === 'auto'
         }"
    ></div>
    
    <!-- ツールチップ -->
    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
      {{ getTooltipText() }}
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
    </div>
  </div>
</template>

<style scoped>
/* アニメーションの最適化 */
svg {
  will-change: transform;
}

/* ホバー時のツールチップ表示調整 */
.group:hover .absolute {
  z-index: 50;
}
</style>