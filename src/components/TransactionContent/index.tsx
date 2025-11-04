"use client";

import { useBankAccountStore } from "@/stores/useBankAccountStore";
import { Typography, Container, Box, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TransactionCard from "../TransactionCard";

export default function TransactionContent() {
  const { transactions } = useBankAccountStore();
  const theme = useTheme();

  return (
    <Container maxWidth={false} sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: "white",
          }}
        >
          <CardContent sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
              💰 Suas Transações
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Confira aqui todo o histórico das suas movimentações financeiras
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignSelf: "center", width: "95%" }}>
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
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 1.5 }}>
                  📋 Nenhuma transação encontrada
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Suas transações aparecerão aqui quando você realizar movimentações na sua conta.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
}
