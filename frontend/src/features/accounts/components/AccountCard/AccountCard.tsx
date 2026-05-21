'use client';

import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import AccountBalance from '@mui/icons-material/AccountBalance';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
  AccountBalanceIconSx,
  BalanceVisibilityButtonSx,
  BoxAccountBalanceSx,
  BoxContaCorrenteSx,
  CardContentSx,
  CardHeaderSx,
  CardWrapperSx,
  SaldoTypographySx,
  TitleTypographySx,
  WelcomeTypographySx,
} from './styles';
import type { AccountCardViewProps } from './types';

export function AccountCard({
  accountBalance,
  firstName,
  formattedBalance,
  handleToggleBalance,
  showBalance,
}: AccountCardViewProps) {
  return (
    <Card sx={CardWrapperSx} role='region' aria-labelledby='account-card-title'>
      <CardContent sx={CardContentSx}>
        <Box sx={CardHeaderSx}>
          <Typography
            variant='h4'
            id='account-card-title'
            component='h2'
            gutterBottom
            sx={TitleTypographySx}
          >
            Olá, {firstName}! 👋
          </Typography>
          <Typography
            variant='subtitle1'
            component='p'
            sx={WelcomeTypographySx}
          >
            {accountBalance > 0
              ? 'Bem-vindx de volta ao ByteBank. Aqui está um resumo da sua conta.'
              : 'Bem-vindx ao ByteBank! Comece criando sua primeira transação.'}
          </Typography>
        </Box>

        <Box sx={BoxContaCorrenteSx}>
          <Typography variant='h6' component='h2' id='account-type-title'>
            Conta Corrente
          </Typography>
          <IconButton
            sx={BalanceVisibilityButtonSx}
            onClick={handleToggleBalance}
            aria-label={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            {showBalance ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Box sx={BoxAccountBalanceSx}>
          <AccountBalance sx={AccountBalanceIconSx} aria-hidden='true' />
          <Box>
            <Typography variant='body2' sx={SaldoTypographySx}>
              Saldo Disponível
            </Typography>
            <Typography variant='h4' component='div' fontWeight='bold'>
              {showBalance ? formattedBalance : '• • • • •'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
