import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import HomePage from '../index';

const { useBankAccountStoreMock } = vi.hoisted(() => ({
  useBankAccountStoreMock: vi.fn(),
}));

vi.mock('@stores', () => ({
  useBankAccountStore: useBankAccountStoreMock,
}));

vi.mock('@features/accounts', () => ({
  AccountCard: ({ accountBalance, accountName }: any) => (
    <div
      data-testid='account-card'
      data-balance={accountBalance}
      data-name={accountName}
    />
  ),
}));

vi.mock('@features/transactions', () => ({
  NewTransactionCard: () => <div data-testid='new-transaction-card' />,
  TransactionHistoryCard: ({ transactions }: any) => (
    <div
      data-testid='transaction-history-card'
      data-count={transactions?.length ?? 0}
    />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock('next/dynamic', () => ({
  default: () => (props: any) => (
    <div data-testid='graphic-mfe' data-count={props.data?.length ?? 0} />
  ),
}));

const mockTransactions = [
  { id: 1, amount: 50 },
  { id: 2, amount: 25 },
];

describe('HomePageComponent', () => {
  const fetchBalance = vi.fn();

  beforeEach(() => {
    fetchBalance.mockClear();

    useBankAccountStoreMock.mockReturnValue({
      balance: 500,
      balanceNeedsUpdate: true,
      fetchBalance,
    });
  });

  it('renders summary cards and triggers balance refresh', async () => {
    render(<HomePage transactions={mockTransactions as any} fullname='Ana' />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('account-card')).toHaveAttribute(
      'data-name',
      'Ana',
    );
    expect(screen.getByTestId('transaction-history-card')).toHaveAttribute(
      'data-count',
      '2',
    );
    expect(screen.getByTestId('new-transaction-card')).toBeInTheDocument();
    expect(screen.getByTestId('graphic-mfe')).toHaveAttribute(
      'data-count',
      '2',
    );

    await waitFor(() => {
      expect(fetchBalance).toHaveBeenCalledTimes(1);
    });
  });
});
