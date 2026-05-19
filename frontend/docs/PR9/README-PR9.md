# README — PR 9: Update ESLint Rules (Import Boundaries)

**Status:** ✅ Complete  
**Date:** May 19, 2026  
**Branch:** `feature/barrels`

---

## Quick Start

### What is PR 9?

PR 9 configures ESLint to enforce import boundaries and barrel export patterns, ensuring all imports go through `index.ts` barrel files.

### Why Does It Matter?

```tsx
// ❌ BEFORE: Direct imports (messy)
import { Button } from "@/components/Button"
import { useAuthStore } from "@/stores/useAuthStore"
import { formatDate } from "@/utils/date"

// ✅ AFTER: Barrel imports (clean)
import { Button } from "@components"
import { useAuthStore } from "@stores"
import { formatDate } from "@lib"
```

### What Changed?

1. **Installed** `eslint-plugin-import` dependency
2. **Added** two ESLint rules:
   - `import/no-internal-modules` — Enforce barrel pattern
   - `import/no-cycle` — Detect circular dependencies
3. **Detected** ~30 import boundary violations
4. **Created** comprehensive documentation

### How Do I Use This?

**Run ESLint to see violations:**
```bash
npm run lint
```

**Expected output:** ~30 warnings (to be fixed in PR 10+)

---

## For Developers

### New Code Guidelines

When creating new features, follow this pattern:

#### Option A: Using Barrel Exports ✅ BEST

```tsx
// src/features/myFeature/index.ts (barrel)
export { MyComponent } from './components/MyComponent'
export { useMyHook } from './hooks/useMyHook'
export type { MyComponentProps } from './types'

// Usage - clean and simple
import { MyComponent, useMyHook } from '@features/myFeature'
```

#### Option B: Using Type Files Directly ✅ ALLOWED

```tsx
// These files can be imported directly (they're whitelisted)
import type { MyType } from '@features/myFeature/types'
import { myConstants } from '@features/myFeature/constants'
import styles from '@features/myFeature/styles'
```

#### Option C: Avoid Direct Imports ❌ NOT ALLOWED

```tsx
// These will trigger ESLint warnings
import { MyComponent } from '@features/myFeature/components/MyComponent'  // ❌
import { useMyHook } from '@features/myFeature/hooks/useMyHook'          // ❌
import { myUtil } from '@/utils/myUtil'                                  // ❌
```

### Checklist for New Features

When creating a new feature, ensure:

- [ ] Create barrel file: `features/myFeature/index.ts`
- [ ] Export all public components/hooks in barrel
- [ ] Use barrel imports in other code
- [ ] Run `npm run lint` — no new warnings
- [ ] Document in feature README

---

## For Reviewers

### What to Check

1. **Violations Count**
   ```bash
   npm run lint | grep warning | wc -l
   # Should show ~30
   ```

2. **Build Status**
   ```bash
   npm run build
   # Should succeed with no errors
   ```

3. **Test Status**
   ```bash
   npm run test
   # All tests should pass
   ```

4. **No Breaking Changes**
   - Existing imports still work
   - Only warnings, no errors
   - Code behavior unchanged

### Approval Criteria

- [x] ESLint configuration is correct
- [x] Rules are enforced properly
- [x] ~30 violations detected as expected
- [x] Documentation is complete
- [x] No breaking changes
- [ ] Ready to merge

---

## Violations Overview

### Current Violations: ~30

**Don't panic!** These are warnings, not errors. They will be fixed incrementally in PR 10+.

#### Type 1: Direct Feature Imports (~15)
```
❌ import { Component } from "@features/feature/components/Component"
✅ import { Component } from "@features/feature"
```

#### Type 2: Direct Store Imports (~8)
```
❌ import { useStore } from "@/stores/useStore"
✅ import { useStore } from "@stores"
```

#### Type 3: Direct Utils Imports (~5)
```
❌ import { func } from "@/utils/func"
✅ import { func } from "@lib"
```

