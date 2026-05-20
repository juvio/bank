import { describe, expect, it } from 'vitest';
import {
  maskAccountNumber,
  maskEmail,
  maskSensitiveData,
  prepareDisplayText,
  sanitizeTextInput,
} from './privacy';

describe('privacy utils', () => {
  it('sanitizes html tags, script-like urls and control characters', () => {
    expect(
      sanitizeTextInput(
        '  <script>alert(1)</script><img src=x onerror="alert(1)"> javascript:PIX\u0000  ',
      ),
    ).toBe('PIX');
  });

  it('limits sanitized text length', () => {
    expect(sanitizeTextInput('abcdef', 3)).toBe('abc');
  });

  it('masks account numbers while keeping the final digits visible', () => {
    expect(maskAccountNumber('12345-6')).toBe('****56');
    expect(maskAccountNumber('9')).toBe('*');
  });

  it('masks emails', () => {
    expect(maskEmail('carol@example.com')).toBe('c****@example.com');
  });

  it('masks sensitive values embedded in display text', () => {
    expect(
      maskSensitiveData(
        'CPF 123.456.789-00, email carol@example.com, conta 12345-6789',
      ),
    ).toBe('CPF ***.***.***-**, email c****@example.com, conta *****6789');
  });

  it('prepares safe display text in one call', () => {
    expect(prepareDisplayText('<b>CPF 12345678900</b>')).toBe(
      'CPF ***.***.***-**',
    );
  });
});
