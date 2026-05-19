import { fireEvent, render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TransactionCard } from '../TransactionCard/TransactionCard';
import type { TransactionCardViewProps } from '../TransactionCard/types';

type MockLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>;

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: MockLinkProps) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    >
      {children}
    </a>
  ),
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

const makeProps = (
  overrides: Partial<TransactionCardViewProps> = {},
): TransactionCardViewProps => ({
  anchorEl: null,
  amount: 100,
  amountColor: '#2e7d32',
  borderColor: '#2e7d32',
  date: '2026-05-18',
  description: 'PIX recebido',
  formattedAmount: '+R$ 100.00',
  formattedDate: '18/05/2026',
  handleClick: vi.fn(),
  handleClose: vi.fn(),
  handleOpenDeleteModal: vi.fn(),
  handleOpenEditModal: vi.fn(),
  handleOpenViewModal: vi.fn(),
  id: 1,
  open: false,
  TransactionIcon: () => <span data-testid='transaction-icon' />,
  transactionTypeLabel: 'Deposito',
  type: 'deposit',
  ...overrides,
});

describe('TransactionCard', () => {
  it('renders transaction summary and action buttons', () => {
    render(<TransactionCard {...makeProps()} />);

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

    const { container } = render(
      <TransactionCard
        {...makeProps({
          anchorEl: document.body,
          amount: 75,
          amountColor: '#d32f2f',
          borderColor: '#d32f2f',
          description: 'Boleto',
          formattedAmount: '-R$ 75.00',
          handleClick,
          handleOpenDeleteModal,
          handleOpenEditModal,
          handleOpenViewModal,
          id: 2,
          open: true,
          transactionTypeLabel: 'Pagamento',
          type: 'payment',
        })}
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
