# PR 14 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr14-staging-performance-validation
```

## Arquivos para revisar antes do commit

```bash
git status --short
git diff --name-only
```

## Commit sugerido

```bash
git add package.json performance-budget.json scripts docs/plano-migracao-arquitetura.md docs/PR14
git commit -m "perf(frontend): add staging performance validation"
```
