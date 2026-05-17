# PR3 Index

## Configuracao

- `tsconfig.json`: aliases arquiteturais adicionados e `@types` apontado para
  `src/front-types-domain`.
- `vitest.config.ts`: alias `@types` atualizado.

## Fonte nova de tipos

- `src/front-types-domain/api.types.ts`
- `src/front-types-domain/common.types.ts`
- `src/front-types-domain/domain.types.ts`
- `src/front-types-domain/index.ts`

## Compatibilidade legada

- `src/types/index.ts`
- `src/types/barrel-index.ts`
- `src/types/transaction.type.ts`
- `src/types/transaction-mapper.type.ts`
- `src/types/transaction-labels.type.ts`
- `src/types/new-transaction.type.ts`
- `src/types/remote-app.type.ts`
- `src/types/remote-app.d.ts`

## Consumidores atualizados

- `src/app/(operations)/home/page.tsx`
- `src/components/@microfrontend/GraphicMFEComponent/index.tsx`
- `src/components/HomePageComponent/types.ts`
- `src/components/Modal/index.tsx`
- `src/components/NewTransactionCard/index.tsx`
- `src/components/TransactionCard/index.tsx`
- `src/components/TransactionContent/index.tsx`
- `src/components/TransactionHistoryCard/index.tsx`
- `src/services/mockService.ts`
- `src/stores/useBankAccountStore.tsx`
