<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { formatDate } from '@/utils/formatDate'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 記事データ
const post = computed(() => blogStore.getPostById(route.params.id))

// 目次データ
const tableOfContents = ref([])
const activeHeadingId = ref('')

// Markedの設定
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

// 見出しの処理を後から行う
const extractHeadings = (html) => {
  tableOfContents.value = []
  
  // 正規表現で見出しを抽出
  const headingRegex = /<h([1-3])>([^<]+)<\/h[1-3]>/g
  let match
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2]
    const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    
    tableOfContents.value.push({
      id,
      text,
      level
    })
  }
  
  // 見出しにIDを追加
  return html.replace(/<h([1-3])>([^<]+)<\/h([1-3])>/g, (match, level, text, closeLevel) => {
    const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    return `<h${level} id="${id}">${text}</h${closeLevel}>`
  })
}

// Markdownをレンダリング
const renderedContent = computed(() => {
  if (!post.value || !post.value.content) return ''
  
  // Markdownをパース
  const html = marked(post.value.content)
  
  // 見出しを処理
  return extractHeadings(html)
})

// 前後の記事
const prevPost = computed(() => {
  const currentIndex = blogStore.posts.findIndex(p => p.id === Number(route.params.id))
  return currentIndex > 0 ? blogStore.posts[currentIndex - 1] : null
})

const nextPost = computed(() => {
  const currentIndex = blogStore.posts.findIndex(p => p.id === Number(route.params.id))
  return currentIndex < blogStore.posts.length - 1 ? blogStore.posts[currentIndex + 1] : null
})

// 関連記事（同じカテゴリーの記事）
const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogStore.posts
    .filter(p => p.category === post.value.category && p.id !== post.value.id)
    .slice(0, 3)
})

// 目次クリック時のスクロール
const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // ヘッダーの高さ分オフセット
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}

// スクロール時の現在位置検出
const updateActiveHeading = () => {
  const headings = tableOfContents.value.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  })).filter(item => item.element)
  
  if (headings.length === 0) return
  
  const scrollPosition = window.scrollY + 150 // ヘッダー分のオフセット
  
  // デフォルトは最初の見出し
  let activeId = headings[0].id
  
  // 現在のスクロール位置を超えた最後の見出しを見つける
  for (const heading of headings) {
    if (heading.element.offsetTop <= scrollPosition) {
      activeId = heading.id
    } else {
      break
    }
  }
  
  // 状態が変わった場合のみ更新
  if (activeHeadingId.value !== activeId) {
    activeHeadingId.value = activeId
  }
}

// スロットリング関数
let scrollTimeout = null
const throttledUpdate = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    updateActiveHeading()
    scrollTimeout = null
  }, 100)
}

onMounted(() => {
  nextTick(() => {
    // 初期表示時に目次を設定
    setTimeout(() => {
      updateActiveHeading()
    }, 500)
    
    window.addEventListener('scroll', throttledUpdate)
  })
})
</script>

<template>
  <article v-if="post" class="max-w-7xl mx-auto">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- メインコンテンツ -->
      <div class="lg:col-span-8">
        <!-- 記事ヘッダー -->
        <header class="mb-8">
          <!-- カテゴリーとメタ情報 -->
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
              {{ post.category }}
            </span>
            <span>{{ formatDate(post.date, 'long') }}</span>
            <span>•</span>
            <span>{{ post.readTime }}</span>
          </div>
          
          <!-- タイトル -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ post.title }}
          </h1>
          
          <!-- 著者情報 -->
          <div class="flex items-center gap-3 pb-6 border-b border-gray-200">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500">👤</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ post.author }}</p>
              <p class="text-sm text-gray-500">
                <span v-if="post.updatedAt">
                  更新: {{ formatDate(post.updatedAt, 'short') }}
                </span>
              </p>
            </div>
          </div>
        </header>
        
        <!-- サムネイル画像 -->
        <div v-if="post.thumbnail" class="mb-8">
          <img 
            :src="post.thumbnail" 
            :alt="post.title"
            class="w-full rounded-lg shadow-sm"
          >
        </div>
        
        <!-- 記事本文 -->
        <div 
          class="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900"
          v-html="renderedContent"
        ></div>
        
        <!-- タグ -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
        
        <!-- 前後の記事ナビゲーション -->
        <nav class="mt-12 pt-8 border-t border-gray-200">
          <div class="grid md:grid-cols-2 gap-4">
            <!-- 前の記事 -->
            <RouterLink
              v-if="prevPost"
              :to="`/blog/${prevPost.id}`"
              class="group p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <p class="text-sm text-gray-500 mb-1">← 前の記事</p>
              <p class="font-medium text-gray-900 group-hover:text-primary-600">
                {{ prevPost.title }}
              </p>
            </RouterLink>
            <div v-else></div>
            
            <!-- 次の記事 -->
            <RouterLink
              v-if="nextPost"
              :to="`/blog/${nextPost.id}`"
              class="group p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-right"
            >
              <p class="text-sm text-gray-500 mb-1">次の記事 →</p>
              <p class="font-medium text-gray-900 group-hover:text-primary-600">
                {{ nextPost.title }}
              </p>
            </RouterLink>
          </div>
        </nav>
      </div>
      
      <!-- サイドバー -->
      <aside class="lg:col-span-4 mt-8 lg:mt-0">
        <div class="sticky top-24">
          <!-- 目次 -->
          <div v-if="tableOfContents.length > 0" class="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 class="font-bold text-gray-900 mb-4">目次</h3>
            <nav>
              <ul class="space-y-2">
                <li 
                  v-for="item in tableOfContents"
                  :key="item.id"
                  :class="[
                    'transition-colors cursor-pointer',
                    item.level === 2 ? 'ml-4' : item.level === 3 ? 'ml-8' : '',
                  ]"
                >
                  <a
                    @click.prevent="scrollToHeading(item.id)"
                    :class="[
                      'block py-1 text-sm hover:text-primary-600',
                      activeHeadingId === item.id ? 'text-primary-600 font-medium' : 'text-gray-600'
                    ]"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <!-- 関連記事 -->
          <div v-if="relatedPosts.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="font-bold text-gray-900 mb-4">関連記事</h3>
            <div class="space-y-4">
              <RouterLink
                v-for="relatedPost in relatedPosts"
                :key="relatedPost.id"
                :to="`/blog/${relatedPost.id}`"
                class="block group"
              >
                <p class="text-sm text-gray-500 mb-1">{{ formatDate(relatedPost.date) }}</p>
                <p class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {{ relatedPost.title }}
                </p>
              </RouterLink>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </article>
  
  <!-- 記事が見つからない場合 -->
  <div v-else class="text-center py-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">記事が見つかりません</h2>
    <RouterLink 
      to="/blog"
      class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
    >
      ブログ一覧へ戻る
    </RouterLink>
  </div>
</template>

<style>
/* コードブロックのスタイル調整 */
.prose pre {
  @apply rounded-lg;
}

.prose pre code {
  @apply bg-transparent p-0;
}

/* スクロール時のヘッダー用マージン */
.prose h1,
.prose h2,
.prose h3 {
  scroll-margin-top: 5rem;
}
</style>