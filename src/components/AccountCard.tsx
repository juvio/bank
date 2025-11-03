"use client";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { AccountBalance, Visibility, VisibilityOff } from "@mui/icons-material";
import mock from '@/mocks/mock.json';

interface AccountCardProps {
  accountBalance: number;
}

export default function AccountCard({ accountBalance }: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const theme = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(value));
  };

  const fullName = (mock as unknown as { account: { userName: string } }).account.userName;
  const firstName = fullName.split(' ')[0] ?? fullName;

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: "white",
      }}
    >
      <CardContent sx={{ p: 6 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "white" }}>
            Olá, {firstName}! 👋
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 2 }}>
            Bem-vinda de volta ao SuperBank. Aqui está um resumo da sua conta.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h2">
            Conta Corrente
          </Typography>
          <IconButton sx={{ color: "white" }} onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AccountBalance sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Saldo Disponível
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {showBalance ? formatCurrency(accountBalance) : "• • • • •"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
