# PR 16 Visual Map

```
LEGADO                    NOVO
------                    ----
src/utils/api.ts     ->   src/services/api.ts
src/utils/date.ts    ->   src/lib/date.ts
src/utils/privacy.ts ->   src/lib/privacy.ts
src/utils/sanitizedFilename.ts -> src/lib/sanitizedFilename.ts
src/utils/getGraphicAppBaseUrl.ts -> src/lib/getGraphicAppBaseUrl.ts
src/utils/mapTransactionsToTransactionTypes.ts ->
  src/features/transactions/services/transactionMapper.ts
src/types/remote-app.d.ts -> src/front-types-domain/remote-app.d.ts

Testes
- src/utils/*.test.ts -> src/lib/__tests__/*
- src/utils/mapTransactionsToTransactionTypes.test.ts ->
  src/features/transactions/services/__tests__/transactionMapper.test.ts
```
