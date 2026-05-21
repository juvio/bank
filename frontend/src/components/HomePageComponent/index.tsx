'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Card, CircularProgress, Container } from '@mui/material';

import { AccountCard } from '@features/accounts';
import {
  NewTransactionCard,
  TransactionHistoryCard,
} from '@features/transactions';
import { useBankAccountStore } from '@stores';

import {
  BoxAccountCardSx,
  BoxContainerHistoryCardSx,
  BoxContainerSx,
  BoxNewTransactionCard,
  BoxTransactionHistoryCardSx,
  ContainerSx,
} from './styles';
import { HomePageComponentProps } from './types';
import Link from 'next/link';

const GraphicMFEPage = dynamic(() => import('../@views/GraphicMFEClient'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress size={28} />
    </Box>
  ),
});

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
    <Container
      maxWidth={false}
      sx={ContainerSx}
      role="main"
      aria-labelledby="homepage-title"
    >
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
          Página Inicial do Banco - {fullname}
        </h1>
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
            <Link style={{ textDecoration: 'none' }} href="/graphicApp">
              <GraphicMFEPage data={transactions} />
            </Link>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
