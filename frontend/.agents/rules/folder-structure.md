# Rule: Folder Structure for Architecture Migration

This rule is mandatory for every migration step inside `frontend/`.
It translates `docs/plano-migracao-arquitetura.md` into folder boundaries
so agents can execute the migration without drifting away from the proposed
architecture.

## Source of truth

1. `docs/plano-migracao-arquitetura.md`
2. `docs/migration-orchestration/rules/migration-governance.rules.md`
3. Current code under `src/`

If this rule conflicts with the migration plan, follow the migration plan and
update this rule in the same PR.

## Scope boundaries

- Work only inside `frontend/`.
- Never change `../backend/` as part of this migration.
- Keep each PR small and aligned with one migration goal.
- Do not introduce folders outside the approved structure unless the migration
  plan is updated first.
- Do not move Next.js route files out of `src/app/`; route files remain owned by
  the App Router.

## Approved target structure

```txt
src/
|-- app/
|   |-- (auth)/
|   |   |-- login/page.tsx
|   |   |-- register/page.tsx
|   |   `-- layout.tsx
|   |-- (operations)/
|   |   |-- @modal/
|   |   |-- (microfrontend)/
|   |   |-- home/page.tsx
|   |   |-- transactions/page.tsx
|   |   `-- layout.tsx
|   |-- layout.tsx
|   |-- page.tsx
|   `-- globals.css
|
|-- core/
|   |-- auth/
|   |   |-- AuthContext.tsx
|   |   |-- ProtectedRoute.tsx
|   |   |-- useAuthContext.ts
|   |   |-- authService.ts
|   |   `-- types.ts
|   |-- config/
|   |   |-- api.ts
|   |   |-- constants.ts
|   |   `-- env.ts
|   |-- providers/
|   |   |-- ClientThemeProvider.tsx
|   |   `-- index.tsx
|   `-- index.ts
|
|-- features/
|   |-- auth/
|   |   |-- components/
|   |   |   |-- LoginForm/
|   |   |   `-- RegisterForm/
|   |   |-- hooks/
|   |   |-- services/
|   |   |-- types/
|   |   `-- index.ts
|   |-- transactions/
|   |   |-- components/
|   |   |   |-- TransactionCard/
|   |   |   |-- TransactionFilter/
|   |   |   |-- TransactionHistory/
|   |   |   `-- NewTransactionForm/
|   |   |-- hooks/
|   |   |-- services/
|   |   |-- stores/
|   |   |-- types/
|   |   `-- index.ts
|   |-- accounts/
|   |   |-- components/
|   |   |   |-- AccountCard/
|   |   |   |-- AccountMenu/
|   |   |   `-- AccountSelector/
|   |   |-- hooks/
|   |   |-- services/
|   |   |-- types/
|   |   `-- index.ts
|   |-- dashboard/
|   |   |-- components/
|   |   |   |-- DashboardHero/
|   |   |   |-- QuickStats/
|   |   |   `-- RecentTransactions/
|   |   |-- hooks/
|   |   |-- services/
|   |   |-- types/
|   |   `-- index.ts
|   `-- index.ts
|
|-- components/
|   |-- Button/
|   |-- Input/
|   |-- Modal/
|   |-- Card/
|   |-- Navbar/
|   |-- Footer/
|   `-- index.ts
|
|-- lib/
|   |-- date.ts
|   |-- currency.ts
|   |-- validation.ts
|   |-- crypto.ts
|   |-- localStorage.ts
|   `-- index.ts
|
|-- common/
|   |-- constants.ts
|   |-- styles.ts
|   |-- icons/
|   |-- images/
|   `-- index.ts
|
|-- front-types-domain/
|   |-- index.ts
|   |-- common.types.ts
|   |-- api.types.ts
|   `-- domain.types.ts
|
|-- hooks/
|   |-- useBreakpoint.ts
|   |-- useLocalStorage.ts
|   |-- useFetch.ts
|   |-- useDebounce.ts
|   |-- useTheme.ts
|   `-- index.ts
|
|-- stores/
|   |-- useAuthStore.ts
|   |-- useAccountStore.ts
|   |-- useModalStore.ts
|   `-- index.ts
|
|-- services/
|   |-- api.ts
|   |-- mockService.ts
|   `-- index.ts
|
|-- utils/
|   |-- getGraphicAppBaseUrl.ts
|   |-- sanitizedFilename.ts
|   `-- index.ts
|
|-- stories/
|   |-- components/
|   `-- features/
|
|-- mocks/
|   |-- handlers.ts
|   |-- fixtures/
|   `-- mock.json
|
`-- test/
    `-- setup.ts
```

## Folder ownership

### `src/app/`

- Owns only Next.js routing, layouts, route handlers, loading/error/not-found UI,
  metadata, and App Router composition.
- Route pages should import feature containers or shared components instead of
  holding business logic.
- Keep route groups aligned with the plan:
  - `(auth)` for login/register routes.
  - `(operations)` for protected operational pages.
  - `@modal` for parallel modal routes.
  - `(microfrontend)` for MFE routes.

### `src/core/`

- Owns global application infrastructure: auth context, route guards, providers,
  environment parsing, constants, and base API configuration.
- Do not put feature-specific UI or domain workflows here.
- `core/providers/` is the only approved place for app-wide provider composition.

