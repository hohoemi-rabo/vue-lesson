/**
 * Contentful Rich Text レンダラー
 * Rich TextをHTMLに変換する
 */

// ノードタイプの定義
const BLOCKS = {
  DOCUMENT: 'document',
  PARAGRAPH: 'paragraph',
  HEADING_1: 'heading-1',
  HEADING_2: 'heading-2',
  HEADING_3: 'heading-3',
  HEADING_4: 'heading-4',
  HEADING_5: 'heading-5',
  HEADING_6: 'heading-6',
  UL_LIST: 'unordered-list',
  OL_LIST: 'ordered-list',
  LIST_ITEM: 'list-item',
  QUOTE: 'blockquote',
  HR: 'hr',
  EMBEDDED_ENTRY: 'embedded-entry-block',
  EMBEDDED_ASSET: 'embedded-asset-block'
}

const INLINES = {
  HYPERLINK: 'hyperlink',
  ENTRY_HYPERLINK: 'entry-hyperlink',
  ASSET_HYPERLINK: 'asset-hyperlink',
  EMBEDDED_ENTRY: 'embedded-entry-inline'
}

const MARKS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  CODE: 'code'
}

/**
 * テキストノードのマークを適用
 */
function applyMarks(text, marks) {
  if (!marks || marks.length === 0) return text
  
  let result = text
  
  marks.forEach(mark => {
    switch (mark.type) {
      case MARKS.BOLD:
        result = `<strong>${result}</strong>`
        break
      case MARKS.ITALIC:
        result = `<em>${result}</em>`
        break
      case MARKS.UNDERLINE:
        result = `<u>${result}</u>`
        break
      case MARKS.CODE:
        result = `<code>${result}</code>`
        break
    }
  })
  
  return result
}

/**
 * ブロック要素をレンダリング
 */
function renderBlock(node, assets = {}) {
  switch (node.nodeType) {
    case BLOCKS.DOCUMENT:
      return renderNodes(node.content, assets)
    
    case BLOCKS.PARAGRAPH:
      const pContent = renderNodes(node.content, assets)
      return pContent ? `<p>${pContent}</p>` : ''
    
    case BLOCKS.HEADING_1:
      return `<h1>${renderNodes(node.content, assets)}</h1>`
    
    case BLOCKS.HEADING_2:
      return `<h2>${renderNodes(node.content, assets)}</h2>`
    
    case BLOCKS.HEADING_3:
      return `<h3>${renderNodes(node.content, assets)}</h3>`
    
    case BLOCKS.HEADING_4:
      return `<h4>${renderNodes(node.content, assets)}</h4>`
    
    case BLOCKS.HEADING_5:
      return `<h5>${renderNodes(node.content, assets)}</h5>`
    
    case BLOCKS.HEADING_6:
      return `<h6>${renderNodes(node.content, assets)}</h6>`
    
    case BLOCKS.UL_LIST:
      return `<ul>${renderNodes(node.content, assets)}</ul>`
    
    case BLOCKS.OL_LIST:
      return `<ol>${renderNodes(node.content, assets)}</ol>`
    
    case BLOCKS.LIST_ITEM:
      return `<li>${renderNodes(node.content, assets)}</li>`
    
    case BLOCKS.QUOTE:
      return `<blockquote>${renderNodes(node.content, assets)}</blockquote>`
    
    case BLOCKS.HR:
      return '<hr>'
    
    case BLOCKS.EMBEDDED_ASSET:
      return renderEmbeddedAsset(node, assets)
    
    default:
      return renderNodes(node.content || [], assets)
  }
}

/**
 * インライン要素をレンダリング
 */
function renderInline(node, assets = {}) {
  switch (node.nodeType) {
    case INLINES.HYPERLINK:
      const url = node.data?.uri || '#'
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${renderNodes(node.content, assets)}</a>`
    
    case INLINES.ENTRY_HYPERLINK:
    case INLINES.ASSET_HYPERLINK:
      // リンクされたエントリ/アセットの処理
      return renderNodes(node.content, assets)
    
    default:
      return renderNodes(node.content || [], assets)
  }
}

/**
 * 埋め込みアセット（画像など）をレンダリング
 */
function renderEmbeddedAsset(node, assets) {
  const assetId = node.data?.target?.sys?.id
  if (!assetId || !assets[assetId]) {
    return ''
  }
  
  const asset = assets[assetId]
  
  if (asset.contentType?.startsWith('image/')) {
    const alt = asset.title || 'Image'
    return `<img src="${asset.url}" alt="${alt}" class="w-full rounded-lg my-4" loading="lazy">`
  }
  
  // その他のアセットタイプ
  return `<a href="${asset.url}" target="_blank" rel="noopener noreferrer">${asset.title || 'Download'}</a>`
}

/**
 * ノードの配列をレンダリング
 */
function renderNodes(nodes, assets = {}) {
  if (!Array.isArray(nodes)) return ''
  
  return nodes.map(node => {
    if (node.nodeType === 'text') {
      return applyMarks(escapeHtml(node.value), node.marks)
    }
    
    // ブロック要素
    if (Object.values(BLOCKS).includes(node.nodeType)) {
      return renderBlock(node, assets)
    }
    
    // インライン要素
    if (Object.values(INLINES).includes(node.nodeType)) {
      return renderInline(node, assets)
    }
    
    // 不明なノード
    console.warn('Unknown node type:', node.nodeType)
    return ''
  }).join('')
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, char => map[char])
}

/**
 * Rich TextをHTMLに変換
 */
export function richTextToHtml(richText, assets = {}) {
  if (!richText || richText.nodeType !== BLOCKS.DOCUMENT) {
    return ''
  }
  
  // アセットを ID をキーとするオブジェクトに変換
  const assetMap = {}
  if (Array.isArray(assets)) {
    assets.forEach(asset => {
      if (asset && asset.id) {
        assetMap[asset.id] = asset
      }
    })
  } else if (assets && typeof assets === 'object') {
    Object.assign(assetMap, assets)
  }
  
  return renderNodes(richText.content, assetMap)
}

/**
 * Rich Textから抜粋テキストを生成
 */
export function richTextToPlainText(richText) {
  if (!richText || richText.nodeType !== BLOCKS.DOCUMENT) {
    return ''
  }
  
  function extractText(nodes) {
    if (!Array.isArray(nodes)) return ''
    
    return nodes.map(node => {
      if (node.nodeType === 'text') {
        return node.value
      } else if (node.content) {
        return extractText(node.content)
      }
      return ''
    }).join(' ')
  }
  
  return extractText(richText.content).trim()
}