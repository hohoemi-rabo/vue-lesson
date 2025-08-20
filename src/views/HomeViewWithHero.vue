<script setup>
import { onMounted, computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useBlogStore } from '@/stores/blog'
import { formatDate } from '@/utils/formatDate'

// アニメーション用のIntersection Observer
const { isVisible: isAboutVisible, target: aboutTarget } = useIntersectionObserver({ once: true })

// ブログストア
const blogStore = useBlogStore()

// 最新記事を最大3件まで取得
const latestPosts = computed(() => {
  return blogStore.posts
    .slice() // 元の配列をコピー
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 新しい順にソート
    .slice(0, 3) // 最大3件
})

// コンポーネント初期化時にブログデータを取得
onMounted(async () => {
  if (blogStore.posts.length === 0) {
    await blogStore.initialize()
  }
})
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
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Latest Blog Posts</h3>
        
        <!-- ローディング表示 -->
        <div v-if="blogStore.loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        
        <!-- ブログ記事がある場合 -->
        <div v-else-if="latestPosts.length > 0" class="grid md:grid-cols-3 gap-6">
          <article 
            v-for="post in latestPosts" 
            :key="post.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <!-- サムネイル画像 -->
            <div class="mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <img 
                v-if="post.thumbnail"
                :src="post.thumbnail" 
                :alt="post.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <div class="text-sm text-primary-600 mb-2">{{ formatDate(post.date) }}</div>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {{ post.title }}
            </h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {{ post.excerpt || post.description }}
            </p>
            <RouterLink 
              :to="`/blog/${post.id}`"
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium inline-flex items-center"
            >
              続きを読む
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </article>
        </div>
        
        <!-- ブログ記事がない場合 -->
        <div v-else class="text-center py-8">
          <p class="text-gray-600 dark:text-gray-300 mb-4">まだブログ記事がありません</p>
          <RouterLink 
            to="/blog"
            class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            ブログページへ
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>