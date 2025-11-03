import type { Metadata } from 'next';
import AccountMenu from '@/components/AccountMenu';

export const metadata: Metadata = {
  title: 'SuperBank',
  description: 'Your banking solution',
};

export default function CustomerLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <AccountMenu />
      {children}
      {modal}
    </>
  );
}
