import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { 
  getArticles, 
  getArticle, 
  getArticleBySlug, 
  getCategories, 
  getTags,
  searchArticles,
  ContentfulError 
} from '@/api/contentful'

export const useBlogStore = defineStore('blog', () => {
  // 状態管理
  const posts = ref([])
  const categories = ref([])
  const tags = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // キャッシュ
  const cache = ref({
    posts: null,
    categories: null,
    tags: null,
    lastFetch: {}
  })
  
  // キャッシュの有効期限（5分）
  const CACHE_DURATION = 5 * 60 * 1000
  
  // フィルター状態
  const selectedCategory = ref('')
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(9)
  
  // キャッシュチェック
  const isCacheValid = (type) => {
    const lastFetch = cache.value.lastFetch[type]
    return lastFetch && (Date.now() - lastFetch) < CACHE_DURATION
  }
  
  // 記事一覧を取得
  const fetchPosts = async (options = {}) => {
    const { forceRefresh = false } = options
    
    if (!forceRefresh && isCacheValid('posts') && cache.value.posts) {
      posts.value = cache.value.posts
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const result = await getArticles({
        limit: 100, // 全件取得
        ...options
      })
      
      // データの正規化
      const normalizedPosts = result.items.map(post => {
        // タグの安全な処理
        let tags = []
        if (Array.isArray(post.tags)) {
          tags = post.tags.map(tag => tag?.name || tag).filter(Boolean)
        } else if (post.tags?.name) {
          tags = [post.tags.name]
        }
        
        return {
          id: post.id,
          title: post.title || 'タイトルなし',
          excerpt: post.excerpt || '',
          content: post.content || '',
          slug: post.slug || '',
          date: post.publishedDate || new Date().toISOString(),
          category: post.category?.name || 'その他',
          tags,
          thumbnail: post.thumbnail?.url,
          readTime: post.readTime || '5分',
          author: post.author?.name || '管理者'
        }
      })
      
      posts.value = normalizedPosts
      
      // キャッシュ更新
      cache.value.posts = normalizedPosts
      cache.value.lastFetch.posts = Date.now()
    } catch (err) {
      error.value = err instanceof ContentfulError ? err.message : 'データの取得に失敗しました'
      console.error('Failed to fetch posts:', err)
      
      // フォールバック：キャッシュがあれば使用
      if (cache.value.posts) {
        posts.value = cache.value.posts
      }
    } finally {
      loading.value = false
    }
  }
  
  // カテゴリー一覧を取得
  const fetchCategories = async (forceRefresh = false) => {
    if (!forceRefresh && isCacheValid('categories') && cache.value.categories) {
      categories.value = cache.value.categories
      return
    }
    
    try {
      const result = await getCategories()
      const normalizedCategories = result.map(cat => cat.name)
      
      categories.value = normalizedCategories
      
      // キャッシュ更新
      cache.value.categories = normalizedCategories
      cache.value.lastFetch.categories = Date.now()
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      // フォールバックとして記事からカテゴリーを抽出
      if (posts.value.length > 0) {
        categories.value = [...new Set(posts.value.map(post => post.category))]
      }
    }
  }
  
  // 記事詳細を取得
  const fetchPostById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const post = await getArticle(id)
      
      // タグの安全な処理
      let tags = []
      if (Array.isArray(post.tags)) {
        tags = post.tags.map(tag => tag?.name || tag).filter(Boolean)
      } else if (post.tags?.name) {
        tags = [post.tags.name]
      }
      
      return {
        id: post.id,
        title: post.title || 'タイトルなし',
        excerpt: post.excerpt || '',
        content: post.content || '',
        slug: post.slug || '',
        date: post.publishedDate || new Date().toISOString(),
        category: post.category?.name || 'その他',
        tags,
        thumbnail: post.thumbnail?.url,
        readTime: post.readTime || '5分',
        author: post.author?.name || '管理者'
      }
    } catch (err) {
      error.value = err instanceof ContentfulError ? err.message : 'データの取得に失敗しました'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // 初期化関数
  const initialize = async () => {
    await Promise.all([
      fetchPosts(),
      fetchCategories()
    ])
  }
  
  // フィルター済みの記事（computed）
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

  // 記事を取得（ID or スラッグ）
  const getPostById = (id) => {
    return posts.value.find(post => post.id === id || post.id === String(id))
  }

  return {
    // 状態
    posts,
    categories,
    tags,
    loading,
    error,
    selectedCategory,
    searchQuery,
    currentPage,
    itemsPerPage,
    
    // computed
    filteredPosts,
    totalPages,
    paginatedPosts,
    
    // アクション
    fetchPosts,
    fetchCategories,
    fetchPostById,
    initialize,
    setCategory,
    setSearchQuery,
    setPage,
    setItemsPerPage,
    getPostById
  }
})