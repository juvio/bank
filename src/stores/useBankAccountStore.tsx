import { TransactionType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import mock from "@/mocks/mock.json";

type AccountBankStore = {
  transaction: TransactionType;
  setTransaction: (transaction: TransactionType) => void;
  transactionShouldReset: boolean;
  resetTransaction: (shouldReset: boolean) => void;
  transactions: TransactionType[];
  addTransaction: (newTransaction: TransactionType) => void;
  removeTransaction: (id: number) => void;
  editTransaction: (id: number, updatedItem: Partial<TransactionType>) => void;
};

const mockTransactions = (
  mock as unknown as {
    transactions: Array<{
      id: string;
      type: string;
      amount: number;
      description: string;
      date: string;
      status: string;
    }>;
  }
).transactions.map((transaction) => ({
  id: Number(transaction.id),
  type: transaction.type,
  amount: transaction.amount,
  description: transaction.description,
  date: transaction.date,
}));

export const useBankAccountStore = create<AccountBankStore>()(
  persist(
    (set) => ({
      transaction: {} as TransactionType,
      setTransaction: (transaction: TransactionType) => set({ transaction: transaction }),
      transactionShouldReset: false,
      resetTransaction: (shouldReset: boolean) => set({ transactionShouldReset: shouldReset }),
      transactions: mockTransactions,
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
          transactions: state.transactions.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)),
        })),
    }),
    {
      name: "AccountStorage",
    }
  )
);
