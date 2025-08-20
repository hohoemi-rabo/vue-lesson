/**
 * Contentful API クライアント
 * ブログコンテンツの取得を管理
 */

import { richTextToHtml, richTextToPlainText } from '@/utils/richTextRenderer'

// 環境変数から設定を取得
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const PREVIEW_TOKEN = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN

// Contentful API ベースURL
const BASE_URL = 'https://cdn.contentful.com'
const PREVIEW_URL = 'https://preview.contentful.com'

// エラークラス
export class ContentfulError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ContentfulError'
    this.status = status
  }
}

/**
 * APIリクエストを実行
 */
async function fetchFromContentful(endpoint, options = {}) {
  const { preview = false, ...params } = options
  const baseUrl = preview ? PREVIEW_URL : BASE_URL
  const token = preview ? PREVIEW_TOKEN : ACCESS_TOKEN
  
  // クエリパラメータの構築
  const searchParams = new URLSearchParams({
    access_token: token,
    ...params
  })
  
  const url = `${baseUrl}/spaces/${SPACE_ID}${endpoint}?${searchParams}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new ContentfulError(
        `Contentful API error: ${response.statusText}`,
        response.status
      )
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error
    }
    throw new ContentfulError(`Network error: ${error.message}`, 0)
  }
}

/**
 * エントリデータを正規化
 */
function normalizeEntry(entry, includes = {}) {
  const { sys, fields } = entry
  
  // リンクの解決
  function resolveLink(link, includes) {
    if (!link || !link.sys) return null
    
    const { linkType, id } = link.sys
    
    if (linkType === 'Entry') {
      const linkedEntry = includes.Entry?.find(e => e.sys.id === id)
      return linkedEntry ? normalizeEntry(linkedEntry, includes) : null
    }
    
    if (linkType === 'Asset') {
      const asset = includes.Asset?.find(a => a.sys.id === id)
      if (asset && asset.fields && asset.fields.file) {
        return {
          id: asset.sys.id,
          title: asset.fields.title || '',
          url: `https:${asset.fields.file.url}`,
          width: asset.fields.file.details?.image?.width,
          height: asset.fields.file.details?.image?.height,
          contentType: asset.fields.file.contentType
        }
      }
    }
    
    return null
  }
  
  // フィールドの正規化
  const normalizedFields = {}
  
  for (const [key, value] of Object.entries(fields)) {
    if (value && value.sys && value.sys.type === 'Link') {
      // 単一のリンク
      normalizedFields[key] = resolveLink(value, includes)
    } else if (Array.isArray(value) && value.length > 0 && value[0]?.sys?.type === 'Link') {
      // 複数のリンク（配列）
      normalizedFields[key] = value.map(link => resolveLink(link, includes)).filter(Boolean)
    } else if (value && value.sys && value.sys.type === 'Link' && key === 'tags') {
      // タグが単一のリンクの場合（配列にする）
      const resolvedTag = resolveLink(value, includes)
      normalizedFields[key] = resolvedTag ? [resolvedTag] : []
    } else if (value && value.nodeType === 'document') {
      // リッチテキスト - contentフィールドはHTMLとして、excerptはプレーンテキストとして処理
      if (key === 'content') {
        // アセットの取得
        const assets = includes.Asset || []
        normalizedFields[key] = richTextToHtml(value, assets)
      } else {
        // excerpt などはプレーンテキスト
        normalizedFields[key] = richTextToPlainText(value)
      }
    } else {
      // その他のフィールド
      normalizedFields[key] = value
    }
  }
  
  return {
    id: sys.id,
    contentType: sys.contentType.sys.id,
    createdAt: sys.createdAt,
    updatedAt: sys.updatedAt,
    ...normalizedFields
  }
}

/**
 * 記事一覧を取得
 */
export async function getArticles(options = {}) {
  const {
    limit = 10,
    skip = 0,
    category = null,
    tag = null,
    preview = false
  } = options
  
  const params = {
    content_type: 'article',
    limit,
    skip,
    order: '-fields.publishedDate',
    include: 2
  }
  
  // カテゴリーフィルター
  if (category) {
    params['fields.category.sys.id'] = category
  }
  
  // タグフィルター  
  if (tag) {
    params['fields.tags.sys.id'] = tag
  }
  
  const data = await fetchFromContentful('/entries', { ...params, preview })
  
  return {
    items: data.items.map(entry => normalizeEntry(entry, data.includes)),
    total: data.total,
    skip: data.skip,
    limit: data.limit
  }
}

/**
 * 記事詳細を取得
 */
export async function getArticle(id, preview = false) {
  const data = await fetchFromContentful(`/entries/${id}`, { 
    include: 2,
    preview 
  })
  
  return normalizeEntry(data, data.includes)
}

/**
 * スラッグから記事を取得
 */
export async function getArticleBySlug(slug, preview = false) {
  const data = await fetchFromContentful('/entries', {
    content_type: 'article',
    'fields.slug': slug,
    include: 2,
    limit: 1,
    preview
  })
  
  if (data.items.length === 0) {
    throw new ContentfulError(`Article with slug "${slug}" not found`, 404)
  }
  
  return normalizeEntry(data.items[0], data.includes)
}

/**
 * カテゴリー一覧を取得
 */
export async function getCategories() {
  const data = await fetchFromContentful('/entries', {
    content_type: 'category',
    order: 'fields.name'
  })
  
  return data.items.map(entry => normalizeEntry(entry))
}

/**
 * タグ一覧を取得
 */
export async function getTags() {
  const data = await fetchFromContentful('/entries', {
    content_type: 'tag',
    order: 'fields.name'
  })
  
  return data.items.map(entry => normalizeEntry(entry))
}

/**
 * 著者一覧を取得
 */
export async function getAuthors() {
  const data = await fetchFromContentful('/entries', {
    content_type: 'author',
    order: 'fields.name',
    include: 1
  })
  
  return data.items.map(entry => normalizeEntry(entry, data.includes))
}

/**
 * 検索機能
 */
export async function searchArticles(query, options = {}) {
  const {
    limit = 10,
    skip = 0,
    preview = false
  } = options
  
  const data = await fetchFromContentful('/entries', {
    content_type: 'article',
    query,
    limit,
    skip,
    order: '-fields.publishedDate',
    include: 2,
    preview
  })
  
  return {
    items: data.items.map(entry => normalizeEntry(entry, data.includes)),
    total: data.total,
    skip: data.skip,
    limit: data.limit
  }
}

// デバッグ用: 設定確認
export function getConfig() {
  return {
    spaceId: SPACE_ID,
    hasAccessToken: !!ACCESS_TOKEN,
    hasPreviewToken: !!PREVIEW_TOKEN
  }
}