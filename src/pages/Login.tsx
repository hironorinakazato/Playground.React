/**
 * ログイン画面（UI コンポーネント）。
 */

import React from 'react';
import useLogin from './useLogin';
import css from './Login.module.scss';

/**
 * ログインフォームコンポーネント。
 * @returns JSX.Element
 */
const Login = () => {
  const { state, callBacks } = useLogin();

  /** メールアドレス変更ハンドラー */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callBacks.setEmail(e.target.value);
  };

  /** パスワード変更ハンドラー */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callBacks.setPassword(e.target.value);
  };

  /** フォーム送信ハンドラー */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callBacks.handleSubmit();
  };

  return (
    <main className={css.loginContainer}>
      <h1>Sign in</h1>
      <form className={css.loginForm} onSubmit={handleSubmit}>
        <label>
          Email
          <input value={state.email} onChange={handleEmailChange} type="email" required />
        </label>
        <label>
          Password
          <input value={state.password} onChange={handlePasswordChange} type="password" required />
        </label>
        <button type="submit" disabled={state.authStatus === 'loading'}>
          {state.authStatus === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>
        {state.authError && <p className={css.loginError}>{state.authError}</p>}
        <p className={css.loginNote}>
          Use demo@example.com / password (from the NestJS starter)
        </p>
      </form>
    </main>
  );
};

export default Login;
