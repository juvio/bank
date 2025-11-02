'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import { transactionTypes } from '@/types';
import { NewTransaction } from '@/types/new-transaction.type';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';

interface ModalComponentProps {
  title?: string;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

interface EditTransaction {
  type: string;
  amount: number;
  id: number;
  description?: string;
}

export default function ModalComponent({
  title = 'Confirmação',
  content = 'Tem certeza que deseja fazer esta operação?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ModalComponentProps) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { editModal, addModal, setAddModal, setEditModal } = useModalStore();
  const {
    transaction,
    addTransaction,
    resetTransaction,
    editTransaction,
    transactions,
  } = useBankAccountStore();
  const [newTransaction, setNewTransaction] = useState<
    Partial<EditTransaction>
  >({});

  function onDismiss() {
    setOpen(false);
    router.back();
  }

  const handleAddTransaction = () => {
    addTransaction(transaction);
    onDismiss();
    setAddModal(false);
    resetTransaction(true);
  };

  const handleEditTransaction = () => {
    onDismiss();
    setEditModal(false);
    editTransaction(transaction.id, newTransaction);
  };

  return (
    <Dialog
      open={open}
      onClose={onDismiss}
      aria-labelledby='modal-title'
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            width: { xs: '90%', sm: 480 },
            maxWidth: 480,
            p: 0,
          },
        },
      }}
    >
      {editModal && (
        <>
          {' '}
          <DialogTitle
            id='modal-title'
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              pb: 2,
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{ fontWeight: 'bold' }}
            >
              Editar transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            <TextField
              select
              label='Tipo de Transação'
              value={newTransaction.type ?? transaction.type}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, type: e.target.value })
              }
              fullWidth
              sx={{ pt: 4 }}
            >
              {transactionTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label='Valor'
              type='number'
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: Number(e.target.value),
                })
              }
              fullWidth
              sx={{ pt: 4 }}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
              }}
            />
            <TextField
              label='Descrição'
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
              sx={{ pt: 4 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={onDismiss}
              variant='outlined'
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleEditTransaction}
              variant='contained'
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${
                    theme.palette.primary.dark || theme.palette.primary.main
                  } 0%, ${
                    theme.palette.secondary.dark || theme.palette.secondary.main
                  } 100%)`,
                },
              }}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
      {addModal && (
        <>
          {' '}
          <DialogTitle
            id='modal-title'
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              pb: 2,
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{ fontWeight: 'bold' }}
            >
              {title}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            {typeof content === 'string' ? (
              <Typography
                variant='body1'
                sx={{
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  m: 2,
                }}
              >
                {content}
              </Typography>
            ) : (
              content
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={onDismiss}
              variant='outlined'
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleAddTransaction}
              variant='contained'
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${
                    theme.palette.primary.dark || theme.palette.primary.main
                  } 0%, ${
                    theme.palette.secondary.dark || theme.palette.secondary.main
                  } 100%)`,
                },
              }}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
