# PR 14 Test Guide

## Features impactadas

Nenhuma feature de dominio foi alterada. O PR impacta scripts de build, budget de performance e documentacao.

## Testes criados

- `scripts/validate-performance-budget.test.mjs`

Embora o teste fique fora de `src/features`, ele permanece co-localizado com o script validado porque o PR nao altera uma feature.

## Validacao recomendada

```bash
npm run test -- --run scripts/validate-performance-budget.test.mjs
npm run test -- --run
npm run staging:validate
```

## O que observar

- Rotas sem arquivos no manifest devem falhar.
- Assets devem considerar apenas arquivos `static/*.js` e `static/*.css`.
- O budget deve falhar quando qualquer rota exceder seu limite.
