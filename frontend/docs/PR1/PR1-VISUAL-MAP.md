# PR 1 Visual Implementation Map

## 📊 Test Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND TEST INFRASTRUCTURE                      │
│                          (PR 1 Setup)                               │
└─────────────────────────────────────────────────────────────────────┘

                            npm run test
                                 │
                        ┌────────┴────────┐
                        ▼                 ▼
                   Watch Mode        UI Dashboard
                  (continuous)        (port 51204)
                        │                 │
                        └────────┬────────┘
                                 ▼
                         ┌──────────────────┐
                         │  vitest.config.ts │
                         │   (config layer)  │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
            ┌───────────────┐  ┌─────────┐  ┌──────────┐
            │ vitest.setup.ts│ │jsdom env│ │ Coverage │
            │ (global mocks) │ │ (React) │  │ (v8)    │
            └───────────────┘ └─────────┘  └──────────┘
                    │
         ┌──────────┼──────────┐
         ▼          ▼          ▼
    ┌─────────┐ ┌──────────┐ ┌────────────────┐
    │Router   │ │matchMedia│ │IntersectionObs │
    │Navigation│ │(MUI)    │ │(Infinite Scroll)
    └─────────┘ └──────────┘ └────────────────┘


                    Test Files (Co-localized)
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
     ┌──────────────────┐           ┌─────────────────────┐
     │ src/utils/       │           │ src/hooks/          │
     │ date.test.ts     │           │ useTransaction      │
     │                  │           │ Validation.test.ts  │
     │ ✓ 5 Tests        │           │                     │
     │ • valid date     │           │ ✓ 11 Tests          │
     │ • undefined      │           │ • init              │
     │ • empty string   │           │ • amount valid      │
     │ • edge cases     │           │ • form valid        │
     │ • December       │           │ • error handling    │
     └──────────────────┘           └─────────────────────┘
             │                               │
             └───────────────┬───────────────┘
                             ▼
                      Total: 16 Tests ✅


                    Type Files Organization
                            │
                ┌───────────┴──────────┐
                ▼                      ▼
        ┌──────────────┐       ┌──────────────────┐
        │ src/types/   │       │ future: @types/* │
        │ (current)    │       │ (path alias)     │
        │              │       │                  │
        │ • transaction│───────▶ Ready for        │
        │ • mapper     │       │ PR 2 migration   │
        │ • labels     │       │                  │
        │ • new-trans  │       └──────────────────┘
        │ • remote-app │
        └──────────────┘
```

---

## 📦 Package.json Changes

```json
"scripts": {
  "dev": "next dev --port 3000",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint",
  ✨ "test": "vitest",              // NEW
  ✨ "test:ui": "vitest --ui",      // NEW
  ✨ "test:coverage": "vitest --coverage",  // NEW
  ✨ "test:watch": "vitest --watch",       // NEW
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}

"devDependencies": {
  // ... existing ...
  ✨ "@testing-library/jest-dom": "^6.1.5",
  ✨ "@testing-library/react": "^15.0.6",
  ✨ "@testing-library/user-event": "^14.5.1",
  ✨ "@vitejs/plugin-react": "^4.2.1",
  ✨ "@vitest/ui": "^3.2.4",
  // ... rest unchanged ...
}
```

---

## 🔄 Configuration Flow

```
   tsconfig.json (compilerOptions.paths)
           │
           ├─ "@/*" → "./src/*"        (existing)
           └─ "@types/*" → "./src/front-types-domain/*"  (new)
                                ▲
                                │
                                │ (prepared for PR 2)
                                │

   vitest.config.ts (resolve.alias)
           │
           ├─ "@" → "./src"
           ├─ "@types" → "./src/front-types-domain"
           ├─ ... (8 other aliases)
           │
           └─ Projects:
              ├─ "unit" (tests)
              └─ "storybook" (existing)

   vitest.setup.ts (global mocks)
           │
           ├─ next/router (useRouter)
           ├─ next/navigation (useRouter, usePathname, useSearchParams)
           ├─ window.matchMedia (MUI components)
           └─ IntersectionObserver (infinite scroll, etc)
```

---

## 📊 Test Execution Flow

```
npm run test
    │
    ├─ 1. Load vitest.config.ts
    ├─ 2. Execute vitest.setup.ts (global setup once)
    ├─ 3. Find test files (**/*.test.ts)
    │
    ├─ 4. Run src/utils/date.test.ts
    │   ├─ ✓ Test 1: formatDate('2024-05-15') = '15/5/2024'
    │   ├─ ✓ Test 2: formatDate(undefined) = ''
    │   ├─ ✓ Test 3: formatDate('') = ''
    │   ├─ ✓ Test 4: formatDate('2023-01-01') = '1/1/2023'
    │   └─ ✓ Test 5: formatDate('2024-12-25') = '25/12/2024'
    │
    ├─ 5. Run src/hooks/useTransactionValidation.test.ts
    │   ├─ ✓ Test 1: initialize with empty errors
    │   ├─ ✓ Test 2: validate amount with valid number
    │   ├─ ✓ Test 3: invalidate amount when 0
    │   ├─ ✓ Test 4: invalidate amount when undefined
    │   ├─ ✓ Test 5: invalidate amount when NaN
    │   ├─ ✓ Test 6: validate form with all valid inputs
    │   ├─ ✓ Test 7: invalidate form with empty type
    │   ├─ ✓ Test 8: invalidate form with empty date
    │   ├─ ✓ Test 9: set error on handleAmountBlur (invalid)
    │   ├─ ✓ Test 10: set error on handleAmountBlur (NaN)
    │   └─ ✓ Test 11: clear error on handleAmountBlur (valid)
    │
    ├─ 6. Cleanup (afterEach)
    │   └─ Call cleanup() from @testing-library/react
    │
    └─ 7. Report
        └─ ✓ 16 passed in ~2s
