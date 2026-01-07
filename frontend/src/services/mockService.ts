import mockData from '@/mocks/mock.json';
import { TransactionType, Transactions } from '@/types';

const convertMockTransactions = (): TransactionType[] => {
  return mockData.transactions.map((t) => ({
    id: parseInt(t.id),
    type: t.type,
    amount: t.amount,
    description: t.description,
    date: t.date,
  }));
};

export const convertMockToTransactions = (): Transactions => {
  return mockData.transactions.map((t) => ({
    id: t.id,
    accountId: '1', // ID de conta padrão para mock
    type: t.type as 'payment' | 'deposit' | 'withdraw' | 'transfer',
    value: t.amount,
    date: t.date,
  }));
};

const mockState = {
  balance: mockData.account.balance,
  transactions: convertMockTransactions(),
  user: {
    id: '1',
    username: mockData.account.userName,
    email: 'user@test.com',
  },
  nextTransactionId: mockData.transactions.length + 1,
};

// Credenciais válidas para login mockado
const MOCK_CREDENTIALS = {
  email: 'user@test.com',
  password: '123456',
};

const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockService = {
  login: async (email: string, password: string) => {
    await delay();

    if (
      email === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password
    ) {
      // Simula um token JWT
      const mockToken = btoa(
        JSON.stringify({
          id: mockState.user.id,
          username: mockState.user.username,
          email: mockState.user.email,
          exp: Date.now() + 86400000, // 24h
        })
      );

      return {
        result: {
          token: `mock.${mockToken}.signature`,
        },
      };
    }

    throw new Error('Credenciais inválidas');
  },

  register: async (username: string, email: string) => {
    await delay();

    if (email === MOCK_CREDENTIALS.email) {
      throw new Error('Email já cadastrado');
    }

    return {
      message: 'Usuário criado com sucesso',
      result: {
        id: '2',
        username,
        email,
      },
    };
  },

  getAccount: async () => {
    await delay();

    return {
      result: {
        balance: mockState.balance,
        accountNumber: '12345-6',
        user: mockState.user,
      },
    };
  },

  getTransactions: async (page: number = 0, limit: number = 10) => {
    await delay();

    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedTransactions = mockState.transactions.slice(
      startIndex,
      endIndex
    );
    const hasMore = endIndex < mockState.transactions.length;

    return {
      data: paginatedTransactions,
      currentPage: page,
      nextPage: hasMore ? page + 1 : null,
      totalTransactions: mockState.transactions.length,
    };
  },

  addTransaction: async (transaction: {
    type: string;
    amount: number;
    description: string;
    date: string;
    attachment?: File;
  }) => {
    await delay();

    const newTransaction: TransactionType = {
      id: mockState.nextTransactionId++,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
    };

    if (transaction.attachment) {
      newTransaction.attachmentUrl = URL.createObjectURL(
        transaction.attachment
      );
    }

    if (transaction.type === 'deposit') {
      mockState.balance += transaction.amount;
    } else if (['withdraw', 'payment', 'transfer'].includes(transaction.type)) {
      mockState.balance -= transaction.amount;
    }

    mockState.transactions.unshift(newTransaction);

    return {
      result: newTransaction,
      message: 'Transação criada com sucesso',
    };
  },

  editTransaction: async (
    id: number,
    updatedData: {
      type?: string;
      amount?: number;
      description?: string;
      date?: string;
    }
  ) => {
    await delay();

    const index = mockState.transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error('Transação não encontrada');
    }

    const oldTransaction = mockState.transactions[index];

    if (oldTransaction.type === 'deposit') {
      mockState.balance -= oldTransaction.amount;
    } else if (
      ['withdraw', 'payment', 'transfer'].includes(oldTransaction.type)
    ) {
      mockState.balance += oldTransaction.amount;
    }

    const updatedTransaction = {
      ...oldTransaction,
      ...updatedData,
    };

    mockState.transactions[index] = updatedTransaction;

    if (updatedTransaction.type === 'deposit') {
      mockState.balance += updatedTransaction.amount;
    } else if (
      ['withdraw', 'payment', 'transfer'].includes(updatedTransaction.type)
    ) {
      mockState.balance -= updatedTransaction.amount;
    }

    return {
      result: updatedTransaction,
      message: 'Transação atualizada com sucesso',
    };
  },

  deleteTransaction: async (id: number) => {
    await delay();

    const index = mockState.transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error('Transação não encontrada');
    }

    const transaction = mockState.transactions[index];

    if (transaction.type === 'deposit') {
      mockState.balance -= transaction.amount;
    } else if (['withdraw', 'payment', 'transfer'].includes(transaction.type)) {
      mockState.balance += transaction.amount;
    }

    mockState.transactions.splice(index, 1);

    return {
      message: 'Transação removida com sucesso',
    };
  },
};
