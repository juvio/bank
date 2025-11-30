'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
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
  const { transactions, setTransaction, transactionShouldReset } =
    useBankAccountStore();
  const { setAddModal, setEditModal, setDeleteModal } = useModalStore();
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    id: transactions.length + 1,
    type: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<string>('');

  const isAmountValid = (): boolean => {
    if (!newTransaction.amount) {
      return false;
    }
    const amountNum = Number(newTransaction.amount);
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      return false;
    }
    return true;
  };

  const handleAmountBlur = () => {
    let errorMsg = '';

    if (!newTransaction.amount) {
      errorMsg = 'Valor obrigatório';
    } else {
      const amountNum = Number(newTransaction.amount);
      if (Number.isNaN(amountNum) || amountNum <= 0) {
        errorMsg = 'Insira um valor válido';
      }
    }

    setErrors(errorMsg);
  };

  const isFormValid = useCallback((): boolean => {
    const amountValid = isAmountValid();
    const dateValid = newTransaction.date !== '';
    const typeValid = newTransaction.type !== '';

    return amountValid && dateValid && typeValid;
  }, [newTransaction]);

  const handleDateChange = (dateValue: Dayjs | null) => {
    const dateString = dateValue ? dateValue.format('YYYY-MM-DD') : '';

    setNewTransaction((prev) => ({
      ...prev,
      date: dateString,
    }));
  };

  const handleOpenModal = () => {
    if (!isFormValid()) return;

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
    if (transactionShouldReset) {
      setNewTransaction({
        id: transactions.length + 1,
        type: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setErrors('');
    }
  }, [transactionShouldReset, transactions.length]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Card sx={CardWrapperSx}>
        <CardContent sx={CardContentSx}>
          <Typography variant="h6" component="h2" gutterBottom>
            Nova Transação
          </Typography>
          <Box component="form" sx={BoxTextFieldSx}>
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
              onBlur={() => handleAmountBlur()}
              error={Boolean(errors)}
              helperText={errors}
            />
            <DesktopDatePicker
              label="Data"
              value={dayjs(newTransaction.date)}
              onChange={handleDateChange}
              maxDate={dayjs()}
              disableFuture
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                },
              }}
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
            disabled={!isFormValid()}
          >
            Criar Transação
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  );
}
