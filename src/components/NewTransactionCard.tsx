"use client";

import React, { useState } from "react";
import { Card, CardContent, CardActions, Typography, TextField, MenuItem, Button, Box } from "@mui/material";
import mock from '@/mocks/mock.json';

interface NewTransaction {
  type: string;
  amount: string;
  description: string;
  date: string;
}

const transactionTypes = (mock as unknown as { transactionTypes: { value: string; label: string }[] }).transactionTypes;

export default function NewTransactionCard() {
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    type: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleTransactionSubmit = () => {
    console.log("Nova transação:", newTransaction);
    setNewTransaction({ type: "", amount: "", description: "", date: "" });
  };

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
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            fullWidth
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
            }}
          />
          <TextField
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={handleTransactionSubmit}
          disabled={!newTransaction.type || !newTransaction.amount}
        >
          Criar Transação
        </Button>
      </CardActions>
    </Card>
  );
}
