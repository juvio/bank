'use client';

import { useEffect } from 'react';
import { Box, Container } from '@mui/material';

import AccountCard from '@/components/AccountCard';
import NewTransactionCard from '@/components/NewTransactionCard';
import TransactionHistoryCard from '@/components/TransactionHistoryCard';
import { useBankAccountStore } from '@/stores/useBankAccountStore';

import {
  BoxAccountCardSx,
  BoxContainerHistoryCardSx,
  BoxContainerSx,
  BoxNewTransactionCard,
  BoxTransactionHistoryCardSx,
  ContainerSx,
} from './styles';

export default function HomePage({ fullname }: { fullname: string }) {
  const { transactions, balance, balanceNeedsUpdate } = useBankAccountStore();
  const fetchTransactions = useBankAccountStore(
    (state) => state.fetchTransactions
  );
  const fetchBalance = useBankAccountStore((state) => state.fetchBalance);

  useEffect(() => {
    if (transactions.length === 0) {
      fetchTransactions(0);
    }

    if (balanceNeedsUpdate || balance === 0) {
      fetchBalance();
    }
  }, [
    transactions.length,
    balanceNeedsUpdate,
    balance,
    fetchTransactions,
    fetchBalance,
  ]);

  return (
    <Container maxWidth='lg' sx={ContainerSx}>
      <Box sx={BoxContainerSx}>
        <Box sx={BoxAccountCardSx}>
          <AccountCard accountBalance={300} accountName={fullname} />
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
