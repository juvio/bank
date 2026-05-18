# Prompt: Acionar Step

Comando de IDE:

```txt
/acionar-step [N]
```

Exemplo:

```txt
/acionar-step 2
```

Onde `[N]` e o numero do PR/step da migracao de arquitetura.

## Papel do agente

Atue como Migration Orchestrator do frontend. Execute a cadeia completa de
planejamento, analise, implementacao, validacao, documentacao e handoff do PR
informado em `[N]`, sempre respeitando os arquivos de agents, rules, prompts e
skills do projeto.

## Entradas obrigatorias

Antes de iniciar qualquer mudanca, leia nesta ordem:

1. `AGENTS.md`
2. `.agents/rules/folder-structure.md`
3. `docs/migration-orchestration/rules/migration-governance.rules.md`
4. `docs/migration-orchestration/rules/pr-documentation-mandatory.rules.md`
5. `docs/plano-migracao-arquitetura.md`
6. `00-START-HERE.md`
7. Estado atual do codigo em `src/`

## Restricoes obrigatorias

1. Trabalhe somente dentro de `frontend/`.
2. Nao altere `../backend/`.
3. Nao misture objetivos de PRs diferentes.
4. Nao antecipe refactors fora do escopo do PR `[N]`.
5. Siga a arquitetura de pastas definida em `.agents/rules/folder-structure.md`.
6. Se o plano e a rule entrarem em conflito, siga `docs/plano-migracao-arquitetura.md`
   e registre a divergencia.
7. Se houver alteracoes pendentes nao relacionadas no working tree, preserve-as
   e trabalhe ao redor delas.
8. Se o PR for migracao de modulo/feature, use obrigatoriamente a skill
   `feature-module-migration` em
   `frontend/.agents/skills/feature-module-migration/SKILL.md`.
9. Para cada feature impactada, criar/atualizar testes quando aplicavel e
   manter co-localizacao em `__tests__`.

## Cadeia de execucao

### 1. Kickoff

Use o conteudo de:

- `docs/migration-orchestration/prompts/migration-kickoff.prompt.md`
- `docs/migration-orchestration/agent/migration-orchestrator.agent.md`

Entregue um resumo curto com:

1. PR solicitado: `[N]`.
2. Fase da migracao correspondente.
3. Dependencias de PRs anteriores.
4. Objetivo esperado segundo o plano.
5. Validacoes obrigatorias.

Se `[N]` nao existir no roadmap do plano, pare e informe `PENDENTE`.

### 2. Planejamento do PR

Use:

- `docs/migration-orchestration/prompts/pr-planning.prompt.md`
- `docs/migration-orchestration/skills/02-pr-planning.skill.md`

Entregue antes de editar codigo:

1. Objetivo unico do PR `[N]`.
2. Escopo exato por arquivo/modulo.
3. Fora de escopo.
4. Dependencias de PRs anteriores e seguintes.
5. Criticidade e riscos.
6. Criterios de aceite mensuraveis.
7. Sequencia recomendada de commits.
8. Declaracao explicita se o PR e migracao de modulo e, se for, confirmacao do
   uso da skill `feature-module-migration`.
9. Plano de testes por feature com caminhos `__tests__`.

### 3. Analise arquitetural

Use:

- `docs/migration-orchestration/skills/01-architecture-analysis.skill.md`
- `.agents/rules/folder-structure.md`

Mapeie:

1. Arquivos e camadas impactadas: `app`, `core`, `features`, `components`,
   `lib`, `common`, `front-types-domain`, `hooks`, `stores`, `services`,
   `utils`, `mocks`, `test`.
2. Acoplamentos indevidos atuais.
3. Imports que precisarao mudar.
4. Riscos de circular dependency, quebra de build ou mudanca de API publica.
5. Gaps que devem ficar para PRs futuros.

### 4. Confirmacao de escopo

Antes de implementar, declare:

```txt
Vou executar o PR [N] com este escopo:
- ...

Fora de escopo:
- ...
```

Se o pedido do usuario for apenas planejamento, pare aqui. Caso contrario,
continue para execucao.

### 5. Execucao

Use:

- `docs/migration-orchestration/prompts/pr-execution.prompt.md`
- `frontend/.agents/skills/feature-module-migration/SKILL.md` (obrigatorio
  quando o PR for migracao de modulo)

Execute somente as mudancas aprovadas para o PR `[N]`.

Durante a execucao:

1. Mantenha commits logicos em mente, mesmo que nao crie commits.
2. Atualize barrels quando a API publica mudar.
3. Atualize imports impactados.
4. Preserve compatibilidade quando o plano exigir migracao incremental.
5. Nao mova arquivos para fora da arquitetura aprovada.
6. Nao crie pastas novas fora de `.agents/rules/folder-structure.md` sem
   registrar justificativa.
