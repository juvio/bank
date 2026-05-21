'use client';

import { formatDate, prepareDisplayText } from '@lib';
import { TransactionMapper } from '@types';
import type { Transactions } from '@types';
import { mapTransactionsToTransactionTypes } from '../services/transactionMapper';

export function useTransactionHistoryCard(propTransactions: Transactions) {
  const transactions = mapTransactionsToTransactionTypes(propTransactions);

  const recentTransactions = transactions
    .slice(0, 10)
    .map((transaction) => ({
      id: transaction.id,
      date: formatDate(transaction.date),
      type: TransactionMapper[transaction.type],
      description: prepareDisplayText(transaction.description),
      amount: `${transaction.type === 'deposit' ? '+' : '-'}R$ ${transaction.amount
        .toFixed(2)
        .replace('.', ',')}`,
      amountColor:
        transaction.type === 'deposit' ? 'success.main' : 'error.main',
    }));

  return { recentTransactions };
}
