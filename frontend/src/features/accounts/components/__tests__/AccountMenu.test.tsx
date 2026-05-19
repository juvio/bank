import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AccountMenu from '../AccountMenu';

const { logoutMock, pushMock } = vi.hoisted(() => ({
  logoutMock: vi.fn(),
  pushMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('@/stores/useAuthStore', () => ({
  useAuthStore: (selector: (state: { logout: () => void }) => unknown) =>
    selector({ logout: logoutMock }),
}));

describe('AccountMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation items and user avatar', () => {
    const onTransactionsClick = vi.fn();

    render(
      <AccountMenu
        userName='Carolina Silva'
        avatarContent='CS'
        navItems={[
          { id: 'home', label: 'Inicio' },
          {
            id: 'transactions',
            label: 'Transacoes',
            onClick: onTransactionsClick,
          },
        ]}
        menuItems={[{ id: 'profile', label: 'Perfil' }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Inicio' }));
    fireEvent.click(screen.getByRole('button', { name: 'Transacoes' }));

    expect(screen.getByText('Carolina Silva')).toBeInTheDocument();
    expect(screen.getByText('CS')).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith('/home');
    expect(onTransactionsClick).toHaveBeenCalledTimes(1);
  });

  it('opens account actions and runs logout flow', () => {
    render(
      <AccountMenu
        userName='Carolina Silva'
        avatarContent='CS'
        menuItems={[{ id: 'logout', label: 'Sair' }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /configura/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /sair/i }));

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});
