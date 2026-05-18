import { SxProps } from '@mui/material';

export const LoginLayoutMainSx: SxProps = {
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    lg: 'minmax(320px, 520px) minmax(320px, 700px)',
  },
  gap: { xs: '2rem', lg: '3rem' },
  alignItems: 'center',
  justifyContent: 'center',
  px: { xs: 2, md: 3 },
  py: { xs: 4, md: 5 },
  background: '#111e18',
};

export const LoginLayoutLeftSx: SxProps = {
  width: '100%',
  maxWidth: { xs: '560px', lg: 'none' },
  mx: 'auto',
};

export const LoginLayoutTitleSx: SxProps = {
  color: '#f4f1e8',
  fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
  lineHeight: 1.05,
  fontWeight: 500,
  margin: 0,
  fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, serif',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  maxWidth: '14ch',
};

export const LoginLayoutSubtitleSx: SxProps = {
  color: '#cbd5ca',
  fontSize: '1.1rem',
  lineHeight: 1.6,
  textAlign: 'center',
  mt: 2,
  mb: 4,
};

export const LoginLayoutRightSx: SxProps = {
  width: '100%',
  maxWidth: { xs: '700px', lg: 'none' },
  mx: 'auto',
  display: 'flex',
  justifyContent: 'center',
};

export const LoginCardSx: SxProps = {
  maxWidth: 460,
  margin: 'auto',
  borderRadius: 6,
  background: 'rgba(17, 30, 24, 0.42)',
  border: '1px solid rgba(244, 241, 232, 0.14)',
  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
  backdropFilter: 'blur(8px)',
};

export const LoginCardContentSx: SxProps = {
  p: { xs: 2.5, sm: 3.5 },
};

export const LoginCardTitleSx: SxProps = {
  color: '#f4f1e8',
  fontWeight: 600,
  mb: 2.5,
};

export const LoginCardAlertSx: SxProps = {
  mb: 2.5,
};

export const LoginFormSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const LoginFieldLabelSx: SxProps = {
  color: 'rgba(244, 241, 232, 0.7)',
};

export const LoginFieldSx: SxProps = {
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: 3,
    color: '#f4f1e8',
  },
  '& .MuiFilledInput-root:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
  '& .MuiFilledInput-root.Mui-focused': {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
};

export const LoginSubmitButtonSx: SxProps = {
  mt: 0.5,
  backgroundColor: '#f4f1e8',
  color: '#111e18',
  borderRadius: 3,
  py: 1.2,
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': { backgroundColor: '#e5dfd2' },
};

export const LoginRegisterButtonSx: SxProps = {
  color: '#cbd5ca',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': { color: '#f4f1e8', background: 'rgba(255, 255, 255, 0.06)' },
};
