// アプリケーション定数
export const APP_NAME = import.meta.env.VITE_APP_TITLE || 'Portfolio'
export const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION || 'My personal portfolio website'
export const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173'

// ソーシャルリンク
export const SOCIAL_LINKS = {
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  qiita: 'https://qiita.com',
  zenn: 'https://zenn.dev'
}

// ナビゲーションメニュー
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
]

// ブレークポイント
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}