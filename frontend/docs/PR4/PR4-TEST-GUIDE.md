# PR4 Test Guide

## Comandos obrigatorios

Execute a partir de `frontend/`:

```bash
npm run lint
npm run build
npm run test -- --run
```

## O que verificar

- `app/login` e `app/register` carregam `LoginCard`/`RegisterCard` via
  `@features/auth`.
- Fluxo de login continua redirecionando para `/home` em sucesso.
- Fluxo de registro continua validando campos e redirecionando para `/login`.
- `useAuthStore` segue atualizando token e usuario apos login.
- API calls de auth passam por `features/auth/services/authService.ts`.
- Nao existem imports restantes para `@/components/LoginCard` ou
  `@/components/RegisterCard`.

## Resultado desta execucao

Executado com `C:\Program Files\nodejs\npm.cmd`:

- `npm run lint`: passou, com 4 warnings pre-existentes fora do escopo.
- `npm run build`: passou.
- `npm run test -- --run`: passou (2 files, 16 tests).
