<script setup>
import { formatDate } from '@/utils/formatDate'

defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover-lift border border-gray-200 dark:border-gray-700">
    <!-- サムネイル画像 -->
    <div class="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img 
        v-if="post.thumbnail"
        :src="post.thumbnail"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      >
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
    
    <!-- コンテンツ -->
    <div class="p-4 sm:p-6">
      <!-- メタ情報 -->
      <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span>{{ formatDate(post.date) }}</span>
        <span class="hidden sm:inline">•</span>
        <span class="text-primary-600 dark:text-primary-400 font-medium">{{ post.category }}</span>
        <span class="hidden sm:inline">•</span>
        <span class="hidden sm:inline">{{ post.readTime }}</span>
      </div>
      
      <!-- タイトル -->
      <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        <RouterLink :to="`/blog/${post.id}`">
          {{ post.title }}
        </RouterLink>
      </h3>
      
      <!-- 概要 -->
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <!-- タグ -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in post.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
        >
          #{{ tag }}
        </span>
        <span 
          v-if="post.tags.length > 3"
          class="px-2 py-1 text-gray-400 dark:text-gray-500 text-xs"
        >
          +{{ post.tags.length - 3 }}
        </span>
      </div>
      
      <!-- 続きを読むリンク -->
      <RouterLink 
        :to="`/blog/${post.id}`"
        class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
      >
        続きを読む
        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>