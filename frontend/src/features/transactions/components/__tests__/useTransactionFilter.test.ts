import { act, renderHook } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useTransactionFilter } from '../../hooks/useTransactionFilter';

describe('useTransactionFilter', () => {
  it('calculates active filters and toggles expansion', () => {
    const { result } = renderHook(() =>
      useTransactionFilter({
        filterType: 'deposit',
        filterPeriod: 'week',
        searchTerm: '',
        onFilterTypeChange: vi.fn(),
        onFilterPeriodChange: vi.fn(),
        onSearchTermChange: vi.fn(),
        onClearFilters: vi.fn(),
      }),
    );

    expect(result.current.activeFiltersCount).toBe(2);
    expect(result.current.showClearButton).toBe(true);
    expect(result.current.isExpanded).toBe(false);

    act(() => {
      result.current.handleToggleExpand();
    });

    expect(result.current.isExpanded).toBe(true);
  });

  it('delegates search, clear and chip selection callbacks', () => {
    const onFilterTypeChange = vi.fn();
    const onFilterPeriodChange = vi.fn();
    const onSearchTermChange = vi.fn();
    const onClearFilters = vi.fn();
    const { result } = renderHook(() =>
      useTransactionFilter({
        filterType: 'all',
        filterPeriod: 'all',
        searchTerm: 'pix',
        onFilterTypeChange,
        onFilterPeriodChange,
        onSearchTermChange,
        onClearFilters,
      }),
    );

    act(() => {
      result.current.handleSearchTermChange({
        target: { value: 'deposito' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleClearSearchTerm();
      result.current.handleFilterTypeChange({
        currentTarget: { dataset: { value: 'payment' } },
      } as React.MouseEvent<HTMLElement>);
      result.current.handleFilterPeriodChange({
        currentTarget: { dataset: { value: 'month' } },
      } as React.MouseEvent<HTMLElement>);
      result.current.handleClearFilters();
    });

    expect(onSearchTermChange).toHaveBeenNthCalledWith(1, 'deposito');
    expect(onSearchTermChange).toHaveBeenNthCalledWith(2, '');
    expect(onFilterTypeChange).toHaveBeenCalledWith('payment');
    expect(onFilterPeriodChange).toHaveBeenCalledWith('month');
    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });
});
