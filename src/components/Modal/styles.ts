import { SxProps } from '@mui/material';

export const DialogTitleSx: SxProps = (theme: any) => {
  return {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: 'white',
    pb: 2,
  };
};

export const SlotPropsSx: SxProps = {
  borderRadius: 2,
  width: { xs: '90%', sm: 480 },
  maxWidth: 480,
  p: 0,
};

export const DialogTitleTypographySx: SxProps = { fontWeight: 'bold' };

export const DialogContentWrapperSx: SxProps = { pt: 3, px: 3, pb: 2 };

export const TextFieldSx: SxProps = { mt: 2 };

export const DialogActionsSx: SxProps = { px: 3, pb: 3, gap: 1 };

export const ButtonCancelTextSx: SxProps = {
  flex: 1,
  borderRadius: 2,
  textTransform: 'none',
};

export const ConfirmTextSx: SxProps = (theme: any) => {
  return {
    flex: 1,
    borderRadius: 2,
    textTransform: 'none',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    '&:hover': {
      background: `linear-gradient(135deg, ${
        theme.palette.primary.dark || theme.palette.primary.main
      } 0%, ${
        theme.palette.secondary.dark || theme.palette.secondary.main
      } 100%)`,
    },
  };
};

export const TypographyContentSx: SxProps = (theme: any) => {
  return {
    color: theme.palette.text.primary,
    textAlign: 'center',
    m: 2,
  };
};

export const BoxWrapperRemoveSx: SxProps = {
  bgcolor: 'grey.50',
  borderRadius: 1,
  p: 2,
  border: '1px solid',
  borderColor: 'grey.200',
  mb: 2,
};

export const TypographyBoxRemoveSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: 1,
};

export const TypographyTypeSx: SxProps = { color: 'text.secondary' };

export const TypographyTypeOptionsSx: SxProps = { fontWeight: 500 };

export const DescriptionBoxSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const TransactionDescriptionSx: SxProps = {
  fontStyle: 'italic',
  maxWidth: '60%',
  textAlign: 'right',
};

export const CloseDialogActionSx: SxProps = { px: 3, pb: 3 };

export const CloseModalTextSx: SxProps = (theme: any) => {
  return {
    borderRadius: 2,
    textTransform: 'none',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    '&:hover': {
      background: `linear-gradient(135deg, ${
        theme.palette.primary.dark || theme.palette.primary.main
      } 0%, ${
        theme.palette.secondary.dark || theme.palette.secondary.main
      } 100%)`,
    },
  };
};

export const TransactionDescriptionTypographySx: SxProps = {
  bgcolor: 'grey.50',
  borderRadius: 1,
  p: 2,
  border: '1px solid',
  borderColor: 'grey.200',
  textAlign: 'center',
};

export const DescriptionTitleSx: SxProps = { color: 'text.secondary', mb: 1 };
