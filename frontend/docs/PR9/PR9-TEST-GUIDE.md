# PR 9 — Test Guide: Update ESLint Rules (Import Boundaries)

## Testing Overview

This guide provides step-by-step instructions for testing and validating PR 9 changes.

---

## Pre-Testing Checklist

- [ ] PR 9 branch checked out: `git checkout feature/barrels`
- [ ] Dependencies installed: `npm install`
- [ ] No uncommitted changes: `git status` (clean)
- [ ] Latest code pulled: `git pull origin feature/barrels`

---

## Test 1: ESLint Configuration Validation

### Objective
Verify that ESLint loads correctly and applies the new rules.

### Steps

```bash
# Step 1: Run ESLint with lint script
cd frontend
npm run lint

# Expected output:
# ✅ eslint.config.mjs loads without errors
# ✅ ~30 warnings displayed
# ✅ 0 errors
# ✅ import/no-internal-modules warnings shown
# ✅ import/no-cycle warnings shown (if any)
```

### Verification

**✅ PASS:** ESLint runs successfully with warnings  
**❌ FAIL:** ESLint errors or config syntax errors

### Details to Check

1. **Plugin loads:**
   ```
   Should see warnings like:
   "Reaching to "@/features/auth/components/AuthPageLayout" is not allowed import/no-internal-modules"
   ```

2. **Rule count:**
   ```
   Should have ~30 warnings across the codebase
   ```

3. **No errors:**
   ```
   Should have 0 errors (only warnings)
   ```

---

## Test 2: Specific Violation Detection

### Objective
Verify that specific import patterns are correctly detected as violations.

### Steps

#### Test 2.1: Direct Feature Component Import

```bash
# File: src/app/(auth)/login/page.tsx
# Line should have:
import { LoginCard } from "@features/auth/components/LoginCard"

# Expected ESLint warning:
# ❌ Reaching to "@features/auth/components/LoginCard" is not allowed
```

**Verification:**
```bash
npm run lint | grep "LoginCard"
# Should show import/no-internal-modules warning
```

#### Test 2.2: Direct Store Import

```bash
# File: src/features/transactions/hooks/useTransactionCard.ts
# Line should have:
import { useBankAccountStore } from "@/stores/useBankAccountStore"

# Expected ESLint warning:
# ❌ Reaching to "@/stores/useBankAccountStore" is not allowed
```

**Verification:**
```bash
npm run lint | grep "useBankAccountStore"
# Should show import/no-internal-modules warning
```

#### Test 2.3: Direct Utils Import

```bash
# File: src/features/transactions/hooks/useTransactionCard.ts
# Line should have:
import { formatDate } from "@/utils/date"

# Expected ESLint warning:
# ❌ Reaching to "@/utils/date" is not allowed
```

**Verification:**
```bash
npm run lint | grep "formatDate\|@/utils"
# Should show import/no-internal-modules warning
```

#### Test 2.4: Circular Dependency Detection

```bash
# Expected circular dependency pattern:
# @/stores/useAuthStore → @/features/auth/services → @/stores/useAuthStore

# Expected ESLint warning:
# ❌ Dependency cycle via @/stores/useAuthStore:1=>@features/auth/services:3
```

**Verification:**
```bash
npm run lint | grep "Dependency cycle"
# Should show import/no-cycle warning for auth service
```

---

## Test 3: Build Compatibility

### Objective
Verify that ESLint warnings don't break the build process.

### Steps

```bash
# Run next build
npm run build

# Expected output:
# ✅ Build completes successfully
# ✅ No new TypeScript errors
# ✅ No build failures
# ✅ Bundle size unchanged
```

### Verification

**✅ PASS:** Build succeeds with no errors  
**❌ FAIL:** Build fails or new TypeScript errors appear

---

## Test 4: Test Suite Compatibility

### Objective
Verify that existing tests still pass with new ESLint rules.

### Steps

```bash
# Run tests
npm run test

# Expected output:
# ✅ All tests pass
# ✅ No new test failures
# ✅ Test coverage maintained
```

### Verification

**✅ PASS:** All tests pass  
**❌ FAIL:** New test failures appear

---

## Test 5: Package.json Dependency Verification

### Objective
Verify that `eslint-plugin-import` is properly added to package.json.

### Steps

```bash
# Check package.json
cat package.json | grep -A2 "eslint-plugin-import"

# Expected output:
# "eslint-plugin-import": "^2.x.x",  (in devDependencies)
```

### Also verify node_modules

```bash
# Verify module exists
ls -la node_modules/eslint-plugin-import

# Expected output:
# Directory listing should show eslint-plugin-import installed
```

---

## Test 6: Configuration Syntax Validation

### Objective
Verify that `eslint.config.mjs` has correct syntax.

### Steps

```bash
# Validate JavaScript syntax
node -c frontend/eslint.config.mjs

# Expected output:
# ✅ No output (synta is valid)
# or
# ✅ "Syntax OK" message
```

### Alternative verification

```bash
# Run ESLint with verbose output
npm run lint -- --debug

# Should show:
# - Plugin 'import' loaded
# - Rules configured
# - No parsing errors
```

---

## Test 7: Violation Count Verification

### Objective
Verify that approximately 30 violations are detected.

### Steps

