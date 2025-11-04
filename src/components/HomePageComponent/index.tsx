"use client";

import { Box, Container } from "@mui/material";

import AccountCard from "@/components/AccountCard";
import NewTransactionCard from "@/components/NewTransactionCard";
import TransactionHistoryCard from "@/components/TransactionHistoryCard";
import { useBankAccountStore } from "@/stores/useBankAccountStore";

import mock from "@/mocks/mock.json";

export default function HomePage() {
  const { transactions } = useBankAccountStore();
  const initialBalance = (mock as unknown as { account: { balance: number } }).account.balance;

  const accountBalance = transactions.reduce((balance, transaction) => {
    if (transaction.type === "deposit") {
      return balance + transaction.amount;
    } else if (transaction.type === "withdraw" || transaction.type === "payment" || transaction.type === "transfer") {
      return balance - transaction.amount;
    }
    return balance;
  }, initialBalance);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <AccountCard accountBalance={accountBalance} />
        </Box>

        <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", minHeight: { xs: "auto", md: "400px" } }}>
            <TransactionHistoryCard />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: { xs: "auto", md: "400px" } }}>
            <NewTransactionCard />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