#### Type 4: Circular Dependencies (~2)
```
⚠️ useAuthStore.ts → authService.ts → useAuthStore.ts
🔧 Will be refactored in PR 10+
```

### How to Fix

**For your own code:**
1. Create/update barrel export (`index.ts`)
2. Import from barrel instead of directly
3. Run `npm run lint` to verify

**For existing violations:**
Wait for PR 10+ which will systematically fix all violations.

---

## Documentation Files

### In This Folder (docs/PR9/)

| File | Purpose | Read Time |
|------|---------|-----------|
| **README-PR9.md** | This file — Team overview | 5 min |
| [PR9-INDEX.md](PR9-INDEX.md) | Navigation & structure | 3 min |
| [PR9-CHECKLIST.md](PR9-CHECKLIST.md) | Implementation tasks | 10 min |
| [PR9-SUMMARY.md](PR9-SUMMARY.md) | Technical deep-dive | 15 min |
| [PR9-TEST-GUIDE.md](PR9-TEST-GUIDE.md) | Testing procedures | 20 min |
| [PR9-COMMIT-INSTRUCTIONS.md](PR9-COMMIT-INSTRUCTIONS.md) | Git details | 10 min |
| [PR9-VISUAL-MAP.md](PR9-VISUAL-MAP.md) | Diagrams | 5 min |
| [PR9-COMPLETE.md](PR9-COMPLETE.md) | Completion summary | 10 min |

### Root Documentation (docs/)

| File | Purpose |
|------|---------|
| [PR9-ESLINT-IMPORT-RULES.md](../PR9-ESLINT-IMPORT-RULES.md) | Main reference guide |

---

## Common Questions

### Q: Do I need to change my existing code?
**A:** Not immediately. Existing imports still work, but generate warnings. Follow the pattern for new code. PR 10+ will fix existing violations.

### Q: Why am I seeing ~30 warnings?
**A:** ESLint is now enforcing import boundaries. These violations are expected and will be fixed incrementally.

### Q: Can I ignore the warnings?
**A:** Warnings are intentional — they're learning signals for the team. Don't ignore them, but don't block development either.

### Q: What's the migration timeline?
**A:** 
- PR 9 (now) → Detect violations
- PR 10 → Fix Phase 1 (~15 remaining)
- PR 11 → Fix Phase 2 (complete)

### Q: How do I fix violations in my code?
**A:** Ensure your feature has a barrel export (`index.ts`) and import from it instead of directly.

### Q: What if I have circular dependencies?
**A:** See [PR9-SUMMARY.md](PR9-SUMMARY.md) for refactoring strategies. This will be addressed in PR 10+.

### Q: Can I import from `types.ts`, `styles.ts`, `constants.ts` directly?
**A:** Yes! These files are whitelisted and can be imported directly.

---

## Key Rules Reference

### Rule 1: `import/no-internal-modules`

**Purpose:** Force all imports through barrel files

**Configuration:**
```javascript
{
  "import/no-internal-modules": [
    "warn",
    {
      "allow": [
        "**/node_modules/**",
        "**/dist/**",
        "**/index.{ts,tsx}",      // ✅ Barrels allowed
        "**/types.ts",             // ✅ Types allowed
        "**/styles.ts",            // ✅ Styles allowed
        "**/constants.ts"          // ✅ Constants allowed
      ]
    }
  ]
}
```

### Rule 2: `import/no-cycle`

**Purpose:** Detect circular dependencies

**Examples:**
```
❌ A → B → A (cycle)
✅ A → B → C (linear)
```

---

## Next Steps

### Immediate (Now)
1. Read this README
2. Run `npm run lint` to see violations
3. Understand the new pattern

### Short Term (PR 10+)
1. Violations will be fixed systematically
2. Contribute to fixing violations
3. Follow pattern for new code

### Long Term (PR 11+)
1. All violations fixed
2. ESLint warnings → errors
3. Clean architecture achieved ✅

---

## Getting Help

