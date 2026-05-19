import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AccountCard } from '../AccountCard';
import type { AccountCardViewProps } from '../AccountCard';

const makeProps = (
  overrides: Partial<AccountCardViewProps> = {},
): AccountCardViewProps => ({
  accountBalance: 1250.75,
  accountName: 'Carolina Silva',
  firstName: 'Carolina',
  formattedBalance: 'R$ 1.250,75',
  handleToggleBalance: vi.fn(),
  showBalance: true,
  ...overrides,
});

describe('AccountCard', () => {
  it('renders the account greeting and formatted balance', () => {
    render(<AccountCard {...makeProps()} />);

    expect(
      screen.getByRole('region', { name: /carolina/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/conta corrente/i)).toBeInTheDocument();
    expect(screen.getByText(/1\.250,75/)).toBeInTheDocument();
  });

  it('toggles balance visibility', () => {
    const handleToggleBalance = vi.fn();

    render(
      <AccountCard
        {...makeProps({
          handleToggleBalance,
          showBalance: false,
        })}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /mostrar saldo/i }));

    expect(screen.queryByText(/1\.250,75/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /mostrar saldo/i }),
    ).toBeInTheDocument();
    expect(handleToggleBalance).toHaveBeenCalledTimes(1);
  });
});
