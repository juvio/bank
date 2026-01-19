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
    }).format(value);
  };

  const fullName = accountName;
  const firstName = fullName.split(' ')[0] ?? fullName;

  return (
    <Card sx={CardWrapperSx} role="region" aria-labelledby="account-card-title">
      <CardContent sx={CardContentSx}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            id="account-card-title"
            component="h2"
            gutterBottom
            sx={{ color: 'white' }}
          >
            Olá, {firstName}! 👋
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={WelcomeTypographySx}
          >
            {accountBalance > 0
              ? 'Bem-vindx de volta ao ByteBank. Aqui está um resumo da sua conta.'
              : 'Bem-vindx ao ByteBank! Comece criando sua primeira transação.'}
          </Typography>
        </Box>

        <Box sx={BoxContaCorrenteSx}>
          <Typography variant="h6" component="h2" id="account-type-title">
            Conta Corrente
          </Typography>
          <IconButton
            sx={{ color: 'white' }}
            onClick={() => setShowBalance(!showBalance)}
            aria-label={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            {showBalance ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Box sx={BoxAccountBalanceSx}>
          <AccountBalance sx={{ fontSize: 40 }} aria-hidden="true" />
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
