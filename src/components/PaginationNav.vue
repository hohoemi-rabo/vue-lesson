<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisible: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:currentPage'])

// 表示するページ番号の計算
const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisible / 2)
  let start = Math.max(props.currentPage - half, 1)
  let end = Math.min(start + props.maxVisible - 1, props.totalPages)
  
  if (end - start < props.maxVisible - 1) {
    start = Math.max(end - props.maxVisible + 1, 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const showFirstEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

const showLastEllipsis = computed(() => {
  return visiblePages.value.length > 0 && 
    visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})
</script>

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center space-x-1">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="前のページ"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <!-- First Page -->
    <button
      v-if="visiblePages[0] > 1"
      @click="goToPage(1)"
      class="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      1
    </button>
    
    <!-- First Ellipsis -->
    <span v-if="showFirstEllipsis" class="px-2 text-gray-400">...</span>
    
    <!-- Page Numbers -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="[
        'px-3 py-2 rounded-lg transition-colors',
        page === currentPage 
          ? 'bg-primary-600 text-white' 
          : 'hover:bg-gray-100'
      ]"
    >
      {{ page }}
    </button>
    
    <!-- Last Ellipsis -->
    <span v-if="showLastEllipsis" class="px-2 text-gray-400">...</span>
    
    <!-- Last Page -->
    <button
      v-if="visiblePages[visiblePages.length - 1] < totalPages"
      @click="goToPage(totalPages)"
      class="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {{ totalPages }}
    </button>
    
    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="次のページ"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>