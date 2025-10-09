import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/authSlice';
import useLogin from '../../src/pages/useLogin';

// react-router の navigate をモック
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: jest.fn() };
});

// axios クライアントをモック（thunk が成功するよう返す）
jest.mock('../../src/api/client', () => ({
  __esModule: true,
  default: {
    post: jest.fn().mockResolvedValue({
      data: { accessToken: 'a', refreshToken: 'b' },
    }),
    get: jest.fn().mockResolvedValue({
      data: { id: 'user_1', email: 'demo@example.com' },
    }),
  },
}));

// hook を使うための最小ハーネス
function Harness() {
  const h = useLogin();
  (globalThis as unknown as { __hook: ReturnType<typeof useLogin> }).__hook = h;
  return <div />;
}

describe('useLogin', () => {
  it('submit 成功で / へ navigate する', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    const navigate = jest.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Harness />
        </MemoryRouter>
      </Provider>,
    );

    const { callBacks } = (globalThis as unknown as {
      __hook: ReturnType<typeof useLogin>;
    }).__hook;

    await act(async () => {
      await callBacks.handleSubmit();
    });

    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
