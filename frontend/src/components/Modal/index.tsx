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
  Link,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  AccountBalanceWallet as WalletIcon,
  TrendingUp as DepositIcon,
  Payment as PaymentIcon,
  TrendingDown as WithdrawIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { useTransactionValidation } from '@/hooks/useTransactionValidation';
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
import { revalidateHome } from '@/app/actions';

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
  date?: string;
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
    fetchBalance,
  } = useBankAccountStore();
  const [newTransaction, setNewTransaction] = useState<
    Partial<EditTransaction>
  >({});

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return DepositIcon;
      case 'withdraw':
        return WithdrawIcon;
      case 'payment':
        return PaymentIcon;
      case 'transfer':
        return WalletIcon;
      default:
        return WalletIcon;
    }
  };

  const { errors, isFormValid, handleAmountBlur } = useTransactionValidation(
    newTransaction.amount ?? transaction.amount,
    newTransaction.type ?? transaction.type,
    newTransaction.date ?? transaction.date
  );

  const handleDateChange = (dateValue: Dayjs | null) => {
    const dateString = dateValue ? dateValue.format('YYYY-MM-DD') : '';
    setNewTransaction({ ...newTransaction, date: dateString });
  };

  function onDismiss() {
    setOpen(false);
    router.back();
  }

  const handleAddTransaction = async () => {
    try {
      await addTransaction(transaction);
      await fetchBalance();
      await revalidateHome();
      onDismiss();
      setAddModal(false);
      resetTransaction(true);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação. Tente novamente.');
    }
  };

  const handleEditTransaction = async () => {
    if (!isFormValid()) {
      return;
    }

    try {
      const updatedData = {
        type: newTransaction.type ?? transaction.type,
        amount: newTransaction.amount ?? transaction.amount,
        description: newTransaction.description ?? transaction.description,
        date: newTransaction.date ?? transaction.date,
      };

      await editTransaction(transaction.id, updatedData);
      await fetchBalance();
      onDismiss();
      setEditModal(false);
    } catch (error) {
      console.error('Erro ao editar transação:', error);
      alert('Erro ao editar transação. Tente novamente.');
    }
  };

  const handleRemoveTransaction = async () => {
    try {
      await removeTransaction(transaction.id);
      await fetchBalance();
      onDismiss();
      setDeleteModal(false);
    } catch (error) {
      console.error('Erro ao remover transação:', error);
      alert('Erro ao remover transação. Tente novamente.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onDismiss}
      aria-labelledby="modal-title"
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DialogTitle id="modal-title" sx={DialogTitleSx}>
            <Typography
              variant="h6"
              component="div"
              sx={DialogTitleTypographySx}
            >
              Editar transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            <TextField
              select
              label="Tipo de Transação"
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Valor"
                type="number"
                value={Math.abs(
                  newTransaction.amount ?? transaction.amount ?? 0
                )}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: Number(e.target.value),
                  })
                }
                fullWidth
                sx={TextFieldSx}
                slotProps={{
                  input: {
                    startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
                  },
                }}
                onBlur={handleAmountBlur}
                error={Boolean(errors)}
                helperText={errors}
              />
              <DesktopDatePicker
                label="Data"
                value={dayjs(newTransaction.date ?? transaction.date)}
                onChange={handleDateChange}
                maxDate={dayjs()}
                disableFuture
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    sx: TextFieldSx,
                  },
                }}
              />
            </Box>
            <TextField
              label="Descrição"
              value={newTransaction.description ?? transaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
              fullWidth
              multiline
              rows={3}
              sx={{ ...TextFieldSx, mt: errors ? 0 : 2 }}
            />
          </DialogContent>
          <DialogActions sx={DialogActionsSx}>
            <Button
              onClick={onDismiss}
              variant="outlined"
              sx={ButtonCancelTextSx}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleEditTransaction}
              variant="contained"
              sx={ConfirmTextSx}
              disabled={!isFormValid()}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </LocalizationProvider>
      )}
      {addModal && !editModal && !deleteModal && (
        <>
          <DialogTitle id="modal-title" sx={DialogTitleSx}>
            <Typography
              variant="h6"
              component="div"
              sx={DialogTitleTypographySx}
            >
              {title}
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            {typeof content === 'string' ? (
              <Typography variant="body1" sx={TypographyContentSx}>
                {content}
              </Typography>
            ) : (
              content
            )}
          </DialogContent>
          <DialogActions sx={DialogActionsSx}>
            <Button
              onClick={onDismiss}
              variant="outlined"
              sx={ButtonCancelTextSx}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleAddTransaction}
              variant="contained"
              sx={ConfirmTextSx}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
      {deleteModal && !editModal && !addModal && (
        <>
          <DialogTitle id="modal-title" sx={DialogTitleSx}>
            <Typography
              variant="h6"
              component="div"
              sx={DialogTitleTypographySx}
            >
              Remover transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={DialogContentWrapperSx}>
            <Typography variant="body1" sx={TypographyContentSx}>
              Tem certeza que deseja remover esta transação?
            </Typography>

            <Box sx={BoxWrapperRemoveSx}>
              <Box sx={TypographyBoxRemoveSx}>
                <Typography variant="body2" sx={TypographyTypeSx}>
                  Tipo:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {(() => {
                    const Icon = getTransactionIcon(transaction.type);
                    return (
                      <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    );
                  })()}
                  <Typography variant="body1" sx={TypographyTypeOptionsSx}>
                    {
                      transactionTypes.find(
                        (option) => option.value === transaction.type
                      )?.label
                    }
                  </Typography>
                </Box>
              </Box>
              <Box sx={TypographyBoxRemoveSx}>
                <Typography variant="body2" sx={TypographyTypeSx}>
                  Valor:
                </Typography>
                <Typography variant="h6" sx={DialogTitleTypographySx}>
                  R$ {Math.abs(transaction.amount ?? 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={TypographyBoxRemoveSx}>
                <Typography variant="body2" sx={TypographyTypeSx}>
                  Data:
                </Typography>
                <Typography variant="body1">
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString('pt-BR')
                    : ''}
                </Typography>
              </Box>
              {transaction.description && (
                <Box sx={DescriptionBoxSx}>
                  <Typography variant="body2" sx={TypographyTypeSx}>
                    Descrição:
                  </Typography>
                  <Typography variant="body2" sx={TransactionDescriptionSx}>
                    {transaction.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={DialogActionsSx}>
            <Button
              onClick={onDismiss}
              variant="outlined"
              sx={ButtonCancelTextSx}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleRemoveTransaction}
              variant="contained"
              color="error"
              sx={ConfirmTextSx}
            >
              Remover
            </Button>
          </DialogActions>
        </>
      )}
      {viewModal && !editModal && !addModal && !deleteModal && (
        <>
          <DialogTitle id="modal-title" sx={DialogTitleSx}>
            <Typography
              variant="h6"
              component="div"
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
                <Typography variant="body2" sx={TypographyTypeSx}>
                  Tipo:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {(() => {
                    const Icon = getTransactionIcon(transaction.type);
                    return (
                      <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    );
                  })()}
                  <Typography variant="body1" sx={TypographyTypeOptionsSx}>
                    {
                      transactionTypes.find(
                        (option) => option.value === transaction.type
                      )?.label
                    }
                  </Typography>
                </Box>
              </Box>
              <Box sx={DescriptionBoxSx}>
                <Typography variant="body2" sx={TypographyTypeSx}>
                  Valor:
                </Typography>
                <Typography variant="h6" sx={DialogTitleTypographySx}>
                  R$ {Math.abs(transaction.amount ?? 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={DescriptionBoxSx}>
                <Typography variant="body2" sx={TypographyTypeSx}>
                  Data:
                </Typography>
                <Typography variant="body1">
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString('pt-BR')
                    : ''}
                </Typography>
              </Box>
              {transaction.description && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={DescriptionTitleSx}>
                    Descrição:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={TransactionDescriptionTypographySx}
                  >
                    {transaction.description}
                  </Typography>
                </Box>
              )}
              {transaction.attachmentUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={DescriptionTitleSx}>
                    Anexo:
                  </Typography>
                  {transaction.attachmentUrl?.endsWith('.pdf') ? (
                    <Button
                      variant="outlined"
                      size="small"
                      href={
                        transaction.attachmentUrl.startsWith('blob:')
                          ? transaction.attachmentUrl
                          : `${
                              process.env.NEXT_PUBLIC_API_URL ||
                              'http://localhost:5000'
                            }${transaction.attachmentUrl}`
                      }
                      target="_blank"
                      component="a"
                      startIcon={<AttachFileIcon />}
                      sx={{ mt: 1, textTransform: 'none' }}
                    >
                      Abrir PDF
                    </Button>
                  ) : (
                    <Link
                      href={
                        transaction.attachmentUrl.startsWith('blob:')
                          ? transaction.attachmentUrl
                          : `${
                              process.env.NEXT_PUBLIC_API_URL ||
                              'http://localhost:5000'
                            }${transaction.attachmentUrl}`
                      }
                      target="_blank"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      <Box
                        component="img"
                        src={
                          transaction.attachmentUrl.startsWith('blob:')
                            ? transaction.attachmentUrl
                            : `${
                                process.env.NEXT_PUBLIC_API_URL ||
                                'http://localhost:5000'
                              }${transaction.attachmentUrl}`
                        }
                        alt="Anexo"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          borderRadius: 2,
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      />
                    </Link>
                  )}
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={CloseDialogActionSx}>
            <Button
              onClick={onDismiss}
              variant="contained"
              fullWidth
              sx={CloseModalTextSx}
              aria-label="Fechar modal"
            >
              Fechar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
