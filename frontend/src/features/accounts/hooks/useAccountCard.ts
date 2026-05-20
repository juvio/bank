'use client';

import { useState } from 'react';
import { sanitizeTextInput } from '@utils';

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

  const sanitizedAccountName = sanitizeTextInput(accountName, 80);
  const firstName = sanitizedAccountName.split(' ')[0] ?? sanitizedAccountName;
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
