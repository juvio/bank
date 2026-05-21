# PR6 Checklist

## Escopo

- [x] PR solicitado identificado como PR6.
- [x] Fase identificada como Fase 2: Refactoring.
- [x] Objetivo unico mantido: migrar accounts para `features/accounts`.
- [x] Backend preservado.

## Implementacao

- [x] `AccountCard` movido para `src/features/accounts/components/AccountCard`.
- [x] `AccountMenu` movido para `src/features/accounts/components/AccountMenu`.
- [x] Barrel de components atualizado.
- [x] Barrel raiz da feature ja exporta `components`.
- [x] Imports antigos de `@/components/AccountCard` removidos.
- [x] Imports antigos de `@/components/AccountMenu` removidos.
- [x] Stories atualizadas.

## Testes

- [x] Teste de `AccountCard` criado em `components/__tests__`.
- [x] Teste de `AccountMenu` criado em `components/__tests__`.
- [x] `npm run test -- --run` executado.

## Validacao tecnica

- [x] `npm run lint` executado.
- [x] `npm run build` executado.
- [x] `npm run test -- --run` executado.
- [x] `git diff --name-only` executado.
- [x] Nenhum arquivo de `../backend/` alterado.

## Status do gate

`APROVADO`: validacoes executadas via `C:\Program Files\nodejs\npm.cmd`.
