import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTransactionContent } from '../../hooks/useTransactionContent';
import type { TransactionType } from '@types';

const mocks = vi.hoisted(() => ({
  fetchTransactions: vi.fn(),
  bankState: {
    transactions: [] as TransactionType[],
    page: 0,
    hasMore: true,
    isLoading: false,
  },
}));

vi.mock('@/stores/useBankAccountStore', () => ({
  useBankAccountStore: () => ({
    ...mocks.bankState,
    fetchTransactions: mocks.fetchTransactions,
  }),
}));

const transactions: TransactionType[] = [
  {
    id: 1,
    type: 'deposit',
    amount: 1200,
    description: 'Salario',
    date: '2026-05-18',
  },
  {
    id: 2,
    type: 'payment',
    amount: 150,
    description: 'Conta de luz',
    date: '2026-05-12',
  },
  {
    id: 3,
    type: 'transfer',
    amount: 80,
    description: 'PIX enviado',
    date: '2026-04-10',
  },
  {
    id: 4,
    type: 'withdraw',
    amount: 30,
    description: 'Caixa eletronico',
    date: '2025-01-10',
  },
];

function resetBankState() {
  mocks.bankState.transactions = [...transactions];
  mocks.bankState.page = 0;
  mocks.bankState.hasMore = true;
  mocks.bankState.isLoading = false;
}

describe('useTransactionContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-18T12:00:00'));
    resetBankState();
  });

  it('filters transactions by type, period and search term', () => {
    const { result } = renderHook(() => useTransactionContent());

    expect(result.current.filteredTransactions).toHaveLength(4);

    act(() => {
      result.current.setFilterType('payment');
    });
    expect(result.current.filteredTransactions.map(({ id }) => id)).toEqual([
      2,
    ]);

    act(() => {
      result.current.setFilterType('all');
      result.current.setFilterPeriod('week');
    });
    expect(result.current.filteredTransactions.map(({ id }) => id)).toEqual([
      1,
      2,
    ]);

    act(() => {
      result.current.setFilterPeriod('all');
      result.current.setSearchTerm('1200');
    });
    expect(result.current.filteredTransactions.map(({ id }) => id)).toEqual([
      1,
    ]);
  });

  it('loads the next page only when it is not already loading', () => {
    mocks.bankState.page = 2;
    const { result, rerender } = renderHook(() => useTransactionContent());

    act(() => {
      result.current.loadMore();
    });

    expect(mocks.fetchTransactions).toHaveBeenCalledWith(3);

    mocks.fetchTransactions.mockClear();
    mocks.bankState.isLoading = true;
    rerender();

    act(() => {
      result.current.loadMore();
    });

    expect(mocks.fetchTransactions).not.toHaveBeenCalled();
  });

  it('clears filters and disables pagination while filtering', () => {
    const { result } = renderHook(() => useTransactionContent());

    act(() => {
      result.current.setFilterType('deposit');
      result.current.setFilterPeriod('month');
      result.current.setSearchTerm('1200');
    });

    expect(result.current.canLoadMore).toBe(false);

    act(() => {
      result.current.handleClearFilters();
    });

    expect(result.current.filterType).toBe('all');
    expect(result.current.filterPeriod).toBe('all');
    expect(result.current.searchTerm).toBe('');
    expect(result.current.canLoadMore).toBe(true);
  });

  it('exposes loading and empty states', () => {
    mocks.bankState.transactions = [];
    mocks.bankState.isLoading = true;
    const { result } = renderHook(() => useTransactionContent());

    expect(result.current.isInitialLoading).toBe(true);
    expect(result.current.hasFilteredTransactions).toBe(false);
    expect(result.current.emptyStateMessage).toContain('Suas transa');
  });
});
