# PR7 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr7-transaction-card-container-presentational
```

## Arquivos para revisar

```bash
git diff --name-only
git status --short
```

## Validacao antes do commit

```bash
npm run lint
npm run build
npm run test -- --run src/features/transactions/components/__tests__/TransactionCard.test.tsx src/features/transactions/components/__tests__/TransactionCardContainer.test.tsx src/features/transactions/hooks/__tests__/useTransactionCard.test.ts
```

## Commit sugerido

```bash
git add .
git commit -m "refactor(transactions): split TransactionCard container and UI

- Extract TransactionCard presentational component
- Add TransactionCardContainer to wire hook state into the UI
- Co-locate useTransactionCard and shared TransactionCard types
- Keep the old hook barrel as a compatibility export
- Update TransactionCard and hook tests for the new structure
- Document PR7 delivery status

Validation: lint, build and test passed"
```
