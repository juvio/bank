export type TransactionType = {
  id: number;
  type: string;
  amount: number;
  description?: string;
  date: string;
  attachment?: File;
  attachmentUrl?: string;
};

export type Transactions = {
  id: string;
  accountId: string;
  type: 'payment' | 'deposit' | 'withdraw' | 'transfer';
  value: number;
  date: string;
  anexo?: any;
  from?: string;
  to?: string;
  urlAnexo?: string;
}[];
