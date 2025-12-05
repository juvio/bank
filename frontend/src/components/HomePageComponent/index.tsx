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
import { useAuthStore } from '@/stores/useAuthStore';

export default function HomePage() {
  const { transactions, balance, balanceNeedsUpdate } = useBankAccountStore();
  const { user } = useAuthStore();
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

  const fullName = user?.username ?? '';

  return (
    <Container maxWidth="lg" sx={ContainerSx} role="main" aria-labelledby="homepage-title">
      <Box sx={BoxContainerSx}>
        <h1
          id="homepage-title"
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          Página Inicial do Banco - {fullName}
        </h1>
        <Box sx={BoxAccountCardSx}>
          <AccountCard accountBalance={balance} accountName={fullName} />
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
