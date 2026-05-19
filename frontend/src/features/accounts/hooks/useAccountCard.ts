'use client';

import { useState } from 'react';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

type UseAccountCardParams = {
  accountBalance: number;
  accountName: string;
};

export function useAccountCard({
  accountBalance,
  accountName,
}: UseAccountCardParams) {
  const [showBalance, setShowBalance] = useState(true);

  const firstName = accountName.split(' ')[0] ?? accountName;
  const formattedBalance = currencyFormatter.format(accountBalance);

  const handleToggleBalance = () => {
    setShowBalance((currentShowBalance) => !currentShowBalance);
  };

  return {
    firstName,
    formattedBalance,
    handleToggleBalance,
    showBalance,
  };
}
