# Skill: Delivery Checklist

## Objetivo

Garantir fechamento padrao da entrega antes de abrir PR.

## Checklist de execucao

1. Escopo do PR confere com o plano.
2. Validacoes tecnicas executadas e aprovadas.
3. Testes da feature criados/atualizados quando aplicavel.
4. Testes co-localizados no padrao `__tests__` por camada da feature.
5. Regra dos 8 arquivos de documentacao por PR atendida.
6. Dependencias e impactos registrados.
7. Resumo executivo pronto para revisao.

## Regra de gate para ambiente sem npm no PATH

Antes de marcar validacao como pendente por erro de comando, tentar fallback com
binario instalado de NPM por caminho absoluto (ex.:
`C:\Program Files\nodejs\npm.cmd`) para rodar lint/build/test.

## Saida esperada

- Status final: pronto ou pendente
- Pendencias objetivas para desbloqueio
