'use client';

import { Box, Container } from '@mui/material';
import AccountCard from '../AccountCard';
import TransactionHistoryCard from '../TransactionHistoryCard';
import NewTransactionCard from '../NewTransactionCard';

export default function HomePageComponent() {
  const accountBalance = 2543.87;

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AccountCard accountBalance={accountBalance} />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
            <TransactionHistoryCard />
          </Box>
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            <NewTransactionCard />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
