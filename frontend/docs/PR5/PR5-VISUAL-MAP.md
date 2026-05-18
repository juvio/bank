# PR5 Visual Map

## Antes

```txt
src/components/
|-- TransactionCard/
|-- TransactionContent/
|-- TransactionFilter/
|-- TransactionHistoryCard/
`-- NewTransactionCard/

src/stores/useBankAccountStore.tsx
`-- chama api diretamente para transacoes
```

## Depois

```txt
src/features/transactions/
|-- components/
|   |-- TransactionCard/
|   |-- TransactionContent/
|   |-- TransactionFilter/
|   |-- TransactionHistoryCard/
|   `-- NewTransactionCard/
|-- services/
|   |-- transactionService.ts
|   |-- index.ts
|   `-- __tests__/
|       `-- transactionService.test.ts
|-- hooks/
|-- stores/
|-- types/
`-- index.ts
```

## Fluxo de dependencia

```txt
app/(operations)/transactions/page.tsx
  -> @features/transactions
    -> TransactionContent
      -> TransactionCard
      -> TransactionFilter

HomePageComponent
  -> @features/transactions
    -> TransactionHistoryCard
    -> NewTransactionCard

useBankAccountStore
  -> @features/transactions/services
    -> transactionService
      -> @/utils/api
```
