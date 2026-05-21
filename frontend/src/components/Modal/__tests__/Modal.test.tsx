import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ModalComponent from '../index';

const { useModalStoreMock, useBankAccountStoreMock, useTransactionValidationMock, routerBackMock, revalidateHomeMock } =
  vi.hoisted(() => ({
    useModalStoreMock: vi.fn(),
    useBankAccountStoreMock: vi.fn(),
    useTransactionValidationMock: vi.fn(),
    routerBackMock: vi.fn(),
    revalidateHomeMock: vi.fn(),
  }));

vi.mock('@stores', () => ({
  useModalStore: useModalStoreMock,
  useBankAccountStore: useBankAccountStoreMock,
}));

vi.mock('@hooks', () => ({
  useTransactionValidation: useTransactionValidationMock,
}));

vi.mock('@core/config', () => ({
  revalidateHome: revalidateHomeMock,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: routerBackMock,
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('ModalComponent', () => {
  beforeEach(() => {
    useTransactionValidationMock.mockReturnValue({
      errors: '',
      isFormValid: () => true,
      handleAmountBlur: vi.fn(),
    });
  });

  it('handles add transaction flow', async () => {
    const addTransaction = vi.fn().mockResolvedValue(undefined);
    const fetchBalance = vi.fn().mockResolvedValue(undefined);
    const resetTransaction = vi.fn();
    const setAddModal = vi.fn();

    useModalStoreMock.mockReturnValue({
      editModal: false,
      addModal: true,
      deleteModal: false,
      viewModal: false,
      setAddModal,
      setEditModal: vi.fn(),
      setDeleteModal: vi.fn(),
      setViewModal: vi.fn(),
    });

    useBankAccountStoreMock.mockReturnValue({
      transaction: {
        id: 1,
        type: 'deposit',
        amount: 50,
        date: '2026-05-18',
      },
      addTransaction,
      fetchBalance,
      resetTransaction,
      editTransaction: vi.fn(),
      removeTransaction: vi.fn(),
    });

    render(<ModalComponent />);

    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => {
      expect(addTransaction).toHaveBeenCalledTimes(1);
    });

    expect(fetchBalance).toHaveBeenCalledTimes(1);
    expect(revalidateHomeMock).toHaveBeenCalledTimes(1);
    expect(setAddModal).toHaveBeenCalledWith(false);
    expect(resetTransaction).toHaveBeenCalledWith(true);
    expect(routerBackMock).toHaveBeenCalledTimes(1);
  });
});
