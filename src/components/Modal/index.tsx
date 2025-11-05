'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import { transactionTypes } from '@/types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';
import {
  BoxWrapperRemoveSx,
  ButtonCancelTextSx,
  CloseDialogActionSx,
  CloseModalTextSx,
  ConfirmTextSx,
  DescriptionBoxSx,
  DescriptionTitleSx,
  DialogActionsSx,
  DialogContentWrapperSx,
  DialogTitleSx,
  DialogTitleTypographySx,
  SlotPropsSx,
  TextFieldSx,
  TransactionDescriptionSx,
  TransactionDescriptionTypographySx,
  TypographyBoxRemoveSx,
  TypographyContentSx,
  TypographyTypeOptionsSx,
  TypographyTypeSx,
} from './styles';

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
  const [open, setOpen] = useState(true);
  const {
    editModal,
    addModal,
    setAddModal,
    setEditModal,
    deleteModal,
    setDeleteModal,
    viewModal,
  } = useModalStore();
  const {
    transaction,
    addTransaction,
    resetTransaction,
    editTransaction,
    removeTransaction,
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

  const handleRemoveTransaction = () => {
    onDismiss();
    setDeleteModal(false);
    removeTransaction(transaction.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onDismiss}
      aria-labelledby='modal-title'
      key={
        editModal
          ? 'edit'
          : addModal
          ? 'add'
          : deleteModal
          ? 'delete'
          : viewModal
          ? 'view'
          : 'modal'
      }
      slotProps={{
        paper: {
          sx: SlotPropsSx,
        },
      }}
    >
      {editModal && !addModal && !deleteModal && (
        <>
          <DialogTitle id='modal-title' sx={DialogTitleSx}>
            <Typography
              variant='h6'
              component='div'
              sx={DialogTitleTypographySx}
            >
              Editar transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            <TextField
              select
              label='Tipo de Transação'
              value={newTransaction.type ?? transaction.type}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, type: e.target.value })
              }
              fullWidth
              sx={TextFieldSx}
            >
              {transactionTypes.map((option, index) => (
                <MenuItem
                  key={`edit-${option.value}-${index}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label='Valor'
              type='number'
              value={Math.abs(newTransaction.amount ?? transaction.amount ?? 0)}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: Number(e.target.value),
                })
              }
              fullWidth
              sx={TextFieldSx}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
              }}
            />
            <TextField
              label='Descrição'
              value={newTransaction.description ?? transaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
              fullWidth
              multiline
              rows={4}
              sx={TextFieldSx}
            />
          </DialogContent>
          <DialogActions sx={DialogActionsSx}>
            <Button
              onClick={onDismiss}
              variant='outlined'
              sx={ButtonCancelTextSx}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleEditTransaction}
              variant='contained'
              sx={ConfirmTextSx}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
      {addModal && !editModal && !deleteModal && (
        <>
          <DialogTitle id='modal-title' sx={DialogTitleSx}>
            <Typography
              variant='h6'
              component='div'
              sx={DialogTitleTypographySx}
            >
              {title}
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            {typeof content === 'string' ? (
              <Typography variant='body1' sx={TypographyContentSx}>
                {content}
              </Typography>
            ) : (
              content
            )}
          </DialogContent>
          <DialogActions sx={DialogActionsSx}>
            <Button
              onClick={onDismiss}
              variant='outlined'
              sx={ButtonCancelTextSx}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleAddTransaction}
              variant='contained'
              sx={ConfirmTextSx}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
      {deleteModal && !editModal && !addModal && (
        <>
          <DialogTitle id='modal-title' sx={DialogTitleSx}>
            <Typography
              variant='h6'
              component='div'
              sx={DialogTitleTypographySx}
            >
              Remover transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            <Typography variant='body1' sx={TypographyContentSx}>
              Tem certeza que deseja remover esta transação?
            </Typography>

            <Box sx={BoxWrapperRemoveSx}>
              <Box sx={TypographyBoxRemoveSx}>
                <Typography variant='body2' sx={TypographyTypeSx}>
                  Tipo:
                </Typography>
                <Typography variant='body1' sx={TypographyTypeOptionsSx}>
                  {
                    transactionTypes.find(
                      (option) => option.value === transaction.type
                    )?.label
                  }
                </Typography>
              </Box>
              <Box sx={TypographyBoxRemoveSx}>
                <Typography variant='body2' sx={TypographyTypeSx}>
                  Valor:
                </Typography>
                <Typography variant='h6' sx={DialogTitleTypographySx}>
                  R$ {Math.abs(transaction.amount ?? 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={TypographyBoxRemoveSx}>
                <Typography variant='body2' sx={TypographyTypeSx}>
                  Data:
                </Typography>
                <Typography variant='body1'>
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString('pt-BR')
                    : ''}
                </Typography>
              </Box>
              {transaction.description && (
                <Box sx={DescriptionBoxSx}>
                  <Typography variant='body2' sx={TypographyTypeSx}>
                    Descrição:
                  </Typography>
                  <Typography variant='body2' sx={TransactionDescriptionSx}>
                    {transaction.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={DialogActionsSx}>
            <Button
              onClick={onDismiss}
              variant='outlined'
              sx={ButtonCancelTextSx}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleRemoveTransaction}
              variant='contained'
              sx={ConfirmTextSx}
            >
              Remover
            </Button>
          </DialogActions>
        </>
      )}
      {viewModal && !editModal && !addModal && !deleteModal && (
        <>
          <DialogTitle id='modal-title' sx={DialogTitleSx}>
            <Typography
              variant='h6'
              component='div'
              sx={DialogTitleTypographySx}
            >
              Detalhes da Transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
              >
                <Typography variant='body2' sx={TypographyTypeSx}>
                  Tipo:
                </Typography>
                <Typography variant='body1' sx={TypographyTypeOptionsSx}>
                  {
                    transactionTypes.find(
                      (option) => option.value === transaction.type
                    )?.label
                  }
                </Typography>
              </Box>
              <Box sx={DescriptionBoxSx}>
                <Typography variant='body2' sx={TypographyTypeSx}>
                  Valor:
                </Typography>
                <Typography variant='h6' sx={DialogTitleTypographySx}>
                  R$ {Math.abs(transaction.amount ?? 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={DescriptionBoxSx}>
                <Typography variant='body2' sx={TypographyTypeSx}>
                  Data:
                </Typography>
                <Typography variant='body1'>
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString('pt-BR')
                    : ''}
                </Typography>
              </Box>
              {transaction.description && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant='body2' sx={DescriptionTitleSx}>
                    Descrição:
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={TransactionDescriptionTypographySx}
                  >
                    {transaction.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={CloseDialogActionSx}>
            <Button
              onClick={onDismiss}
              variant='contained'
              fullWidth
              sx={CloseModalTextSx}
            >
              Fechar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
