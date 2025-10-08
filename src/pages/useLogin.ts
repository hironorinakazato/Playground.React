/**
 * ログイン画面のビジネスロジック。
 * - Redux から認証状態とエラーを取得
 * - 入力用のローカル state（email / password）を保持
 * - submit 時に loginThunk → fetchMeThunk を順に dispatch
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk, fetchMeThunk } from '../features/auth/authSlice';
import type { AppDispatch, RootState } from '../store';

/**
 * ログイン用カスタムフック。
 * @returns state とコールバックを返す
 */
const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const authStatus = useSelector((s: RootState) => s.auth.status);
  const authError = useSelector((s: RootState) => s.auth.error);
  const [email, setEmail] = React.useState('demo@example.com');
  const [password, setPassword] = React.useState('password');

  /**
   * ログイン処理を実行する。
   * 成功時はプロフィールを取得し、ダッシュボードへ遷移する。
   */
  const handleSubmit = async () => {
    const res = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(res)) {
      await dispatch(fetchMeThunk());
      nav('/', { replace: true });
    }
  };

  return {
    state: { email, password, authStatus, authError },
    callBacks: { handleSubmit, setEmail, setPassword },
  };
};

export default useLogin;
