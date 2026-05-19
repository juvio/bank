# PR8 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr8-account-card-refactor
```

## Arquivos para revisar

```bash
git status --short
git diff -- src/features/accounts docs/PR8
```

## Commit sugerido

```bash
git add src/features/accounts docs/PR8
git commit -m "refactor(accounts): split AccountCard container and hook"
```

## Corpo sugerido

```txt
refactor(accounts): split AccountCard container and hook

- Add AccountCardContainer and presentational AccountCard
- Extract balance visibility, first-name derivation, and BRL formatting to useAccountCard
- Export AccountCard public API through local barrels
- Add co-located tests for view, container, and hook
- Add PR8 migration documentation pack

Validation:
- npm run lint
- npm run build
- npm run test -- --run
```

## Observacao

Os comandos de validacao foram executados com caminho absoluto de npm porque `node`/`npm` nao estavam disponiveis diretamente no PATH do terminal sandbox.
