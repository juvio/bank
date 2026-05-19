# PR 9 — Visual Map: Update ESLint Rules

## Architecture Diagram

### Before PR 9: No Import Boundaries

```
┌─────────────────────────────────────┐
│          UNCONTROLLED IMPORTS       │
├─────────────────────────────────────┤
│                                      │
│  app/ ─────────┐                    │
│                ├──→ @/features/.../Component  ❌ Direct access
│                ├──→ @/stores/useStore         ❌ Direct access
│  components/ ──┤                    │
│                ├──→ @/utils/func    ❌ Direct access
│                │                    │
│  features/ ────┤                    │
│                ├──→ @/services/api  ❌ No control
│                │                    │
│```

### After PR 9: Enforced Barrel Pattern

```
┌─────────────────────────────────────────────────────────┐
│       ENFORCED BARREL EXPORT PATTERN                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  app/                                                   │
│   └──→ @features/auth ──────┐  ✅ Barrel only      │
│        @features/transactions ├──→ Feature Barrel    │
│        @stores ──────────────┤  ✅ Barrel only      │
│                              │                       │
│  components/                 │                       │
│   ├──→ @components ──────────┼──→ Components Barrel  │
│   └──→ @lib ────────────────┤  ✅ Barrel only      │
│                              │                       │
│  features/                   │                       │
│   └──→ @features/feature ────┤  ✅ Barrel central   │
│        @stores ──────────────┘  ✅ Barrel only      │
│                                                       │
│  Each barrel (index.ts):                            │
│  ┌──────────────────────┐                           │
│  │ export { Component } │  Forces public API        │
│  │ export { Hook }      │  Clear boundaries         │
│  │ export { Service }   │  Single entry point       │
│  └──────────────────────┘                           │
│```

---

## ESLint Rules Overview

### Rule 1: `import/no-internal-modules`

```
┌────────────────────────────────────┐
│   import/no-internal-modules       │
├────────────────────────────────────┤
│                                    │
│  ❌ NOT ALLOWED:                  │
│  @/features/auth/components/X    │
│  @/stores/useAuthStore           │
│  @/utils/formatDate              │
│                                   │
│  ✅ ALLOWED:                      │
│  @features/auth                  │
│  @stores                         │
│  @lib                            │
│  index.ts (barrel files)         │
│  types.ts (type files)           │
│  styles.ts (style files)         │
│  constants.ts (constant files)   │
│                                   │
```

### Rule 2: `import/no-cycle`

```
┌────────────────────────────────────┐
│        import/no-cycle             │
├────────────────────────────────────┤
│                                    │
│  ❌ CIRCULAR DEPENDENCY:          │
│  Module A ──┐                     │
│             └──→ Module B         │
│  Module B ──┐                     │
│             └──→ Module A ❌      │
│                                   │
│  ✅ CORRECT (Linear):            │
│  A → B → C                        │
│  A → (uses) B only               │
│  B → (uses) C only               │
│  No cycles back to A             │
│                                   │
```

---

## Violation Flow Diagram

### Current Violations (~30)

```
Violations Breakdown:
├── Direct Feature Imports (~15) ────┐
│   ├─ @/features/auth/components    │
│   ├─ @features/transactions/hooks  │  ❌ Import violations
│   └─ @features/accounts/components │
│                                     │
├── Direct Store Imports (~8) ────────┤
│   ├─ @/stores/useAuthStore        │  ❌ Import violations
│   ├─ @/stores/useModalStore       │
│   └─ @/stores/useBankAccountStore │
│                                     │
├── Direct Utils Imports (~5) ────────┤
│   ├─ @/utils/formatDate           │  ❌ Import violations
│   ├─ @/utils/sanitizedFilename    │
│   └─ @/services/mockService       │
│                                     │
└── Circular Dependencies (~2) ───────┘
    └─ useAuthStore ↔ authService    ❌ Circular violation
```

---

## Migration Path Diagram

### PR 9: Setup ESLint Rules (CURRENT)

```
┌──────────────────────┐
│  PR 9: ESLint Setup  │
├──────────────────────┤
│✅ Install dependency │
│✅ Add rules          │
│✅ Detect violations  │
│⏳ Warnings ~30       │
└──────────────────────┘
         ↓
```

### PR 10: Fix Violations (Phase 1)

```
┌────────────────────────┐
│ PR 10: Fix Violations  │
├────────────────────────┤
│ • Create barrels       │
│ • Update imports       │
│ • Reduce warnings      │
└────────────────────────┘
         ↓
```

### PR 11+: Complete Refactoring

```
┌────────────────────────────┐
│ PR 11+: Finalize Pattern   │
├────────────────────────────┤
│ • Fix all violations       │
│ • Warnings → Errors        │
│ • Clean architecture ✅    │
└────────────────────────────┘
```

---

## Barrel Export Pattern

### Feature Example: Transactions

