import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TransactionFilter from '../TransactionFilter';

const { useTransactionFilterMock } = vi.hoisted(() => ({
  useTransactionFilterMock: vi.fn(),
}));

vi.mock('@mui/icons-material', () => {
  const Icon = () => <span aria-hidden='true' />;

  return {
    AccountBalance: Icon,
    AttachMoney: Icon,
    CalendarMonth: Icon,
    Clear: Icon,
    ExpandMore: Icon,
    FilterList: Icon,
    Payment: Icon,
    Search: Icon,
    SwapHoriz: Icon,
  };
});

vi.mock('@features/transactions/hooks', () => ({
  useTransactionFilter: useTransactionFilterMock,
}));

describe('TransactionFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useTransactionFilterMock.mockReturnValue({
      activeFiltersCount: 0,
      handleClearFilters: vi.fn(),
      handleClearSearchTerm: vi.fn(),
      handleFilterPeriodChange: vi.fn(),
      handleFilterTypeChange: vi.fn(),
      handleSearchTermChange: vi.fn(),
      handleToggleExpand: vi.fn(),
      isExpanded: false,
      showClearButton: false,
    });
  });

  it('renders search input and filter controls', () => {
    render(
      <TransactionFilter
        filterType='all'
        filterPeriod='all'
        searchTerm=''
        onFilterTypeChange={vi.fn()}
        onFilterPeriodChange={vi.fn()}
        onSearchTermChange={vi.fn()}
        onClearFilters={vi.fn()}
      />,
    );

    expect(
      screen.getByPlaceholderText(/buscar por tipo ou valor/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^filtros$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /expandir filtros/i }),
    ).toBeInTheDocument();
  });

  it('renders expanded filter options and wires hook callbacks', () => {
    const handleClearFilters = vi.fn();
    const handleFilterTypeChange = vi.fn();
    const handleSearchTermChange = vi.fn();
    const handleToggleExpand = vi.fn();

    useTransactionFilterMock.mockReturnValue({
      activeFiltersCount: 2,
      handleClearFilters,
      handleClearSearchTerm: vi.fn(),
      handleFilterPeriodChange: vi.fn(),
      handleFilterTypeChange,
      handleSearchTermChange,
      handleToggleExpand,
      isExpanded: true,
      showClearButton: true,
    });

    render(
      <TransactionFilter
        filterType='deposit'
        filterPeriod='month'
        searchTerm='pix'
        onFilterTypeChange={vi.fn()}
        onFilterPeriodChange={vi.fn()}
        onSearchTermChange={vi.fn()}
        onClearFilters={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/buscar por tipo ou valor/i), {
      target: { value: 'deposito' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^filtros$/i }));
    fireEvent.click(screen.getByText(/pagamento/i));
    fireEvent.click(screen.getByText(/limpar filtros/i));

    expect(screen.getByText(/tipo de transa/i)).toBeInTheDocument();
    expect(screen.getByText(/30 dias/i)).toBeInTheDocument();
    expect(handleSearchTermChange).toHaveBeenCalledTimes(1);
    expect(handleToggleExpand).toHaveBeenCalledTimes(1);
    expect(handleFilterTypeChange).toHaveBeenCalledTimes(1);
    expect(handleClearFilters).toHaveBeenCalledTimes(1);
  });
});
