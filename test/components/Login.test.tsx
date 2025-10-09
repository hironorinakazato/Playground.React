import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../src/pages/Login';

// useLogin をモック化
const handleSubmit = jest.fn();
jest.mock('../../src/pages/useLogin', () => ({
  __esModule: true,
  default: () => ({
    state: { email: 'e', password: 'p', authStatus: 'idle', authError: undefined },
    callBacks: { setEmail: jest.fn(), setPassword: jest.fn(), handleSubmit },
  }),
}));

describe('Login component', () => {
  it('送信で handleSubmit が呼ばれる', () => {
    render(<Login />);

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeInTheDocument();

    const form = button.closest('form');
    expect(form).not.toBeNull();

    fireEvent.submit(form!);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
