import { AccountData } from './AccountData';

export function removeTransaction(index: number) {
  AccountData.transactions.splice(index, 1);
}
