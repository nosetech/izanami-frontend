# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際のClaude Code（claude.ai/code）への指針を提供します。

## プロジェクト概要

IzanamiのNext.js 15 Reactフロントエンドアプリケーションで、TypeScriptとMaterial-UIを使用して構築されています。GraphQL API通信にはApollo Clientを使用し、型安全なGraphQL操作のためのコード生成機能を備えています。

## 開発コマンド

```bash
# 開発サーバー（Turbopack使用）
yarn dev

# 本番用ビルド
yarn build

# 本番サーバー起動
yarn start

# リント・フォーマット
yarn lint
yarn format
yarn format:check

# テスト実行
yarn test
yarn test:updateSnapshot

# GraphQLコード生成
yarn codegen
```

## アーキテクチャ

### 主要技術

- **Next.js 15** - App RouterとTurbopack使用
- **React 19** - TypeScript使用
- **Material-UI (MUI)** v7 - Emotionスタイリング使用
- **Apollo Client** - GraphQLのNext.js統合
- **GraphQL Code Generator** - 型安全な操作生成
- **Axios** - axios-hooksを使用したREST API呼び出し
- **React Hook Form** - Yupバリデーション使用

### プロジェクト構造

- `src/app/` - Next.js App Routerのページとレイアウト
- `src/components/` - Atomic Designに従ったコンポーネント階層:
  - `atoms/` - 基本的なUIコンポーネント（Button、Imageなど）
  - `molecules/` - シンプルなコンポーネントの組み合わせ
  - `organisms/` - 複雑なコンポーネント（AppBar、Footer、Logo）
  - `templates/` - ページレイアウトテンプレート（BaseLayout、Login）
- `src/graphql/` - GraphQLクライアント設定と生成された型
- `src/hooks/` - APIフックを含むカスタムReactフック
- `src/theme/` - カスタムブレークポイントを持つMUIテーマ設定
- `src/types/` - TypeScript型定義

### 主要機能

#### GraphQL統合

- Next.js SSRサポートを持つApollo Client
- GraphQLスキーマからTypeScriptへのコード生成
- `src/graphql/generated/components.ts`に生成された型
- `src/graphql/query/`の`.graphql`ファイルでのGraphQL操作

#### 認証

- `useLogin`フックによるCookieベースのセッション管理
- ログイン用の`/session`エンドポイント
- セキュアな設定でCookieにユーザーデータを保存

#### テーマ設定

- 日本語ロケールサポートを持つカスタムMUIテーマ
- カスタムブレークポイント: mobile、tablet、laptop、desktop
- カスタムカラー（alert、base、foreground）を持つ拡張パレット
- Robotoフォントファミリー

#### コンポーネントアーキテクチャ

- コンポーネント組織のためのAtomic Designパターン
- オプションのフッターを持つBaseLayoutテンプレート
- カスタムMaterial-UIブレークポイントを使用したレスポンシブデザイン

## 環境設定

プロジェクトには以下を含む`.env.local`ファイルが必要です：

- `NEXT_PUBLIC_GRAPHQL_URI` - GraphQL APIエンドポイント

## テスト

- Next.js統合を持つJest
- Reactコンポーネントテスト用のTesting Library
- スナップショットテストが有効
- `__tests__/`ディレクトリ内のテスト

## コード生成

以下の場合に`yarn codegen`を実行してください：

- `src/graphql/query/`に新しいGraphQL操作を追加した場合
- GraphQLスキーマに変更があった場合
- 環境変数にGraphQLエンドポイントを設定した場合

## 開発ルール

- commitする前にはyarn lint, yarn formatを実行してください。

## Journaling workflow

InkdropのMCPサーバーを使用できる状態の場合、あなた (AI エージェント) は、このプロジェクトで行った作業を、タスクの終了ごとに私の Inkdrop ノートに報告してください。

「izanami」ノートブックに「Log: <Job title>」というタイトルで作成します。

タスクの終了ごとに、次の形式でノートを書いてください。:

## Log: <task title>

- **Prompt**: <受け取った指示>
- **Issue**: <課題の内容>

### What I did: <やったことの要約>

...

### How I did it: <どうやって解決したか>

...

### What were challenging: <難しかったこと>

...

### Future work (optional)

- <今後の改善案など>
