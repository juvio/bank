# PR8 Test Guide

## Feature impactada

- `accounts`

## Testes criados ou atualizados

- Atualizado: `src/features/accounts/components/__tests__/AccountCard.test.tsx`
  - Valida a view apresentacional, textos principais, saldo formatado e callback de alternancia.
- Criado: `src/features/accounts/components/__tests__/AccountCardContainer.test.tsx`
  - Valida integracao do container com o hook e alternancia real da visibilidade do saldo.
- Criado: `src/features/accounts/hooks/__tests__/useAccountCard.test.tsx`
  - Valida formatacao de saldo, primeiro nome e estado de visibilidade.

## Comandos executados

Teste focado:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run test -- --run src/features/accounts/components/__tests__/AccountCard.test.tsx src/features/accounts/components/__tests__/AccountCardContainer.test.tsx src/features/accounts/hooks/__tests__/useAccountCard.test.tsx
```

Resultado: 3 arquivos passaram, 5 testes passaram.

Suite completa:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run test -- --run
```

Resultado: 25 arquivos passaram, 79 testes passaram.

## Politica de co-localizacao

Todos os testes do PR8 estao em pastas `__tests__` dentro da camada alterada:

- Componentes: `src/features/accounts/components/__tests__`
- Hook: `src/features/accounts/hooks/__tests__`
