import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTransactionHistoryCard } from '../useTransactionHistoryCard';
import type { TransactionType } from '@types';

const mocks = vi.hoisted(() => ({
  bankState: {
    transactions: [] as TransactionType[],
  },
}));

vi.mock('@/stores/useBankAccountStore', () => ({
  useBankAccountStore: () => ({
    transactions: mocks.bankState.transactions,
  }),
}));

describe('useTransactionHistoryCard', () => {
  beforeEach(() => {
    mocks.bankState.transactions = [];
  });

  it('maps the first ten store transactions to history entries', () => {
    mocks.bankState.transactions = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      type: index % 2 === 0 ? 'deposit' : 'payment',
      amount: index + 10,
      description: `Transacao ${index + 1}`,
      date: '2026-05-18',
    }));

    const { result } = renderHook(() => useTransactionHistoryCard([]));

    expect(result.current.recentTransactions).toHaveLength(10);
    expect(result.current.recentTransactions[0]).toMatchObject({
      id: 1,
      description: 'Transacao 1',
      amount: '+R$ 10,00',
      amountColor: 'success.main',
    });
    expect(result.current.recentTransactions[1]).toMatchObject({
      id: 2,
      type: 'Pagamento',
      amount: '-R$ 11,00',
      amountColor: 'error.main',
    });
  });
});
