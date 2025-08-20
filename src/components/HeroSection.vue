<script setup>
import { ref, onMounted } from 'vue'

// タイピングアニメーション用のデータ
const displayText = ref('')
const fullText = 'フロントエンドエンジニア'
const cursorVisible = ref(true)
const typingComplete = ref(false)

// タイピングアニメーション
const typeWriter = () => {
  let index = 0
  const interval = setInterval(() => {
    if (index < fullText.length) {
      displayText.value += fullText.charAt(index)
      index++
    } else {
      clearInterval(interval)
      typingComplete.value = true
    }
  }, 100)
}

// カーソルの点滅
const blinkCursor = () => {
  setInterval(() => {
    if (!typingComplete.value) {
      cursorVisible.value = !cursorVisible.value
    } else {
      cursorVisible.value = false
    }
  }, 500)
}

// スクロールダウン処理
const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}

onMounted(() => {
  setTimeout(() => {
    typeWriter()
    blinkCursor()
  }, 500)
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- 背景グラデーション -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100"></div>
    
    <!-- 背景パターン（オプション） -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-pattern"></div>
    </div>
    
    <!-- メインコンテンツ -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8">
      <!-- アニメーション用コンテナ -->
      <div class="animate-fade-in-up">
        <!-- 名前 -->
        <h1 class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
          山田 太郎
        </h1>
        
        <!-- 職種（タイピングアニメーション） -->
        <div class="text-lg xs:text-xl sm:text-2xl md:text-3xl text-primary-600 font-medium mb-6 sm:mb-8 h-8 sm:h-10">
          <span>{{ displayText }}</span>
          <span 
            v-show="!typingComplete && cursorVisible" 
            class="inline-block w-0.5 h-5 sm:h-6 md:h-7 lg:h-8 bg-primary-600 ml-1 align-middle"
          ></span>
        </div>
        
        <!-- キャッチコピー -->
        <p class="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in-delayed">
          美しく、使いやすく、パフォーマンスの高い<br class="sm:hidden">
          Webアプリケーションを創造します
        </p>
        
        <!-- CTAボタン -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed-more">
          <RouterLink 
            to="/about"
            class="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            詳しく見る
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </RouterLink>
          <RouterLink 
            to="/blog"
            class="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transform hover:scale-105 transition-all duration-200"
          >
            ブログを読む
          </RouterLink>
        </div>
      </div>
    </div>
    
    <!-- スクロールインジケーター -->
    <button
      @click="scrollToContent"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
      aria-label="スクロールダウン"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  </section>
</template>

<style scoped>
/* 背景パターン */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
}

/* フェードインアニメーション */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-fade-in-delayed {
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.5s forwards;
}

.animate-fade-in-delayed-more {
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.8s forwards;
}

/* モーション設定を無効にしているユーザー向け */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-fade-in-delayed,
  .animate-fade-in-delayed-more,
  .animate-bounce {
    animation: none;
    opacity: 1;
  }
}
</style>