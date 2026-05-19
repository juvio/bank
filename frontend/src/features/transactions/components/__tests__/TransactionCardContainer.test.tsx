import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TransactionCardContainer } from '../TransactionCard/TransactionCardContainer';

const { TransactionCardMock, useTransactionCardMock } = vi.hoisted(() => ({
  TransactionCardMock: vi.fn(() => <div data-testid='transaction-card-ui' />),
  useTransactionCardMock: vi.fn(),
}));

vi.mock('@mui/icons-material', () => {
  const Icon = () => <span aria-hidden='true' />;

  return new Proxy(
    {},
    {
      get: () => Icon,
    },
  );
});

vi.mock('../TransactionCard/TransactionCard', () => ({
  TransactionCard: TransactionCardMock,
}));

vi.mock('../../hooks/useTransactionCard', () => ({
  useTransactionCard: useTransactionCardMock,
}));

describe('TransactionCardContainer', () => {
  it('combines useTransactionCard with the presentational card', () => {
    useTransactionCardMock.mockReturnValue({
      anchorEl: null,
      amountColor: '#2e7d32',
      borderColor: '#2e7d32',
      formattedAmount: '+R$ 100.00',
      formattedDate: '18/05/2026',
      handleClick: vi.fn(),
      handleClose: vi.fn(),
      handleOpenDeleteModal: vi.fn(),
      handleOpenEditModal: vi.fn(),
      handleOpenViewModal: vi.fn(),
      open: false,
      TransactionIcon: () => <span data-testid='transaction-icon' />,
      transactionTypeLabel: 'Deposito',
    });

    render(
      <TransactionCardContainer
        id={1}
        type='deposit'
        amount={100}
        description='PIX recebido'
        date='2026-05-18'
      />,
    );

    expect(useTransactionCardMock).toHaveBeenCalledWith({
      id: 1,
      type: 'deposit',
      amount: 100,
      description: 'PIX recebido',
      date: '2026-05-18',
    });
    expect(TransactionCardMock).toHaveBeenCalledWith(
      {
        id: 1,
        type: 'deposit',
        amount: 100,
        description: 'PIX recebido',
        date: '2026-05-18',
        anchorEl: null,
        amountColor: '#2e7d32',
        borderColor: '#2e7d32',
        formattedAmount: '+R$ 100.00',
        formattedDate: '18/05/2026',
        handleClick: expect.any(Function),
        handleClose: expect.any(Function),
        handleOpenDeleteModal: expect.any(Function),
        handleOpenEditModal: expect.any(Function),
        handleOpenViewModal: expect.any(Function),
        open: false,
        TransactionIcon: expect.any(Function),
        transactionTypeLabel: 'Deposito',
      },
      undefined,
    );
    expect(screen.getByTestId('transaction-card-ui')).toBeInTheDocument();
  });
});
