'use client';

import dynamic from 'next/dynamic';

const TransactionContent = dynamic(
  () => import('@features/transactions/components/TransactionContent'),
  {
    ssr: false,
    loading: () => <div>Carregando...</div>,
  }
);

export default function TransactionPage() {
  return <TransactionContent />;
}
