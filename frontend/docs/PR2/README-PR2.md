# PR 2 - Architecture Folder Foundation

This PR creates the base folder structure required by the frontend architecture migration.

## What changed

- Added `src/core` for global infrastructure.
- Added `src/features` with initial feature boundaries: `auth`, `accounts`, `transactions`, and `dashboard`.
- Added `src/lib` for future reusable helpers.
- Added `src/common` for future shared constants/assets/style values.
- Added `src/front-types-domain` as the future shared type home without moving legacy `src/types` yet.

## What did not change

- No components were moved.
- No route files were changed.
- No import paths were migrated.
- No `tsconfig` aliases were changed.
- No backend files were touched.

## Next PR

PR 3 owns the path and type migration work:

- Move `src/types/` to `src/front-types-domain/`.
- Update imports from `@/types` to `@types`.
- Update `tsconfig.json` and `vitest.config.ts` aliases.
- Keep PR 4 focused on migrating auth to `features/auth`.

## Validation

Run from `frontend/`:

```bash
npm run lint
npm run build
npm run test -- --run
```
