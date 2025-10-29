import { TransactionType } from './transaction.type';

export type AccountDataType = {
  customer: {
    name: string;
  };
  transactions: TransactionType[];
};
