/**
 * レスポンシブデザイン用ユーティリティ
 */

// ブレークポイント定義（Tailwindと同じ）
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

// メディアクエリヘルパー
export const mediaQueries = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`
}

// 現在のブレークポイントを取得
export function getCurrentBreakpoint() {
  const width = window.innerWidth
  
  if (width < BREAKPOINTS.sm) return 'xs'
  if (width < BREAKPOINTS.md) return 'sm'
  if (width < BREAKPOINTS.lg) return 'md'
  if (width < BREAKPOINTS.xl) return 'lg'
  if (width < BREAKPOINTS['2xl']) return 'xl'
  return '2xl'
}

// デバイスタイプを判定
export function getDeviceType() {
  const width = window.innerWidth
  
  if (width < BREAKPOINTS.md) return 'mobile'
  if (width < BREAKPOINTS.lg) return 'tablet'
  return 'desktop'
}

// タッチデバイスかどうか判定
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}