```
src/features/transactions/
├── components/
│   ├── TransactionCard/
│   │   ├── TransactionCard.tsx
│   │   ├── useTransactionCard.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── TransactionFilter/
│   │   └── ...
│   └── index.ts  ← Barrel: export all components
│
├── hooks/
│   ├── useTransactionsList.ts
│   ├── useCreateTransaction.ts
│   └── index.ts  ← Barrel: export all hooks
│
├── services/
│   ├── transactionService.ts
│   └── index.ts  ← Barrel: export services
│
├── types/
│   ├── transaction.types.ts
│   └── index.ts  ← Barrel: export types
│
└── index.ts  ← MAIN BARREL
    ├── export * from './components'
    ├── export * from './hooks'
    ├── export * from './services'
    └── export * from './types'
```

### Import Examples

```tsx
// ❌ Before (direct imports)
import { TransactionCard } from '@features/transactions/components/TransactionCard'
import { useTransactionsList } from '@features/transactions/hooks/useTransactionsList'
import { Transaction } from '@features/transactions/types/transaction.types'

// ✅ After (barrel imports)
import { 
  TransactionCard,
  useTransactionsList,
  Transaction
} from '@features/transactions'
```

---

## Dependency Graph Visualization

### Healthy Architecture

```
app/
  ├── imports from @features
  ├── imports from @core
  └── imports from @components

@features/*
  ├── imports from other @features
  ├── imports from @stores
  └── imports from @lib

@components
  ├── imports from @hooks
  └── imports from @lib

@stores
  └── imports from @lib

@lib
  └── imports from @types (no other imports)
```

### Problematic Dependencies (Before Fix)

```
❌ Circular:         ❌ Skipped Barrels:
useAuthStore ←────── authService (direct import)
      ↑                                │
      └──────────────────────────────→ ✗

❌ Deep imports:
app/ → @features/.../components/Component (skip barrel)
```

---

## ESLint Configuration Visualization

### Rule Chain

```
┌─────────────────────┐
│  ESLint runs        │
├─────────────────────┤
│ Check import rules  │
│         ↓           │
│ no-internal-modules │---→ ~28 violations
│ no-cycle            │---→ ~2 violations
│         ↓           │
│  Total: ~30 warnings│
└─────────────────────┘
```

### Configuration Breakdown

```
eslint.config.mjs
├── Plugin: eslint-plugin-import (imported)
├── Rule 1: import/no-cycle
│   └── Level: warn
│
└── Rule 2: import/no-internal-modules
    ├── Level: warn
    └── Allow:
        ├── **/node_modules/**
        ├── **/dist/**
        ├── **/index.{ts,tsx}
        ├── **/types.ts
        ├── **/styles.ts
        └── **/constants.ts
```

---

## Test Coverage Diagram

```
PR 9 Testing:
├── ✅ ESLint Config Validation
│   └── Rules load successfully
│
├── ✅ Violation Detection
│   ├── Feature imports detected
│   ├── Store imports detected
│   ├── Utils imports detected
│   └── Cycles detected
│
├── ✅ Build Compatibility
│   └── npm run build ✅
│
├── ✅ Test Suite
│   └── npm run test ✅
│
└── ✅ Documentation
    └── All files complete
```

---

## Timeline & Roadmap

```
May 2026                Timeline
│
├─[PR 1-8]─ Setup Foundation
│           └─ Folder structure, types, imports
│
├─[PR 9]─┐  ESLint Rules (Current)
│        └─ Import boundaries enforced
│           ~30 violations detected
│
├─[PR 10]─► Fix Violations Phase 1
│           Create barrels, update imports
│
├─[PR 11]─► Finalize Architecture
│           Complete refactoring done
│
└─[PR 12+]► Performance & Security
            Bundle analysis, auth, etc.
```

---

## Impact Matrix

```
                     Before      After       Status
┌──────────────────────────────────────────────┐
│ Imports enforced  │   NO      │    YES    │ ✅
│ Barrels used      │  PARTIAL  │   FULL    │ ⏳
│ Circular deps     │ UNKNOWN   │ DETECTED  │ ✅
│ Build time        │  ~45s     │   ~45s    │ ✅
│ Bundle size       │  BASE     │   BASE    │ ✅
│ ESLint warnings   │   0       │   ~30     │ ⚠️
│ Team readiness    │  NONE     │   FUL     │ ✅
└──────────────────────────────────────────────┘
```

---

## Summary Flow

```
┌────────────┐
│ PR 9 Done  │
└────────────┘
      ↓
┌──────────────────────────────┐
│ ESLint Rules Active          │
│ - import/no-cycle            │
│ - import/no-internal-modules │
└──────────────────────────────┘
      ↓
┌──────────────────┐
│ ~30 Violations   │
│ Detected & Logged│
└──────────────────┘
      ↓
┌────────────────────────────┐
│ Ready for PR 10             │
│ Fix violations incrementally│
└────────────────────────────┘
```

---

*For detailed information, see [PR9-SUMMARY.md](PR9-SUMMARY.md)*
