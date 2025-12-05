import { SxProps } from '@mui/material';

export const CardWrapperSx: SxProps = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

export const CardContentSx: SxProps = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  p: 2,
  overflow: 'hidden',
  '&:last-child': {
    pb: 2,
  },
};
