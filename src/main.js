import './assets/tailwind.css'
import './assets/main.css'
import './assets/responsive.css'
import './assets/animations.css'
import './assets/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// グローバルエラーハンドラー
app.config.errorHandler = (error, instance, info) => {
  console.error('Vue Global Error:', error, info)
  // エラーが発生してもアプリを停止させない
}

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', event.reason)
  event.preventDefault() // デフォルトの処理を防ぐ
})

app.use(createPinia())
app.use(router)

app.mount('#app')
