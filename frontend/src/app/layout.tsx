import './globals.css';
import { Inter } from 'next/font/google';
import { ClientThemeProvider } from '@carollyb/bank-design-system';
import { GlobalStyles } from '@mui/material';

export const inter = Inter({
  weight: ['300', '400', '500'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Superbank</title>
      </head>
      <body>
        <GlobalStyles
          styles={{
            '*': {
              fontFamily: `${inter.style.fontFamily}`,
            },
          }}
        />
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
