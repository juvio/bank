# PR 12 Test Guide

## Features impactadas

- `auth`
- `transactions`
- `components/Modal` apenas para estabilizar a suíte completa.

## Testes criados ou atualizados

- Atualizado: `src/features/auth/services/__tests__/authService.test.ts`
  - cobre login em `/api/auth/login`;
  - cobre logout em `/api/auth/logout`;
  - mantém cobertura de registro.

## Testes co-localizados existentes executados

- `src/features/auth/hooks/__tests__/useLogin.test.ts`
- `src/features/accounts/components/__tests__/AccountMenu.test.tsx`
- suíte completa com todos os testes co-localizados.

## Comandos executados

```bash
npm run lint
npm run build
npm run test -- --run
```

## Resultado

- Lint: passou com 4 warnings.
- Build: passou.
- Testes: passaram, 31 arquivos e 86 testes.
