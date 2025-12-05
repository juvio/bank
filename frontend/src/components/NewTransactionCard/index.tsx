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
  IconButton,
} from '@mui/material';
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

  const handleOpenModal = () => {
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
    if (transactionShouldReset)
      setNewTransaction({
        id: transactions.length + 1,
        type: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        attachment: null,
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
          <Box sx={{ display: 'flex', gap: 2 }}>
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
              required
              sx={{ flex: 1 }}
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
              required
              sx={{ flex: 1 }}
            />
          </Box>
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
            rows={2}
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
      </CardContent>
    </Card>
  );
}
