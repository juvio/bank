# Skill: Documentation Generator

## Objetivo

Gerar documentacao padrao obrigatoria por PR de migracao.

## Regra obrigatoria

Para cada PR de migracao, criar pasta:

- `frontend/docs/PR[numero-do-PR]`

Exemplo:

- `frontend/docs/PR1`

Arquivos obrigatorios dentro da pasta (ajustando o numero):

1. `PR1-READY.txt` - resumo visual da entrega
2. `README-PR1.md` - guia rapido de inicio
3. `PR1-SUMMARY.md` - visao geral completa
4. `PR1-CHECKLIST.md` - etapas de validacao
5. `PR1-TEST-GUIDE.md` - padroes e instrucoes de teste
6. `PR1-COMMIT-INSTRUCTIONS.md` - fluxo de Git e commits
7. `PR1-VISUAL-MAP.md` - mapas visuais e diagramas de arquitetura
8. `PR1-INDEX.md` - referencia de arquivos alterados/criados

## Validacao da regra

- O numero do PR deve aparecer no nome da pasta.
- O mesmo numero deve aparecer no nome de todos os arquivos obrigatorios.
- Sem os 8 arquivos, o PR nao esta pronto para revisao.
