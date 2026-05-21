# Frontend Agents

This file orients agents working in `frontend/` during the architecture
migration.

## Required reading order

1. `.agents/rules/folder-structure.md`
2. `docs/migration-orchestration/rules/migration-governance.rules.md`
3. `docs/migration-orchestration/rules/pr-documentation-mandatory.rules.md`
4. `docs/plano-migracao-arquitetura.md`
5. `00-START-HERE.md`

## Mission

Execute the frontend migration incrementally, keeping each PR aligned with the
proposed folder architecture and the migration roadmap.

## Operating rules

- Work only inside this `frontend/` project.
- Do not alter `../backend/`.
- Follow `.agents/rules/folder-structure.md` for folder ownership, allowed
  aliases, and migration order.
- Keep `src/app/` as the App Router boundary; move business logic into features,
  core, hooks, or services according to the rule.
- Prefer barrels and absolute imports once aliases exist.
- Keep tests co-located with the code they validate.
- Document each migration PR under `docs/PR[numero-do-PR]` when executing a PR
  from the orchestration plan.

## Validation baseline

Run or explicitly document why you could not run:

```bash
npm run lint
npm run build
npm run test -- --run
```

If `npm` is not available in PATH, run the installed executable directly and
continue validation (do not skip checks only because PATH is missing):

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run test -- --run
```

If that path does not exist, discover installed binaries with PowerShell and use
absolute paths:

```powershell
where.exe npm
where.exe node
Get-Command npm -All
Get-Command node -All
```

## Orchestration references

- Orchestrator: `docs/migration-orchestration/agent/migration-orchestrator.agent.md`
- PR execution prompt: `docs/migration-orchestration/prompts/pr-execution.prompt.md`
- Validation gate: `docs/migration-orchestration/prompts/validation-gate.prompt.md`
- Delivery checklist: `docs/migration-orchestration/skills/07-delivery-checklist.skill.md`
