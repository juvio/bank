# Prompt: PR Execution

Execute o PR [N] da migracao de arquitetura.

Regra adicional:

- Se o PR for migracao de modulo/feature, use obrigatoriamente a skill
  `frontend/.agents/skills/feature-module-migration/SKILL.md`.

Passos:

1. Releia objetivo e escopo do PR no plano.
2. Classifique se o PR e migracao de modulo (sim/nao).
3. Se for migracao de modulo, aplique o workflow da skill
   `feature-module-migration` (components/hooks/services/barrels/imports).
4. Implemente as mudancas no frontend.
5. Para cada feature impactada, criar/atualizar testes quando aplicavel.
6. Co-localizar testes em `__tests__` por camada da feature.
7. Rode validacoes: lint, build e testes.
8. Corrija regressos identificados.
9. Gere documentacao obrigatoria em `frontend/docs/PR[N]`.

Saida:

- Resumo tecnico da implementacao.
- Lista de arquivos alterados.
- Resultado das validacoes.
- Riscos residuais.
- Confirmacao de uso da skill `feature-module-migration` quando aplicavel.
- Confirmacao da politica de testes por feature e uso de `__tests__`.
