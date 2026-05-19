import { SxProps } from '@mui/material';

export const ContainerWrapperSx: SxProps = {
  py: 3,
  px: { xs: 2, sm: 3 },
  width: { xs: '100%', md: '75%' },
};

export const BoxWrapperSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export const CardWrapperSx: SxProps = (theme: any) => {
  return {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: 'white',
  };
};

export const CardContentSx: SxProps = { textAlign: 'center', py: 2 };

export const TransactionTypographySx: SxProps = { fontWeight: 'bold' };

export const DescriptionTypographySx: SxProps = { opacity: 0.9 };

export const BoxTransactionContentSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
  alignSelf: 'center',
  width: '100%',
};

export const CardNoTransactionSx: SxProps = { textAlign: 'center', py: 4 };

export const TypographyNoTransactionSx: SxProps = {
  color: 'text.secondary',
  mb: 1.5,
};
