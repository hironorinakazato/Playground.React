/**
 * Application-level shared TypeScript types.
 *
 * このファイルはアプリのドメイン型（Redux や API レイヤで共有する型）を定義します。
 * グローバル宣言用の型（CSS Modules など）は `src/types/cssmodule.d.ts` に置いてください。
 */

/** 認証トークンのペア（アクセストークン／リフレッシュトークン） */
export type Tokens = {
  /** Bearer で送信するアクセストークン（短期有効） */
  accessToken: string;
  /** 再発行用のリフレッシュトークン（長期有効） */
  refreshToken: string;
};

/** 最小限のユーザ情報 */
export type User = {
  /** サーバ側で付与されるユーザID */
  id: string;
  /** メールアドレス（ログインID兼用） */
  email: string;
};
