'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { Typography } from '@mui/material';
import TransactionCard from '../TransactionCard';

export default function TransactionContent() {
  const { transactions } = useBankAccountStore();
  return (
    <>
      <Typography>Confira aqui suas transações</Typography>
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          id={transaction.id}
          type={transaction.type}
          amount={transaction.amount}
          description={transaction.description}
        />
      ))}
    </>
  );
}
