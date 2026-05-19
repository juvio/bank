import { SxProps } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  TrendingUp as DepositIcon,
  Payment as PaymentIcon,
  TrendingDown as WithdrawIcon,
} from '@mui/icons-material';

export const CardWrapperSx: SxProps = {
  mb: 2,
  padding: 1.5,
  border: '0.5px solid #e0e0e0',
  boxShadow: 1,
  width: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: 3,
    transform: 'translateY(-0.5px)',
  },
};

export const IconButtonViewSx: SxProps = {
  bgcolor: '#1976d2',
  color: 'white',
  '&:hover': { bgcolor: '#1565c0' },
  width: 32,
  height: 32,
};

export const IconButtonCheckSx: SxProps = {
  bgcolor: '#2e7d32',
  color: 'white',
  '&:hover': { bgcolor: '#1b5e20' },
  width: 32,
  height: 32,
};

export const IconButtonEditSx: SxProps = {
  bgcolor: '#2e7d32',
  color: 'white',
  '&:hover': { bgcolor: '#1b5e20' },
  width: 32,
  height: 32,
};

export const IconButtonDeleteSx: SxProps = {
  bgcolor: '#d32f2f',
  color: 'white',
  '&:hover': { bgcolor: '#c62828' },
  width: 32,
  height: 32,
};

// Funções auxiliares para definir cores e ícones baseados no tipo de transação
export const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return DepositIcon;
    case 'withdraw':
      return WithdrawIcon;
    case 'payment':
      return PaymentIcon;
    case 'transfer':
      return WalletIcon;
    default:
      return WalletIcon;
  }
};

export const getTransactionBorderColor = (type: string): string => {
  switch (type) {
    case 'deposit':
      return '#2e7d32'; // Verde
    case 'withdraw':
      return '#d32f2f'; // Vermelho
    case 'payment':
      return '#ed6c02'; // Laranja
    case 'transfer':
      return '#1976d2'; // Azul
    default:
      return '#757575'; // Cinza
  }
};

export const getTransactionAmountColor = (type: string): string => {
  switch (type) {
    case 'deposit':
      return '#2e7d32'; // Verde
    case 'withdraw':
      return '#d32f2f'; // Vermelho
    case 'payment':
      return '#d32f2f'; // Vermelho
    case 'transfer':
      return '#d32f2f'; // Vermelho
    default:
      return '#212121';
  }
};

export const getTransactionChipColor = (type: string): string => {
  switch (type) {
    case 'deposit':
      return '#e8f5e9'; // Verde claro
    case 'withdraw':
      return '#ffebee'; // Vermelho claro
    case 'payment':
      return '#fff3e0'; // Laranja claro
    case 'transfer':
      return '#e3f2fd'; // Azul claro
    default:
      return '#f5f5f5'; // Cinza claro
  }
};
