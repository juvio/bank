import { Typography } from '@mui/material';
import { AccountData } from '../../../utils/AccountData';
import TransactionCard from '@/components/TransactionCard';

export default function TransactionPage() {
  return (
    <>
      <Typography>Confira aqui suas transações</Typography>
      {AccountData.transactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          id={transaction.id}
          type={transaction.type}
          value={transaction.value}
        />
      ))}
    </>
  );
}
