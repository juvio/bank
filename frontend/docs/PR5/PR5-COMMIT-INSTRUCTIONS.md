# PR5 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr5-transactions-feature-migration
```

## Arquivos para revisar antes do commit

```bash
git diff --name-only
```

Confirme que `frontend/.env.local` e qualquer outra alteracao local nao
relacionada nao sejam incluidas por engano.

## Commit sugerido

```bash
git add frontend/src/app/(operations)/transactions/page.tsx \
  frontend/src/components/HomePageComponent/index.tsx \
  frontend/src/features/transactions \
  frontend/src/stores/useBankAccountStore.tsx \
  frontend/src/stories/TransactionCard/TransactionCard.stories.tsx \
  frontend/docs/PR5

git commit -m "refactor(transactions): migrate transactions module to features

- Move transaction components to features/transactions/components
- Add transaction service layer for CRUD/fetch operations
- Rewire store, route, HomePage and Storybook imports
- Add co-localized service tests
- Add PR5 migration documentation"
```

## Antes de abrir PR

Execute o gate tecnico em ambiente com Node.js:

```bash
npm run lint
npm run build
npm run test -- --run
```
