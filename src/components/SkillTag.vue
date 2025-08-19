<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 3,
    validator: (value) => value >= 1 && value <= 5
  },
  category: {
    type: String,
    default: 'general'
  }
})

// カテゴリーごとの色設定
const categoryColors = {
  frontend: 'bg-blue-100 text-blue-700 border-blue-200',
  backend: 'bg-green-100 text-green-700 border-green-200',
  tools: 'bg-purple-100 text-purple-700 border-purple-200',
  database: 'bg-orange-100 text-orange-700 border-orange-200',
  general: 'bg-gray-100 text-gray-700 border-gray-200'
}

const getCategoryColor = (category) => {
  return categoryColors[category] || categoryColors.general
}
</script>

<template>
  <div class="inline-block">
    <div 
      class="px-3 py-1.5 rounded-full border text-sm font-medium transition-transform hover:scale-105"
      :class="getCategoryColor(category)"
    >
      <div class="flex items-center gap-2">
        <span>{{ name }}</span>
        <div class="flex gap-0.5">
          <span 
            v-for="i in 5" 
            :key="i"
            class="w-1.5 h-1.5 rounded-full"
            :class="i <= level ? 'bg-current opacity-100' : 'bg-current opacity-25'"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>