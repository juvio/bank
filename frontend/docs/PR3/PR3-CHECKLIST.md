# PR3 Checklist

## Escopo

- [x] Atualizar aliases em `tsconfig.json`.
- [x] Atualizar alias `@types` em `vitest.config.ts`.
- [x] Migrar tipos compartilhados para `src/front-types-domain`.
- [x] Atualizar imports consumidores para `@types`.
- [x] Manter compatibilidade incremental em `src/types`.
- [x] Confirmar que nenhum arquivo de `../backend` foi alterado.

## Validacao obrigatoria

- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run test -- --run`
