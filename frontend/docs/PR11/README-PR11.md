# README PR11

## Objetivo

Habilitar bundle analyzer e aplicar dynamic imports para reduzir o JS inicial.

## O que mudou

- Bundle analyzer configurado no Next config.
- Script `build:analyze` com compatibilidade Windows.
- Dynamic imports nas rotas home, transactions e graphicApp.
- Preview do MFE no home agora lazy-loadado.

## Validacao recomendada

```bash
npm run build:analyze
```

## Evidencia de bundle size

- `/home`: 283 kB -> 272 kB
- `/transactions`: 262 kB -> 103 kB
- `/graphicApp`: 283 kB -> 129 kB
