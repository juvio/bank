import { TransactionType } from '@/types/transaction.type';
import { AccountData } from './AccountData';

export function addTransaction(transaction: TransactionType) {
  return AccountData.transactions.push(transaction);
}
