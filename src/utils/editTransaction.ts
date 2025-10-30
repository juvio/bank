import { TransactionType } from '@/types/transaction.type';
import { AccountData } from './AccountData';

export function editTransaction(transaction: TransactionType) {
  return AccountData.transactions.push(transaction);
}
