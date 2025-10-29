import type { Metadata } from "next";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import "./globals.css";
import AccountMenu, { AccountMenuAction, AccountMenuNavItem } from "@/components/AccountMenu/AccountMenu";
import mock from '@/mocks/mock.json';

export const metadata: Metadata = {
  title: "SuperBank",
  description: "Your banking solution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navItems: AccountMenuNavItem[] = (mock as unknown as { navItems: AccountMenuNavItem[] }).navItems;

  const menuItems: AccountMenuAction[] = (mock as unknown as { menuItems: AccountMenuAction[] }).menuItems;
  const account = (mock as unknown as { account: { userName: string; initials: string } }).account;

  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <AccountMenu userName={account.userName} avatarContent={account.initials} navItems={navItems} menuItems={menuItems} />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
