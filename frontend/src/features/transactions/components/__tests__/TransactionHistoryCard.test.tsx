import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TransactionHistoryCard from '../TransactionHistoryCard';

const { useTransactionHistoryCardMock } = vi.hoisted(() => ({
  useTransactionHistoryCardMock: vi.fn(),
}));

vi.mock('@features/transactions/hooks', () => ({
  useTransactionHistoryCard: useTransactionHistoryCardMock,
}));

describe('TransactionHistoryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useTransactionHistoryCardMock.mockReturnValue({
      recentTransactions: [
        {
          id: 1,
          date: '18/05/2026',
          type: 'Deposito',
          description: 'PIX recebido',
          amount: '+R$ 100,00',
          amountColor: 'success.main',
        },
      ],
    });
  });

  it('renders transaction history table', () => {
    render(<TransactionHistoryCard transactions={[]} />);

    expect(screen.getByText(/hist/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('18/05/2026')).toBeInTheDocument();
    expect(screen.getByText('Deposito')).toBeInTheDocument();
    expect(screen.getByText('PIX recebido')).toBeInTheDocument();
    expect(screen.getByText('+R$ 100,00')).toBeInTheDocument();
  });

  it('renders empty table state', () => {
    useTransactionHistoryCardMock.mockReturnValue({
      recentTransactions: [],
    });

    render(<TransactionHistoryCard transactions={[]} />);

    expect(screen.getByText(/nenhuma transa/i)).toBeInTheDocument();
  });
});
