'use client';

import React, { useState } from 'react';

import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { AccountBalance, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  BoxAccountBalanceSx,
  BoxContaCorrenteSx,
  CardContentSx,
  CardWrapperSx,
  SaldoTypographySx,
  WelcomeTypographySx,
} from './styles';

interface AccountCardProps {
  accountBalance: number;
  accountName: string;
}

export default function AccountCard({
  accountBalance,
  accountName,
}: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Math.abs(value));
  };

  const fullName = accountName;
  const firstName = fullName.split(' ')[0] ?? fullName;

  return (
    <Card sx={CardWrapperSx}>
      <CardContent sx={CardContentSx}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: 'white' }}
          >
            Olá, {firstName}! 👋
          </Typography>
          <Typography variant="subtitle1" sx={WelcomeTypographySx}>
            {accountBalance > 0
              ? 'Bem-vindx de volta ao ByteBank. Aqui está um resumo da sua conta.'
              : 'Bem-vindx ao ByteBank! Comece criando sua primeira transação.'}
          </Typography>
        </Box>

        <Box sx={BoxContaCorrenteSx}>
          <Typography variant="h6" component="h2">
            Conta Corrente
          </Typography>
          <IconButton
            sx={{ color: 'white' }}
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Box sx={BoxAccountBalanceSx}>
          <AccountBalance sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="body2" sx={SaldoTypographySx}>
              Saldo Disponível
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {showBalance ? formatCurrency(accountBalance) : '• • • • •'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
