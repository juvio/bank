# PR 16 Test Guide

## Features impactadas

- `features/transactions` (mapper e services)
- `features/auth` (service)
- `features/accounts` (hook)
- `components/Modal`
- `components/@microfrontend/GraphicMFEComponent`
- `stores/useBankAccountStore`
- `app/api/attachments`

## Testes criados

- `src/lib/__tests__/date.test.ts`
- `src/lib/__tests__/privacy.test.ts`
- `src/features/transactions/services/__tests__/transactionMapper.test.ts`

## Testes atualizados

- `src/features/transactions/services/__tests__/transactionService.test.ts`
- `src/features/auth/services/__tests__/authService.test.ts`
- `src/components/@microfrontend/GraphicMFEComponent/__tests__/GraphicMFEComponent.test.tsx`

## Como executar

```bash
npm run test -- --run
```
