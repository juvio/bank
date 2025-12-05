'use client';

import AccountMenu, {
  AccountMenuAction,
  AccountMenuNavItem,
} from '@/components/AccountMenu';
import mock from '@/mocks/mock.json';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomerLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated()) {
    return null;
  }

  const navItems: AccountMenuNavItem[] = (
    mock as unknown as { navItems: AccountMenuNavItem[] }
  ).navItems;

  const menuItems: AccountMenuAction[] = (
    mock as unknown as { menuItems: AccountMenuAction[] }
  ).menuItems;

  const initials = user?.username
    ? user.username
        .split(' ')
        .map((name) => name.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
    : '';

  return (
    <>
      <AccountMenu
        userName={user?.username}
        avatarContent={initials}
        navItems={navItems}
        menuItems={menuItems}
      />
      {children}
      {modal}
    </>
  );
}
