# Playground.React (React Authentication Demo (with Redux Toolkit & SCSS Modules))

React + Redux Toolkit + React Router + SCSS Modules を使用した、シンプルな認証デモアプリです。
NestJS (Fastify) 最小スターターと連携して動作します。UI とビジネスロジックを分離（`useLogin` / `useDashboard`）しています。

---

## 技術スタック

- Vite + React + TypeScript
- Redux Toolkit, React Router
- Axios（共通クライアント）
- SCSS Modules（`.module.scss`）
- 環境変数（Vite: `import.meta.env`）

---

## ディレクトリ構成

```
src/
  api/                    # Axios クライアント
  components/             # 共有UI (例: ProtectedRoute)
  features/
    auth/                 # 認証 Slice（Redux Toolkit）
  pages/
    Login.tsx             # ログイン（UIのみ）
    useLogin.ts           # ログインのロジック
    Dashboard.tsx         # ダッシュボード（UIのみ）
    useDashboard.ts       # ダッシュボードのロジック
    Login.module.scss     # ログインのスタイル（CSS Modules）
    Dashboard.module.scss # ダッシュボードのスタイル（CSS Modules）
  types/
    types.ts              # アプリ内共有の型（User, Tokens 等）
    cssmodule.d.ts        # CSS Modules 用の型宣言
  store.ts                # Redux Store 設定
  App.tsx                 # ルーティング
  main.tsx                # エントリーポイント
public/
package.json
README.md
```

---

## セットアップ

```bash
npm install
```

### 環境変数

プロジェクト直下に `.env` を作成し、NestJS 側 API の URL を指定します。

```
VITE_API_BASE_URL=http://localhost:3000
```

> 例: Playground.NestJS (NestJS (Fastify) 最小スターター)を `npm run dev` で起動している場合の既定ポート。

### SCSS Modules の型宣言

`src/types/cssmodule.d.ts` を用意します（既に作成済みの場合は不要）。

```ts
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

---

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

---

## 使用方法

1. **Playground.NestJS (NestJS (Fastify) 最小スターター)**（認証 API）を起動
   - 例: `npm run dev`（Fastify, `http://localhost:3000`）
2. **React 側**を `npm run dev` で起動
3. ログインページで以下のデモアカウントを入力
   - Email: `demo@example.com`
   - Password: `password`
4. ログイン成功後、ダッシュボードで次が可能
   - `Fetch /users/me` … `/users/me` を取得
   - `Sign out` … セッションのトークンをクリアー

---

## 実装の要点

- **トークンの保持**: `sessionStorage` に `accessToken`, `refreshToken` を保存
- **Axios クライアント**: `api/ client.ts` で共通化。Request で `Authorization: Bearer` を自動付与（`sessionStorage` 参照）
- **UI とロジックの分離**: 画面側は UI のみ、ビジネスロジックは `useLogin.ts` / `useDashboard.ts` に分離
- **保護ルート**: `ProtectedRoute` で未認証時は `/login` へリダイレクト

---

## スクリプト

| コマンド         | 説明                          |
|------------------|-------------------------------|
| `npm run dev`    | 開発サーバ起動 (Vite)         |
| `npm run build`  | 本番ビルド                    |
| `npm run preview`| ビルド成果物のローカル確認    |
| `npm run lint`   | ESLint によるコード検証       |

---

## 注意事項

- Playground.NestJS (NestJS (Fastify) 最小スターター)が起動していない場合、ログイン API は失敗します。
- このデモはシンプルな構成です。実運用ではトークンのリフレッシュ、失効、CSRF 対策等の強化を行ってください。

---

## ライセンス

MIT
