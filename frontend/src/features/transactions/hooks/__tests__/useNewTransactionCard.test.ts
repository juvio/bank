import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNewTransactionCard } from '../useNewTransactionCard';
import type { TransactionType } from '@types';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  setAddModal: vi.fn(),
  setDeleteModal: vi.fn(),
  setEditModal: vi.fn(),
  setTransaction: vi.fn(),
  bankState: {
    transactions: [] as TransactionType[],
    transactionShouldReset: false,
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mocks.push,
  }),
}));

vi.mock('@stores', () => ({
  useModalStore: () => ({
    setAddModal: mocks.setAddModal,
    setDeleteModal: mocks.setDeleteModal,
    setEditModal: mocks.setEditModal,
  }),
  useBankAccountStore: () => ({
    ...mocks.bankState,
    setTransaction: mocks.setTransaction,
  }),
}));

const transactions: TransactionType[] = [
  { id: 1, type: 'deposit', amount: 1200, date: '2026-05-18' },
  { id: 2, type: 'payment', amount: 150, date: '2026-05-12' },
  { id: 3, type: 'transfer', amount: 80, date: '2026-04-10' },
  { id: 4, type: 'withdraw', amount: 30, date: '2025-01-10' },
];

describe('useNewTransactionCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-18T12:00:00'));
    mocks.bankState.transactions = [...transactions];
    mocks.bankState.transactionShouldReset = false;
  });

  it("initializes a new transaction with the next id and today's date", () => {
    const { result } = renderHook(() => useNewTransactionCard());

    expect(result.current.newTransaction).toEqual({
      id: 5,
      type: '',
      amount: '',
      description: '',
      date: '2026-05-18',
      attachment: null,
    });
    expect(result.current.datePickerValue.format('YYYY-MM-DD')).toBe(
      '2026-05-18',
    );
    expect(result.current.maxDate.format('YYYY-MM-DD')).toBe('2026-05-18');
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it('updates form fields and attached file', () => {
    const file = new File(['receipt'], 'receipt.pdf', {
      type: 'application/pdf',
    });
    const { result } = renderHook(() => useNewTransactionCard());

    act(() => {
      result.current.handleTypeChange('deposit');
      result.current.handleAmountChange('250');
      result.current.handleDescriptionChange('  <b>PIX recebido</b>  ');
      result.current.handleDateChange(dayjs('2026-05-10'));
      result.current.handleFileChange({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.newTransaction).toMatchObject({
      type: 'deposit',
      amount: '250',
      description: '  <b>PIX recebido</b>  ',
      date: '2026-05-10',
      attachment: file,
    });
    expect(result.current.isSubmitDisabled).toBe(false);

    act(() => {
      result.current.handleRemoveFile();
    });

    expect(result.current.newTransaction.attachment).toBeNull();
  });

  it('validates amount on blur and opens add modal with a valid payload', () => {
    const file = new File(['receipt'], 'receipt.pdf', {
      type: 'application/pdf',
    });
    const { result } = renderHook(() => useNewTransactionCard());

    act(() => {
      result.current.handleAmountBlur();
    });
    expect(result.current.errors).toContain('Valor');

    act(() => {
      result.current.handleTypeChange('withdraw');
      result.current.handleAmountChange('99');
      result.current.handleDescriptionChange(
        '  <img src=x onerror="x"> Saque com espaços  ',
      );
      result.current.handleFileChange({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleOpenModal();
    });

    expect(mocks.setTransaction).toHaveBeenCalledWith({
      id: 0,
      type: 'withdraw',
      amount: 99,
      description: 'Saque com espaços',
      date: '2026-05-18',
      attachment: file,
      attachmentType: 'application/pdf',
    });
    expect(mocks.setEditModal).toHaveBeenCalledWith(false);
    expect(mocks.setDeleteModal).toHaveBeenCalledWith(false);
    expect(mocks.setAddModal).toHaveBeenCalledWith(true);
    expect(mocks.push).toHaveBeenCalledWith('/transaction');
  });

  it('does not open add modal when form is invalid', () => {
    const { result } = renderHook(() => useNewTransactionCard());

    act(() => {
      result.current.handleOpenModal();
    });

    expect(mocks.setTransaction).not.toHaveBeenCalled();
    expect(mocks.setAddModal).not.toHaveBeenCalled();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it('resets the form when the store requests a reset', () => {
    const { result, rerender } = renderHook(() => useNewTransactionCard());

    act(() => {
      result.current.handleTypeChange('deposit');
      result.current.handleAmountChange('250');
    });

    mocks.bankState.transactionShouldReset = true;

    act(() => {
      rerender();
    });

    expect(result.current.newTransaction).toEqual({
      id: 5,
      type: '',
      amount: '',
      description: '',
      date: '2026-05-18',
      attachment: null,
    });
  });
});
