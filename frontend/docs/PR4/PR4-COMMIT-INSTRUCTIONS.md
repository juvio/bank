# PR4 Commit Instructions

## Branch sugerida

```bash
git checkout -b feature/pr4-auth-feature-migration
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
git commit -m "refactor(auth): migrate auth module to features/auth

- Move LoginCard and RegisterCard to features/auth/components
- Extract auth form logic into useLogin and useRegister hooks
- Centralize auth API calls in features/auth/services/authService
- Update barrels and route imports to @features/auth
- Remove legacy auth components from src/components"
```

## Nota

Nao incluir alteracoes de backend neste PR.
