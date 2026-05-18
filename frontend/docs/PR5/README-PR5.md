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

Gate tecnico pendente neste ambiente porque `npm`, `node` e
`C:\Program Files\nodejs\npm.cmd` nao estao disponiveis no PATH ou no caminho
esperado.

- `npm run lint`: nao executado
- `npm run build`: nao executado
- `npm run test -- --run`: nao executado

## Ready to merge

Status atual: `PENDENTE` ate executar o gate tecnico em ambiente com Node.js.
