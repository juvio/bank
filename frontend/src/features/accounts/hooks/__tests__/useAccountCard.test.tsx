import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAccountCard } from '../useAccountCard';

describe('useAccountCard', () => {
  it('formats balance and extracts the first name', () => {
    const { result } = renderHook(() =>
      useAccountCard({
        accountBalance: 1250.75,
        accountName: 'Carolina Silva',
      }),
    );

    expect(result.current.firstName).toBe('Carolina');
    expect(result.current.formattedBalance).toMatch(/1\.250,75/);
    expect(result.current.showBalance).toBe(true);
  });

  it('sanitizes the account holder name before rendering the first name', () => {
    const { result } = renderHook(() =>
      useAccountCard({
        accountBalance: 10,
        accountName: '<script>alert(1)</script> Carolina Silva',
      }),
    );

    expect(result.current.firstName).toBe('Carolina');
  });

  it('toggles balance visibility', () => {
    const { result } = renderHook(() =>
      useAccountCard({
        accountBalance: 0,
        accountName: 'Carolina',
      }),
    );

    act(() => {
      result.current.handleToggleBalance();
    });

    expect(result.current.showBalance).toBe(false);
  });
});
