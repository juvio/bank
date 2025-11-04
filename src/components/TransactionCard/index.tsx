"use client";

import { useBankAccountStore } from "@/stores/useBankAccountStore";
import { useModalStore } from "@/stores/useModalStore";
import { TransactionMapper } from "@/types";
import { Box, IconButton, Typography, Card, CardContent } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import Link from "next/link";
import { formatDate } from "@/app/utils/date";

type TransactionCardProps = {
  id: number;
  type: string;
  description?: string;
  amount: number;
  date: string;
};

export default function TransactionCard({ id, type, amount, description, date }: TransactionCardProps) {
  const { setEditModal, setDeleteModal, setAddModal, setViewModal } = useModalStore();
  const { setTransaction } = useBankAccountStore();

  const handleOpenEditModal = () => {
    setAddModal(false);
    setDeleteModal(false);
    setViewModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? "",
    });
    setEditModal(true);
  };

  const handleOpenDeleteModal = () => {
    setAddModal(false);
    setEditModal(false);
    setViewModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? "",
    });
    setDeleteModal(true);
  };

  const handleOpenViewModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? "",
    });
    setViewModal(true);
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2, width: "100%" }}>
      <CardContent>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
          {formatDate(date)}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: type === "deposit" ? "success.main" : "error.main" }}
            >
              R$ {amount.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {TransactionMapper[type]}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Link href="/transaction">
                <IconButton
                  onClick={handleOpenViewModal}
                  size="small"
                  sx={{
                    bgcolor: "info.main",
                    color: "white",
                    "&:hover": { bgcolor: "info.dark" },
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Link>
              <Link href="/transaction">
                <IconButton
                  onClick={handleOpenEditModal}
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
              <Link href="/transaction">
                <IconButton
                  onClick={handleOpenDeleteModal}
                  size="small"
                  sx={{
                    bgcolor: "error.main",
                    color: "white",
                    "&:hover": { bgcolor: "error.dark" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