### Documentation
- **Overview:** [PR9-INDEX.md](PR9-INDEX.md)
- **Technical:** [PR9-SUMMARY.md](PR9-SUMMARY.md)
- **Testing:** [PR9-TEST-GUIDE.md](PR9-TEST-GUIDE.md)
- **Violations:** [../PR9-ESLINT-IMPORT-RULES.md](../PR9-ESLINT-IMPORT-RULES.md)

### Commands
```bash
# See violations
npm run lint

# See specific violation type
npm run lint | grep "import/no-internal-modules"
npm run lint | grep "import/no-cycle"

# Fix violations (if available)
npm run lint -- --fix

# Check build
npm run build

# Check tests
npm run test
```

### Questions?
1. Check documentation files
2. Review violation examples in [PR9-SUMMARY.md](PR9-SUMMARY.md)
3. See testing guide in [PR9-TEST-GUIDE.md](PR9-TEST-GUIDE.md)

---

## Tips & Tricks

### Quick Violation Check

```bash
# See all import violations
npm run lint | grep "import/"

# Count violations by type
npm run lint | grep -c "import/no-internal-modules"
npm run lint | grep -c "import/no-cycle"

# See violations in specific file
npm run lint src/components/ | grep "warning"
```

### Creating a Barrel Export

```bash
# In feature folder, create index.ts:
cat > src/features/myFeature/index.ts << 'EOF'
export { MyComponent } from './components/MyComponent'
export { useMyHook } from './hooks/useMyHook'
export type { MyType } from './types'
EOF
```

### Testing Your Changes

```bash
# Before PR
npm run lint  # Check current state

# After making changes
npm run lint  # Should show fewer violations

# Verify build
npm run build

# Verify tests
npm run test
```

---

## Architecture Overview

### Before PR 9
```
Any file → Direct imports anywhere (uncontrolled) → Potential chaos
```

### After PR 9
```
Any file → Enforced barrel pattern → Controlled boundaries
```

### After PR 10+
```
Any file → Clean barrel pattern → Architecture finalized ✅
```

---

## What's Not Changing

- ✅ Build process works the same
- ✅ Runtime behavior unchanged
- ✅ Existing tests pass
- ✅ App functionality untouched

## What Is Changing

- ⚠️ ESLint now warns about import patterns
- 📚 Documentation for new pattern provided
- 🎯 Team alignment on clean architecture
- 🚀 Foundation for future improvements

---

## Roadmap Integration

This PR is part of the **Frontend Architecture Migration**:

| Step | PR | Status | Goal |
|------|---|--------|------|
| 1-8 | PRs 1-8 | ✅ Done | Setup foundation |
| **9** | **This PR** | **✅ DONE** | **Enforce rules** |
| 10 | PR 10+ | ⏳ Next | Fix violations |
| 11+ | PR 11+ | 📅 Future | Finalize architecture |

---

## Key Takeaways

1. ✅ **Imports now have rules** — ESLint enforces barrel pattern
2. ⚠️ **~30 warnings expected** — This is intentional and temporary
3. 📚 **New pattern documented** — Follow for new code
4. 🎯 **Clear migration path** — PR 10+ will fix violations
5. 🚀 **Team ready to go** — Documentation complete

---

## Resources

- **ESLint Plugin:** https://github.com/import-js/eslint-plugin-import
- **Barrel Pattern:** https://basarat.gitbook.io/typescript/main-1/barrel
- **Clean Architecture:** https://khalilstemmler.com/articles/software-design-architecture/

---

## Feedback & Contributions

This is an evolving process. If you notice:
- Unclear guidelines → Create an issue
- Better patterns → Suggest improvements
- Violations found → Document in PR tracker

Team collaboration makes this work! 💪

---

*For technical details, see [PR9-SUMMARY.md](PR9-SUMMARY.md)*  
*For testing procedures, see [PR9-TEST-GUIDE.md](PR9-TEST-GUIDE.md)*  
*For complete documentation, see [PR9-INDEX.md](PR9-INDEX.md)*

---

**Status:** ✅ Ready to Review  
**Next:** PR 10 — Fix Import Violations  
**Questions?** See documentation in this folder
