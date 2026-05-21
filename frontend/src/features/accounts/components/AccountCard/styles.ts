import { SxProps } from '@mui/material';

export const CardWrapperSx: SxProps = (theme: any) => {
  return {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%,${theme.palette.secondary.main} 100%)`,
    color: 'white',
  };
};

export const CardContentSx: SxProps = {
  p: 6,
};

export const CardHeaderSx: SxProps = {
  mb: 3,
};

export const TitleTypographySx: SxProps = {
  color: 'white',
};

export const WelcomeTypographySx: SxProps = { opacity: 0.9, mb: 2 };

export const BoxContaCorrenteSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

export const BoxAccountBalanceSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const BalanceVisibilityButtonSx: SxProps = {
  color: 'white',
};

export const AccountBalanceIconSx: SxProps = {
  fontSize: 40,
};

export const SaldoTypographySx: SxProps = { opacity: 0.9 };
