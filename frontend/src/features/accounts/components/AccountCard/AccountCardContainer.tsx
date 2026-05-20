'use client';

import { useAccountCard } from '@features/accounts/hooks';
import { AccountCard } from './AccountCard';
import type { AccountCardProps } from './types';

export function AccountCardContainer(props: AccountCardProps) {
  const accountCard = useAccountCard(props);

  return <AccountCard {...props} {...accountCard} />;
}
