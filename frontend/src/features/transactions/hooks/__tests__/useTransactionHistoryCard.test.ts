import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTransactionHistoryCard } from '../useTransactionHistoryCard';
import type { Transactions } from '@types';

describe('useTransactionHistoryCard', () => {
  it('maps the first ten prop transactions to history entries', () => {
    const transactions: Transactions = Array.from({ length: 12 }, (_, index) => ({
      id: String(index + 1),
      accountId: '1',
      type: index % 2 === 0 ? 'deposit' : 'payment',
      value: index + 10,
      from: `Transacao ${index + 1}`,
      date: '2026-05-18',
    }));

    const { result } = renderHook(() => useTransactionHistoryCard(transactions));

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

  it('keeps a valid empty API response empty', () => {
    const { result } = renderHook(() => useTransactionHistoryCard([]));

    expect(result.current.recentTransactions).toEqual([]);
  });
});
