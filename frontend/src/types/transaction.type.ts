export type TransactionType = {
  id: number;
  type: string;
  amount: number;
  description?: string;
  date: string;
  attachment?: File;
  attachmentUrl?: string;
};
