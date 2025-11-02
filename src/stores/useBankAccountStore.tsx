import { create } from 'zustand';

type AccountBankStore = {
  transactions: TransactionType[];
  addTransaction: (newTransaction: TransactionType) => void;
  removeTransaction: (id: number) => void;
  editTransaction: (id: number, updatedItem: Partial<TransactionType>) => void;
};

type TransactionType = {
  id: number;
  type: string;
  value: number;
};

export const useBankAccountStore = create<AccountBankStore>((set) => ({
  transactions: [
    {
      id: 0,
      type: 'Transferência',
      value: 100,
    },
    {
      id: 1,
      type: 'PIX',
      value: 200,
    },
    {
      id: 2,
      type: 'Transferência',
      value: 300,
    },
  ],
  addTransaction: (newTransaction: TransactionType) =>
    set((state) => ({ transactions: [...state.transactions, newTransaction] })),
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
}));
