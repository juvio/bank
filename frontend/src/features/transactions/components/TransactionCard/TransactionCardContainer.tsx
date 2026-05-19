'use client';

import { useTransactionCard } from '../../hooks/useTransactionCard';
import { TransactionCard } from './TransactionCard';
import type { TransactionCardProps } from './types';

export function TransactionCardContainer(props: TransactionCardProps) {
  const transactionCard = useTransactionCard(props);

  return <TransactionCard {...props} {...transactionCard} />;
}
