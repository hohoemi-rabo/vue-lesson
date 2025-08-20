<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/BlogCard.vue'
import PaginationNav from '@/components/PaginationNav.vue'

const blogStore = useBlogStore()

// CMS統合: 初期化
onMounted(async () => {
  try {
    await blogStore.initialize()
  } catch (error) {
    console.error('ブログストアの初期化エラー:', error)
  }
})

// 検索フィールド
const searchInput = ref('')

// カテゴリー選択
const selectedCategory = computed({
  get: () => blogStore.selectedCategory,
  set: (value) => blogStore.setCategory(value)
})

// ページネーション
const currentPage = computed({
  get: () => blogStore.currentPage,
  set: (value) => blogStore.setPage(value)
})

// 検索処理
const handleSearch = () => {
  blogStore.setSearchQuery(searchInput.value)
}

// 検索クリア
const clearSearch = () => {
  searchInput.value = ''
  blogStore.setSearchQuery('')
}

// カテゴリークリア
const clearCategory = () => {
  blogStore.setCategory('')
}

// 表示件数の変更
const itemsPerPageOptions = [6, 9, 12, 18]
const changeItemsPerPage = (count) => {
  blogStore.setItemsPerPage(count)
}
</script>

<template>
  <div class="min-h-screen">
    <!-- ヘッダー -->
    <div class="bg-gradient-to-r from-primary-50 to-primary-100 py-8 sm:py-12 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Blog</h1>
        <p class="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto px-4">
          Web開発、プログラミング、技術トレンドについての記事を発信しています
        </p>
      </div>
    </div>
    
    <!-- フィルターとサーチ -->
    <div class="mb-8 space-y-4">
      <!-- 検索バー -->
      <div class="flex flex-col sm:flex-row gap-2">
        <div class="flex-1 relative">
          <input
            v-model="searchInput"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="記事を検索..."
            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
          >
          <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div class="flex gap-2">
          <button
            @click="handleSearch"
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
          >
            検索
          </button>
          <button
            v-if="blogStore.searchQuery"
            @click="clearSearch"
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
          >
            クリア
          </button>
        </div>
      </div>
      
      <!-- カテゴリーフィルター -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm font-medium text-gray-700">カテゴリー:</span>
        <button
          @click="clearCategory"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
            !selectedCategory 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          すべて
        </button>
        <button
          v-for="category in blogStore.categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- 結果情報 -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p class="text-gray-600 text-sm sm:text-base">
          {{ blogStore.filteredPosts.length }}件の記事
          <span v-if="selectedCategory || blogStore.searchQuery">
            （フィルター適用中）
          </span>
        </p>
        
        <!-- 表示件数 -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">表示件数:</span>
          <select
            :value="blogStore.itemsPerPage"
            @change="changeItemsPerPage(Number($event.target.value))"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
              {{ option }}件
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ローディング表示 -->
    <div v-if="blogStore.loading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">読み込み中...</span>
    </div>
    
    <!-- エラー表示 -->
    <div v-else-if="blogStore.error" class="text-center py-16">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">データの読み込みエラー</h3>
        <p class="text-red-600 dark:text-red-300 text-sm mb-4">{{ blogStore.error }}</p>
        <button 
          @click="blogStore.fetchPosts({ forceRefresh: true })"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          再試行
        </button>
      </div>
    </div>
    
    <!-- ブログカードグリッド -->
    <div v-else-if="blogStore.paginatedPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      <BlogCard 
        v-for="post in blogStore.paginatedPosts"
        :key="post.id"
        :post="post"
      />
    </div>
    
    <!-- 記事が見つからない場合 -->
    <div v-else class="text-center py-16">
      <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 text-lg">記事が見つかりませんでした</p>
      <button
        @click="clearSearch(); clearCategory()"
        class="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        フィルターをクリア
      </button>
    </div>
    
    <!-- ページネーション -->
    <div class="flex justify-center py-8">
      <PaginationNav 
        v-model:currentPage="currentPage"
        :totalPages="blogStore.totalPages"
      />
    </div>
  </div>
</template>