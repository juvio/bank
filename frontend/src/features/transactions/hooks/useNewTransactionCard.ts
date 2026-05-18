'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import type { NewTransaction } from '@types';
import { useTransactionValidation } from '@/hooks/useTransactionValidation';

function createInitialTransaction(nextId: number): NewTransaction {
  return {
    id: nextId,
    type: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    attachment: null,
  };
}

export function useNewTransactionCard() {
  const router = useRouter();
  const { transactions, setTransaction, transactionShouldReset } =
    useBankAccountStore();
  const { setAddModal, setEditModal, setDeleteModal } = useModalStore();
  const [newTransaction, setNewTransaction] = useState<NewTransaction>(() =>
    createInitialTransaction(transactions.length + 1),
  );

  const { errors, isFormValid, handleAmountBlur, setErrors } =
    useTransactionValidation(
      newTransaction.amount,
      newTransaction.type,
      newTransaction.date,
    );

  const handleTypeChange = (type: string) => {
    setNewTransaction((prev) => ({ ...prev, type }));
  };

  const handleAmountChange = (amount: string) => {
    setNewTransaction((prev) => ({ ...prev, amount }));
  };

  const handleDescriptionChange = (description: string) => {
    setNewTransaction((prev) => ({ ...prev, description }));
  };

  const handleDateChange = (dateValue: Dayjs | null) => {
    const dateString = dateValue ? dateValue.format('YYYY-MM-DD') : '';
    setNewTransaction((prev) => ({ ...prev, date: dateString }));
  };

  const handleOpenModal = () => {
    if (!isFormValid()) return;

    setTransaction({
      id: 0,
      type: newTransaction.type,
      amount: Number(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
      attachment: newTransaction.attachment || undefined,
      attachmentType: newTransaction.attachment
        ? newTransaction.attachment.type
        : undefined,
    });

    setEditModal(false);
    setDeleteModal(false);
    setAddModal(true);
    router.push('/transaction');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewTransaction((prev) => ({ ...prev, attachment: file }));
  };

  const handleRemoveFile = () => {
    setNewTransaction((prev) => ({ ...prev, attachment: null }));
  };

  useEffect(() => {
    if (transactionShouldReset) {
      setNewTransaction(createInitialTransaction(transactions.length + 1));
      setErrors('');
    }
  }, [setErrors, transactionShouldReset, transactions.length]);

  return {
    newTransaction,
    datePickerValue: dayjs(newTransaction.date),
    maxDate: dayjs(),
    errors,
    isSubmitDisabled: !isFormValid(),
    handleAmountBlur,
    handleAmountChange,
    handleDateChange,
    handleDescriptionChange,
    handleFileChange,
    handleOpenModal,
    handleRemoveFile,
    handleTypeChange,
  };
}
