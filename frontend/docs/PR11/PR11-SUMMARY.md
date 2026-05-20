# PR 11 Summary

## Status

CONCLUIDO.

## Objetivo

Adicionar bundle analyzer e aplicar dynamic imports para reduzir o JS inicial das rotas mais pesadas.

## Mudancas principais

- Bundle analyzer habilitado no Next config.
- Script `build:analyze` com `cross-env` para Windows.
- Dynamic import em home, transactions e graphicApp.
- Lazy-load do preview do MFE no home.

## Fora de escopo

- Nenhuma alteracao em `backend`.
- Nenhuma mudanca de dominio ou API.

## Riscos residuais

- Ainda precisa validar queda real de bundle size no analyzer.

## Validacoes

- `npm run build:analyze`: executado com sucesso.

## Evidencia de bundle size

- `/home`: 283 kB -> 272 kB
- `/transactions`: 262 kB -> 103 kB
- `/graphicApp`: 283 kB -> 129 kB
