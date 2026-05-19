import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '@utils';
import {
  createTransactionService,
  deleteTransactionService,
  fetchTransactionsService,
  updateTransactionService,
} from '../transactionService';
import type { TransactionType } from '@types';

vi.mock('@utils', () => ({
  api: {
    get: vi.fn(),
    postFormData: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('transactionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches a paginated transactions page', async () => {
    const response = { data: [], nextPage: null };
    vi.mocked(api.get).mockResolvedValueOnce(response);

    const result = await fetchTransactionsService(2);

    expect(api.get).toHaveBeenCalledWith('/api/transactions?page=2&limit=10');
    expect(result).toEqual(response);
  });

  it('creates a transaction using FormData payload', async () => {
    const transaction = {
      id: 1,
      type: 'deposit',
      amount: 100,
      description: 'PIX recebido',
      date: '2026-05-17',
    } as TransactionType;
    const response = { result: transaction };
    vi.mocked(api.postFormData).mockResolvedValueOnce(response);

    const result = await createTransactionService(transaction);

    expect(api.postFormData).toHaveBeenCalledWith(
      '/api/transactions',
      expect.any(FormData)
    );
    expect(result).toEqual(response);
  });

  it('updates a transaction with editable fields only', async () => {
    const response = {
      result: {
        id: 1,
        type: 'payment',
        amount: 50,
        description: 'Conta',
        date: '2026-05-17',
      } as TransactionType,
    };
    vi.mocked(api.put).mockResolvedValueOnce(response);

    const result = await updateTransactionService(1, response.result);

    expect(api.put).toHaveBeenCalledWith('/api/transactions/1', {
      type: 'payment',
      amount: 50,
      description: 'Conta',
      date: '2026-05-17',
    });
    expect(result).toEqual(response);
  });

  it('deletes a transaction by id', async () => {
    vi.mocked(api.delete).mockResolvedValueOnce(undefined);

    await deleteTransactionService(7);

    expect(api.delete).toHaveBeenCalledWith('/api/transactions/7');
  });
});
