# PR3 Summary

## Objetivo

Atualizar paths e migrar os tipos compartilhados para
`src/front-types-domain`, preservando compatibilidade com a pasta legada
`src/types`.

## Mudancas por camada

- `front-types-domain`: agora centraliza `TransactionType`, `Transactions`,
  `NewTransaction`, `RemoteAppProps`, `TransactionMapper` e
  `transactionTypes`.
- `types`: virou camada de re-export legado para evitar quebra em consumidores
  ainda nao migrados.
- `components`, `app`, `services`, `stores`: imports de tipos atualizados para
  o alias publico `@types`.
- Configuracao: `tsconfig.json` e `vitest.config.ts` alinhados ao destino novo.

## Fora de escopo

- Migrar features completas para `src/features`.
- Refatorar componentes para Container/Presentational.
- Remover definitivamente `src/types`.
- Alterar backend.

## Riscos residuais

- Gate tecnico pendente porque `npm` nao esta disponivel no ambiente.
- `src/types` ainda existe temporariamente como compatibilidade ate um PR de
  cleanup.

## Dependencia desbloqueada

PR4 pode iniciar a migracao de `auth` para `features/auth` consumindo aliases
arquiteturais ja declarados.
