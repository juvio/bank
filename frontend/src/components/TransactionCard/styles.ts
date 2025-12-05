import { SxProps } from '@mui/material';

export const CardWrapperSx: SxProps = {
  mb: 2,
  boxShadow: 2,
  width: '100%',
};

export const TypographyDateSx: SxProps = {
  color: 'text.secondary',
  display: 'block',
  mb: 0.5,
};

export const BoxSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const TransactionBoxSx: SxProps = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
};

export const TransactionTypographySx: SxProps = { fontWeight: 500 };

export const BoxViewSx: SxProps = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 1,
};

export const IconButtonViewSx: SxProps = {
  bgcolor: 'info.main',
  color: 'white',
  '&:hover': { bgcolor: 'info.dark' },
};

export const IconButtonEditSx: SxProps = {
  bgcolor: 'primary.main',
  color: 'white',
  '&:hover': { bgcolor: 'primary.dark' },
};

export const IconButtonDeleteSx: SxProps = {
  bgcolor: 'error.main',
  color: 'white',
  '&:hover': { bgcolor: 'error.dark' },
};
