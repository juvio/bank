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
  return (
    <Card sx={CardWrapperSx}>
      <CardContent sx={CardContentSx}>
        <Typography variant='h6' component='h2' gutterBottom>
          Histórico de Transações
        </Typography>
        <TableContainer
          sx={{ overflowX: 'hidden', overflowY: 'auto', flex: 1 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align='right'>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={`history-${transaction.id}-${index}`}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{TransactionMapper[transaction.type]}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell
                    align='right'
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
