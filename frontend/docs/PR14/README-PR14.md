# README PR 14

## Objetivo

Preparar o frontend para deploy em staging e validar performance com orçamento versionado.

## Como revisar

1. Verifique os scripts adicionados em `package.json`.
2. Revise `performance-budget.json`.
3. Revise `scripts/validate-performance-budget.mjs`.
4. Execute:

```bash
npm run lint
npm run build
npm run test -- --run
npm run staging:validate
```

## Resultado esperado

- O build de staging deve gerar artefatos `.next`.
- O budget deve validar assets estaticos compartilhados e rotas principais.
- Nenhuma mudanca em backend deve existir.
