# Migration Orchestration Kit

Estrutura de suporte para orquestrar a migracao de arquitetura do `Bank Frontend`, baseada em:

- `frontend/docs/plano-migracao-arquitetura.md`
- `frontend/00-START-HERE.md`

## Estrutura

- `agent/` -> agente orquestrador da migracao
- `skills/` -> capacidades especializadas por etapa do processo
- `prompts/` -> prompts reutilizaveis por tipo de tarefa
- `rules/` -> regras obrigatorias de governanca e rastreabilidade

## Como usar (fluxo curto)

1. Ler `rules/migration-governance.rules.md`.
2. Iniciar com `agent/migration-orchestrator.agent.md`.
3. Para cada PR, usar `prompts/pr-execution.prompt.md`.
4. Aplicar a skill adequada para cada etapa.
5. Gerar obrigatoriamente os artefatos de documentacao em `frontend/docs/PR[numero-do-PR]`.

## Fases mapeadas do plano

1. Foundation (PR 1-3)
2. Refactoring (PR 4-10)
3. Performance and Security (PR 11-14)
4. Documentation and Cleanup (PR 15-16)
