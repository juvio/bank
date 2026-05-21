# PR 9: Update ESLint Rules (Import Boundaries)

**Status:** In Progress  
**Date:** May 19, 2026  
**Branch:** `feature/barrels`

---

## Objective

Configure ESLint to enforce import boundaries and barrel export patterns, ensuring:

- ✅ All imports go through `index.ts` barrel files
- ✅ No direct imports of internal modules (e.g., `../hooks/useX`)
- ✅ Reduced coupling and easier refactoring
- ✅ Clear API surface for each feature/component

---

## Changes Made

### 1. Install `eslint-plugin-import`

```bash
npm install -D eslint-plugin-import
```

**Why:** Provides rules for enforcing import patterns and detecting circular dependencies.

### 2. Update `eslint.config.mjs`

Added two import boundary configurations:

#### A. Circular Dependency Detection

```javascript
{
  files: ["src/**/*.{ts,tsx}"],
  rules: {
    "import/no-cycle": "warn",
  },
}
```

**Purpose:** Detect and warn about circular dependencies (e.g., A → B → A).

#### B. Barrel Export Enforcement

```javascript
{
  files: ["src/**/*.{ts,tsx}"],
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/no-internal-modules": [
      "warn",
      {
        allow: [
          "**/node_modules/**",
          "**/dist/**",
          "**/index.{ts,tsx}",
          "**/types.ts",
          "**/styles.ts",
          "**/constants.ts",
        ],
      },
    ],
  },
}
```

**Purpose:** Enforce that imports only go through barrel files or whitelisted files.

---

## Violations Detected

Running `npm run lint` now detects violations like:

```
❌ Reaching to "@/features/auth/components/AuthPageLayout" is not allowed
   (Should be: import { AuthPageLayout } from "@features/auth")

❌ Reaching to "@/stores/useAuthStore" is not allowed
   (Should be: import { useAuthStore } from "@stores")

❌ Reaching to "../../hooks/useTransactionCard" is not allowed
   (Should be: import { useTransactionCard } from "@features/transactions/hooks")
```

### Current Violations Summary

- **Total violations:** ~30 warnings across the codebase
- **Main issues:**
  1. Direct imports from `@/stores/` (should use barrel export)
  2. Direct imports from `@/utils/` (should use barrel export or lib)
  3. Relative imports within features (should use barrel exports)
  4. Circular dependency: `@/stores/useAuthStore` ↔ `@/features/auth/services`

---

## Next Steps (PR 10+)

### Phase 1: Fix Critical Violations

1. **Create barrel exports** for each feature:
   - `src/features/auth/index.ts` → `export { LoginForm, ...}`
   - `src/features/transactions/index.ts` → `export { TransactionCard, ...}`
   - `src/features/accounts/index.ts` → `export { AccountCard, ...}`

2. **Create store barrel** at `src/stores/index.ts`:
   ```ts
   export { useAuthStore } from './useAuthStore';
   export { useBankAccountStore } from './useBankAccountStore';
   export { useModalStore } from './useModalStore';
   ```

3. **Create utils/lib barrel** at `src/lib/index.ts`:
   ```ts
   export { formatCurrency } from './currency';
   export { formatDate } from './date';
   export * from './validation';
   ```

### Phase 2: Fix Circular Dependencies

1. **Decouple `useAuthStore` from `authService`:**
   - Consider if `authService` really needs store access
   - Move callbacks/state updates to the component level

2. **Review store structure:**
   - Check if stores can be split into smaller, focused stores
   - Use store selectors to reduce coupling

### Phase 3: Refactor Relative Imports

```tsx
// ❌ Before
import { useTransactionCard } from "../../hooks/useTransactionCard";

// ✅ After
import { useTransactionCard } from "@features/transactions/hooks";
```

---

## ESLint Rule Reference

### `import/no-internal-modules`

Enforces that imports only use the barrel file (index) or whitelisted files.

**Config:**

```javascript
"import/no-internal-modules": [
  "warn", // or "error"
  {
    allow: [
      "**/node_modules/**",    // 🔵 Exclude node_modules
      "**/dist/**",            // 🔵 Exclude build output
      "**/index.{ts,tsx}",     // 🟢 Allow barrel files
      "**/types.ts",           // 🟢 Allow type files
      "**/styles.ts",          // 🟢 Allow style files
      "**/constants.ts",       // 🟢 Allow constant files
    ],
  },
]
```

**Examples:**

```tsx
// ✅ Allowed (using barrel)
import { Button } from '@components';
import { useAuthStore } from '@stores';
import { formatCurrency } from '@lib';

// ❌ Not allowed (reaching into internals)
import { Button } from '@components/Button';
import useAuthStore from '@stores/useAuthStore';
import formatCurrency from '@lib/currency';
```

### `import/no-cycle`

Detects circular dependencies between modules.

**Examples:**

```tsx
// ❌ Circular: A → B → A
// A.ts
import { funcB } from './B'; // 🔵 Cycle detected

// B.ts
import { funcA } from './A';
```

---

## Testing

### Run ESLint

```bash
cd frontend
npm run lint
```

### View ESLint Output

All violations are warnings (not errors yet). To convert to errors in future:

```javascript
"import/no-internal-modules": ["error", { ... }]
```

---

## Documentation & Team Alignment

### Key Points for Team

1. **Barrel Files are Required:** Each folder with exports must have an `index.ts`
2. **No Relative Imports Across Features:** Use absolute paths from barrel files
3. **Types are Whitelisted:** `types.ts`, `styles.ts`, `constants.ts` can be imported directly
4. **Circular Dependencies:** Refactor if detected — these indicate poor separation of concerns

### Codemod for Fixing Violations

```bash
npm install -D jscodeshift

# Run codemod to fix violations
npx jscodeshift --transform ./codemods/fixImportBoundaries.js src/ --extensions tsx,ts
```

---

## Checklist

- [x] Install `eslint-plugin-import`
- [x] Update `eslint.config.mjs` with import rules
- [x] Add `import/no-cycle` rule
- [x] Add `import/no-internal-modules` rule with barrel exception
- [x] Test configuration: `npm run lint`
- [x] Document violations and next steps
- [ ] Create CONTRIBUTING.md guide for developers
- [ ] Package individual PRs for fixing violations
- [ ] Update ESLint rules to "error" instead of "warn" (after fixes)

---

## References

- [eslint-plugin-import docs](https://github.com/import-js/eslint-plugin-import)
- [import/no-internal-modules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-internal-modules.md)
- [import/no-cycle](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md)
- [Clean Architecture - Module Boundaries](https://khalilstemmler.com/articles/software-design-architecture/domain-driven-design-intro/)
