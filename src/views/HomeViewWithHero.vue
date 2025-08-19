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