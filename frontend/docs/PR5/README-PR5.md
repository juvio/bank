# PR 5 - Transactions Feature Migration

Este PR continua a fase de migracao de features do plano, movendo o dominio de
transacoes para `src/features/transactions` sem alterar comportamento funcional.

## Objetivo

Migrar `transactions` para arquitetura por feature:

- mover componentes para `features/transactions/components`;
- centralizar chamadas de API em `features/transactions/services`;
- atualizar barrels e imports para consumo pela API publica da feature;
- manter `useBankAccountStore` global, mas sem conhecer detalhes de transporte das transacoes.

## O que mudou

- `TransactionCard`, `TransactionContent`, `TransactionFilter`,
  `TransactionHistoryCard` e `NewTransactionCard` passaram a viver em
  `src/features/transactions/components`.
- `transactionService.ts` foi criado em `src/features/transactions/services`.
- `src/stores/useBankAccountStore.tsx` passou a usar
  `@features/transactions/services` para fetch/create/update/delete.
- `src/app/(operations)/transactions/page.tsx` agora importa
  `TransactionContent` de `@features/transactions`.
- `src/components/HomePageComponent/index.tsx` e a story de `TransactionCard`
  foram religados para `@features/transactions`.
- Testes de service foram criados em
  `src/features/transactions/services/__tests__/transactionService.test.ts`.

## Status de validacao

Gate tecnico executado com o binario instalado em
`C:\Program Files\nodejs\npm.cmd`.

- `npm run lint`: passou (com 4 warnings pre-existentes fora do escopo da PR4)
- `npm run build`: passou
- `npm run test -- --run`: passou (2 files, 16 tests)

## Ready to merge

Status atual: `APROVADO`.
