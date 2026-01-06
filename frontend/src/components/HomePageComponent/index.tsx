'use client';

import { useEffect } from 'react';
import { Box, Card, Container } from '@mui/material';

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
import { HomePageComponentProps } from './types';
import GraphicMFEPage from '../@views/GraphicMFEClient';
import Link from 'next/link';

export default function HomePage({
  transactions,
  fullname,
}: HomePageComponentProps) {
  const { balance, balanceNeedsUpdate, fetchBalance } = useBankAccountStore();

  useEffect(() => {
    if (balanceNeedsUpdate || balance === 0) {
      fetchBalance();
    }
  }, [balanceNeedsUpdate, balance, fetchBalance]);

  return (
    <Container maxWidth='lg' sx={ContainerSx}>
      <Box sx={BoxContainerSx}>
        <Box sx={BoxAccountCardSx}>
          <AccountCard accountBalance={balance} accountName={fullname} />
        </Box>

        <Box sx={BoxContainerHistoryCardSx}>
          <Box sx={BoxTransactionHistoryCardSx}>
            <TransactionHistoryCard transactions={transactions} />
          </Box>
          <Box sx={BoxNewTransactionCard}>
            <NewTransactionCard />
          </Box>
        </Box>

        <Box>
          <Card>
            <Link style={{ textDecoration: 'none' }} href='/graphicApp'>
              <GraphicMFEPage data={transactions} />
            </Link>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
