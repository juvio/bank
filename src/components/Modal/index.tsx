"use client";

import { useBankAccountStore } from "@/stores/useBankAccountStore";
import { useModalStore } from "@/stores/useModalStore";
import { transactionTypes } from "@/types";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState, ReactNode } from "react";

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
  title = "Confirmação",
  content = "Tem certeza que deseja fazer esta operação?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ModalComponentProps) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { editModal, addModal, setAddModal, setEditModal, deleteModal, setDeleteModal, viewModal, setViewModal } =
    useModalStore();
  const { transaction, addTransaction, resetTransaction, editTransaction, removeTransaction } = useBankAccountStore();
  const [newTransaction, setNewTransaction] = useState<Partial<EditTransaction>>({});

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
      aria-labelledby="modal-title"
      key={editModal ? "edit" : addModal ? "add" : deleteModal ? "delete" : viewModal ? "view" : "modal"}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            width: { xs: "90%", sm: 480 },
            maxWidth: 480,
            p: 0,
          },
        },
      }}
    >
      {editModal && !addModal && !deleteModal && (
        <>
          <DialogTitle
            id="modal-title"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: "white",
              pb: 2,
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              Editar transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            <TextField
              select
              label="Tipo de Transação"
              value={newTransaction.type ?? transaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            >
              {transactionTypes.map((option, index) => (
                <MenuItem key={`edit-${option.value}-${index}`} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Valor"
              type="number"
              value={Math.abs(newTransaction.amount ?? transaction.amount ?? 0)}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: Number(e.target.value),
                })
              }
              fullWidth
              sx={{ mt: 2 }}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
              }}
            />
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
              rows={4}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={onDismiss}
              variant="outlined"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleEditTransaction}
              variant="contained"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${
                    theme.palette.primary.dark || theme.palette.primary.main
                  } 0%, ${theme.palette.secondary.dark || theme.palette.secondary.main} 100%)`,
                },
              }}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
      {addModal && !editModal && !deleteModal && (
        <>
          <DialogTitle
            id="modal-title"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: "white",
              pb: 2,
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            {typeof content === "string" ? (
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  textAlign: "center",
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
              variant="outlined"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleAddTransaction}
              variant="contained"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${
                    theme.palette.primary.dark || theme.palette.primary.main
                  } 0%, ${theme.palette.secondary.dark || theme.palette.secondary.main} 100%)`,
                },
              }}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      )}
      {deleteModal && !editModal && !addModal && (
        <>
          <DialogTitle
            id="modal-title"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: "white",
              pb: 2,
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              Remover transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                textAlign: "center",
                m: 2,
              }}
            >
              Tem certeza que deseja remover esta transação?
            </Typography>

            <Box
              sx={{
                bgcolor: "grey.50",
                borderRadius: 1,
                p: 2,
                border: "1px solid",
                borderColor: "grey.200",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Tipo:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {transactionTypes.find((option) => option.value === transaction.type)?.label}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Valor:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  R$ {Math.abs(transaction.amount ?? 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Data:
                </Typography>
                <Typography variant="body1">
                  {transaction.date ? new Date(transaction.date).toLocaleDateString("pt-BR") : ""}
                </Typography>
              </Box>
              {transaction.description && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Descrição:
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic", maxWidth: "60%", textAlign: "right" }}>
                    {transaction.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={onDismiss}
              variant="outlined"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleRemoveTransaction}
              variant="contained"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${
                    theme.palette.primary.dark || theme.palette.primary.main
                  } 0%, ${theme.palette.secondary.dark || theme.palette.secondary.main} 100%)`,
                },
              }}
            >
              Remover
            </Button>
          </DialogActions>
        </>
      )}
      {viewModal && !editModal && !addModal && !deleteModal && (
        <>
          <DialogTitle
            id="modal-title"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: "white",
              pb: 2,
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              Detalhes da Transação
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Tipo:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {transactionTypes.find((option) => option.value === transaction.type)?.label}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Valor:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  R$ {Math.abs(transaction.amount ?? 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Data:
                </Typography>
                <Typography variant="body1">
                  {transaction.date ? new Date(transaction.date).toLocaleDateString("pt-BR") : ""}
                </Typography>
              </Box>
              {transaction.description && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Descrição:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "grey.50",
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "grey.200",
                    }}
                  >
                    {transaction.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={onDismiss}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: "none",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${
                    theme.palette.primary.dark || theme.palette.primary.main
                  } 0%, ${theme.palette.secondary.dark || theme.palette.secondary.main} 100%)`,
                },
              }}
            >
              Fechar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