```

---

## 📁 Directory Structure Before/After

### BEFORE (src/types/)

```
src/types/
├── index.ts                      (barrel - 3 exports)
├── transaction.type.ts
├── transaction-mapper.type.ts
├── transaction-labels.type.ts
├── new-transaction.type.ts
├── remote-app.d.ts              (ambient types)
└── ❌ No tests, no co-location
```

### AFTER (PR 1 Progress)

```
src/types/
├── index.ts                      ✨ (enhanced - 5 exports)
├── transaction.type.ts
├── transaction-mapper.type.ts
├── transaction-labels.type.ts
├── new-transaction.type.ts
├── remote-app.d.ts
├── remote-app.type.ts            ✨ NEW (extracted)
└── barrel-index.ts               ✨ NEW (backup reference)

src/utils/
├── date.ts
└── date.test.ts                  ✨ NEW (5 tests)

src/hooks/
├── useTransactionValidation.ts
└── useTransactionValidation.test.ts  ✨ NEW (11 tests)

frontend/
├── vitest.config.ts              ✨ UPDATED
├── vitest.setup.ts               ✨ NEW
├── package.json                  ✨ UPDATED (scripts + deps)
├── tsconfig.json                 ✨ UPDATED (paths)
├── README-PR1.md                 ✨ NEW
├── PR1-SUMMARY.md                ✨ NEW
├── PR1-CHECKLIST.md              ✨ NEW
├── PR1-TEST-GUIDE.md             ✨ NEW
└── PR1-COMMIT-INSTRUCTIONS.md    ✨ NEW
```

---

## 🎯 PR 1 → PR 2 → PR 3 Timeline

```
┌──────────────────────────────────────────────────────────────┐
│                  MIGRATION ROADMAP                            │
└──────────────────────────────────────────────────────────────┘

PR 1: Vitest Setup + Types Centralization (CURRENT ✅)
├─ ✅ Vitest configured
├─ ✅ Setup with mocks
├─ ✅ Example tests (16 total)
├─ ✅ Types barrel enhanced
├─ ✅ Path aliases prepared
└─ ✅ Documentation

    │
    ▼ (unblocks)

PR 2: Migrate Types to front-types-domain/
├─ [ ] Move src/types → src/front-types-domain/
├─ [ ] Update imports: @/types → @types
├─ [ ] Create comprehensive barrel exports
├─ [ ] Run codemod for imports
└─ [ ] Add 20+ more tests

    │
    ▼ (unblocks)

PR 3: Container/Presentational Pattern
├─ [ ] Refactor TransactionCard
├─ [ ] Refactor AccountCard
├─ [ ] Extract hooks
├─ [ ] Co-locate tests
└─ [ ] Add component-specific tests

    │
    ▼ (unblocks)

PR 4-6: More Component Refactoring
├─ [ ] Refactor Modal, LoginCard, RegisterCard
├─ [ ] Extract business logic to hooks
├─ [ ] Add comprehensive tests
└─ [ ] Achieve 80%+ coverage

    │
    ▼ (unblocks)

PR 7+: Performance, Security, Folder Structure
├─ [ ] Bundle analyzer setup
├─ [ ] Dynamic imports
├─ [ ] Feature folder structure
├─ [ ] Auth security hardening
└─ [ ] Final optimization
```

---

## ✨ Success Indicators

```
✅ PASSING                          ❌ NOT IN SCOPE (PR 2+)

[✓] npm run test                   [·] Component refactoring
[✓] npm run test:coverage          [·] Feature folder structure
[✓] npm run lint                   [·] Bundle analysis
[✓] npm run build                  [·] Dynamic imports
[✓] All imports working             [·] Security hardening
[✓] 16 tests passing               [·] Full types migration
[✓] Documentation complete          [·] 80%+ coverage
[✓] No breaking changes            [·] Performance optimization
```

---

## 🚀 From Here

```
Current State (PR 1):
    Test Infrastructure Ready ✅
              │
              ▼
    Ready for PR 2 (Type Migration)
              │
              ▼
    Ready for PR 3+ (Component Refactoring)
              │
              ▼
    Ready for Full Architecture Migration
              │
              ▼
    Clean Architecture Achieved 🎉
```

---

**This visual map shows PR 1 is foundation for the entire migration plan.**

Next: Create GitHub PR and start PR 2 (Type Migration).
