'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { TransactionMapper } from '@/types';
import { CardContentSx, CardWrapperSx } from './styles';
import { formatDate } from '@/utils/date';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface Props {
  transactions?: Transaction[];
}

export default function TransactionHistoryCard({
  transactions: propTransactions,
}: Props) {
  const { transactions: storeTransactions } = useBankAccountStore();

  const transactions =
    propTransactions ||
    storeTransactions.map((t) => ({
      id: t.id.toString(),
      type: t.type,
      amount: t.amount,
      description: t.description || '',
      date: t.date || new Date().toISOString().split('T')[0],
      status: 'completed' as const,
    }));
  
  // Pegar apenas as últimas 10 transações
  const recentTransactions = transactions.slice(0, 10);
  
  return (
    <Card sx={CardWrapperSx}>
      <CardContent sx={CardContentSx}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ flexShrink: 0 }}
        >
          Histórico de Transações
        </Typography>
        <TableContainer
          sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
            flex: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'background.default',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#cecece',
              borderRadius: '4px',
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <TableRow key={`history-${transaction.id}-${index}`}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{TransactionMapper[transaction.type]}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color:
                          transaction.type === 'deposit'
                            ? 'success.main'
                            : 'error.main',
                        fontWeight: 'medium',
                      }}
                    >
                      {transaction.type === 'deposit' ? '+' : '-'}
                      R$ {transaction.amount.toFixed(2).replace('.', ',')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    Nenhuma transação encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
