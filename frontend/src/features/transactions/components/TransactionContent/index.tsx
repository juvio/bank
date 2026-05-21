'use client';

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTransactionContent } from '@features/transactions/hooks';
import TransactionCard from '../TransactionCard';
import TransactionFilter from '../TransactionFilter';
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
  const {
    canLoadMore,
    emptyStateMessage,
    filterPeriod,
    filterType,
    filteredTransactions,
    handleClearFilters,
    hasFilteredTransactions,
    isInitialLoading,
    isLoading,
    loadMore,
    page,
    searchTerm,
    setFilterPeriod,
    setFilterType,
    setSearchTerm,
  } = useTransactionContent();

  return (
    <Container
      maxWidth={false}
      sx={ContainerWrapperSx}
      component='main'
      role='region'
      aria-labelledby='transactions-title'
    >
      <Box sx={BoxWrapperSx}>
        <Card sx={CardWrapperSx}>
          <CardContent sx={CardContentSx}>
            <Typography
              variant='h5'
              component='h2'
              gutterBottom
              id='transactions-title'
              sx={TransactionTypographySx}
            >
              💰 Suas Transações
            </Typography>
            <Typography variant='body1' sx={DescriptionTypographySx}>
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

        {isInitialLoading ? (
          <Box
            role='status'
            aria-live='polite'
            aria-busy={isLoading}
            aria-label='Carregando suas transações'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              py: 8,
            }}
          >
            <CircularProgress size={50} thickness={4} aria-hidden='true' />
            <Typography
              variant='body1'
              sx={{ color: 'text.secondary' }}
              id='loading-message'
            >
              Carregando transações...
            </Typography>
          </Box>
        ) : hasFilteredTransactions ? (
          <Box
            sx={BoxTransactionContentSx}
            role='feed'
            aria-label='Lista de transações'
          >
            <InfiniteScroll
              dataLength={filteredTransactions.length}
              next={loadMore}
              hasMore={canLoadMore}
              scrollThreshold={0.9}
              loader={
                <Box
                  role='status'
                  aria-live='polite'
                  aria-label='Carregando mais transações'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 3,
                  }}
                >
                  <CircularProgress
                    size={30}
                    thickness={4}
                    aria-hidden='true'
                  />
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Carregando mais transações...
                  </Typography>
                </Box>
              }
              endMessage={
                page > 0 ? (
                  <Typography
                    variant='body2'
                    sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}
                    aria-live='polite'
                    role='status'
                  >
                    ✓ Você viu todas as {filteredTransactions.length} transações
                  </Typography>
                ) : null
              }
            >
              {filteredTransactions.map((transaction, index) => (
                <Box
                  key={`transaction-${transaction.id}-${index}`}
                  role='article'
                  aria-label={`Transação ${index + 1} de ${
                    filteredTransactions.length
                  }`}
                >
                  <TransactionCard
                    id={transaction.id}
                    type={transaction.type}
                    amount={transaction.amount}
                    description={transaction.description}
                    date={transaction.date}
                    attachmentUrl={transaction.attachmentUrl}
                    attachmentType={transaction.attachmentType}
                  />
                </Box>
              ))}
            </InfiniteScroll>
          </Box>
        ) : (
          <Card
            sx={CardNoTransactionSx}
            role='status'
            aria-live='polite'
            aria-label='Nenhuma transação encontrada'
          >
            <CardContent sx={{ py: 2 }}>
              <Typography
                variant='h6'
                component='h3'
                sx={TypographyNoTransactionSx}
                id='empty-state-title'
              >
                📋 Nenhuma transação encontrada
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary' }}
                aria-describedby='empty-state-title'
              >
                {emptyStateMessage}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}
