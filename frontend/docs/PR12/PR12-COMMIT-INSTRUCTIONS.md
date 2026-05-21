# PR 12 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr12-secure-auth-cookies
```

## Arquivos para revisar antes do commit

```bash
git status --short
git diff --name-only
```

## Commit sugerido

```bash
git add docs/plano-migracao-arquitetura.md docs/PR12 next.config.ts src/app/api/auth src/app/api/transactions src/components/Modal/index.tsx src/features/auth/services src/stores/useAuthStore.tsx src/utils/api.ts
git commit -m "feat(auth): move token handling to httpOnly cookies"
```

## Nota sobre working tree

`package-lock.json` estava modificado antes da execução do PR 12. Revise separadamente antes de incluir em commit.
