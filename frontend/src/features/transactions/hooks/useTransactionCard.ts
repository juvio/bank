'use client';

import { useState } from 'react';
import type React from 'react';
import { useBankAccountStore, useModalStore } from '@stores';
import { formatDate } from '@utils';
import { TransactionMapper } from '@types';
import {
  getTransactionAmountColor,
  getTransactionBorderColor,
  getTransactionIcon,
} from '../components/TransactionCard/styles';

type UseTransactionCardParams = {
  id: number;
  type: string;
  description?: string;
  amount: number;
  date: string;
  attachmentUrl?: string;
  attachmentType?: string;
};

export function useTransactionCard({
  id,
  type,
  amount,
  description,
  date,
  attachmentUrl,
  attachmentType,
}: UseTransactionCardParams) {
  const { setEditModal, setDeleteModal, setAddModal, setViewModal } =
    useModalStore();
  const { setTransaction } = useBankAccountStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const TransactionIcon = getTransactionIcon(type);
  const borderColor = getTransactionBorderColor(type);
  const amountColor = getTransactionAmountColor(type);
  const transactionTypeLabel = TransactionMapper[type];
  const formattedDate = formatDate(date);
  const formattedAmount = `${type === 'deposit' ? '+' : ''}R$ ${amount.toFixed(
    2,
  )}`;

  const transactionPayload = {
    id,
    type,
    amount,
    description,
    date: date ?? '',
    attachmentUrl,
    attachmentType,
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditModal = () => {
    handleClose();
    setAddModal(false);
    setDeleteModal(false);
    setViewModal(false);
    setTransaction(transactionPayload);
    setEditModal(true);
  };

  const handleOpenDeleteModal = () => {
    handleClose();
    setAddModal(false);
    setEditModal(false);
    setViewModal(false);
    setTransaction({ id, type, amount, description, date: date ?? '' });
    setDeleteModal(true);
  };

  const handleOpenViewModal = () => {
    handleClose();
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setTransaction(transactionPayload);
    setViewModal(true);
  };

  return {
    anchorEl,
    amountColor,
    borderColor,
    formattedAmount,
    formattedDate,
    handleClick,
    handleClose,
    handleOpenDeleteModal,
    handleOpenEditModal,
    handleOpenViewModal,
    open,
    TransactionIcon,
    transactionTypeLabel,
  };
}
