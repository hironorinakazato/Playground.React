/**
 * 認証必須のルートを保護するラッパー。
 * アクセストークンが無い場合は `/login` へリダイレクトする。
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

/**
 * 認証チェック付きアウトレット。
 * @returns 認証済みなら子ルート、未認証なら `/login` へ遷移する。
 */
const ProtectedRoute = () => {
  const token = useSelector((s: RootState) => s.auth.accessToken);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
