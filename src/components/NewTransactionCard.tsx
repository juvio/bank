"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Typography, TextField, MenuItem, Button, Box } from "@mui/material";
import Link from "next/link";
import { useBankAccountStore } from "@/stores/useBankAccountStore";
import { useModalStore } from "@/stores/useModalStore";
import { transactionTypes } from "@/types";
import { NewTransaction } from "@/types/new-transaction.type";

export default function NewTransactionCard() {
  const { transactions, setTransaction, transactionShouldReset, resetTransaction } = useBankAccountStore();
  const { setAddModal } = useModalStore();
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    id: transactions.length + 1,
    type: "",
    amount: "",
    description: "",
  });

  const handleTransactionSubmit = () => {
    console.log("Nova transação:", newTransaction);
    resetTransaction(false);
    setAddModal(true);
    setTransaction({
      id: newTransaction.id,
      type: newTransaction.type,
      amount: Number(newTransaction.amount),
      description: newTransaction.description,
    });
  };

  useEffect(() => {
    if (transactionShouldReset)
      setNewTransaction({
        id: transactions.length + 1,
        type: "",
        amount: "",
        description: "",
      });
  }, [transactionShouldReset]);

  return (
    <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Nova Transação
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            select
            label="Tipo de Transação"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            fullWidth
          >
            {transactionTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
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
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
            }}
          />
          {/* <TextField
            type='date'
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            fullWidth
          /> */}
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
        </Box>
      </CardContent>
      <CardActions>
        <Link href={"/transaction"}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleTransactionSubmit}
            disabled={!newTransaction.type || !newTransaction.amount}
          >
            Criar Transação
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
