/**
 * 日付をフォーマットする関数
 * @param {Date|string} date - フォーマットする日付
 * @param {string} format - フォーマット形式 ('short', 'long', 'relative')
 * @returns {string} フォーマットされた日付文字列
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date)
  
  if (isNaN(d.getTime())) {
    return ''
  }
  
  switch (format) {
    case 'short':
      // 2024/01/15
      return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      
    case 'long':
      // 2024年1月15日
      return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      
    case 'relative':
      // 相対時間（3日前、など）
      return getRelativeTime(d)
      
    default:
      return d.toLocaleDateString('ja-JP')
  }
}

function getRelativeTime(date) {
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return '今日'
  } else if (diffDays === 1) {
    return '昨日'
  } else if (diffDays < 7) {
    return `${diffDays}日前`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks}週間前`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months}ヶ月前`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years}年前`
  }
}