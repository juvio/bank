# Rules: PR Documentation Mandatory

## Regra obrigatoria por PR de migracao

Para cada PR de migracao, deve existir uma pasta:

- `frontend/docs/PR[numero-do-PR]`

Exemplo:

- `frontend/docs/PR1`

## Arquivos obrigatorios na pasta do PR

1. `PR1-READY.txt` - resumo visual da entrega
2. `README-PR1.md` - guia rapido de inicio
3. `PR1-SUMMARY.md` - visao geral completa
4. `PR1-CHECKLIST.md` - etapas de validacao
5. `PR1-TEST-GUIDE.md` - padroes e instrucoes de teste
6. `PR1-COMMIT-INSTRUCTIONS.md` - fluxo de Git e commits
7. `PR1-VISUAL-MAP.md` - mapas visuais e diagramas de arquitetura
8. `PR1-INDEX.md` - referencia de arquivos alterados/criados

## Regra de numeracao

1. O numero do PR deve estar no nome da pasta.
2. O mesmo numero deve estar em todos os nomes de arquivos obrigatorios.
3. O nome `README-PR[numero].md` tambem deve refletir o numero correto.

## Gate de aprovacao

Sem os 8 arquivos obrigatorios e numeracao coerente, o PR deve ser marcado como `PENDENTE`.

## Requisito adicional para `PR[N]-TEST-GUIDE.md`

O guia de testes do PR deve registrar:

1. Features impactadas no PR.
2. Testes criados/atualizados por feature quando aplicavel.
3. Caminhos dos testes no padrao co-localizado `__tests__`.
