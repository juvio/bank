import { SxProps } from '@mui/material';

export const BoxWrapperSx: SxProps = (theme: any) => {
  return {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.primary.light})`,
    p: 3,
  };
};

export const BoxSx: SxProps = { textAlign: 'center', maxWidth: 640 };

export const Typography404Sx: SxProps = (theme: any) => {
  return {
    color: theme.palette.primary.contrastText,
    mb: 2,
  };
};

export const TypographyNotFoundSx: SxProps = (theme: any) => {
  return { color: theme.palette.primary.contrastText, mb: 3 };
};

export const TypographyDescriptionSx: SxProps = (theme: any) => {
  return { color: theme.palette.primary.contrastText, mb: 4 };
};
