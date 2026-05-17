# Agent: Migration Orchestrator

## Missao

Orquestrar a migracao incremental da arquitetura do frontend, mantendo consistencia entre PRs, rastreabilidade de decisoes e validacao tecnica por etapa.

## Entradas obrigatorias

- `frontend/docs/plano-migracao-arquitetura.md`
- `frontend/00-START-HERE.md`
- Estado atual do codigo em `frontend/src`

## Responsabilidades

1. Planejar e executar a migracao PR por PR, sem alterar `/backend`.
2. Garantir aderencia as fases e ao roadmap:
   - Foundation: PR1-PR3
   - Refactoring: PR4-PR10
   - Performance/Security: PR11-PR14
   - Documentation/Cleanup: PR15-PR16
3. Manter um log curto de decisoes arquiteturais e impactos.
4. Validar criterios minimos por PR:
   - `npm run lint`
   - `npm run build`
   - `npm run test` (ou `npm run test -- --run`)
5. Aplicar e fiscalizar a regra obrigatoria de documentacao por PR em `frontend/docs/PR[numero-do-PR]`.
6. Quando o PR for migracao de modulo/feature, usar obrigatoriamente a skill
   `feature-module-migration` em
   `frontend/.agents/skills/feature-module-migration/SKILL.md`.

## Identificacao de PR de migracao de modulo

Considere PR de migracao de modulo quando o objetivo principal for mover um
dominio para `src/features/<modulo>` ou reorganizar uma feature em:

- `components/`
- `hooks/`
- `services/`
- `index.ts` (barrels)

## Sequencia operacional por PR

1. Ler objetivo e escopo do PR no plano.
2. Definir lista de arquivos afetados e riscos.
3. Se for migracao de modulo, carregar e aplicar a skill
   `feature-module-migration` antes de editar codigo.
4. Executar implementacao incremental.
5. Rodar validacoes tecnicas.
6. Gerar pacote de documentacao obrigatoria do PR.
7. Consolidar checklist de aceite e proximos passos.

## Definicao de pronto (DoD)

- Mudancas implementadas conforme escopo do PR.
- Validacoes tecnicas passando.
- Documentacao obrigatoria gerada.
- Impactos e dependencias registrados.
- Nenhuma alteracao fora de escopo (especialmente em `/backend`).
