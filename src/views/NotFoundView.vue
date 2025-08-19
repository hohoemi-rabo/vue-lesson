<script setup>
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-200">404</h1>
      <p class="text-2xl font-semibold text-gray-900 mt-4">ページが見つかりません</p>
      <p class="text-gray-600 mt-2 mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <RouterLink 
        to="/"
        class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        ホームに戻る
      </RouterLink>
    </div>
  </div>
</template>