import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../src/pages/Dashboard';

const fetchMe = jest.fn();
const doLogout = jest.fn();

// useDashboard モック化
jest.mock('../../src/pages/useDashboard', () => ({
  __esModule: true,
  default: () => ({
    state: { me: { id: 'user_1', email: 'demo@example.com' }, token: 'abc' },
    callBack: { fetchMe, doLogout },
  }),
}));

describe('Dashboard component', () => {
  it('ボタン操作で対応するコールバックが呼ばれる', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByRole('button', { name: /fetch/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(fetchMe).toHaveBeenCalled();
    expect(doLogout).toHaveBeenCalled();
  });
});
