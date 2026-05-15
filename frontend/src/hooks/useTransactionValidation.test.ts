import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTransactionValidation } from './useTransactionValidation';

describe('useTransactionValidation', () => {
  it('should initialize with empty errors', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(100, 'transfer', '2024-05-15'),
    );

    expect(result.current.errors).toBe('');
  });

  it('should validate amount correctly with valid number', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(50.5, 'transfer', '2024-05-15'),
    );

    expect(result.current.isAmountValid()).toBe(true);
  });

  it('should invalidate amount when it is 0', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(0, 'transfer', '2024-05-15'),
    );

    expect(result.current.isAmountValid()).toBe(false);
  });

  it('should invalidate amount when it is undefined', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(undefined, 'transfer', '2024-05-15'),
    );

    expect(result.current.isAmountValid()).toBe(false);
  });

  it('should invalidate amount when it is NaN', () => {
    const { result } = renderHook(() =>
      useTransactionValidation('invalid', 'transfer', '2024-05-15'),
    );

    expect(result.current.isAmountValid()).toBe(false);
  });

  it('should validate form with all valid inputs', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(100, 'transfer', '2024-05-15'),
    );

    expect(result.current.isFormValid()).toBe(true);
  });

  it('should invalidate form with empty type', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(100, '', '2024-05-15'),
    );

    expect(result.current.isFormValid()).toBe(false);
  });

  it('should invalidate form with empty date', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(100, 'transfer', ''),
    );

    expect(result.current.isFormValid()).toBe(false);
  });

  it('should set error message on handleAmountBlur with invalid amount', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(undefined, 'transfer', '2024-05-15'),
    );

    act(() => {
      result.current.handleAmountBlur();
    });

    expect(result.current.errors).toBe('Valor obrigatório');
  });

  it('should set error message on handleAmountBlur with NaN', () => {
    const { result } = renderHook(() =>
      useTransactionValidation('invalid', 'transfer', '2024-05-15'),
    );

    act(() => {
      result.current.handleAmountBlur();
    });

    expect(result.current.errors).toBe('Valor inválido');
  });

  it('should clear error message on handleAmountBlur with valid amount', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(100, 'transfer', '2024-05-15'),
    );

    // First set an error
    act(() => {
      result.current.setErrors('Some error');
    });

    expect(result.current.errors).toBe('Some error');

    // Now clear it
    act(() => {
      result.current.handleAmountBlur();
    });

    expect(result.current.errors).toBe('');
  });
});
