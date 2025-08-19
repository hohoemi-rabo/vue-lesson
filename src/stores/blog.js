import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  // ダミーデータ
  const posts = ref([
    {
      id: 1,
      title: 'Vue 3の新機能について',
      excerpt: 'Vue 3では、Composition APIやTeleport、Fragmentsなど、多くの新機能が追加されました。これらの機能により、より柔軟で保守性の高いコードを書くことができます。',
      content: `# Vue 3の新機能について

Vue 3は、Vue.jsフレームワークの最新メジャーバージョンです。2020年9月にリリースされ、多くの改善と新機能が導入されました。

## 主な新機能

### 1. Composition API

Composition APIは、コンポーネントのロジックをより柔軟に構成できる新しいAPIです。

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    return {
      count,
      doubled,
      increment
    }
  }
}
\`\`\`

### 2. Teleport

Teleportを使用すると、コンポーネントの一部を、DOMツリーの異なる場所にレンダリングできます。

\`\`\`vue
<template>
  <button @click="showModal = true">モーダルを開く</button>
  
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <p>これはモーダルです</p>
      <button @click="showModal = false">閉じる</button>
    </div>
  </Teleport>
</template>
\`\`\`

### 3. Fragments

Vue 3では、コンポーネントが複数のルート要素を持つことができるようになりました。

\`\`\`vue
<template>
  <header>ヘッダー</header>
  <main>メインコンテンツ</main>
  <footer>フッター</footer>
</template>
\`\`\`

## パフォーマンスの改善

Vue 3は、Vue 2と比較して大幅なパフォーマンスの改善を実現しています：

- **バンドルサイズの削減**: Tree-shakingの改善により、約41%軽量化
- **初期レンダリングの高速化**: 最大55%高速化
- **更新パフォーマンス**: 最大133%高速化
- **メモリ使用量の削減**: 最大54%削減

## TypeScriptサポートの向上

Vue 3は最初からTypeScriptで書き直されており、優れた型推論を提供します。

\`\`\`typescript
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const count = ref<number>(0)
    
    // propsの型が自動的に推論される
    console.log(props.msg)
    
    return { count }
  }
})
\`\`\`

## まとめ

Vue 3は、より良い開発体験、パフォーマンス、そして保守性を提供します。既存のVue 2プロジェクトからの移行も、Migration Buildを使用することで段階的に行うことができます。`,
      date: '2024-01-15',
      category: 'Vue.js',
      tags: ['Vue3', 'JavaScript', 'Frontend'],
      thumbnail: 'https://picsum.photos/seed/1/400/250',
      readTime: '5 min read',
      author: '山田 太郎',
      updatedAt: '2024-01-16'
    },
    {
      id: 2,
      title: '効率的なコンポーネント設計',
      excerpt: 'コンポーネントの再利用性を高め、メンテナンスしやすいコードを書くためのベストプラクティス。単一責任の原則を守り、適切な粒度でコンポーネントを分割することが重要です。',
      content: '',
      date: '2024-01-10',
      category: 'Architecture',
      tags: ['設計', 'コンポーネント', 'ベストプラクティス'],
      thumbnail: 'https://picsum.photos/seed/2/400/250',
      readTime: '8 min read',
      author: '山田 太郎'
    },
    {
      id: 3,
      title: 'Viteを使った高速開発環境構築',
      excerpt: 'Viteを使用することで、開発環境の起動時間を大幅に短縮し、HMRも高速化できます。ESビルドを活用した次世代のビルドツールの導入方法を解説します。',
      content: '',
      date: '2024-01-05',
      category: 'Tools',
      tags: ['Vite', 'ビルドツール', 'DX'],
      thumbnail: 'https://picsum.photos/seed/3/400/250',
      readTime: '6 min read',
      author: '山田 太郎'
    },
    {
      id: 4,
      title: 'TypeScriptとVue 3の相性',
      excerpt: 'Vue 3はTypeScriptとの統合が大幅に改善されました。型推論の向上により、より安全なコードを書くことができます。',
      content: '',
      date: '2023-12-28',
      category: 'TypeScript',
      tags: ['TypeScript', 'Vue3', '型安全'],
      thumbnail: 'https://picsum.photos/seed/4/400/250',
      readTime: '7 min read',
      author: '山田 太郎'
    },
    {
      id: 5,
      title: 'Tailwind CSSで実現する高速UI開発',
      excerpt: 'ユーティリティファーストのCSSフレームワークであるTailwind CSSを使用して、一貫性のあるUIを素早く構築する方法を紹介します。',
      content: '',
      date: '2023-12-20',
      category: 'CSS',
      tags: ['TailwindCSS', 'CSS', 'UI'],
      thumbnail: 'https://picsum.photos/seed/5/400/250',
      readTime: '5 min read',
      author: '山田 太郎'
    },
    {
      id: 6,
      title: 'Piniaによる状態管理の基礎',
      excerpt: 'Vue 3の公式状態管理ライブラリであるPiniaの基本的な使い方と、Vuexとの違いについて解説します。',
      content: '',
      date: '2023-12-15',
      category: 'Vue.js',
      tags: ['Pinia', '状態管理', 'Vue3'],
      thumbnail: 'https://picsum.photos/seed/6/400/250',
      readTime: '6 min read',
      author: '山田 太郎'
    },
    {
      id: 7,
      title: 'レスポンシブデザインのベストプラクティス',
      excerpt: 'モバイルファーストアプローチで、全デバイスで美しく表示されるWebサイトを構築するテクニックを紹介します。',
      content: '',
      date: '2023-12-10',
      category: 'CSS',
      tags: ['レスポンシブ', 'CSS', 'モバイル'],
      thumbnail: 'https://picsum.photos/seed/7/400/250',
      readTime: '8 min read',
      author: '山田 太郎'
    },
    {
      id: 8,
      title: 'Git flowを使った効率的な開発フロー',
      excerpt: 'チーム開発において、Git flowを活用して効率的にバージョン管理を行う方法について詳しく解説します。',
      content: '',
      date: '2023-12-05',
      category: 'Tools',
      tags: ['Git', 'バージョン管理', 'チーム開発'],
      thumbnail: 'https://picsum.photos/seed/8/400/250',
      readTime: '10 min read',
      author: '山田 太郎'
    },
    {
      id: 9,
      title: 'Web Performance最適化テクニック',
      excerpt: 'Webサイトのパフォーマンスを向上させるための具体的なテクニックと、計測方法について解説します。',
      content: '',
      date: '2023-11-30',
      category: 'Performance',
      tags: ['パフォーマンス', '最適化', 'Core Web Vitals'],
      thumbnail: 'https://picsum.photos/seed/9/400/250',
      readTime: '9 min read',
      author: '山田 太郎'
    },
    {
      id: 10,
      title: 'Docker入門：開発環境の構築',
      excerpt: 'Dockerを使用して、チーム全体で統一された開発環境を構築する方法を初心者向けに解説します。',
      content: '',
      date: '2023-11-25',
      category: 'DevOps',
      tags: ['Docker', 'コンテナ', '開発環境'],
      thumbnail: 'https://picsum.photos/seed/10/400/250',
      readTime: '7 min read',
      author: '山田 太郎'
    },
    {
      id: 11,
      title: 'アクセシビリティを考慮したWeb開発',
      excerpt: 'すべてのユーザーが使いやすいWebサイトを作るため、アクセシビリティの基本と実装方法を学びます。',
      content: '',
      date: '2023-11-20',
      category: 'Accessibility',
      tags: ['アクセシビリティ', 'WCAG', 'ユーザビリティ'],
      thumbnail: 'https://picsum.photos/seed/11/400/250',
      readTime: '6 min read',
      author: '山田 太郎'
    },
    {
      id: 12,
      title: 'CI/CDパイプラインの構築',
      excerpt: 'GitHub ActionsやGitLab CIを使用して、自動テストとデプロイのパイプラインを構築する方法を紹介します。',
      content: '',
      date: '2023-11-15',
      category: 'DevOps',
      tags: ['CI/CD', 'GitHub Actions', '自動化'],
      thumbnail: 'https://picsum.photos/seed/12/400/250',
      readTime: '8 min read',
      author: '山田 太郎'
    }
  ])

  // フィルター状態
  const selectedCategory = ref('')
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(9)

  // カテゴリー一覧を取得
  const categories = computed(() => {
    const cats = [...new Set(posts.value.map(post => post.category))]
    return cats.sort()
  })

  // フィルター済みの記事
  const filteredPosts = computed(() => {
    let filtered = posts.value

    // カテゴリーフィルター
    if (selectedCategory.value) {
      filtered = filtered.filter(post => post.category === selectedCategory.value)
    }

    // 検索フィルター
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  })

  // ページネーション
  const totalPages = computed(() => {
    return Math.ceil(filteredPosts.value.length / itemsPerPage.value)
  })

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredPosts.value.slice(start, end)
  })

  // アクション
  const setCategory = (category) => {
    selectedCategory.value = category
    currentPage.value = 1 // ページをリセット
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
    currentPage.value = 1 // ページをリセット
  }

  const setPage = (page) => {
    currentPage.value = page
  }

  const setItemsPerPage = (count) => {
    itemsPerPage.value = count
    currentPage.value = 1 // ページをリセット
  }

  // 記事を取得
  const getPostById = (id) => {
    return posts.value.find(post => post.id === Number(id))
  }

  return {
    posts,
    selectedCategory,
    searchQuery,
    currentPage,
    itemsPerPage,
    categories,
    filteredPosts,
    totalPages,
    paginatedPosts,
    setCategory,
    setSearchQuery,
    setPage,
    setItemsPerPage,
    getPostById
  }
})