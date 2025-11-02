'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { Typography } from '@mui/material';
import TransactionCard from '../TransactionCard';

export default function TransactionContent() {
  const { transactions, removeTransaction, editTransaction } =
    useBankAccountStore();
  return (
    <>
      <Typography>Confira aqui suas transações</Typography>
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          id={transaction.id}
          type={transaction.type}
          value={transaction.value}
          removeTransaction={removeTransaction}
        />
      ))}
    </>
  );
}
