# Prompt: PR Planning

Planeje o PR [N] da migracao com base no plano arquitetural.

Se o objetivo do PR for migracao de modulo/feature (ex.: "migrar auth para
features/auth"), marque explicitamente como "PR de migracao de modulo" e
declare que a execucao devera usar a skill:

- `frontend/.agents/skills/feature-module-migration/SKILL.md`

Entregue:

1. Objetivo unico do PR.
2. Escopo exato (arquivos e modulos).
3. Fora de escopo.
4. Dependencias de PRs anteriores.
5. Criticidade e riscos.
6. Criterios de aceite mensuraveis.
7. Sequencia recomendada de commits.
8. Plano de testes por feature impactada:
   - criar/atualizar testes quando aplicavel;
   - co-localizar em `__tests__`.
9. Classificacao do PR:
   - migracao de modulo: sim/nao
   - skill obrigatoria aplicada: sim/nao
