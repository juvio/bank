'use client';

import { useModalStore } from '@/stores/useModalStore';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

type TransactionCardProps = {
  id: number;
  type: string; //criar enum
  value: number;
  removeTransaction: (id: number) => void;
};

export default function TransactionCard({
  id,
  type,
  value,
  removeTransaction,
}: TransactionCardProps) {
  const { setEditModal } = useModalStore();
  return (
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
      <Button onClick={() => removeTransaction(id)}>Deletar</Button>

      <Link href='/transaction'>
        <Button onClick={() => setEditModal(true)}>Editar</Button>
      </Link>
    </Box>
  );
}
