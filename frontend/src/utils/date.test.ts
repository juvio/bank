import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('should format a valid date string to pt-BR locale', () => {
    const result = formatDate('2024-05-15');
    expect(result).toBe('15/5/2024');
  });

  it('should return empty string for undefined input', () => {
    const result = formatDate(undefined);
    expect(result).toBe('');
  });

  it('should return empty string for empty string input', () => {
    const result = formatDate('');
    expect(result).toBe('');
  });

  it('should format another valid date', () => {
    const result = formatDate('2023-01-01');
    expect(result).toBe('1/1/2023');
  });

  it('should handle December dates', () => {
    const result = formatDate('2024-12-25');
    expect(result).toBe('25/12/2024');
  });
});
