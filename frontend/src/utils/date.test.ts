import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('should format a valid date string to pt-BR locale', () => {
    const result = formatDate('2024-05-15');
    expect(result).toBe('15/5/2024');
  });

  it('should format an ISO date-time string without returning NaN', () => {
    const result = formatDate('2026-05-18T00:00:00.000Z');
    expect(result).toBe('18/5/2026');
  });

  it('should return empty string for invalid date strings', () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('');
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
