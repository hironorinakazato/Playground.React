import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { fetchMeThunk, setTokens } from '../../src/features/auth/authSlice';
import useDashboard from '../../src/pages/useDashboard';

// axios クライアントをモック化
jest.mock('../../src/api/client', () => {
  const get = jest.fn().mockResolvedValue({
    data: { id: 'user_1', email: 'demo@example.com' },
  });
  return { __esModule: true, default: { get } };
});

import api from '../../src/api/client';

// hook 実行用の最小ハーネス
function Harness() {
  const h = useDashboard();
  (globalThis as unknown as { __hook: ReturnType<typeof useDashboard> }).__hook = h;
  return <div />;
}

describe('useDashboard', () => {
  it('fetchMe で /users/me を実行し store に me が入る', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <Harness />
      </Provider>,
    );

    const { callBack } = (globalThis as unknown as {
      __hook: ReturnType<typeof useDashboard>;
    }).__hook;

    await act(async () => {
      callBack.fetchMe();
      await Promise.resolve();
    });

    expect((api as unknown as { get: jest.Mock }).get).toHaveBeenCalledWith('/users/me');

    const state = store.getState();
    expect(state.auth.me).toEqual({ id: 'user_1', email: 'demo@example.com' });
  });

  it('doLogout でトークンと me がクリアされる', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    // preloadedState を使わず、アクションで状態を作る
    store.dispatch(setTokens({ accessToken: 'token', refreshToken: 'refresh' }));
    store.dispatch({
      type: fetchMeThunk.fulfilled.type,
      payload: { id: 'user_1', email: 'demo@example.com' },
    });

    render(
      <Provider store={store}>
        <Harness />
      </Provider>,
    );

    const { callBack } = (globalThis as unknown as {
      __hook: ReturnType<typeof useDashboard>;
    }).__hook;

    act(() => {
      callBack.doLogout();
    });

    const state = store.getState();
    expect(state.auth.accessToken).toBeNull();
    expect(state.auth.refreshToken).toBeNull();
    expect(state.auth.me).toBeNull();
  });
});
