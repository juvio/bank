import type { Metadata } from 'next';
import AccountMenu from '@/components/AccountMenu/AccountMenu';

export const metadata: Metadata = {
  title: 'SuperBank',
  description: 'Your banking solution',
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountMenu />
      {children}
    </>
  );
}
