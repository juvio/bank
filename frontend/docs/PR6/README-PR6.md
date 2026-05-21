# README PR6

## Objetivo

Migrar o modulo de contas para `src/features/accounts`, mantendo comportamento
visual e contratos atuais.

## Como revisar

1. Conferir exports em `src/features/accounts/components/index.ts`.
2. Conferir consumidores atualizados:
   - `src/app/(operations)/layout.tsx`
   - `src/components/HomePageComponent/index.tsx`
   - `src/stories/AccountCard/AccountCard.stories.tsx`
   - `src/stories/AccountMenu/AccountMenu.stories.tsx`
3. Conferir testes novos:
   - `src/features/accounts/components/__tests__/AccountCard.test.tsx`
   - `src/features/accounts/components/__tests__/AccountMenu.test.tsx`

## Validacao esperada

Quando Node/NPM estiverem disponiveis:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Status

`APROVADO`: implementacao concluida e validacoes executadas via
`C:\Program Files\nodejs\npm.cmd`.
