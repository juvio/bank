# Prompt: Migration Kickoff

Analise `frontend/docs/plano-migracao-arquitetura.md` e `frontend/00-START-HERE.md`.

Entregue:

1. Fases da migracao e PRs previstos.
2. Dependencias entre PRs.
3. Riscos principais e mitigacoes.
4. Proposta de ordem de execucao.
5. Criterios de validacao obrigatorios por PR.
6. Politica de testes por feature durante a migracao:
   - criar testes quando aplicavel e inexistentes;
   - co-localizar em `__tests__`.
7. Quais PRs sao de migracao de modulo e devem usar a skill obrigatoria:
   `frontend/.agents/skills/feature-module-migration/SKILL.md`.

Restricoes:

- Nao alterar `/backend`.
- Priorizar incrementalismo e reversibilidade.
