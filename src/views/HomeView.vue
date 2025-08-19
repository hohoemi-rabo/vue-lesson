<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

// アニメーション用のIntersection Observer
const { isVisible: isHeroVisible, target: heroTarget } = useIntersectionObserver({ once: true })
const { isVisible: isAboutVisible, target: aboutTarget } = useIntersectionObserver({ once: true })
</script>

<template>
  <div>
    <!-- ヒーローセクション -->
    <section 
      ref="heroTarget"
      class="py-20 transition-all duration-1000"
      :class="isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to My Portfolio
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          フロントエンドエンジニアとして、素晴らしいWebエクスペリエンスを創造します
        </p>
        <div class="flex justify-center gap-4">
          <RouterLink 
            to="/about"
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            About Me
          </RouterLink>
          <RouterLink 
            to="/blog"
            class="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Blog
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 簡易プロフィールセクション -->
    <section 
      ref="aboutTarget"
      class="py-16 transition-all duration-1000 delay-200"
      :class="isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">About</h2>
          <p class="text-gray-600 mb-4">
            Vue.jsを中心としたフロントエンド開発を専門としています。
            ユーザビリティとパフォーマンスを重視した開発を心がけています。
          </p>
          <p class="text-gray-600">
            このポートフォリオサイトは、Vue 3とTailwind CSSを使用して構築されています。
          </p>
        </div>
        <div class="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
          <span class="text-gray-400 text-2xl">Profile Image</span>
        </div>
      </div>
    </section>
  </div>
</template>