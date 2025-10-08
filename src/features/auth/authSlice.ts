/**
 * 認証ステート（Redux Toolkit）の Slice と Async Thunk。
 * - loginThunk: /auth/login で Tokens を取得
 * - fetchMeThunk: /users/me でプロフィール取得
 * - logout: トークンとユーザ情報を破棄
 *
 * 設計メモ：
 * - `verbatimModuleSyntax` 対応のため、型は `import type` を使用
 * - 例外は `unknown` とし、型ガードで安全にエラーメッセージを取り出す
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/client';
import axios from 'axios';
import type { Tokens, User } from '../../types';

/** Auth ステート */
type AuthState = {
  /** 現在のアクセストークン（未ログイン時は null） */
  accessToken: string | null;
  /** 現在のリフレッシュトークン（未ログイン時は null） */
  refreshToken: string | null;
  /** 現在ログイン中のユーザ */
  me: User | null;
  /** 通信状態 */
  status: 'idle' | 'loading' | 'error';
  /** 最後に発生したエラーのメッセージ */
  error?: string;
};

/**
 * イニシャルステート。
 * セッション復元のため、sessionStorage からトークンを読み込む。
 */
const initialState: AuthState = {
  accessToken: sessionStorage.getItem('accessToken'),
  refreshToken: sessionStorage.getItem('refreshToken'),
  me: null,
  status: 'idle',
};

/**
 * 例外オブジェクトからユーザ向けのエラーメッセージを抽出する。
 * @param err 任意の例外
 * @returns 表示用のメッセージ
 */
const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    // API が { message: string } を返す前提の取り出し（存在しなければ fallback）
    const data = err.response?.data as { message?: unknown } | undefined;
    if (typeof data?.message === 'string') return data.message;
    if (typeof err.message === 'string') return err.message;
    return 'Request failed';
  }
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const m = (err as { message?: unknown }).message;
    if (typeof m === 'string') return m;
  }
  return 'Unknown error';
}

/**
 * /auth/login を呼び出し Tokens を取得する AsyncThunk。
 * 失敗時は `rejectWithValue` で文字列メッセージを返す。
 */
export const loginThunk = createAsyncThunk<
  Tokens,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const res = await api.post<Tokens>('/auth/login', body);
    return res.data;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * /users/me を呼び出し User を取得する AsyncThunk。
 * 失敗時は `rejectWithValue` で文字列メッセージを返す。
 */
export const fetchMeThunk = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/me',
  async (_: void, { rejectWithValue }) => {
    try {
      const res = await api.get<User>('/users/me');
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/**
 * 認証用 Slice。ログアウト／トークン設定の同期的 reducer と、各 Thunk の状態遷移を定義。
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * ログアウト処理。
     * ステートと sessionStorage からトークンを削除し、ユーザ情報をクリアーする。
     */
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.me = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    /**
     * トークンを手動で設定するユーティリティー。
     * @param action 新しいトークンペア
     */
    setTokens(state, action: PayloadAction<Tokens>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      sessionStorage.setItem('accessToken', action.payload.accessToken);
      sessionStorage.setItem('refreshToken', action.payload.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginThunk.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.status = 'idle';
        s.accessToken = a.payload.accessToken;
        s.refreshToken = a.payload.refreshToken;
        sessionStorage.setItem('accessToken', a.payload.accessToken);
        sessionStorage.setItem('refreshToken', a.payload.refreshToken);
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.status = 'error';
        s.error = a.payload ?? 'Login failed';
      })
      // me
      .addCase(fetchMeThunk.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(fetchMeThunk.fulfilled, (s, a) => {
        s.status = 'idle';
        s.me = a.payload;
      })
      .addCase(fetchMeThunk.rejected, (s, a) => {
        s.status = 'error';
        s.error = a.payload ?? 'Failed to fetch profile';
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
