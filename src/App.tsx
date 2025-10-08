/**
 * アプリケーションのルート。
 * - ルーティング設定
 * - 初回マウント時に /users/me を試行（トークン復元時のプロファイル再取得）
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import type { AppDispatch } from './store';
import ProtectedRoute from './components/ProtectedRoute';
import { fetchMeThunk } from './features/auth/authSlice';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/** ルートコンポーネント */
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => { dispatch(fetchMeThunk()); }, [dispatch]);

  return (
    <BrowserRouter>
      <nav><Link to="/">Home</Link> | <Link to="/login">Login</Link></nav>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
