import { useState, useCallback } from 'react';

interface ValidationResult {
  errors: string;
  isAmountValid: () => boolean;
  isFormValid: () => boolean;
  handleAmountBlur: () => void;
  setErrors: (error: string) => void;
}

export const useTransactionValidation = (
  amount: number | string | undefined,
  type: string,
  date: string
): ValidationResult => {
  const [errors, setErrors] = useState<string>('');

  const isAmountValid = useCallback((): boolean => {
    if (!amount) {
      return false;
    }
    const amountNum = Number(amount);
    if (Number.isNaN(amountNum) || amountNum < 1) {
      return false;
    }
    return true;
  }, [amount]);

  const handleAmountBlur = useCallback(() => {
    let errorMsg = '';

    if (!amount) {
      errorMsg = 'Valor obrigatório';
    } else {
      const amountNum = Number(amount);
      if (Number.isNaN(amountNum) || amountNum < 1) {
        errorMsg = 'Valor inválido';
      }
    }

    setErrors(errorMsg);
  }, [amount]);

  const isFormValid = useCallback((): boolean => {
    const amountValid = isAmountValid();
    const typeValid = type !== '';
    const dateValid = date !== '';

    return amountValid && typeValid && dateValid;
  }, [isAmountValid, type, date]);

  return {
    errors,
    isAmountValid,
    isFormValid,
    handleAmountBlur,
    setErrors,
  };
};
