/**
 * ダッシュボード画面（UI コンポーネント）。
 */

import useDashboard from './useDashboard';
import css from './Dashboard.module.scss';

/**
 * ダッシュボードコンポーネント。
 * @returns JSX.Element
 */
const Dashboard = () => {
  const { state, callBack } = useDashboard();

  /** ユーザ情報を再取得する。 */
  const handleFetchMe = () => {
    callBack.fetchMe();
  };

  /** ログアウトを実行する。 */
  const handleLogout = () => {
    callBack.doLogout();
  };

  return (
    <main className={css.dashboardContainer}>
      <h1>Dashboard</h1>
      <div className={css.dashboardBtnGroup}>
        <button type="button" onClick={handleFetchMe}>Fetch /users/me</button>
        <button type="button" onClick={handleLogout}>Sign out</button>
      </div>
      <section className={css.dashboardSection}>
        <h3>Profile</h3>
        <pre>{JSON.stringify(state.me, null, 2)}</pre>
      </section>
      <section className={css.dashboardSection}>
        <h3>Access Token (shortened)</h3>
        <code className={css.dashboardToken}>
          {state.token ? `${state.token.slice(0, 24)}…` : '(none)'}
        </code>
      </section>
    </main>
  );
};

export default Dashboard;
