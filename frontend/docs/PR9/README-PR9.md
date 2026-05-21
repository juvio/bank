# PR 9 - Barrels Publicos

## Objetivo

Padronizar barrels publicos do frontend para reduzir imports internos e preparar a base para regras de import boundary mais fortes.

## O que mudou

- Criados barrels em `src/components`, `src/hooks`, `src/services`, `src/stores`, `src/utils` e `src/mocks`.
- `tsconfig.json` passou a aceitar aliases bare como `@components`, `@stores`, `@utils` e `@mocks`.
- Imports em `app`, componentes, hooks, services, stories e testes foram atualizados para consumir APIs publicas.
- O roadmap principal foi marcado com PR 9 concluido.

## Observacao de escopo

Existe `docs/PR9-ESLINT-IMPORT-RULES.md` descrevendo regras ESLint de boundaries. O plano principal define o PR 9 como "Implementar barrels em todas as pastas"; esta entrega seguiu o plano como fonte final e registrou os warnings de ESLint como risco residual.

## Validacao rapida

```bash
npm run lint
npm run build
npm run test -- --run
```

