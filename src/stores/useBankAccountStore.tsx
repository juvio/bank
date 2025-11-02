import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AccountBankStore = {
  transaction: TransactionType;
  setTransaction: (transaction: TransactionType) => void;
  transactions: TransactionType[];
  addTransaction: (newTransaction: TransactionType) => void;
  removeTransaction: (id: number) => void;
  editTransaction: (id: number, updatedItem: Partial<TransactionType>) => void;
};

type TransactionType = {
  id: number;
  type: string;
  amount: number;
  description?: string;
};

export const useBankAccountStore = create<AccountBankStore>()(
  persist(
    (set) => ({
      transaction: {} as TransactionType,
      setTransaction: (transaction: TransactionType) =>
        set({ transaction: transaction }),
      transactions: [
        {
          id: 0,
          type: 'Transferência',
          amount: 100,
        },
        {
          id: 1,
          type: 'PIX',
          amount: 200,
        },
        {
          id: 2,
          type: 'Transferência',
          amount: 300,
        },
      ],
      addTransaction: (newTransaction: TransactionType) =>
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        })),
      removeTransaction: (id: number) =>
        set((state) => ({
          transactions: state.transactions.filter((item) => id !== item.id),
        })),
      editTransaction: (id: number, updatedItem: Partial<TransactionType>) =>
        set((state) => ({
          transactions: state.transactions.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          ),
        })),
    }),
    {
      name: 'AccountStorage',
    }
  )
);
