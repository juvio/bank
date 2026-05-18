# PR4 Summary

## Objetivo

Migrar a feature de autenticacao para `src/features/auth`, separando
componentes, hooks e services e mantendo comportamento inalterado.

## Mudancas por camada

- `features/auth/components`:
  - adicionados `LoginCard.tsx` e `RegisterCard.tsx`.
  - atualizado barrel `components/index.ts`.
- `features/auth/hooks`:
  - adicionados `useLogin.ts` e `useRegister.ts`.
  - atualizado barrel `hooks/index.ts`.
- `features/auth/services`:
  - adicionado `authService.ts` com `loginService` e `registerService`.
  - atualizado barrel `services/index.ts`.
- `stores`:
  - `useAuthStore.tsx` passou a usar service da feature em vez de chamada API
    direta.
- `app`:
  - `app/login/page.tsx` e `app/register/page.tsx` passaram a importar de
    `@features/auth`.
- `components` (legado):
  - removidos `src/components/LoginCard/index.tsx` e
    `src/components/RegisterCard/index.tsx`.

## Fora de escopo

- Refatorar `AccountMenu` ou outros consumidores de `useAuthStore`.
- Mudar estrategia de armazenamento de token.
- Migrar outras features (`transactions`, `accounts`, `dashboard`).
- Alterar backend.

## Resultado esperado

- Auth passa a ter estrutura modular por feature com API publica por barrels.
- Rotas de login/registro deixam de depender de componentes em `src/components`.
- API calls de auth ficam centralizadas em service dedicado.

## Riscos residuais

- `lint` reportou 4 warnings pre-existentes fora do escopo da PR4.
- Mudancas de encoding existentes no projeto (strings legadas) nao foram
  tratadas neste PR por estarem fora do escopo.

## Dependencia desbloqueada

PR5 pode seguir com migracoes equivalentes em outras features e/ou cleanup de
imports internos adicionais.
