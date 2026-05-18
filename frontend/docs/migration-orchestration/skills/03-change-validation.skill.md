# Skill: Change Validation

## Objetivo

Validar qualidade tecnica e regressao funcional do PR.

## Checklist de execucao

1. Rodar `npm run lint`.
2. Rodar `npm run build`.
3. Rodar `npm run test` (ou equivalente de execucao unica).
4. Confirmar ausencia de mudancas em `/backend`.
5. Verificar aderencia ao padrao arquitetural do plano.
6. Validar politica de testes por feature:
   - quando aplicavel, a feature alterada possui testes novos/atualizados;
   - testes estao co-localizados em `__tests__`.

## Fallback obrigatorio quando npm nao esta no PATH

Se o terminal retornar "npm nao reconhecido", nao interromper o gate. Execute:

1. Localizar executaveis instalados:
   - `where.exe npm`
   - `where.exe node`
   - `Get-Command npm -All`
2. Rodar validacoes por caminho absoluto do `npm.cmd`:
   - `& 'C:\Program Files\nodejs\npm.cmd' run lint`
   - `& 'C:\Program Files\nodejs\npm.cmd' run build`
   - `& 'C:\Program Files\nodejs\npm.cmd' run test -- --run`
3. Registrar no relatorio se o fallback foi necessario.

## Saida esperada

- Relatorio de validacao
- Falhas encontradas e correcoes aplicadas
- Status final de aprovacao tecnica
