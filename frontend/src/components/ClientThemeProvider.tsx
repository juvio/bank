'use client';

import { inter } from '@/app/layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#75e299ff',
    },
    secondary: {
      main: '#2b9d27ff',
    },
    text: {
      primary: '#222222',
      secondary: '#000',
      disabled: 'white',
    },
  },
  typography: {
    h1: {
      fontFamily: `${inter.style.fontFamily}`,
      fontSize: '48px',
      fontWeight: 500,
      lineHeight: '62px',
    },
    h2: {
      fontFamily: `${inter.style.fontFamily}`,
      fontSize: '24px',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 14,
    },
    body2: {
      fontFamily: `${inter.style.fontFamily}`,
      fontSize: 14,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
