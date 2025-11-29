import { TransactionType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/utils/api';

type AccountBankStore = {
  transaction: TransactionType;
  setTransaction: (transaction: TransactionType) => void;
  transactionShouldReset: boolean;
  resetTransaction: (shouldReset: boolean) => void;
  transactions: TransactionType[];
  balance: number;
  balanceNeedsUpdate: boolean;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  fetchTransactions: (page?: number) => Promise<void>;
  fetchBalance: () => Promise<void>;
  addTransaction: (newTransaction: TransactionType) => Promise<void>;
  removeTransaction: (id: number) => Promise<void>;
  editTransaction: (
    id: number,
    updatedItem: Partial<TransactionType>
  ) => Promise<void>;
};

export const useBankAccountStore = create<AccountBankStore>()(
  persist(
    (set, get) => ({
      transaction: {} as TransactionType,
      setTransaction: (transaction: TransactionType) =>
        set({ transaction: transaction }),
      transactionShouldReset: false,
      resetTransaction: (shouldReset: boolean) =>
        set({ transactionShouldReset: shouldReset }),
      transactions: [],
      balance: 0,
      balanceNeedsUpdate: false,
      page: 0,
      hasMore: true,
      isLoading: false,

      fetchBalance: async () => {
        try {
          const data = await api.get('/account');
          if (data.result && typeof data.result.balance === 'number') {
            set({ balance: data.result.balance, balanceNeedsUpdate: false });
          }
        } catch (error) {
          console.error('Erro ao buscar saldo:', error);
        }
      },

      fetchTransactions: async (pageToFetch = 0) => {
        const { isLoading, page } = get();

        if (isLoading) return;
        if (pageToFetch > 0 && pageToFetch <= page) return;

        try {
          set({ isLoading: true });
          const data = await api.get(
            `/api/transactions?page=${pageToFetch}&limit=10`
          );

          set((state) => {
            if (pageToFetch === 0) {
              return {
                transactions: data.data,
                page: pageToFetch,
                hasMore: data.nextPage !== null,
                isLoading: false,
              };
            }

            const existingIds = new Set(state.transactions.map((t) => t.id));
            const newTransactions = data.data.filter(
              (t: TransactionType) => !existingIds.has(t.id)
            );

            return {
              transactions: [...state.transactions, ...newTransactions],
              page: pageToFetch,
              hasMore: data.nextPage !== null,
              isLoading: false,
            };
          });
        } catch (error) {
          console.error('Erro ao buscar transações:', error);
          set({ isLoading: false });
        }
      },

      addTransaction: async (newTransaction: TransactionType) => {
        try {
          const data = await api.post('/api/transactions', {
            type: newTransaction.type,
            amount: newTransaction.amount,
            description: newTransaction.description,
            date: newTransaction.date,
          });

          set((state) => ({
            transactions: [data.result, ...state.transactions],
            balanceNeedsUpdate: true,
          }));
        } catch (error) {
          console.error('Erro ao adicionar transação:', error);
          throw error;
        }
      },

      removeTransaction: async (id: number) => {
        try {
          await api.delete(`/api/transactions/${id}`);

          set((state) => ({
            transactions: state.transactions.filter((item) => item.id !== id),
            balanceNeedsUpdate: true,
          }));
        } catch (error) {
          console.error('Erro ao excluir transação:', error);
          throw error;
        }
      },

      editTransaction: async (
        id: number,
        updatedItem: Partial<TransactionType>
      ) => {
        try {
          const data = await api.put(`/api/transactions/${id}`, {
            type: updatedItem.type,
            amount: updatedItem.amount,
            description: updatedItem.description,
            date: updatedItem.date,
          });

          set((state) => ({
            transactions: state.transactions.map((item) =>
              item.id === id ? data.result : item
            ),
            balanceNeedsUpdate: true,
          }));
        } catch (error) {
          console.error('Erro ao atualizar transação:', error);
          throw error;
        }
      },
    }),
    {
      name: 'AccountStorage',
      partialize: (state) => ({ transaction: state.transaction }),
    }
  )
);
