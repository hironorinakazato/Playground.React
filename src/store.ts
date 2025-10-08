/**
 * Redux Store の初期化。
 * - devTools を有効化
 * - 現時点では `auth` のみを登録
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

/** 共有 Redux ストア */
export const store = configureStore({
  reducer: { auth: authReducer },
  devTools: true,
});

/** ルートステート型 */
export type RootState = ReturnType<typeof store.getState>;

/** Dispatch 型 */
export type AppDispatch = typeof store.dispatch;
