/**
 * Axios クライアントの初期化と共通 Interceptor を定義するモジュール。
 * 注意：Redux store へ依存せず、循環依存を避けるためにトークンは sessionStorage から直接取得する。
 */

import axios from 'axios';

/**
 * 共有 Axios インスタンス。
 * - `baseURL` は Vite の環境変数 `VITE_API_BASE_URL` を使用
 * - タイムアウトは 10 秒
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  timeout: 10_000,
});

/**
 * リクエスト Interceptor。
 * sessionStorage からアクセストークンを読み出し、存在すれば `Authorization: Bearer` を付与する。
 */
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
