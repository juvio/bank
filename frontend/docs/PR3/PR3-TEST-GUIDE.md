# PR3 Test Guide

## Comandos obrigatorios

Execute a partir de `frontend/`:

```bash
npm run lint
npm run build
npm run test -- --run
```

## O que verificar

- Imports `@types` resolvem para `src/front-types-domain`.
- Imports legados via `src/types` continuam funcionando quando usados por codigo
  ainda nao migrado.
- Build Next.js resolve os aliases adicionados em `tsconfig.json`.
- Vitest resolve `@types` pelo alias de `vitest.config.ts`.

## Resultado desta execucao

Executado e passando.
