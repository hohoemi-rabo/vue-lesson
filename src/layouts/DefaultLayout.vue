<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { APP_NAME, NAV_ITEMS } from '@/utils/constants'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- ヘッダー -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- ロゴ -->
          <div class="flex items-center">
            <RouterLink to="/" class="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">
              {{ APP_NAME }}
            </RouterLink>
          </div>
          
          <!-- デスクトップナビゲーション -->
          <nav class="hidden md:flex space-x-8">
            <RouterLink
              v-for="item in NAV_ITEMS"
              :key="item.path"
              :to="item.path"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {{ item.name }}
            </RouterLink>
          </nav>
          
          <!-- モバイルメニューボタン -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
            aria-label="メニューを開く"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- モバイルメニュー -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200"
      >
        <nav class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            v-for="item in NAV_ITEMS"
            :key="item.path"
            :to="item.path"
            @click="isMobileMenuOpen = false"
            class="block text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            {{ item.name }}
          </RouterLink>
        </nav>
      </div>
    </header>
    
    <!-- メインコンテンツ -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>
    
    <!-- フッター -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-500">
          © {{ new Date().getFullYear() }} {{ APP_NAME }}. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
nav a.router-link-exact-active {
  @apply text-primary-600 font-semibold;
}
</style>