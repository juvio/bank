# PR 4 - Auth Feature Migration

Este PR inicia a fase de migracao de features do plano, movendo o dominio de
autenticacao para `src/features/auth` sem alterar comportamento funcional.

## Objetivo

Migrar `auth` para arquitetura por feature:

- mover componentes para `features/auth/components`;
- extrair logica para `features/auth/hooks`;
- centralizar API calls em `features/auth/services`;
- atualizar barrels e imports para consumo por API publica da feature.

## O que mudou

- `LoginCard` e `RegisterCard` passaram a viver em
  `src/features/auth/components`.
- `useLogin` e `useRegister` foram criados em `src/features/auth/hooks`.
- `loginService` e `registerService` foram criados em
  `src/features/auth/services/authService.ts`.
- `src/stores/useAuthStore.tsx` passou a usar `@features/auth/services`.
- `src/app/login/page.tsx` e `src/app/register/page.tsx` agora importam de
  `@features/auth`.
- componentes legados em `src/components/LoginCard` e
  `src/components/RegisterCard` foram removidos.

## Status de validacao

Gate tecnico executado com o binario instalado em
`C:\Program Files\nodejs\npm.cmd`.

- `npm run lint`: passou (com 4 warnings pre-existentes fora do escopo da PR4)
- `npm run build`: passou
- `npm run test -- --run`: passou (2 files, 16 tests)

## Ready to merge

Status atual: `APROVADO`.
