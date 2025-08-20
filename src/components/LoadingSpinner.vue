<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  text: {
    type: String,
    default: ''
  }
})

// サイズマッピング
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

// カラーマッピング
const colorClasses = {
  primary: 'text-primary-600',
  gray: 'text-gray-600',
  white: 'text-white'
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- スピナー -->
    <div 
      class="animate-spin rounded-full border-2 border-gray-200"
      :class="[
        sizeClasses[size],
        `border-t-current ${colorClasses[color]}`
      ]"
      role="status"
      aria-label="読み込み中"
    ></div>
    
    <!-- テキスト -->
    <p 
      v-if="text" 
      class="mt-3 text-sm font-medium"
      :class="colorClasses[color]"
    >
      {{ text }}
    </p>
  </div>
</template>