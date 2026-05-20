# PR 15 Test Guide

## Objetivo dos testes

O PR 15 altera somente documentacao. Nao ha feature de runtime impactada e, por
isso, nao ha novos testes unitarios ou de componente a adicionar.

## Features impactadas

Nenhuma feature de runtime foi alterada.

## Testes criados ou atualizados

Nao aplicavel para este PR.

## Politica de co-localizacao

A politica vigente permanece:

- testes de componentes em `src/features/<feature>/components/__tests__`;
- testes de hooks em `src/features/<feature>/hooks/__tests__`;
- testes de servicos em `src/features/<feature>/services/__tests__`;
- testes compartilhados junto da camada compartilhada correspondente.

Exemplos existentes:

- `src/features/auth/hooks/__tests__/useLogin.test.ts`
- `src/features/auth/services/__tests__/authService.test.ts`
- `src/features/accounts/components/__tests__/AccountCard.test.tsx`
- `src/features/transactions/hooks/__tests__/useTransactionCard.test.ts`

## Validacao recomendada

Mesmo sendo um PR documental, rode a suite minima para garantir que o estado do
frontend permanece valido:

```bash
npm run lint
npm run build
npm run test -- --run
```
