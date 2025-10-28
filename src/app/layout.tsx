import type { Metadata } from "next";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import "./globals.css";
import AccountMenu from "@/components/AccountMenu/AccountMenu";

export const metadata: Metadata = {
  title: "SuperBank",
  description: "Your banking solution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <AccountMenu />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
