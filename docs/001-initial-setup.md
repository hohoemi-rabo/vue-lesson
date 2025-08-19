# 001 - 初期セットアップと設定

## 概要
Vue.jsポートフォリオサイトの初期環境構築と基本設定を行う

## 要件
- Vue 3 + Vite環境の最適化
- 必要なパッケージのインストール
- 基本的なプロジェクト構造の整理
- 開発環境の設定

## タスク

### 必須タスク
- [ ] Tailwind CSSまたはSCSS環境のセットアップ
- [ ] 環境変数の設定（.env.local, .env.production）
- [ ] src配下のディレクトリ構造整理
  - [ ] composables/ディレクトリ作成
  - [ ] utils/ディレクトリ作成
  - [ ] layouts/ディレクトリ作成
- [ ] 基本レイアウトコンポーネントの作成
- [ ] エラーページ（404）の作成
- [ ] ESLint/Prettierルールの調整

### オプションタスク
- [ ] TypeScript導入の検討
- [ ] Husky + lint-stagedの設定
- [ ] コミットメッセージルールの設定

## 技術詳細
- **スタイリング**: Tailwind CSS 3.x または SCSS
- **アイコン**: @iconify/vue または heroicons
- **日付処理**: dayjs
- **Markdown**: marked または markdown-it

## 完了条件
- 開発サーバーが正常に起動する
- スタイリングフレームワークが動作する
- 基本的なレイアウトが表示される
- Lintが正常に動作する

## メモ
- Tailwind CSSを採用する場合は、パージ設定に注意
- 環境変数はVITE_プレフィックスを使用