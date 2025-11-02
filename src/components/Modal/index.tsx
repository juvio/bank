'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
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

export default function ModalComponent({
  title = 'Confirmação',
  content = 'Tem certeza que deseja fazer esta operação?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ModalComponentProps) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { editModal, addModal, setAddModal } = useModalStore();
  const { transaction, addTransaction } = useBankAccountStore();

  function onDismiss() {
    setOpen(false);
    router.back();
  }

  const handleAddTransaction = () => {
    addTransaction(transaction);
    onDismiss();
    setAddModal(false);
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
              onClick={onDismiss}
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
