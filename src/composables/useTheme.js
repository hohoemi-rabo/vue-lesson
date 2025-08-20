import { ref, onMounted, watch } from 'vue'

/**
 * テーマ管理用のコンポーザブル
 * ライト/ダークモードの切り替えとLocalStorageでの永続化を管理
 */
export function useTheme() {
  // テーマ状態
  const theme = ref('light') // 'light' | 'dark' | 'auto'
  const isDark = ref(false)  // 実際のダークモード状態
  
  // テーマ切り替え
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    updateTheme()
  }
  
  // 特定のテーマを設定
  const setTheme = (newTheme) => {
    if (['light', 'dark', 'auto'].includes(newTheme)) {
      theme.value = newTheme
      updateTheme()
    }
  }
  
  // システムの設定を監視
  const systemPrefersDark = ref(false)
  const mediaQuery = ref(null)
  
  const updateSystemPreference = () => {
    if (typeof window !== 'undefined') {
      systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
  
  // DOM要素への反映
  const updateTheme = () => {
    let shouldBeDark = false
    
    switch (theme.value) {
      case 'dark':
        shouldBeDark = true
        break
      case 'light':
        shouldBeDark = false
        break
      case 'auto':
        shouldBeDark = systemPrefersDark.value
        break
    }
    
    isDark.value = shouldBeDark
    
    if (typeof document !== 'undefined') {
      if (shouldBeDark) {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        document.documentElement.classList.remove('dark')
      }
    }
    
    // LocalStorageに保存
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme.value)
    }
  }
  
  // 初期化
  const initTheme = () => {
    // システム設定を監視
    updateSystemPreference()
    
    if (typeof window !== 'undefined') {
      mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.value.addEventListener('change', updateSystemPreference)
    }
    
    // 保存されたテーマを取得
    let savedTheme = 'auto'
    if (typeof localStorage !== 'undefined') {
      savedTheme = localStorage.getItem('theme') || 'auto'
    }
    
    // 有効なテーマ値かチェック
    if (!['light', 'dark', 'auto'].includes(savedTheme)) {
      savedTheme = 'auto'
    }
    
    theme.value = savedTheme
    updateTheme()
  }
  
  // システム設定変更の監視
  watch(systemPrefersDark, () => {
    if (theme.value === 'auto') {
      updateTheme()
    }
  })
  
  // テーマ変更の監視
  watch(theme, updateTheme)
  
  onMounted(() => {
    initTheme()
  })
  
  // クリーンアップ
  const cleanup = () => {
    if (mediaQuery.value) {
      mediaQuery.value.removeEventListener('change', updateSystemPreference)
    }
  }
  
  return {
    theme,
    isDark,
    systemPrefersDark,
    toggleTheme,
    setTheme,
    cleanup
  }
}

// グローバルなテーマ管理インスタンス
let globalTheme = null

export function useGlobalTheme() {
  if (!globalTheme) {
    globalTheme = useTheme()
  }
  return globalTheme
}