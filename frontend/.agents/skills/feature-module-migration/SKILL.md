---
name: feature-module-migration
description: Guide the frontend architecture migration by moving code into the correct feature module structure. Use when the user asks to migrate or reorganize components, hooks, and service API calls for auth, transactions, accounts, or dashboard into features/* with barrel exports.
---

# Feature Module Migration

Execute the migration feature by feature. Keep behavior unchanged while relocating code to the correct module.

## Target structure per feature

For each feature in `auth`, `transactions`, `accounts`, and `dashboard`, enforce:

```text
features/<feature>/
  components/
    __tests__/
  hooks/
    __tests__/
  services/
    __tests__/
  index.ts
```

Create these files only when there is code to export or a feature-level entrypoint is required by the migration step.

## Migration workflow

1. Map current ownership:
- Locate UI components that belong to the feature.
- Locate colocated logic inside components (state, effects, orchestration) that should become hooks.
- Locate direct API calls (fetch/axios/http client usage) that should become services.

2. Move components:
- Move feature UI files to `features/<feature>/components/`.
- Preserve component names and public props.
- Update imports to the new paths or feature barrels.

3. Extract hooks:
- Create `features/<feature>/hooks/`.
- Move non-visual reusable logic from components to custom hooks.
- Keep hooks focused on orchestration and state, not API transport details.

4. Extract services:
- Create `features/<feature>/services/`.
- Move API calls to service functions (one responsibility per function).
- Keep service layer free from UI concerns.

5. Create barrel exports:
- Add `index.ts` in each folder that needs a public surface:
  - `features/<feature>/components/index.ts`
  - `features/<feature>/hooks/index.ts`
  - `features/<feature>/services/index.ts`
  - `features/<feature>/index.ts` (feature root barrel)
- Re-export only what should be public for that feature.

6. Rewire imports:
- Replace deep relative imports with the barrel path where possible.
- Avoid cross-feature imports from internal files; consume public exports.

7. Add tests per feature when applicable:
- If the migrated feature has no tests yet, create baseline tests for components,
  hooks, and/or services impacted by the PR.
- Co-locate tests in `__tests__` folders under each layer.
- Keep tests focused on behavior and integration points changed by migration.

## Barrel template

Use this pattern and adapt names to real files:

```ts
// features/auth/components/index.ts
export * from "./LoginForm";
export * from "./AuthGuard";
```

```ts
// features/auth/hooks/index.ts
export * from "./useAuth";
export * from "./useLogin";
```

```ts
// features/auth/services/index.ts
export * from "./authService";
```

```ts
// features/auth/index.ts
export * from "./components";
export * from "./hooks";
export * from "./services";
```

## Guardrails

- Do not change business behavior during structural migration.
- Keep file naming and casing consistent with project conventions.
- Avoid circular dependencies between `components`, `hooks`, and `services`.
- If a file is shared by multiple features, move it to a shared/core module defined by project rules instead of duplicating it.

## Validation checklist

- Feature folders contain `components/`, `hooks/`, `services/`, and `index.ts`.
- Components no longer contain extracted API call code.
- API calls are centralized under `services/`.
- Hooks are imported from `features/<feature>/hooks` or feature barrel.
- Tests are present when applicable and co-localized in `__tests__`.
- App compiles with updated imports.

Run baseline validation when available:

```bash
npm run lint
npm run build
npm run test -- --run
```
