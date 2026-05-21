import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NewTransactionCard from '../NewTransactionCard';

const { useNewTransactionCardMock } = vi.hoisted(() => ({
  useNewTransactionCardMock: vi.fn(),
}));

vi.mock('@mui/icons-material/AttachFile', () => ({
  default: () => <span aria-hidden='true' />,
}));

vi.mock('@mui/icons-material/Close', () => ({
  default: () => <span aria-hidden='true' />,
}));

vi.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock('@mui/x-date-pickers/AdapterDayjs', () => ({
  AdapterDayjs: vi.fn(),
}));

vi.mock('@mui/x-date-pickers/DesktopDatePicker', () => ({
  DesktopDatePicker: ({
    label,
    onChange,
    value,
  }: {
    label: string;
    onChange: (value: Dayjs) => void;
    value: Dayjs;
  }) => (
    <input
      aria-label={label}
      value={value.format('YYYY-MM-DD')}
      onChange={(event) => onChange(dayjs(event.target.value))}
    />
  ),
}));

vi.mock('@features/transactions/hooks', () => ({
  useNewTransactionCard: useNewTransactionCardMock,
}));

describe('NewTransactionCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useNewTransactionCardMock.mockReturnValue({
      datePickerValue: dayjs('2026-05-18'),
      errors: '',
      handleAmountBlur: vi.fn(),
      handleAmountChange: vi.fn(),
      handleDateChange: vi.fn(),
      handleDescriptionChange: vi.fn(),
      handleFileChange: vi.fn(),
      handleOpenModal: vi.fn(),
      handleRemoveFile: vi.fn(),
      handleTypeChange: vi.fn(),
      isSubmitDisabled: true,
      maxDate: dayjs('2026-05-18'),
      newTransaction: {
        id: 1,
        type: '',
        amount: '',
        description: '',
        date: '2026-05-18',
        attachment: null,
      },
    });
  });

  it('renders the new transaction form', () => {
    render(<NewTransactionCard />);

    expect(screen.getByText(/nova transa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de transa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descri/i)).toBeInTheDocument();
    expect(screen.getByText(/anexar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar transa/i })).toBeDisabled();
  });

  it('wires field changes and submit callback', () => {
    const handleAmountBlur = vi.fn();
    const handleAmountChange = vi.fn();
    const handleDateChange = vi.fn();
    const handleDescriptionChange = vi.fn();
    const handleOpenModal = vi.fn();

    useNewTransactionCardMock.mockReturnValue({
      datePickerValue: dayjs('2026-05-18'),
      errors: '',
      handleAmountBlur,
      handleAmountChange,
      handleDateChange,
      handleDescriptionChange,
      handleFileChange: vi.fn(),
      handleOpenModal,
      handleRemoveFile: vi.fn(),
      handleTypeChange: vi.fn(),
      isSubmitDisabled: false,
      maxDate: dayjs('2026-05-18'),
      newTransaction: {
        id: 1,
        type: 'deposit',
        amount: '100',
        description: 'PIX recebido',
        date: '2026-05-18',
        attachment: null,
      },
    });

    render(<NewTransactionCard />);

    fireEvent.change(screen.getByLabelText(/valor/i), {
      target: { value: '250' },
    });
    fireEvent.blur(screen.getByLabelText(/valor/i));
    fireEvent.change(screen.getByLabelText(/data/i), {
      target: { value: '2026-05-10' },
    });
    fireEvent.change(screen.getByLabelText(/descri/i), {
      target: { value: 'Nova descricao' },
    });
    fireEvent.click(screen.getByRole('button', { name: /criar transa/i }));

    expect(handleAmountChange).toHaveBeenCalledWith('250');
    expect(handleAmountBlur).toHaveBeenCalledTimes(1);
    expect(handleDateChange).toHaveBeenCalledTimes(1);
    expect(handleDescriptionChange).toHaveBeenCalledWith('Nova descricao');
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  it('renders attached file and remove button', () => {
    const handleRemoveFile = vi.fn();

    useNewTransactionCardMock.mockReturnValue({
      datePickerValue: dayjs('2026-05-18'),
      errors: '',
      handleAmountBlur: vi.fn(),
      handleAmountChange: vi.fn(),
      handleDateChange: vi.fn(),
      handleDescriptionChange: vi.fn(),
      handleFileChange: vi.fn(),
      handleOpenModal: vi.fn(),
      handleRemoveFile,
      handleTypeChange: vi.fn(),
      isSubmitDisabled: false,
      maxDate: dayjs('2026-05-18'),
      newTransaction: {
        id: 1,
        type: 'deposit',
        amount: '100',
        description: '',
        date: '2026-05-18',
        attachment: { name: 'comprovante.pdf' },
      },
    });

    render(<NewTransactionCard />);

    expect(screen.getByText(/trocar/i)).toBeInTheDocument();
    expect(screen.getByText(/comprovante.pdf/i)).toBeInTheDocument();

    const removeButton = screen
      .getAllByRole('button')
      .find((button) => button.textContent === '');

    expect(removeButton).toBeDefined();
    fireEvent.click(removeButton as HTMLButtonElement);

    expect(handleRemoveFile).toHaveBeenCalledTimes(1);
  });
});
