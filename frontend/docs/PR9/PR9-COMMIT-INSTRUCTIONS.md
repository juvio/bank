# PR 9 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr9-public-barrels
```

## Commits sugeridos

```bash
git add src tsconfig.json docs/plano-migracao-arquitetura.md docs/PR9
git commit -m "refactor(frontend): standardize public barrels"
```

## Descricao sugerida

```txt
refactor(frontend): standardize public barrels

- create public barrels for components, hooks, services, stores, utils and mocks
- add bare aliases for public barrel imports
- update app, feature, story and test imports to use public APIs
- document PR 9 delivery and residual import-cycle warnings

Validated:
- npm run lint
- npm run build
- npm run test -- --run
```

