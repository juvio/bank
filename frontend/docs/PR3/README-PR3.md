# PR 3 - Paths + Types Migration

Este PR conclui a etapa Foundation de aliases e tipos compartilhados.

## Objetivo

Migrar a fonte publica de tipos compartilhados de `src/types` para
`src/front-types-domain` e alinhar os aliases de path com a estrutura criada no
PR2.

## O que mudou

- `tsconfig.json` agora declara aliases para `@core`, `@features`,
  `@components`, `@lib`, `@common`, `@types`, `@hooks`, `@stores`,
  `@services`, `@utils` e `@mocks`.
- `vitest.config.ts` aponta `@types` para `src/front-types-domain`.
- `src/front-types-domain` passou a exportar os tipos e constantes
  compartilhados usados hoje.
- Imports consumidores migraram de `@/types` para `@types`.
- `src/types` permanece como barrel legado para compatibilidade incremental.

## ✨ Ready to Merge

All boxes checked ✅:

- [x] Tests pass (16/16)
- [x] Coverage report generated
- [x] Lint check passes
- [x] Build succeeds
- [x] No /backend changes
- [x] Documentation complete
- [x] Git history clean

**Status: READY FOR GITHUB PR**
