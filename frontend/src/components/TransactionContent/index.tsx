'use client';

import { useState, useMemo } from 'react';
import { useBankAccountStore } from '@/stores/useBankAccountStore';
import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import TransactionCard from '../TransactionCard';
import TransactionFilter from '../TransactionFilter';
import InfiniteScroll from 'react-infinite-scroll-component';
import { transactionTypes } from '@/types/transaction-labels.type';
import { TransactionType } from '@/types/transaction.type';
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

function filterByType(
  transactions: TransactionType[],
  filterType: string
): TransactionType[] {
  if (filterType === 'all') return transactions;
  return transactions.filter((transaction) => transaction.type === filterType);
}

function filterByPeriod(
  transactions: TransactionType[],
  filterPeriod: string
): TransactionType[] {
  if (filterPeriod === 'all') return transactions;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    switch (filterPeriod) {
      case 'today':
        return transactionDate >= today;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return transactionDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return transactionDate >= monthAgo;
      case 'year':
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        return transactionDate >= yearAgo;
      default:
        return true;
    }
  });
}

function matchesSearchTerm(
  transaction: TransactionType,
  searchLower: string
): boolean {
  const typeLabel =
    transactionTypes
      .find((t) => t.value === transaction.type)
      ?.label?.toLowerCase() || '';
  const matchType =
    typeLabel.includes(searchLower) ||
    transaction.type.toLowerCase().includes(searchLower);

  const amountStr = transaction.amount.toString();
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(transaction.amount)
    .toLowerCase();
  const matchAmount =
    amountStr.includes(searchLower) || formattedAmount.includes(searchLower);

  return matchType || matchAmount;
}

function filterBySearchTerm(
  transactions: TransactionType[],
  searchTerm: string
): TransactionType[] {
  if (searchTerm.trim() === '') return transactions;

  const searchLower = searchTerm.toLowerCase();
  return transactions.filter((transaction) =>
    matchesSearchTerm(transaction, searchLower)
  );
}

export default function TransactionContent() {
  const transactions = useBankAccountStore((state) => state.transactions);
  const page = useBankAccountStore((state) => state.page);
  const hasMore = useBankAccountStore((state) => state.hasMore);
  const isLoading = useBankAccountStore((state) => state.isLoading);
  const fetchTransactions = useBankAccountStore(
    (state) => state.fetchTransactions
  );

  const [filterType, setFilterType] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadMore = () => {
    if (!isLoading) {
      fetchTransactions(page + 1);
    }
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    filtered = filterByType(filtered, filterType);
    filtered = filterByPeriod(filtered, filterPeriod);
    filtered = filterBySearchTerm(filtered, searchTerm);

    return filtered;
  }, [transactions, filterType, filterPeriod, searchTerm]);

  const handleClearFilters = () => {
    setFilterType('all');
    setFilterPeriod('all');
    setSearchTerm('');
  };

  return (
    <Container maxWidth={false} sx={ContainerWrapperSx}>
      <Box sx={BoxWrapperSx}>
        <Card sx={CardWrapperSx}>
          <CardContent sx={CardContentSx}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={TransactionTypographySx}
            >
              💰 Suas Transações
            </Typography>
            <Typography variant="body1" sx={DescriptionTypographySx}>
              Confira aqui todo o histórico das suas movimentações financeiras
            </Typography>
          </CardContent>
        </Card>

        <TransactionFilter
          filterType={filterType}
          filterPeriod={filterPeriod}
          searchTerm={searchTerm}
          onFilterTypeChange={setFilterType}
          onFilterPeriodChange={setFilterPeriod}
          onSearchTermChange={setSearchTerm}
          onClearFilters={handleClearFilters}
        />

        {isLoading && transactions.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              py: 8,
            }}
          >
            <CircularProgress size={50} thickness={4} />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Carregando transações...
            </Typography>
          </Box>
        ) : filteredTransactions.length > 0 ? (
          <Box sx={BoxTransactionContentSx}>
            <InfiniteScroll
              dataLength={filteredTransactions.length}
              next={loadMore}
              hasMore={
                hasMore &&
                filterType === 'all' &&
                filterPeriod === 'all' &&
                searchTerm === ''
              }
              scrollThreshold={0.9}
              loader={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 3,
                  }}
                >
                  <CircularProgress size={30} thickness={4} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Carregando mais transações...
                  </Typography>
                </Box>
              }
              endMessage={
                page > 0 ? (
                  <Typography
                    variant="body2"
                    sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}
                  >
                    Você viu todas as transações
                  </Typography>
                ) : null
              }
            >
              {filteredTransactions.map((transaction, index) => (
                <TransactionCard
                  key={`transaction-${transaction.id}-${index}`}
                  id={transaction.id}
                  type={transaction.type}
                  amount={transaction.amount}
                  description={transaction.description}
                  date={transaction.date}
                />
              ))}
            </InfiniteScroll>
          </Box>
        ) : (
          <Card sx={CardNoTransactionSx}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="h6" sx={TypographyNoTransactionSx}>
                📋 Nenhuma transação encontrada
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {transactions.length > 0
                  ? 'Nenhuma transação corresponde aos filtros aplicados. Tente ajustar os critérios de busca.'
                  : 'Suas transações aparecerão aqui quando você realizar movimentações na sua conta.'}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}
