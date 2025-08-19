<script setup>
import HeroSection from '@/components/HeroSection.vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

// アニメーション用のIntersection Observer
const { isVisible: isAboutVisible, target: aboutTarget } = useIntersectionObserver({ once: true })
</script>

<template>
  <div>
    <!-- ヒーローセクションは全幅で表示 -->
    <div class="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      <HeroSection />
    </div>
    
    <!-- 簡易プロフィールセクション -->
    <section 
      ref="aboutTarget"
      class="py-16 transition-all duration-1000 delay-200"
      :class="isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Vue.jsを中心としたフロントエンド開発を専門としています。
          ユーザビリティとパフォーマンスを重視した開発を心がけています。
        </p>
      </div>
      
      <div class="flex justify-center mb-8">
        <RouterLink 
          to="/about"
          class="inline-flex items-center px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          詳しいプロフィールを見る
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </div>
      
      <!-- 最新ブログ記事プレビュー -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">Latest Blog Posts</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <article 
            v-for="i in 3" 
            :key="i"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div class="text-sm text-primary-600 mb-2">2024.01.15</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Vue 3の新機能について
            </h4>
            <p class="text-gray-600 text-sm mb-4">
              Vue 3では、Composition APIやTeleport、Fragmentsなど、多くの新機能が追加されました。
            </p>
            <RouterLink 
              to="/blog/1"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
            >
              続きを読む
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>