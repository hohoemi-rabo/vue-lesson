<script setup>
import { RouterView } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DebugInfo from '@/components/DebugInfo.vue'

// 開発環境でのみデバッグ情報を表示
const isDev = import.meta.env.DEV
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </DefaultLayout>
  <DebugInfo v-if="isDev" />
</template>
