# PR3 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr3-paths-types-migration
```

## Validacao antes do commit

```bash
npm run lint
npm run build
npm run test -- --run
git diff --name-only
```

## Commit sugerido

```bash
git add .
git commit -m "refactor(types): migrate shared frontend types to front-types-domain

- Point @types alias to front-types-domain
- Add architecture path aliases to tsconfig
- Move shared transaction and remote app types to front-types-domain
- Update current consumers to import from @types
- Keep src/types as temporary compatibility barrel"
```

## Nota

Nao incluir alteracoes de backend neste PR.
