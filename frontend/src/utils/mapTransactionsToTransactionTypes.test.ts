import { describe, expect, it } from 'vitest';
import type { Transactions } from '@types';
import { mapTransactionsToTransactionTypes } from './mapTransactionsToTransactionTypes';

describe('mapTransactionsToTransactionTypes', () => {
  it('maps API transactions to the app transaction shape', () => {
    const transactions: Transactions = [
      {
        id: '42',
        accountId: '7',
        type: 'transfer',
        value: 150.75,
        date: '2026-05-18',
        from: 'Conta origem',
        to: 'Conta destino',
        anexo: 'comprovante.pdf',
        urlAnexo: '/uploads/comprovante.pdf',
      },
    ];

    expect(mapTransactionsToTransactionTypes(transactions)).toEqual([
      {
        id: 42,
        type: 'transfer',
        amount: 150.75,
        description: 'Conta origem para Conta destino',
        date: '2026-05-18',
        attachment: 'comprovante.pdf',
        attachmentUrl: '/uploads/comprovante.pdf',
      },
    ]);
  });
});
