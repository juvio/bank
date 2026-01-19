'use client';

import { useState } from 'react';
import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { useModalStore } from '@/stores/useModalStore';
import { TransactionMapper } from '@/types';
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import {
  CardWrapperSx,
  IconButtonDeleteSx,
  IconButtonViewSx,
  IconButtonEditSx,
  getTransactionIcon,
  getTransactionBorderColor,
  getTransactionAmountColor,
} from './styles';
import { formatDate } from '@/utils/date';

type TransactionCardProps = {
  id: number;
  type: string;
  description?: string;
  amount: number;
  date: string;
  attachmentUrl?: string;
  attachmentType?: string;
};

export default function TransactionCard({
  id,
  type,
  amount,
  description,
  date,
  attachmentUrl,
  attachmentType,
}: TransactionCardProps) {
  const { setEditModal, setDeleteModal, setAddModal, setViewModal } =
    useModalStore();
  const { setTransaction } = useBankAccountStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? '',
      attachmentUrl: attachmentUrl,
      attachmentType: attachmentType,
    });
    setEditModal(true);
  };

  const handleOpenDeleteModal = () => {
    handleClose();
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
    handleClose();
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);

    setTransaction({
      id: id,
      type: type,
      amount: amount,
      description: description,
      date: date ?? '',
      attachmentUrl: attachmentUrl,
      attachmentType: attachmentType,
    });
    setViewModal(true);
  };

  const TransactionIcon = getTransactionIcon(type);
  const borderColor = getTransactionBorderColor(type);
  const amountColor = getTransactionAmountColor(type);

  return (
    <Card sx={{ ...CardWrapperSx, borderLeft: `5px solid ${borderColor}` }}>
      <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          {/* Ícone */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              bgcolor: `${borderColor}15`,
              borderRadius: 1,
              flexShrink: 0,
            }}
          >
            <TransactionIcon
              sx={{ color: borderColor, fontSize: { xs: 20, sm: 24 } }}
            />
          </Box>

          {/* Título e Data */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.5,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              {TransactionMapper[type]}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              {formatDate(date)}
            </Typography>
          </Box>

          {/* Valor */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 700,
              color: amountColor,
              textAlign: 'right',
              flexShrink: 0,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            {type === 'deposit' ? '+' : ''}R$ {amount.toFixed(2)}
          </Typography>

          {/* Botões de ação - Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Link href='/transaction'>
              <IconButton
                onClick={handleOpenViewModal}
                size='small'
                sx={IconButtonViewSx}
                aria-label='Ver detalhes da transação'
              >
                <VisibilityIcon fontSize='small' />
              </IconButton>
            </Link>
            <Link href='/transaction'>
              <IconButton
                onClick={handleOpenEditModal}
                size='small'
                sx={IconButtonEditSx}
                aria-label='Editar transação'
              >
                <EditIcon fontSize='small' />
              </IconButton>
            </Link>
            <Link href='/transaction'>
              <IconButton
                onClick={handleOpenDeleteModal}
                size='small'
                sx={IconButtonDeleteSx}
                aria-label='Remover transação'
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Link>
          </Box>

          {/* Botão de menu - Mobile */}
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{
              flexShrink: 0,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MoreVertIcon />
          </IconButton>

          {/* Menu de ações */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Link
              href='/transaction'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem onClick={handleOpenViewModal}>
                <ListItemIcon>
                  <VisibilityIcon fontSize='small' sx={{ color: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText>Visualizar</ListItemText>
              </MenuItem>
            </Link>
            <Link
              href='/transaction'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem onClick={handleOpenEditModal}>
                <ListItemIcon>
                  <EditIcon fontSize='small' sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText>Editar</ListItemText>
              </MenuItem>
            </Link>
            <Link
              href='/transaction'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem onClick={handleOpenDeleteModal}>
                <ListItemIcon>
                  <DeleteIcon fontSize='small' sx={{ color: '#d32f2f' }} />
                </ListItemIcon>
                <ListItemText>Excluir</ListItemText>
              </MenuItem>
            </Link>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
}
