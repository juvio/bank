# PR 2 Checklist

## Scope

- [x] Create base architecture folders.
- [x] Preserve existing source files and imports.
- [x] Avoid moving components, services, stores, hooks, or types.
- [x] Keep work inside `frontend/`.
- [x] Document roadmap divergence.

## Validation

- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run test -- --run`
- [x] `git diff --name-only`
- [x] Confirm no `backend/` files changed

## Acceptance Criteria

- [x] `src/core` exists with a barrel.
- [x] `src/features` exists with feature barrels.
- [x] `src/lib` exists with a barrel.
- [x] `src/common` exists with a barrel.
- [x] `src/front-types-domain` exists with future type module files.
- [x] Existing application behavior remains unchanged.
- [x] PR 3 documented as the owner of `front-types-domain` type migration.
