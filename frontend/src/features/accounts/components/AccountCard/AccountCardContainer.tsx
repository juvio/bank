'use client';

import { useAccountCard } from '../../hooks/useAccountCard';
import { AccountCard } from './AccountCard';
import type { AccountCardProps } from './types';

export function AccountCardContainer(props: AccountCardProps) {
  const accountCard = useAccountCard(props);

  return <AccountCard {...props} {...accountCard} />;
}