7. Em PR de migracao de modulo, seguir o workflow da skill
   `feature-module-migration` para mapear ownership, mover componentes, extrair
   hooks, centralizar services, atualizar barrels e rewiring de imports.
8. Em cada feature alterada, criar/atualizar testes quando aplicavel e manter
   os arquivos em `__tests__`.

### 6. Validacao tecnica

Use:

- `docs/migration-orchestration/skills/03-change-validation.skill.md`
- `docs/migration-orchestration/prompts/validation-gate.prompt.md`
- `docs/migration-orchestration/skills/06-test-guidance.skill.md`

Rode, no minimo:

```bash
npm run lint
npm run build
npm run test -- --run
```

Tambem verifique:

```bash
git diff --name-only
```

Confirme que nenhum arquivo em `../backend/` foi alterado.
Confirme tambem que a politica de testes por feature foi aplicada (quando
aplicavel) e que os testes estao em `__tests__`.

Se alguma validacao falhar:

1. Corrija se estiver dentro do escopo do PR `[N]`.
2. Se a falha estiver fora do escopo, registre como risco residual.
3. Marque o gate como `PENDENTE`.

### 7. Revisao de impacto

Use:

- `docs/migration-orchestration/skills/05-impact-review.skill.md`

Entregue:

1. Mudancas por camada.
2. Impacto em imports e API publica.
3. Impacto em testes.
4. Riscos residuais.
5. Dependencias desbloqueadas para o proximo PR.

### 8. Pacote documental obrigatorio

Use:

- `docs/migration-orchestration/prompts/documentation-pack.prompt.md`
- `docs/migration-orchestration/skills/04-documentation-generator.skill.md`
- `docs/migration-orchestration/rules/pr-documentation-mandatory.rules.md`

Crie ou atualize:

```txt
docs/PR[N]/
|-- PR[N]-READY.txt
|-- README-PR[N].md
|-- PR[N]-SUMMARY.md
|-- PR[N]-CHECKLIST.md
|-- PR[N]-TEST-GUIDE.md
|-- PR[N]-COMMIT-INSTRUCTIONS.md
|-- PR[N]-VISUAL-MAP.md
`-- PR[N]-INDEX.md
```

Cada arquivo deve refletir exatamente o codigo entregue no PR `[N]`.

### 9. Delivery checklist

Use:

- `docs/migration-orchestration/skills/07-delivery-checklist.skill.md`

Verifique:

1. Escopo do PR cumprido.
2. Fora de escopo preservado.
3. Validacoes executadas e registradas.
4. Documentacao obrigatoria completa.
5. Nenhuma alteracao em `../backend/`.
6. Politica de testes por feature aplicada e registrada.
7. Proximo PR recomendado identificado.

### 10. Handoff

Use:

- `docs/migration-orchestration/prompts/pr-handoff.prompt.md`

Entregue a resposta final neste formato:

```txt
Status: APROVADO | PENDENTE

PR: [N]
Objetivo:
- ...

Mudancas chave:
- ...

Arquivos alterados:
- ...

Validacoes:
- npm run lint: passou | falhou | nao executado
- npm run build: passou | falhou | nao executado
- npm run test -- --run: passou | falhou | nao executado

Documentacao:
- docs/PR[N]/PR[N]-READY.txt
- docs/PR[N]/README-PR[N].md
- docs/PR[N]/PR[N]-SUMMARY.md
- docs/PR[N]/PR[N]-CHECKLIST.md
- docs/PR[N]/PR[N]-TEST-GUIDE.md
- docs/PR[N]/PR[N]-COMMIT-INSTRUCTIONS.md
- docs/PR[N]/PR[N]-VISUAL-MAP.md
- docs/PR[N]/PR[N]-INDEX.md

Riscos residuais:
- ...

Proximo passo recomendado:
- ...
```

## Mapeamento inicial do roadmap

Use o plano como fonte final, mas comece por esta leitura:

```txt
PR 1: Foundation inicial, Vitest setup e tipos centralizados iniciais.
PR 2: Estrutura base de pastas para core/features/lib/common/front-types-domain.
PR 3: Atualizacao de paths e Types Migration para src/front-types-domain/.
PR 4: Migrar auth para features/auth.
PR 5-10: Refactoring de features, componentes, hooks e barrels.
PR 11-14: Performance e seguranca.
PR 15-16: Documentacao final e cleanup.
```

## Exemplo especifico

Entrada:

```txt
/acionar-step 3
```

Interpretacao:

```txt
Acionar a cadeia completa para o PR 3, tratando-o como paths + Types Migration:
- atualizar aliases de path para a estrutura criada no PR 2;
- planejar migracao de tipos;
- analisar src/types e src/front-types-domain;
- executar apenas mudancas de tipos/imports/barrels necessarias;
- validar lint/build/test;
- gerar docs/PR3;
- entregar handoff para revisao.
```
