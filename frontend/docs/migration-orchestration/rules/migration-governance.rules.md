# Rules: Migration Governance

## Fontes de verdade

1. `frontend/docs/plano-migracao-arquitetura.md`
2. `frontend/00-START-HERE.md`

## Regras gerais

1. Migracao sempre incremental, por PR pequeno e rastreavel.
2. Nao alterar `/backend`.
3. Nao misturar multiplos objetivos estruturais no mesmo PR.
4. Cada PR deve registrar impacto, risco e dependencia.
5. Toda mudanca deve ter validacao tecnica minima:
   - `npm run lint`
   - `npm run build`
   - `npm run test` (ou equivalente)

## Regras de consistencia arquitetural

1. Separar logica de UI quando o plano pedir Container/Presentational + hooks.
2. Respeitar estrategia de estrutura hibrida (features/core/lib/types).
3. Favorecer imports absolutos e barrels conforme evolucao planejada.
4. Para cada feature alterada, criar/atualizar testes quando aplicavel,
   especialmente quando ainda nao houver testes.
5. Manter testes co-localizados com os modulos alterados no padrao
   `__tests__` (ex.: `components/__tests__`, `hooks/__tests__`,
   `services/__tests__`).
6. Quando o PR for migracao de modulo para `features/<modulo>`, e obrigatorio
   usar a skill `feature-module-migration` localizada em:
   `frontend/.agents/skills/feature-module-migration/SKILL.md`.

## Regras de rastreabilidade

1. Todo PR deve declarar:
   - objetivo
   - escopo
   - fora de escopo
   - arquivos alterados
   - validacoes executadas
2. Evidencias de validacao devem constar na documentacao do PR.
