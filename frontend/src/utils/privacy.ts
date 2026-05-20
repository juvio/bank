const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;
const SCRIPT_STYLE_REGEX = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const HTML_TAG_REGEX = /<[^>]*>/g;
const HTML_EVENT_HANDLER_REGEX = /\son\w+\s*=\s*(['"]).*?\1/gi;
const JAVASCRIPT_URL_REGEX = /javascript\s*:/gi;
const CPF_REGEX = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const LONG_NUMBER_REGEX = /\b\d[\d .-]{6,}\d\b/g;

export function sanitizeTextInput(value?: string | null, maxLength = 160) {
  if (!value) return '';

  return value
    .replace(CONTROL_CHARS_REGEX, '')
    .replace(SCRIPT_STYLE_REGEX, '')
    .replace(HTML_EVENT_HANDLER_REGEX, '')
    .replace(JAVASCRIPT_URL_REGEX, '')
    .replace(HTML_TAG_REGEX, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function maskAccountNumber(accountNumber?: string | number | null) {
  if (accountNumber === null || accountNumber === undefined) return '';

  const value = String(accountNumber).trim();
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 2) return '*'.repeat(digits.length);

  return `${'*'.repeat(Math.max(digits.length - 2, 0))}${digits.slice(-2)}`;
}

export function maskEmail(email?: string | null) {
  if (!email) return '';

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;

  const visibleLocal = localPart.slice(0, 1);
  return `${visibleLocal}${'*'.repeat(Math.max(localPart.length - 1, 3))}@${domain}`;
}

export function maskSensitiveData(value?: string | null) {
  if (!value) return '';

  return value
    .replace(CPF_REGEX, '***.***.***-**')
    .replace(EMAIL_REGEX, (email) => maskEmail(email))
    .replace(LONG_NUMBER_REGEX, (match) => {
      const digits = match.replace(/\D/g, '');
      if (digits.length < 8) return match;

      return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`;
    });
}

export function prepareDisplayText(value?: string | null, maxLength = 160) {
  return maskSensitiveData(sanitizeTextInput(value, maxLength));
}
