'use client';

import { removeTransaction } from '@/utils';
import { Box, Button, Typography } from '@mui/material';

type TransactionCardProps = {
  id: number;
  type: string; //criar enum
  value: number;
};

export default function TransactionCard({
  id,
  type,
  value,
}: TransactionCardProps) {
  return (
    // Work in progress
    <Box
      sx={{
        width: '75%',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `linear-gradient(135deg, primary.main 0%, secondary.main 100%)`,
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        m: 2,
      }}
    >
      <Typography>{value}</Typography>
      <Typography>{type}</Typography>
      <Button>Deletar</Button>
      <Button>Editar</Button>
    </Box>
  );
}
