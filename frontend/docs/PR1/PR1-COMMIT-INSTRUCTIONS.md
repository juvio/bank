# PR 1 — Setup Vitest + Centralize Types

## Commit Message Template

```
feat(test): setup Vitest & centralize front types

- Configure Vitest with jsdom environment for unit testing
- Create global test setup with React Testing Library and common mocks
- Add path aliases to vitest.config.ts matching tsconfig.json
- Install @testing-library/react, @testing-library/jest-dom, @vitejs/plugin-react
- Add npm scripts: test, test:ui, test:coverage, test:watch
- Create co-localized example tests:
  * src/utils/date.test.ts (5 tests)
  * src/hooks/useTransactionValidation.test.ts (11 tests)
- Prepare tsconfig.json path aliases for future front-types-domain migration
- Centralize types with proper barrel exports
- Add PR1-TEST-GUIDE.md with comprehensive testing documentation

Tested:
- npm run test (16 tests pass)
- npm run test:coverage (generates report)
- npm run lint (no errors)
- npm run build (no errors)

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

## Files Created

### Configuration

- ✅ `vitest.config.ts` — Updated from Storybook-only to unit + storybook
- ✅ `vitest.setup.ts` — Global test setup (root level)
- ✅ `package.json` — Updated scripts and devDependencies

### Types

- ✅ `src/types/index.ts` — Updated barrel with new-transaction & remote-app
- ✅ `src/types/remote-app.type.ts` — New file with RemoteAppProps type
- ✅ `src/types/barrel-index.ts` — Backup barrel reference

### Tests

- ✅ `src/utils/date.test.ts` — 5 tests for date formatting
- ✅ `src/hooks/useTransactionValidation.test.ts` — 11 tests for validation hook

### Documentation

- ✅ `PR1-TEST-GUIDE.md` — Complete testing guide and best practices

## devDependencies Added

```json
{
  "@testing-library/jest-dom": "^6.1.5",
  "@testing-library/react": "^15.0.6",
  "@testing-library/user-event": "^14.5.1",
  "@vitejs/plugin-react": "^4.2.1",
  "@vitest/ui": "^3.2.4"
}
```

Already installed:

- vitest: ^3.2.4
- @vitest/browser: ^3.2.4
- @vitest/coverage-v8: ^3.2.4

## npm Scripts Added

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest --coverage",
"test:watch": "vitest --watch"
```

## Verification Checklist

Before pushing PR:

```bash
# 1. Install dependencies
cd frontend && npm install

# 2. Run tests
npm run test -- --run

# Expected: 16 passed in ~2s

# 3. Generate coverage
npm run test:coverage

# Expected: HTML report in ./coverage/index.html

# 4. Lint check
npm run lint

# Expected: No errors

# 5. Build check
npm run build

# Expected: Build succeeds

# 6. Final validation
npm run test:ui

# Expected: UI opens at localhost:51204, all green
```

## Branch & PR Details

- **Branch name:** `feature/pr1-vitest-types`
- **Base branch:** `main`
- **PR title:** `feat(test): setup Vitest & centralize front types`
- **PR template:** Use checklist from PR1-TEST-GUIDE.md

## What's NOT Included (Save for PR 2+)

❌ Component refactoring (Container/Presentational pattern)
❌ full migration to front-types-domain (types still in src/types)
❌ Dynamic imports & bundle analysis
❌ Feature folder restructuring
❌ Security/auth improvements

These will be handled in subsequent PRs per the migration plan.

## Rollback Instructions

If needed, to revert this PR:

```bash
git revert <commit-hash>

# Or manually:
rm vitest.setup.ts PR1-TEST-GUIDE.md
rm src/utils/date.test.ts src/hooks/useTransactionValidation.test.ts
rm src/types/remote-app.type.ts src/types/barrel-index.ts

# Restore vitest.config.ts to Storybook-only version
# Revert package.json changes
npm install
```
