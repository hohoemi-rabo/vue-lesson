<script setup>
import { ref } from 'vue'

// ダミーのブログ記事データ
const posts = ref([
  {
    id: 1,
    title: 'Vue 3の新機能について',
    excerpt: 'Vue 3では、Composition APIやTeleport、Fragmentsなど、多くの新機能が追加されました。',
    date: '2024-01-15',
    category: 'Vue.js',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: '効率的なコンポーネント設計',
    excerpt: 'コンポーネントの再利用性を高め、メンテナンスしやすいコードを書くためのベストプラクティス。',
    date: '2024-01-10',
    category: 'Architecture',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Viteを使った高速開発環境構築',
    excerpt: 'Viteを使用することで、開発環境の起動時間を大幅に短縮し、HMRも高速化できます。',
    date: '2024-01-05',
    category: 'Tools',
    readTime: '6 min read'
  }
])
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
    
    <div class="grid gap-6">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
      >
        <div class="flex items-center gap-4 text-sm text-gray-500 mb-2">
          <span>{{ post.date }}</span>
          <span>•</span>
          <span class="text-primary-600">{{ post.category }}</span>
          <span>•</span>
          <span>{{ post.readTime }}</span>
        </div>
        
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          <RouterLink 
            :to="`/blog/${post.id}`"
            class="hover:text-primary-600 transition-colors"
          >
            {{ post.title }}
          </RouterLink>
        </h2>
        
        <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
        
        <RouterLink 
          :to="`/blog/${post.id}`"
          class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
        >
          続きを読む
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </article>
    </div>
  </div>
</template>