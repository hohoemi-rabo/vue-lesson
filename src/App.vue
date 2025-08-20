<script setup>
import { RouterView } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DebugInfo from '@/components/DebugInfo.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

// 開発環境でのみデバッグ情報を表示
const isDev = import.meta.env.DEV

</script>

<template>
  <DefaultLayout>
    <ErrorBoundary>
      <RouterView v-slot="{ Component, route }">
        <Suspense v-if="Component">
          <div class="page-transition">
            <component 
              :is="Component" 
              :key="route.path"
            />
          </div>
          <template #fallback>
            <div class="flex items-center justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span class="ml-3 text-gray-600 dark:text-gray-300">読み込み中...</span>
            </div>
          </template>
        </Suspense>
        <div v-else class="flex items-center justify-center py-8 text-red-500">
          <strong>Error: Component is null for route {{ route.path }}</strong>
        </div>
      </RouterView>
    </ErrorBoundary>
  </DefaultLayout>
  <DebugInfo v-if="isDev" />
</template>

<style>
.page-transition {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
