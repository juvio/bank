'use client';

import { useBankAccountStore } from '@/stores/useBankAccountStore';
import { Typography, Container, Box, Card, CardContent } from '@mui/material';
import TransactionCard from '../TransactionCard';
import {
  BoxTransactionContentSx,
  BoxWrapperSx,
  CardContentSx,
  CardNoTransactionSx,
  CardWrapperSx,
  ContainerWrapperSx,
  DescriptionTypographySx,
  TransactionTypographySx,
  TypographyNoTransactionSx,
} from './styles';

export default function TransactionContent() {
  const { transactions } = useBankAccountStore();

  return (
    <Container maxWidth={false} sx={ContainerWrapperSx}>
      <Box sx={BoxWrapperSx}>
        <Card sx={CardWrapperSx}>
          <CardContent sx={CardContentSx}>
            <Typography
              variant='h5'
              component='h1'
              gutterBottom
              sx={TransactionTypographySx}
            >
              💰 Suas Transações
            </Typography>
            <Typography variant='body1' sx={DescriptionTypographySx}>
              Confira aqui todo o histórico das suas movimentações financeiras
            </Typography>
          </CardContent>
        </Card>

        <Box sx={BoxTransactionContentSx}>
          {transactions.length > 0 ? (
            <>
              {transactions.map((transaction, index) => (
                <TransactionCard
                  key={`transaction-${transaction.id}-${index}`}
                  id={transaction.id}
                  type={transaction.type}
                  amount={transaction.amount}
                  description={transaction.description}
                  date={transaction.date}
                />
              ))}
            </>
          ) : (
            <Card sx={CardNoTransactionSx}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant='h6' sx={TypographyNoTransactionSx}>
                  📋 Nenhuma transação encontrada
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  Suas transações aparecerão aqui quando você realizar
                  movimentações na sua conta.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
}
