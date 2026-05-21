# PR6 Test Guide

## Feature impactada

- `accounts`

## Testes criados

- `src/features/accounts/components/__tests__/AccountCard.test.tsx`
  - Renderiza saudacao da conta e saldo formatado.
  - Valida alternancia de visibilidade do saldo.
- `src/features/accounts/components/__tests__/AccountMenu.test.tsx`
  - Renderiza navegacao, nome do usuario e avatar.
  - Valida callback de navegacao customizado.
  - Valida fluxo de logout e redirecionamento para login.

## Como executar

```bash
npm run test -- --run src/features/accounts/components/__tests__/AccountCard.test.tsx src/features/accounts/components/__tests__/AccountMenu.test.tsx
npm run test -- --run
```

## Resultado registrado

- Teste focado de accounts: 2 arquivos, 4 testes, passou.
- Suite completa: 22 arquivos, 75 testes, passou.
- Comando executado via `C:\Program Files\nodejs\npm.cmd`.
