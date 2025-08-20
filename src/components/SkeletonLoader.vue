<script setup>
defineProps({
  lines: {
    type: Number,
    default: 3
  },
  height: {
    type: String,
    default: 'h-4'
  },
  showAvatar: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="animate-pulse">
    <!-- アバター -->
    <div v-if="showAvatar" class="flex items-center space-x-4 mb-4">
      <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div class="flex-1">
        <div class="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div class="h-3 bg-gray-300 rounded w-1/6"></div>
      </div>
    </div>
    
    <!-- テキストライン -->
    <div class="space-y-3">
      <div 
        v-for="line in lines" 
        :key="line"
        class="bg-gray-300 rounded"
        :class="[
          height,
          line === lines ? 'w-3/4' : 'w-full'
        ]"
      ></div>
    </div>
    
    <!-- ボタン -->
    <div v-if="showButton" class="mt-4">
      <div class="h-10 bg-gray-300 rounded w-32"></div>
    </div>
  </div>
</template>