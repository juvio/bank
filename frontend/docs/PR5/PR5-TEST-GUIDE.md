# PR5 Test Guide

## Comandos obrigatorios

Execute a partir de `frontend/` em um ambiente com Node.js instalado:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Features impactadas

- `transactions`

## Testes criados/atualizados

- `src/features/transactions/services/__tests__/transactionService.test.ts`

## O que verificar

- `/transactions` renderiza `TransactionContent` via `@features/transactions`.
- Home continua exibindo historico e formulario de nova transacao.
- Storybook de `TransactionCard` continua usando o componente migrado.
- `useBankAccountStore` chama services da feature para listar, criar, editar e
  remover transacoes.
- Nao existem imports de runtime para os componentes migrados em
  `@/components/Transaction*` ou `@/components/NewTransactionCard`.

## Resultado desta execucao

- `npm run lint`: nao executado, Node.js/npm indisponiveis.
- `npm run build`: nao executado, Node.js/npm indisponiveis.
- `npm run test -- --run`: nao executado, Node.js/npm indisponiveis.
