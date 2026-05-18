import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { formatDate } from '@/utils/date';
import { TransactionMapper } from '@types';
import type { Transactions } from '@types';

export function useTransactionHistoryCard(propTransactions: Transactions) {
  void propTransactions;

  const { transactions: storeTransactions } = useBankAccountStore();
  const recentTransactions = storeTransactions.slice(0, 10).map((transaction) => ({
    id: transaction.id,
    date: formatDate(transaction.date),
    type: TransactionMapper[transaction.type],
    description: transaction.description,
    amount: `${transaction.type === 'deposit' ? '+' : '-'}R$ ${transaction.amount
      .toFixed(2)
      .replace('.', ',')}`,
    amountColor: transaction.type === 'deposit' ? 'success.main' : 'error.main',
  }));

  return { recentTransactions };
}
