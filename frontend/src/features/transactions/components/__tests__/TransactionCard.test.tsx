import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TransactionCard from '../TransactionCard';

const { useTransactionCardMock } = vi.hoisted(() => ({
  useTransactionCardMock: vi.fn(),
}));

vi.mock('@mui/icons-material', () => {
  const Icon = () => <span aria-hidden='true' />;

  return {
    Delete: Icon,
    Edit: Icon,
    MoreVert: Icon,
    Visibility: Icon,
  };
});

vi.mock('@features/transactions/hooks', () => ({
  useTransactionCard: useTransactionCardMock,
}));

describe('TransactionCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();

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
  });

  it('renders transaction summary and action buttons', () => {
    render(
      <TransactionCard
        id={1}
        type='deposit'
        amount={100}
        description='PIX recebido'
        date='2026-05-18'
      />,
    );

    expect(screen.getByText('Deposito')).toBeInTheDocument();
    expect(screen.getByText('18/05/2026')).toBeInTheDocument();
    expect(screen.getByText('+R$ 100.00')).toBeInTheDocument();
    expect(screen.getByLabelText(/ver detalhes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/editar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remover/i)).toBeInTheDocument();
  });

  it('wires action callbacks and mobile menu items', () => {
    const handleClick = vi.fn();
    const handleOpenDeleteModal = vi.fn();
    const handleOpenEditModal = vi.fn();
    const handleOpenViewModal = vi.fn();

    useTransactionCardMock.mockReturnValue({
      anchorEl: document.body,
      amountColor: '#d32f2f',
      borderColor: '#d32f2f',
      formattedAmount: '-R$ 75.00',
      formattedDate: '18/05/2026',
      handleClick,
      handleClose: vi.fn(),
      handleOpenDeleteModal,
      handleOpenEditModal,
      handleOpenViewModal,
      open: true,
      TransactionIcon: () => <span data-testid='transaction-icon' />,
      transactionTypeLabel: 'Pagamento',
    });

    const { container } = render(
      <TransactionCard
        id={2}
        type='payment'
        amount={75}
        description='Boleto'
        date='2026-05-18'
      />,
    );

    fireEvent.click(screen.getByLabelText(/ver detalhes/i));
    fireEvent.click(screen.getByLabelText(/editar/i));
    fireEvent.click(screen.getByLabelText(/remover/i));

    const menuButton = container.querySelector('button:not([aria-label])');
    expect(menuButton).toBeDefined();
    fireEvent.click(menuButton as HTMLButtonElement);
    fireEvent.click(screen.getByText(/visualizar/i));
    fireEvent.click(screen.getByText(/excluir/i));

    expect(handleOpenViewModal).toHaveBeenCalledTimes(2);
    expect(handleOpenEditModal).toHaveBeenCalledTimes(1);
    expect(handleOpenDeleteModal).toHaveBeenCalledTimes(2);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
