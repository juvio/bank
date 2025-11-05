import AccountMenu, {
  AccountMenuAction,
  AccountMenuNavItem,
} from '@/components/AccountMenu';
import mock from '@/mocks/mock.json';

export default function CustomerLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const navItems: AccountMenuNavItem[] = (
    mock as unknown as { navItems: AccountMenuNavItem[] }
  ).navItems;

  const menuItems: AccountMenuAction[] = (
    mock as unknown as { menuItems: AccountMenuAction[] }
  ).menuItems;
  const account = (
    mock as unknown as { account: { userName: string; initials: string } }
  ).account;
  return (
    <>
      <AccountMenu
        userName={account.userName}
        avatarContent={account.initials}
        navItems={navItems}
        menuItems={menuItems}
      />
      {children}
      {modal}
    </>
  );
}
