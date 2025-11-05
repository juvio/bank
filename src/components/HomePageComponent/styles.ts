import { SxProps } from '@mui/material';

export const ContainerSx: SxProps = { py: 4 };

export const BoxContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

export const BoxAccountCardSx: SxProps = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

export const BoxContainerHistoryCardSx: SxProps = {
  display: 'flex',
  gap: 4,
  flexDirection: { xs: 'column', md: 'row' },
};

export const BoxTransactionHistoryCardSx: SxProps = {
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  minHeight: { xs: 'auto', md: '400px' },
};

export const BoxNewTransactionCard: SxProps = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: { xs: 'auto', md: '400px' },
};
