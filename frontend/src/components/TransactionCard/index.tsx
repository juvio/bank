'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import { TransactionMapper } from '@/types';
import { Box, IconButton, Typography, Card, CardContent } from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import {
  BoxSx,
  BoxViewSx,
  CardWrapperSx,
  IconButtonDeleteSx,
  IconButtonEditSx,
  IconButtonViewSx,
  TransactionBoxSx,
  TransactionTypographySx,
  TypographyDateSx,
} from './styles';
import { formatDate } from '@/utils/date';

type TransactionCardProps = {
  id: number;
  type: string;
  description?: string;
  amount: number;
  date: string;
};

export default function TransactionCard({
  id,
  type,
  amount,
  description,
  date,
}: TransactionCardProps) {
  const { setEditModal, setDeleteModal, setAddModal, setViewModal } =
    useModalStore();
  const { setTransaction } = useBankAccountStore();

  const handleOpenEditModal = () => {
    setAddModal(false);
    setDeleteModal(false);
    setViewModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? '',
    });
    setEditModal(true);
  };

  const handleOpenDeleteModal = () => {
    setAddModal(false);
    setEditModal(false);
    setViewModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? '',
    });
    setDeleteModal(true);
  };

  const handleOpenViewModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? '',
    });
    setViewModal(true);
  };

  return (
    <Card sx={CardWrapperSx}>
      <CardContent>
        <Typography variant='caption' sx={TypographyDateSx}>
          {formatDate(date)}
        </Typography>

        <Box sx={BoxSx}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                color: type === 'deposit' ? 'success.main' : 'error.main',
              }}
            >
              R$ {amount.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={TransactionBoxSx}>
            <Typography variant='body1' sx={TransactionTypographySx}>
              {TransactionMapper[type]}
            </Typography>
          </Box>

          <Box sx={BoxViewSx}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href='/transaction'>
                <IconButton
                  onClick={handleOpenViewModal}
                  size='small'
                  sx={IconButtonViewSx}
                >
                  <VisibilityIcon fontSize='small' />
                </IconButton>
              </Link>
              <Link href='/transaction'>
                <IconButton
                  onClick={handleOpenEditModal}
                  size='small'
                  sx={IconButtonEditSx}
                >
                  <EditIcon fontSize='small' />
                </IconButton>
              </Link>
              <Link href='/transaction'>
                <IconButton
                  onClick={handleOpenDeleteModal}
                  size='small'
                  sx={IconButtonDeleteSx}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
