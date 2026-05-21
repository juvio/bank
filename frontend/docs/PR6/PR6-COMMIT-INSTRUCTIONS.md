# PR6 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr6-accounts-feature-migration
```

## Arquivos para revisar

```bash
git diff --name-only
git status --short
```

## Validacao antes do commit

```bash
npm run lint
npm run build
npm run test -- --run
```

## Commit sugerido

```bash
git add .
git commit -m "refactor(accounts): migrate account components to feature module

- Move AccountCard and AccountMenu into features/accounts/components
- Export account components and menu types from the accounts barrel
- Update app, home and stories imports to consume @features/accounts
- Add co-localized baseline tests for account components
- Document PR6 delivery and validation status

Validation: lint, build and test passed"
```
