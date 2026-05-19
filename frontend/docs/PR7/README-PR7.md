# README PR7

## Objetivo

Refatorar `TransactionCard` para o padrao Container/Presentational com hook
co-localizado, mantendo o contrato publico atual da feature de transacoes.

## Como revisar

1. Conferir o modulo `src/features/transactions/components/TransactionCard`:
   - `TransactionCard.tsx` contem apenas a UI presentational.
   - `TransactionCardContainer.tsx` combina hook e UI.
   - `useTransactionCard.ts` concentra estado, formatacao e callbacks.
   - `index.tsx` preserva o default export atual e expoe UI/hook/tipos.
2. Conferir compatibilidade do barrel antigo:
   - `src/features/transactions/hooks/useTransactionCard.ts`
3. Conferir testes ajustados:
   - `src/features/transactions/components/__tests__/TransactionCard.test.tsx`
   - `src/features/transactions/components/__tests__/TransactionCardContainer.test.tsx`
   - `src/features/transactions/hooks/__tests__/useTransactionCard.test.ts`

## Validacao esperada

Quando Node/NPM estiverem disponiveis:

```bash
npm run lint
npm run build
npm run test -- --run src/features/transactions/components/__tests__/TransactionCard.test.tsx src/features/transactions/components/__tests__/TransactionCardContainer.test.tsx src/features/transactions/hooks/__tests__/useTransactionCard.test.ts
```

## Status

`APROVADO`: implementacao concluida e validacoes executadas via
`C:\Program Files\nodejs\npm.cmd`.
