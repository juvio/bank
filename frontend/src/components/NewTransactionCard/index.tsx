'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import { transactionTypes } from '@/types';
import { NewTransaction } from '@/types/new-transaction.type';
import {
  BoxTextFieldSx,
  CardActionsSx,
  CardContentSx,
  CardWrapperSx,
} from './styles';

export default function NewTransactionCard() {
  const router = useRouter();
  const {
    transactions,
    setTransaction,
    transactionShouldReset,
    resetTransaction,
  } = useBankAccountStore();
  const { setAddModal, setEditModal, setDeleteModal } = useModalStore();
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    id: transactions.length + 1,
    type: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleOpenModal = () => {
    setTransaction({
      id: 0,
      type: newTransaction.type,
      amount: Number(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
    });

    setEditModal(false);
    setDeleteModal(false);
    setAddModal(true);
    router.push('/transaction');
  };

  useEffect(() => {
    if (transactionShouldReset)
      setNewTransaction({
        id: transactions.length + 1,
        type: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
  }, [transactionShouldReset, transactions.length]);

  return (
    <Card sx={CardWrapperSx} role="region" aria-labelledby="new-transaction-title">
      <CardContent sx={CardContentSx}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          id="new-transaction-title"
        >
          Nova Transação
        </Typography>
        <Box
          component="form"
          sx={BoxTextFieldSx}
          aria-labelledby="new-transaction-title"
        >
          <TextField
            select
            label="Tipo de Transação"
            value={newTransaction.type}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, type: e.target.value })
            }
            fullWidth
            required
          >
            {transactionTypes.map((option, index) => (
              <MenuItem
                key={`new-${option.value}-${index}`}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Valor"
            type="number"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                amount: e.target.value,
              })
            }
            fullWidth
            required
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
            }}
          />
          <TextField
            label="Data"
            type="date"
            value={newTransaction.date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, date: e.target.value })
            }
            fullWidth
            required
          />
          <TextField
            label="Descrição"
            value={newTransaction.description}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                description: e.target.value,
              })
            }
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </CardContent>
      <CardActions sx={CardActionsSx}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleOpenModal}
          disabled={
            !newTransaction.type ||
            !newTransaction.amount ||
            !newTransaction.date
          }
        >
          Criar Transação
        </Button>
      </CardActions>
    </Card>
  );
}
