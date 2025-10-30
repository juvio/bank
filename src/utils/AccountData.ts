import { AccountDataType } from '@/types/accountData.type';

export const AccountData: AccountDataType = {
  customer: {
    name: 'Joana da Silva',
  },
  transactions: [
    {
      id: 0,
      value: 400,
      date: '01-01-2025',
      type: 'Transferência',
    },
    {
      id: 1,
      value: 200,
      date: '02-01-2025',
      type: 'TED',
    },
    {
      id: 2,
      value: 800,
      date: '03-01-2025',
      type: 'PIX',
    },
  ],
};
