import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TransactionContent from '../TransactionContent';

const { useTransactionContentMock } = vi.hoisted(() => ({
  useTransactionContentMock: vi.fn(),
}));

vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@features/transactions/hooks', () => ({
  useTransactionContent: useTransactionContentMock,
}));

vi.mock('../TransactionFilter', () => ({
  default: () => <div data-testid='transaction-filter' />,
}));

vi.mock('../TransactionCard', () => ({
  default: ({ id, amount }: { id: number; amount: number }) => (
    <div data-testid='transaction-card'>
      transaction-{id}-{amount}
    </div>
  ),
}));

function mockContent(overrides = {}) {
  useTransactionContentMock.mockReturnValue({
    canLoadMore: true,
    emptyStateMessage: 'Nenhuma transacao encontrada',
    filterPeriod: 'all',
    filterType: 'all',
    filteredTransactions: [
      {
        id: 1,
        type: 'deposit',
        amount: 100,
        description: 'PIX recebido',
        date: '2026-05-18',
      },
    ],
    handleClearFilters: vi.fn(),
    hasFilteredTransactions: true,
    isInitialLoading: false,
    isLoading: false,
    loadMore: vi.fn(),
    page: 0,
    searchTerm: '',
    setFilterPeriod: vi.fn(),
    setFilterType: vi.fn(),
    setSearchTerm: vi.fn(),
    ...overrides,
  });
}

describe('TransactionContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockContent();
  });

  it('renders header, filter and transaction cards', () => {
    render(<TransactionContent />);

    expect(screen.getByText(/suas transa/i)).toBeInTheDocument();
    expect(screen.getByTestId('transaction-filter')).toBeInTheDocument();
    expect(screen.getByRole('feed')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-card')).toHaveTextContent(
      'transaction-1-100',
    );
  });

  it('renders initial loading state', () => {
    mockContent({
      filteredTransactions: [],
      hasFilteredTransactions: false,
      isInitialLoading: true,
      isLoading: true,
    });

    render(<TransactionContent />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText(/carregando transa/i)).toBeInTheDocument();
  });

  it('renders empty state message', () => {
    mockContent({
      emptyStateMessage: 'Ajuste os filtros e tente novamente.',
      filteredTransactions: [],
      hasFilteredTransactions: false,
    });

    render(<TransactionContent />);

    expect(screen.getByText(/nenhuma transa/i)).toBeInTheDocument();
    expect(
      screen.getByText('Ajuste os filtros e tente novamente.'),
    ).toBeInTheDocument();
  });
});
