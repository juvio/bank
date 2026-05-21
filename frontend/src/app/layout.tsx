import './globals.css';
import { inter } from '@core/config';
import { ClientThemeProvider } from '@carollyb/bank-design-system';
import { GlobalStyles } from '@mui/material';

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
