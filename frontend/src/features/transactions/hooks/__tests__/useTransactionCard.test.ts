import { act, renderHook } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTransactionCard } from '../useTransactionCard';

const mocks = vi.hoisted(() => ({
  setAddModal: vi.fn(),
  setDeleteModal: vi.fn(),
  setEditModal: vi.fn(),
  setTransaction: vi.fn(),
  setViewModal: vi.fn(),
}));

vi.mock('@stores', () => ({
  useModalStore: () => ({
    setAddModal: mocks.setAddModal,
    setDeleteModal: mocks.setDeleteModal,
    setEditModal: mocks.setEditModal,
    setViewModal: mocks.setViewModal,
  }),
  useBankAccountStore: () => ({
    setTransaction: mocks.setTransaction,
  }),
}));

vi.mock('../../components/TransactionCard/styles', () => ({
  getTransactionAmountColor: vi.fn(() => '#2e7d32'),
  getTransactionBorderColor: vi.fn(() => '#2e7d32'),
  getTransactionIcon: vi.fn(() => () => null),
}));

describe('useTransactionCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('formats transaction data and opens menu anchor', () => {
    const anchor = document.createElement('button');
    const { result } = renderHook(() =>
      useTransactionCard({
        id: 1,
        type: 'deposit',
        amount: 100,
        description: 'PIX recebido',
        date: '2026-05-18',
      }),
    );

    expect(result.current.formattedAmount).toBe('+R$ 100.00');
    expect(result.current.transactionTypeLabel).toContain('Dep');
    expect(result.current.open).toBe(false);

    act(() => {
      result.current.handleClick({
        currentTarget: anchor,
      } as unknown as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.anchorEl).toBe(anchor);
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.anchorEl).toBeNull();
  });

  it('opens edit, delete and view modals with the selected transaction', () => {
    const { result } = renderHook(() =>
      useTransactionCard({
        id: 8,
        type: 'payment',
        amount: 75,
        description: 'Boleto',
        date: '2026-05-18',
        attachmentUrl: 'receipt.pdf',
        attachmentType: 'application/pdf',
      }),
    );

    act(() => {
      result.current.handleOpenEditModal();
    });

    expect(mocks.setAddModal).toHaveBeenCalledWith(false);
    expect(mocks.setDeleteModal).toHaveBeenCalledWith(false);
    expect(mocks.setViewModal).toHaveBeenCalledWith(false);
    expect(mocks.setTransaction).toHaveBeenCalledWith({
      id: 8,
      type: 'payment',
      amount: 75,
      description: 'Boleto',
      date: '2026-05-18',
      attachmentUrl: 'receipt.pdf',
      attachmentType: 'application/pdf',
    });
    expect(mocks.setEditModal).toHaveBeenCalledWith(true);

    act(() => {
      result.current.handleOpenDeleteModal();
    });

    expect(mocks.setEditModal).toHaveBeenCalledWith(false);
    expect(mocks.setDeleteModal).toHaveBeenCalledWith(true);

    act(() => {
      result.current.handleOpenViewModal();
    });

    expect(mocks.setDeleteModal).toHaveBeenCalledWith(false);
    expect(mocks.setViewModal).toHaveBeenCalledWith(true);
  });
});
