'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

const TransactionContent = dynamic(
  () => import('@features/transactions/components/TransactionContent'),
  {
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={28} />
      </Box>
    ),
  }
);

export default function TransactionPage() {
  return <TransactionContent />;
}
