# 008 - ダークモード実装

## 概要
ライト/ダークモードの切り替え機能を実装する

## 要件
- ライト/ダークモードの切り替えボタン
- ユーザーの選択を保存（LocalStorage）
- OSの設定に基づく自動切り替え
- スムーズなテーマ切り替えアニメーション

## タスク

### 必須タスク
- [ ] テーマ管理のcomposable作成（useTheme.js）
  - [ ] 現在のテーマ状態管理
  - [ ] LocalStorageへの保存/読み込み
  - [ ] OSテーマの検知（prefers-color-scheme）
- [ ] テーマ切り替えボタンコンポーネントの作成
  - [ ] アイコンの切り替え（太陽/月）
  - [ ] トグルアニメーション
  - [ ] ツールチップ表示
- [ ] CSS変数でのカラー管理
  - [ ] ライトモードのカラーパレット定義
  - [ ] ダークモードのカラーパレット定義
  - [ ] セマンティックなカラー変数名
- [ ] 全コンポーネントのダークモード対応
  - [ ] 背景色の調整
  - [ ] テキストカラーの調整
  - [ ] ボーダー・シャドウの調整
  - [ ] 画像の明度調整
- [ ] トランジション効果の実装
  - [ ] カラー変更時のスムーズな遷移
  - [ ] フラッシュ防止対策

### オプションタスク
- [ ] 自動切り替えスケジュール機能
- [ ] カスタムテーマの作成機能
- [ ] ハイコントラストモード

## 技術詳細
- **状態管理**: Composition API + LocalStorage
- **CSS変数**: :root と [data-theme] での管理
- **メディアクエリ**: prefers-color-scheme
- **Vue3**: provide/inject でのグローバル管理

## カラーパレット仕様
```css
/* ライトモード */
:root {
  --color-background: #ffffff;
  --color-text: #1a1a1a;
  --color-primary: #3b82f6;
  --color-border: #e5e7eb;
}

/* ダークモード */
[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-text: #f3f4f6;
  --color-primary: #60a5fa;
  --color-border: #374151;
}
```

## 実装方法
```javascript
// useTheme.js
const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}
```

## 完了条件
- テーマ切り替えがスムーズに動作する
- 選択したテーマが保存される
- OS設定との連動が機能する
- 全ページでダークモードが適用される

## メモ
- 初回訪問時はOS設定を優先
- 画像やアイコンのコントラスト調整も考慮