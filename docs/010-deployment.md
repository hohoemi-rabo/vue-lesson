# 010 - デプロイメント設定

## 概要
本番環境へのデプロイメント設定と自動化を実装する

## 要件
- Netlify/Vercelへのデプロイ設定
- 自動デプロイの設定
- 環境変数の管理
- パフォーマンス最適化

## タスク

### 必須タスク
- [ ] ホスティングサービスの選定
  - [ ] Netlify/Vercelの比較検討
  - [ ] アカウント作成
  - [ ] プロジェクト連携
- [ ] ビルド設定
  - [ ] ビルドコマンドの設定
  - [ ] 出力ディレクトリの指定
  - [ ] Node.jsバージョンの指定
- [ ] 環境変数の設定
  - [ ] 本番環境用の環境変数設定
  - [ ] APIキーの安全な管理
  - [ ] ビルド時環境変数の設定
- [ ] 自動デプロイの設定
  - [ ] GitHubとの連携
  - [ ] mainブランチへのプッシュ時の自動デプロイ
  - [ ] プルリクエストのプレビューデプロイ
- [ ] カスタムドメインの設定
  - [ ] ドメインの購入/準備
  - [ ] DNSの設定
  - [ ] HTTPS証明書の設定
- [ ] パフォーマンス最適化
  - [ ] 画像の最適化
  - [ ] コード分割の実装
  - [ ] キャッシュ設定
  - [ ] CDN設定

### オプションタスク
- [ ] CI/CDパイプラインの構築
- [ ] E2Eテストの自動化
- [ ] モニタリング設定
- [ ] エラートラッキング（Sentry等）

## 技術詳細
- **ビルドツール**: Vite
- **ホスティング**: Netlify または Vercel
- **CI/CD**: GitHub Actions
- **CDN**: Cloudflare または 各サービス標準

## Netlify設定例
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## Vercel設定例
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vue",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## パフォーマンスチェックリスト
- [ ] Lighthouse スコア90以上
- [ ] 初回読み込み3秒以内
- [ ] 画像の遅延読み込み実装
- [ ] gzip圧縮の有効化
- [ ] ブラウザキャッシュの活用

## 完了条件
- 本番環境にデプロイされる
- 自動デプロイが動作する
- カスタムドメインでアクセス可能
- パフォーマンススコアが基準を満たす

## メモ
- 環境変数は絶対にGitにコミットしない
- デプロイ前に必ずビルドエラーチェック