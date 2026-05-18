'use client';

import { useMemo, useState } from 'react';
import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { transactionTypes } from '@types';
import type { TransactionType } from '@types';

function filterByType(
  transactions: TransactionType[],
  filterType: string,
): TransactionType[] {
  if (filterType === 'all') return transactions;
  return transactions.filter((transaction) => transaction.type === filterType);
}

function filterByPeriod(
  transactions: TransactionType[],
  filterPeriod: string,
): TransactionType[] {
  if (filterPeriod === 'all') return transactions;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return transactions.filter((transaction) => {
    let transactionDate: Date;

    if (
      typeof transaction.date === 'string' &&
      transaction.date.includes('-')
    ) {
      const [datePart] = transaction.date.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      transactionDate = new Date(year, month - 1, day);
    } else {
      transactionDate = new Date(transaction.date);
    }

    const normalizedTransactionDate = new Date(
      transactionDate.getFullYear(),
      transactionDate.getMonth(),
      transactionDate.getDate(),
    );

    switch (filterPeriod) {
      case 'today':
        return normalizedTransactionDate.getTime() === today.getTime();
      case 'week': {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return normalizedTransactionDate >= weekAgo;
      }
      case 'month': {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return normalizedTransactionDate >= monthAgo;
      }
      case 'year': {
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        return normalizedTransactionDate >= yearAgo;
      }
      default:
        return true;
    }
  });
}

function matchesSearchTerm(
  transaction: TransactionType,
  searchLower: string,
): boolean {
  const typeLabel =
    transactionTypes
      .find((t) => t.value === transaction.type)
      ?.label?.toLowerCase() || '';
  const matchType =
    typeLabel.includes(searchLower) ||
    transaction.type.toLowerCase().includes(searchLower);

  const amountStr = transaction.amount.toString();
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(transaction.amount)
    .toLowerCase();
  const matchAmount =
    amountStr.includes(searchLower) || formattedAmount.includes(searchLower);

  return matchType || matchAmount;
}

function filterBySearchTerm(
  transactions: TransactionType[],
  searchTerm: string,
): TransactionType[] {
  if (searchTerm.trim() === '') return transactions;

  const searchLower = searchTerm.toLowerCase();
  return transactions.filter((transaction) =>
    matchesSearchTerm(transaction, searchLower),
  );
}

export function useTransactionContent() {
  const { transactions, page, hasMore, isLoading, fetchTransactions } =
    useBankAccountStore();
  const [filterType, setFilterType] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    filtered = filterByType(filtered, filterType);
    filtered = filterByPeriod(filtered, filterPeriod);
    filtered = filterBySearchTerm(filtered, searchTerm);

    return filtered;
  }, [transactions, filterType, filterPeriod, searchTerm]);

  const loadMore = () => {
    if (!isLoading) {
      fetchTransactions(page + 1);
    }
  };

  const handleClearFilters = () => {
    setFilterType('all');
    setFilterPeriod('all');
    setSearchTerm('');
  };

  const isInitialLoading = isLoading && transactions.length === 0;
  const hasFilteredTransactions = filteredTransactions.length > 0;
  const canLoadMore =
    hasMore &&
    filterType === 'all' &&
    filterPeriod === 'all' &&
    searchTerm === '';
  const emptyStateMessage =
    transactions.length > 0
      ? 'Nenhuma transação corresponde aos filtros aplicados. Tente ajustar os critérios de busca.'
      : 'Suas transações aparecerão aqui quando você realizar movimentações na sua conta.';

  return {
    canLoadMore,
    emptyStateMessage,
    filterPeriod,
    filterType,
    filteredTransactions,
    handleClearFilters,
    hasMore,
    hasFilteredTransactions,
    isInitialLoading,
    isLoading,
    loadMore,
    page,
    searchTerm,
    setFilterPeriod,
    setFilterType,
    setSearchTerm,
    transactions,
  };
}
