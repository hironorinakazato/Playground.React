/**
 * ダッシュボード画面のビジネスロジック。
 * - Redux からユーザ情報とトークンを取得
 * - fetchMe / logout のアクションを提供
 */

import { useDispatch, useSelector } from 'react-redux';
import { fetchMeThunk, logout } from '../features/auth/authSlice';
import type { AppDispatch, RootState } from '../store';

/**
 * ダッシュボード用カスタムフック。
 * @returns state とコールバックを返す
 */
const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((s: RootState) => s.auth.me);
  const token = useSelector((s: RootState) => s.auth.accessToken);

  /** /users/me を取得する。 */
  const fetchMe = () => {
    dispatch(fetchMeThunk());
  };

  /** ログアウト実行する。 */
  const doLogout = () => {
    dispatch(logout());
  };

  return {
    state: { me, token },
    callBack: { fetchMe, doLogout },
  };
};

export default useDashboard;