### `src/features/`

- Owns domain features by business capability.
- Approved first-level features from the plan:
  - `auth`
  - `transactions`
  - `accounts`
  - `dashboard`
- Each feature can contain only these standard subfolders unless the plan is
  amended:
  - `components/`
  - `hooks/`
  - `services/`
  - `stores/` when state is local to that feature
  - `types/`
  - `index.ts`
- Feature code may import shared layers, but shared layers must not import from
  a feature.

### `src/components/`

- Owns shared, reusable UI components that are not tied to a single feature.
- Feature-specific components must live under
  `src/features/<feature>/components/`.
- Component folders should use this shape when refactored:

```txt
ComponentName/
|-- ComponentName.tsx
|-- ComponentNameContainer.tsx
|-- useComponentName.ts
|-- ComponentName.test.tsx
|-- useComponentName.test.ts
|-- types.ts
|-- styles.ts
`-- index.ts
```

- Presentational components should receive data and callbacks through props.
- Container components and co-located hooks own UI orchestration, store access,
  API calls, state, effects, and transformations.

### `src/lib/`

- Owns reusable pure helpers and small typed wrappers.
- Prefer moving generic utilities from `src/utils/` into `src/lib/` over adding
  new generic files to `src/utils/`.
- Keep feature-aware helpers inside the relevant feature.

### `src/common/`

- Owns constants, shared style values, and reusable static assets used by
  multiple domains.
- Do not place business logic, API calls, React state, or feature workflows here.

### `src/front-types-domain/`

- Target home for shared frontend domain, API, and common types.
- New shared types should be added here, not to legacy `src/types/`.
- Keep feature-local types inside `src/features/<feature>/types/`.
- Export shared types through `src/front-types-domain/index.ts`.

### `src/hooks/`

- Owns global reusable hooks that are independent of a single feature.
- Feature-specific hooks must live under `src/features/<feature>/hooks/` or
  inside the relevant component folder when co-located.

### `src/stores/`

- Owns Zustand stores that are truly global.
- Feature-only Zustand stores should live under
  `src/features/<feature>/stores/`.
- Do not create cross-feature dependencies through stores.

### `src/services/`

- Owns base API clients and external service adapters shared across features.
- Domain-specific API calls belong in `src/features/<feature>/services/`.
- `mockService.ts` can remain here while it is shared or dev-only.

### `src/utils/`

- Legacy compatibility folder during migration.
- Do not add new generic utilities here.
- Existing utilities should be moved to `src/lib/`, `src/common/`, or a feature
  folder when touched by a migration PR.

### `src/stories/`

- Owns Storybook stories only.
- Story folders should mirror the target source structure:
  - `stories/components/`
  - `stories/features/`

### `src/mocks/`

- Owns MSW handlers, fixtures, and mock JSON used by tests or local development.
- Do not place production services or domain logic here.

### `src/test/`

- Owns shared test setup only.
- Unit and hook tests should be co-located with the module they validate.

## Import boundaries

- Prefer absolute imports as aliases become available:
  - `@core/*` -> `src/core/*`
  - `@features/*` -> `src/features/*`
  - `@components/*` -> `src/components/*`
  - `@lib/*` -> `src/lib/*`
  - `@common/*` -> `src/common/*`
  - `@types/*` -> `src/front-types-domain/*`
  - `@hooks/*` -> `src/hooks/*`
  - `@stores/*` -> `src/stores/*`
  - `@services/*` -> `src/services/*`
  - `@utils/*` -> `src/utils/*`
  - `@mocks/*` -> `src/mocks/*`
- Use relative imports only inside the same component/feature folder.
- Export public APIs through `index.ts` barrels.
- Avoid importing internal files across features. Import from a feature barrel
  unless a rule or test requires a direct local import.

## Migration order

Follow the roadmap from the plan:

1. Foundation: test setup, shared types preparation, base folders, tsconfig
   aliases.
2. Types migration: move shared types from `src/types/` to
   `src/front-types-domain/`.
3. Services migration: move domain API calls into feature services.
4. Component and hook migration: move feature components and extract logic into
   containers/hooks.
5. Route composition: update `src/app/` imports to use feature/public barrels.
6. Barrels and import cleanup: standardize `index.ts` exports.
7. Performance and security improvements.
8. Documentation and cleanup of legacy folders/files.

## Validation checklist for every PR

- Folder changes match the approved target structure.
- No `../backend/` files changed.
- New shared code is not placed in a feature folder.
- New feature code is not placed in shared folders.
- Tests are co-located unless they are global setup files.
- Barrels are updated when public imports change.
- `npm run lint` passes or any failure is documented.
- `npm run build` passes or any failure is documented.
- `npm run test` or `npm run test -- --run` passes or any failure is
  documented.

## When uncertain

Use this decision order:

1. Is it a Next.js route/layout/handler concern? Put it in `src/app/`.
2. Is it global infrastructure? Put it in `src/core/`.
3. Is it domain-specific? Put it in `src/features/<feature>/`.
4. Is it reusable UI with no domain ownership? Put it in `src/components/`.
5. Is it a pure helper? Put it in `src/lib/`.
6. Is it shared type information? Put it in `src/front-types-domain/`.
7. Is it temporary compatibility from the old structure? Keep it only until the
   scoped migration PR removes or relocates it.
