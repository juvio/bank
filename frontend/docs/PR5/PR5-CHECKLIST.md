# PR5 Checklist

## Escopo

- [x] Migrar `TransactionCard` para `src/features/transactions/components`.
- [x] Migrar `TransactionContent` para `src/features/transactions/components`.
- [x] Migrar `TransactionFilter` para `src/features/transactions/components`.
- [x] Migrar `TransactionHistoryCard` para `src/features/transactions/components`.
- [x] Migrar `NewTransactionCard` para `src/features/transactions/components`.
- [x] Centralizar API calls em `src/features/transactions/services/transactionService.ts`.
- [x] Atualizar barrels `components/services` e `features/transactions/index.ts`.
- [x] Atualizar imports de rotas, HomePage e Storybook para `@features/transactions`.
- [x] Criar testes co-localizados para o service de transactions.
- [x] Confirmar que nenhum arquivo de `../backend` foi alterado.

## Validacao obrigatoria

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run test -- --run`

## Observacao

Validacoes nao executadas porque `npm`, `node` e
`C:\Program Files\nodejs\npm.cmd` nao estao disponiveis neste ambiente.
