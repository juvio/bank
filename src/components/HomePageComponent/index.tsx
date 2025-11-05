'use client';

import { Box, Container } from '@mui/material';

import AccountCard from '@/components/AccountCard';
import NewTransactionCard from '@/components/NewTransactionCard';
import TransactionHistoryCard from '@/components/TransactionHistoryCard';
import { useBankAccountStore } from '@/stores/useBankAccountStore';

import mock from '@/mocks/mock.json';
import {
  BoxAccountCardSx,
  BoxContainerHistoryCardSx,
  BoxContainerSx,
  BoxNewTransactionCard,
  BoxTransactionHistoryCardSx,
  ContainerSx,
} from './styles';

export default function HomePage() {
  const { transactions } = useBankAccountStore();
  const initialBalance = (mock as unknown as { account: { balance: number } })
    .account.balance;

  const fullName = (mock as unknown as { account: { userName: string } })
    .account.userName;
  const accountBalance = transactions.reduce((balance, transaction) => {
    if (transaction.type === 'deposit') {
      return balance + transaction.amount;
    } else if (
      transaction.type === 'withdraw' ||
      transaction.type === 'payment' ||
      transaction.type === 'transfer'
    ) {
      return balance - transaction.amount;
    }
    return balance;
  }, initialBalance);

  return (
    <Container maxWidth='lg' sx={ContainerSx}>
      <Box sx={BoxContainerSx}>
        <Box sx={BoxAccountCardSx}>
          <AccountCard accountBalance={accountBalance} accountName={fullName} />
        </Box>

        <Box sx={BoxContainerHistoryCardSx}>
          <Box sx={BoxTransactionHistoryCardSx}>
            <TransactionHistoryCard />
          </Box>
          <Box sx={BoxNewTransactionCard}>
            <NewTransactionCard />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
