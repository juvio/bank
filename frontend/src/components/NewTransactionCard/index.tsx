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
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
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
    attachment: null,
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
      attachment: newTransaction.attachment || undefined,
    });

    setEditModal(false);
    setDeleteModal(false);
    setAddModal(true);
    router.push('/transaction');
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewTransaction({ ...newTransaction, attachment: file });
  };

  const onRemoveFile = () => {
    setNewTransaction({ ...newTransaction, attachment: null });
  };

  useEffect(() => {
    if (transactionShouldReset) {
      setNewTransaction({
        id: transactions.length + 1,
        type: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        attachment: null,
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: newTransaction.attachment ? 0 : 3,
              }}
            >
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                size="small"
                sx={{ flex: 1, textTransform: 'none' }}
              >
                {newTransaction.attachment ? 'Trocar' : 'Anexar'}
                <input
                  type="file"
                  hidden
                  onChange={onFileChange}
                  accept="image/*,.pdf"
                />
              </Button>
              {newTransaction.attachment && (
                <IconButton onClick={onRemoveFile} size="small" color="error">
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
            {newTransaction.attachment && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mt: -1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                📎 {newTransaction.attachment.name}
              </Typography>
            )}
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
