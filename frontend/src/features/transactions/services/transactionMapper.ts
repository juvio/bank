import type { Transactions, TransactionType } from '@types';

function getTransactionDescription(transaction: Transactions[number]) {
  if (transaction.from && transaction.to) {
    return `${transaction.from} para ${transaction.to}`;
  }

  return transaction.from ?? transaction.to;
}

export function mapTransactionsToTransactionTypes(
  transactions: Transactions,
): TransactionType[] {
  return transactions.map((transaction) => ({
    id: Number(transaction.id),
    type: transaction.type,
    amount: transaction.value,
    description: getTransactionDescription(transaction),
    date: transaction.date,
    attachment: transaction.anexo,
    attachmentUrl: transaction.urlAnexo,
  }));
}
