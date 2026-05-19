import { SxProps } from '@mui/material';

export const BoxWrapperSx: SxProps = (theme: any) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    borderRadius: 2,
    boxShadow: 3,
    p: { xs: 1, md: 2 },
    m: { xs: 1, md: 2 },
  };
};

export const BoxSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  gap: 1,
};

export const ButtonSx: SxProps = {
  minWidth: { xs: 60, md: 100 },
  color: 'white',
  fontWeight: 'bold',
  fontSize: { xs: '0.8rem', md: '1rem' },
};

export const TypographyBoxSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'end',
};

export const TypographySx: SxProps = {
  display: { xs: 'none', md: 'block' },
  minWidth: 100,
  color: 'white',
  fontWeight: 'bold',
};

export const AvatarSx: SxProps = {
  width: { xs: 28, md: 32 },
  height: { xs: 28, md: 32 },
};
