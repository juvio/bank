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
import { TransactionMapper, Transactions } from '@/types';
import { CardContentSx, CardWrapperSx } from './styles';
import { formatDate } from '@/utils/date';

interface Props {
  transactions: Transactions;
}

export default function TransactionHistoryCard({ transactions }: Props) {
  return (
    <Card sx={CardWrapperSx}>
      <CardContent sx={CardContentSx}>
        <Typography
          variant='h6'
          component='h2'
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
                <TableCell align='right'>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <TableRow key={`history-${transaction.id}-${index}`}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{TransactionMapper[transaction.type]}</TableCell>
                    {
                      <TableCell>
                        {transaction.to || transaction.from}
                      </TableCell>
                    }
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
                      R$ {transaction.value.toFixed(2).replace('.', ',')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align='center'
                    sx={{ py: 4, color: 'text.secondary' }}
                  >
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
