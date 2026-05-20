# README PR 15

## Objetivo

Atualizar a documentacao principal do frontend para refletir o padrao atual de
arquitetura apos a migracao incremental.

## Como revisar

1. Leia `README.md` na raiz de `frontend/`.
2. Confirme que o README descreve:
   - estrutura `src/app`, `src/features`, `src/core` e camadas compartilhadas;
   - padrao Container/Presentational;
   - aliases e barrels;
   - politica de testes co-localizados;
   - seguranca, performance e staging.
3. Confira `docs/plano-migracao-arquitetura.md` para validar o status do PR 15.
4. Rode:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Resultado esperado

- O frontend passa a ter um README proprio e alinhado ao estado atual da
  arquitetura.
- Nenhuma API publica de runtime e alterada.
- Nenhum arquivo de backend e modificado.
