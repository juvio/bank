'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import { TransactionMapper } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

type TransactionCardProps = {
  id: number;
  type: string;
  description?: string;
  amount: number;
};

export default function TransactionCard({
  id,
  type,
  amount,
  description,
}: TransactionCardProps) {
  const { setEditModal } = useModalStore();
  const { transactions, setTransaction } = useBankAccountStore();

  const handleOpenEditModal = () => {
    setTransaction({
      id: id,
      type: type,
      amount: amount,
    });
    setEditModal(true);
  };

  const handleOpenDeleteModal = () => {
    // set delete modal
  };

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
      <Typography>{amount}</Typography>
      <Typography>{TransactionMapper[type]}</Typography>
      <Typography>{description}</Typography>
      <Link href='/transaction'>
        <Button onClick={handleOpenDeleteModal}>Deletar</Button>
      </Link>
      <Link href='/transaction'>
        <Button onClick={handleOpenEditModal}>Editar</Button>
      </Link>
    </Box>
  );
}
