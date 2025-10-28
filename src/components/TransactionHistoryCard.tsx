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

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "transfer",
    amount: -250.0,
    description: "Transferência para João Silva",
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: "2",
    type: "deposit",
    amount: 1500.0,
    description: "Depósito via PIX",
    date: "2024-01-19",
    status: "completed",
  },
  {
    id: "3",
    type: "payment",
    amount: -89.9,
    description: "Pagamento de conta de luz",
    date: "2024-01-18",
    status: "completed",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: -100.0,
    description: "Saque no caixa eletrônico",
    date: "2024-01-17",
    status: "pending",
  },
];

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

export default function TransactionHistoryCard() {
  return (
    <Card >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Histórico de Transações
        </Typography>
        <TableContainer sx={{ overflowX: "hidden" }}>
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
              {mockTransactions.map((transaction) => (
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
