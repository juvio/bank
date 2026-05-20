# PR 15 Commit Instructions

## Branch sugerida

```bash
git checkout -b docs/pr15-frontend-readme
```

## Arquivos para revisar

```bash
git diff -- README.md docs/plano-migracao-arquitetura.md docs/PR15
```

## Validacoes antes do commit

```bash
npm run lint
npm run build
npm run test -- --run
git diff --name-only
```

Confirme que nenhum arquivo em `../backend` aparece no diff.

## Commit sugerido

```bash
git add README.md docs/plano-migracao-arquitetura.md docs/PR15
git commit -m "docs(frontend): document migrated architecture pattern"
```

## Corpo sugerido

```txt
docs(frontend): document migrated architecture pattern

- add frontend README with current folder architecture
- document feature boundaries, aliases, barrels and test policy
- document security, performance and staging validation
- add PR15 documentation package
- mark PR15 as completed in migration roadmap

Validated:
- npm run lint
- npm run build
- npm run test -- --run
```
