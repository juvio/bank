# PR 13 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr13-data-masking-sanitization
```

## Arquivos para revisar antes do commit

```bash
git status --short
git diff --name-only
```

## Commit sugerido

```bash
git add docs/plano-migracao-arquitetura.md docs/PR13 src/utils src/features/accounts/hooks src/features/transactions/hooks src/features/transactions/services src/components/Modal
git commit -m "feat(security): sanitize and mask sensitive frontend data"
```
