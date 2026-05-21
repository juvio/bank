# README PR10

## Objetivo

Adicionar testes co-localizados para aumentar cobertura com foco em componentes e utilitarios ainda sem testes.

## O que mudou

- Novos testes em componentes compartilhados e MFE.
- Novos testes de utilitario para URL do microfrontend.
- Mantem a politica de testes co-localizados em `__tests__`.

## Validacao recomendada

```bash
npm run test -- --run
npm run test:coverage
npm run lint
npm run build
```
