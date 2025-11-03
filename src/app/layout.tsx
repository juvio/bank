import type { Metadata } from "next";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalStyles } from "@mui/material";

export const metadata: Metadata = {
  title: "SuperBank",
  description: "Your banking solution",
};

export const inter = Inter({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyles
          styles={{
            "*": {
              fontFamily: `${inter.style.fontFamily}`,
            },
          }}
        />
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