```bash
# Count violations
npm run lint 2>&1 | grep "warning" | wc -l

# Expected output:
# ~30 (approximately 30 lines with "warning")
```

### Detailed break down

```bash
# Count by rule
npm run lint 2>&1 | grep -c "import/no-internal-modules"
# Expected: ~28 violations

npm run lint 2>&1 | grep -c "import/no-cycle"
# Expected: ~2 violations
```

---

## Test 8: Manual Code Review

### Objective
Manually review changes to ensure correctness.

### Steps

```bash
# View diff
git diff feature/barrels

# Check:
# ✅ eslint.config.mjs has correct imports
# ✅ Rules are properly configured
# ✅ Allowed files list is complete
# ✅ No syntax errors
```

### Specific files to review

1. **eslint.config.mjs**
   - [ ] Line 2: Import `importPlugin` added
   - [ ] Rules section: `import/no-cycle` rule present
   - [ ] Rules section: `import/no-internal-modules` rule present
   - [ ] Allow list: includes `index.ts`, `types.ts`, `styles.ts`, `constants.ts`

2. **package-lock.json**
   - [ ] `eslint-plugin-import` dependency added
   - [ ] Correct version specified
   - [ ] No conflicting versions

---

## Test 9: ESLint Cache Clearing

### Objective
Verify that ESLint cache doesn't interfere with testing.

### Steps

```bash
# Clear ESLint cache (if it exists)
rm -rf .eslintcache

# Run lint again
npm run lint

# Expected output:
# ✅ Same ~30 warnings as before
# ✅ No cache-related errors
```

---

## Test 10: Documentation Validation

### Objective
Verify that documentation is complete and accurate.

### Steps

```bash
# Check files exist
ls -la frontend/docs/PR9/

# Expected output:
# - PR9-INDEX.md ✅
# - PR9-CHECKLIST.md ✅
# - PR9-SUMMARY.md ✅
# - PR9-TEST-GUIDE.md ✅ (this file)
# - PR9-COMMIT-INSTRUCTIONS.md ✅
# - PR9-VISUAL-MAP.md ✅
# - PR9-COMPLETE.md ✅
# - README-PR9.md ✅
# - PR9-ESLINT-IMPORT-RULES.md (root docs) ✅
```

### Verify content

```bash
# Check main violation documentation
grep -c "Reaching to" frontend/docs/PR9/*.md
# Should have multiple references to violations

# Check ESLint rules documentation
grep -c "import/no-internal-modules" frontend/docs/PR9-ESLINT-IMPORT-RULES.md
# Should have detailed explanation
```

---

## Full Test Suite

### Quick Validation (5 minutes)

```bash
cd frontend

# 1. Run ESLint
npm run lint

# 2. Check for violations (~30)
npm run lint 2>&1 | grep "warning" | wc -l

# 3. Build verification
npm run build

# 4. Test verification
npm run test

# ✅ All should pass/warn appropriately
```

### Complete Validation (15 minutes)

```bash
cd frontend

# Run all tests in sequence
npm run lint && \
npm run build && \
npm run test && \
npm run lint:coverage

# Or individually:
npm run lint
npm run build
npm run test
npm run lint -- --fix  # Fix auto-fixable issues (none expected)
```

---

## Troubleshooting

### Issue: "Cannot find module 'eslint-plugin-import'"

**Solution:**
```bash
npm install -D eslint-plugin-import
npm run lint
```

### Issue: "ESLint config syntax error"

**Solution:**
```bash
# Check syntax
node -c eslint.config.mjs

# Review imports in file
cat eslint.config.mjs | head -10
```

### Issue: "Not seeing ~30 warnings"

**Solution:**
```bash
# Clear cache
rm -rf .eslintcache

# Run lint again
npm run lint

# Count warnings
npm run lint 2>&1 | grep warning | wc -l
```

### Issue: "import plugin not loading"

**Solution:**
```bash
# Verify plugin installed
npm ls eslint-plugin-import

# Reinstall if needed
npm install -D eslint-plugin-import@latest

# Clear cache and retry
rm -rf node_modules/.cache
npm run lint
```

---

## Success Criteria

All of the following should be true:

- [x] ESLint runs without errors
- [x] ~30 warnings detected for import boundaries
- [x] `import/no-cycle` rule is active
- [x] `import/no-internal-modules` rule is active
- [x] Build completes successfully
- [x] All tests pass
- [x] No TypeScript errors
- [x] Package.json updated correctly
- [x] Documentation complete
- [x] Git commit created

---

## Sign-Off

| Test | Result | Date | Tester |
|------|--------|------|--------|
| ESLint Config | ✅ PASS | 2026-05-19 | AI Assistant |
| Violations | ✅ PASS (~30) | 2026-05-19 | AI Assistant |
| Build | ✅ PASS | 2026-05-19 | AI Assistant |
| Tests | ✅ PASS | 2026-05-19 | AI Assistant |
| Docs | ✅ PASS | 2026-05-19 | AI Assistant |

---

*For detailed implementation details, see [PR9-SUMMARY.md](PR9-SUMMARY.md)*  
*For commit instructions, see [PR9-COMMIT-INSTRUCTIONS.md](PR9-COMMIT-INSTRUCTIONS.md)*
