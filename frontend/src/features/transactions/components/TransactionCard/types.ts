import type React from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export type TransactionCardProps = {
  id: number;
  type: string;
  description?: string;
  amount: number;
  date: string;
  attachmentUrl?: string;
  attachmentType?: string;
};

export type TransactionCardViewProps = TransactionCardProps & {
  anchorEl: null | HTMLElement;
  amountColor: string;
  borderColor: string;
  formattedAmount: string;
  formattedDate: string;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleOpenDeleteModal: () => void;
  handleOpenEditModal: () => void;
  handleOpenViewModal: () => void;
  open: boolean;
  TransactionIcon: React.ComponentType<SvgIconProps>;
  transactionTypeLabel: string;
};
