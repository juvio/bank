# PR 9 Test Guide

## Features impactadas

- `auth`: testes de hooks e services ajustados para mocks via barrels.
- `transactions`: testes de hooks, services e container ajustados para barrels.
- `accounts`: teste de `AccountMenu` ajustado para mock do barrel de stores.

## Testes criados ou atualizados

- Atualizados mocks em `src/features/auth/hooks/__tests__/useLogin.test.ts`.
- Atualizados mocks em `src/features/auth/hooks/__tests__/useRegister.test.ts`.
- Atualizado mock em `src/features/auth/services/__tests__/authService.test.ts`.
- Atualizado mock em `src/features/accounts/components/__tests__/AccountMenu.test.tsx`.
- Atualizados mocks em `src/features/transactions/hooks/__tests__/useNewTransactionCard.test.ts`.
- Atualizados mocks em `src/features/transactions/hooks/__tests__/useTransactionCard.test.ts`.
- Atualizado mock em `src/features/transactions/hooks/__tests__/useTransactionContent.test.ts`.
- Atualizado mock em `src/features/transactions/services/__tests__/transactionService.test.ts`.
- Atualizados imports em `src/features/transactions/components/__tests__/TransactionCard.test.tsx`.
- Atualizados imports/mocks em `src/features/transactions/components/__tests__/TransactionCardContainer.test.tsx`.

## Comandos

```bash
npm run test -- --run
npm run lint
npm run build
```

## Resultado registrado

- `npm run test -- --run`: 25 arquivos passaram, 79 testes passaram.
- `npm run lint`: passou com 10 warnings.
- `npm run build`: passou com os mesmos warnings.

