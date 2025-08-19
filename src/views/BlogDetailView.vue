<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// 将来的にIDを使って記事を取得する
// eslint-disable-next-line no-unused-vars
const postId = computed(() => route.params.id)

// ダミーの記事詳細データ
const post = ref({
  id: 1,
  title: 'Vue 3の新機能について',
  content: `
# Vue 3の新機能について

Vue 3は、Vue.jsの最新メジャーバージョンで、多くの改善と新機能が導入されました。

## Composition API

Composition APIは、コンポーネントのロジックをより柔軟に構成できる新しいAPIです。
複雑なコンポーネントのロジックを整理し、再利用可能な形で抽出することができます。

## Teleport

Teleportを使用すると、コンポーネントの一部を、DOMツリーの異なる場所にレンダリングできます。
これは、モーダルやツールチップなどのUIパターンに特に便利です。

## Fragments

Vue 3では、コンポーネントが複数のルート要素を持つことができるようになりました。
これにより、不要なラッパー要素を削除できます。

## パフォーマンスの改善

Vue 3は、Vue 2と比較して大幅なパフォーマンスの改善を実現しています。
- バンドルサイズの削減
- 初期レンダリングの高速化
- メモリ使用量の削減
  `,
  date: '2024-01-15',
  category: 'Vue.js',
  readTime: '5 min read',
  author: '山田 太郎'
})
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <!-- 記事ヘッダー -->
    <header class="mb-8">
      <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span>{{ post.date }}</span>
        <span>•</span>
        <span class="text-primary-600">{{ post.category }}</span>
        <span>•</span>
        <span>{{ post.readTime }}</span>
      </div>
      
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
      
      <div class="flex items-center gap-2 text-gray-600">
        <span>By</span>
        <span class="font-medium">{{ post.author }}</span>
      </div>
    </header>
    
    <!-- 記事本文 -->
    <div class="prose prose-lg max-w-none">
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div v-html="convertMarkdown(post.content)"></div>
      </div>
    </div>
    
    <!-- 戻るリンク -->
    <div class="mt-8">
      <RouterLink 
        to="/blog"
        class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        ブログ一覧に戻る
      </RouterLink>
    </div>
  </article>
</template>

<script>
// 簡易的なMarkdown変換（実際のプロジェクトではmarkedなどを使用）
function convertMarkdown(markdown) {
  return markdown
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-2 mt-4">$1</h3>')
    .replace(/\n\n/gim, '</p><p class="mb-4">')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc mb-4">$1</ul>')
    .replace(/^/gim, '<p class="mb-4">')
    .replace(/$/gim, '</p>')
}
</script>