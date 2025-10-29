import { Container, Box } from "@mui/material";
import AccountCard from "@/components/AccountCard";
import NewTransactionCard from "@/components/NewTransactionCard";
import TransactionHistoryCard from "@/components/TransactionHistoryCard";
import mock from '@/mocks/mock.json';

export default function HomePage() {
  const accountBalance = (mock as unknown as { account: { balance: number } }).account.balance;
  const transactions = (mock as unknown as { transactions: { id: string; type: string; amount: number; description: string; date: string; status: 'completed' | 'pending' | 'failed' }[] }).transactions;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <AccountCard accountBalance={accountBalance} />
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', minHeight: { xs: 'auto', md: '400px' } }}>
            <TransactionHistoryCard transactions={transactions} />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: { xs: 'auto', md: '400px' } }}>
            <NewTransactionCard />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
