"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const getTransactionTypeLabel = (type: string) => {
  const types: { [key: string]: string } = {
    transfer: "Transferência",
    payment: "Pagamento",
    deposit: "Depósito",
    withdrawal: "Saque",
  };
  return types[type] || type;
};

const getStatusColor = (status: string): "success" | "warning" | "error" | "default" => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

const getStatusLabel = (status: string) => {
  const labels: { [key: string]: string } = {
    completed: "Concluída",
    pending: "Pendente",
    failed: "Falhou",
  };
  return labels[status] || status;
};

interface Props {
  transactions: Transaction[];
}

export default function TransactionHistoryCard({ transactions }: Props) {
  return (
    <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Histórico de Transações
        </Typography>
        <TableContainer sx={{ overflowX: 'hidden', overflowY: 'auto', flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align="right">Valor</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{getTransactionTypeLabel(transaction.type)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: transaction.amount >= 0 ? "success.main" : "error.main",
                      fontWeight: "medium",
                    }}
                  >
                    {transaction.amount >= 0 ? "+" : ""}
                    R$ {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(transaction.status)}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
