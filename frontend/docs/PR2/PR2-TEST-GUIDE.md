# PR 2 Test Guide

PR 2 is a structural foundation change. It does not add runtime logic, UI behavior, or testable business rules.

## Required commands

Run from `frontend/`:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Expected result

- Lint should pass because the new files are valid empty modules/barrels.
- Build should pass because no runtime imports were changed.
- Tests should pass because existing behavior is untouched.

## Executed result

- Lint passed with 6 pre-existing warnings outside PR2 scope.
- Build passed after rerun with network access for Google Fonts.
- Tests passed: 2 files, 16 tests.

## Next validation focus

PR 3 must validate that `@types` resolves to `src/front-types-domain` in both TypeScript and Vitest after the type files are moved.

## Manual checks

- Review `git diff --name-only`.
- Confirm all changed files are under `frontend/`.
- Confirm no existing imports were redirected to the new folders.
