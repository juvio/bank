import type { TransactionType } from '@types';
import { api, sanitizeTextInput } from '@utils';

export type TransactionsPageResponse = {
  data: TransactionType[];
  nextPage: number | null;
  attachment?: unknown;
};

export async function fetchTransactionsService(
  pageToFetch = 0,
  limit = 10
): Promise<TransactionsPageResponse> {
  return api.get(`/api/transactions?page=${pageToFetch}&limit=${limit}`);
}

export async function createTransactionService(
  newTransaction: TransactionType
): Promise<{ result: TransactionType }> {
  const formData = new FormData();
  formData.append('type', newTransaction.type);
  formData.append('amount', newTransaction.amount.toString());
  formData.append('description', sanitizeTextInput(newTransaction.description));
  formData.append('date', newTransaction.date);

  if (newTransaction.attachment) {
    formData.append('attachment', newTransaction.attachment);
  }

  return api.postFormData('/api/transactions', formData);
}

export async function deleteTransactionService(id: number): Promise<void> {
  await api.delete(`/api/transactions/${id}`);
}

export async function updateTransactionService(
  id: number,
  updatedItem: Partial<TransactionType>
): Promise<{ result: TransactionType }> {
  return api.put(`/api/transactions/${id}`, {
    type: updatedItem.type,
    amount: updatedItem.amount,
    description:
      updatedItem.description === undefined
        ? undefined
        : sanitizeTextInput(updatedItem.description),
    date: updatedItem.date,
  });
}
