# PR 9 — Commit Instructions: Update ESLint Rules

## Commit Details

**Branch:** `feature/barrels`  
**Type:** `feat` (feature)  
**Scope:** `eslint`  
**Message Title:** Add import boundary rules to enforce barrel exports

---

## Commit Message

```
feat(eslint): add import boundary rules to enforce barrel exports (PR 9)

- Install eslint-plugin-import for import validation
- Add import/no-internal-modules rule to enforce barrel pattern
- Add import/no-cycle rule to detect circular dependencies
- Configure allowed exceptions for index.ts, types.ts, styles.ts, constants.ts
- Document ESLint changes and violations in PR9-ESLINT-IMPORT-RULES.md
- Current violations: ~30 warnings for direct module imports (to be fixed in PR 10+)

This ensures:
- All imports go through barrel files
- Clear API surface for each feature/component
- Easier refactoring and reduced coupling
- Detection of circular dependencies
```

## Commit Details Breakdown

### Summary Line (First Line)
```
feat(eslint): add import boundary rules to enforce barrel exports (PR 9)
```

**Format:** `<type>(<scope>): <subject> (<pr>)`

- **Type:** `feat` — This is a new feature
- **Scope:** `eslint` — Affects ESLint configuration
- **Subject:** Add import boundary rules...
- **PR Reference:** (PR 9) — Links to documentation

### Body Lines (Description)

```
- Install eslint-plugin-import for import validation
```
Explains why we need the dependency

```
- Add import/no-internal-modules rule to enforce barrel pattern
- Add import/no-cycle rule to detect circular dependencies
```
Describes the two main ESLint rules added

```
- Configure allowed exceptions for index.ts, types.ts, styles.ts, constants.ts
```
Documents the configuration details

```
- Document ESLint changes and violations in PR9-ESLINT-IMPORT-RULES.md
```
References documentation created

```
- Current violations: ~30 warnings for direct module imports (to be fixed in PR 10+)
```
Sets expectations for subsequent PRs

### Footer Section (Rationale)

```
This ensures:
- All imports go through barrel files
- Clear API surface for each feature/component
- Easier refactoring and reduced coupling
- Detection of circular dependencies
```

Explains the benefits and goals

---

## Files Included in Commit

```bash
git add \
  frontend/eslint.config.mjs \
  frontend/package-lock.json \
  frontend/docs/PR9-ESLINT-IMPORT-RULES.md \
  frontend/docs/PR9/PR9-INDEX.md \
  frontend/docs/PR9/PR9-CHECKLIST.md \
  frontend/docs/PR9/PR9-SUMMARY.md \
  frontend/docs/PR9/PR9-TEST-GUIDE.md \
  frontend/docs/PR9/PR9-VISUAL-MAP.md \
  frontend/docs/PR9/PR9-COMMIT-INSTRUCTIONS.md \
  frontend/docs/PR9/PR9-COMPLETE.md \
  frontend/docs/PR9/README-PR9.md
```

### Core Changes
- `frontend/eslint.config.mjs` — ESLint configuration updated
- `frontend/package-lock.json` — Dependency lock file updated

### Documentation
- `frontend/docs/PR9-ESLINT-IMPORT-RULES.md` — Main documentation
- `frontend/docs/PR9/` folder — Complete PR documentation set

---

## Commit Workflow

### Step 1: Verify Changes

```bash
cd frontend
git status

# Expected output:
# On branch feature/barrels
# Changes not staged for commit:
#   modified:   eslint.config.mjs
#   modified:   package-lock.json
# Untracked files:
#   docs/PR9-ESLINT-IMPORT-RULES.md
#   docs/PR9/
```

### Step 2: Stage Files

```bash
git add eslint.config.mjs package-lock.json docs/PR9-ESLINT-IMPORT-RULES.md docs/PR9/
```

### Step 3: Verify Staging

```bash
git status

# Expected output:
# On branch feature/barrels
# Changes to be committed:
#   modified:   eslint.config.mjs
#   modified:   package-lock.json
#   new file:   docs/PR9-ESLINT-IMPORT-RULES.md
#   new file:   docs/PR9/PR9-INDEX.md
#   ... (other PR9 files)
```

### Step 4: Create Commit

```bash
git commit -m "feat(eslint): add import boundary rules to enforce barrel exports (PR 9)

- Install eslint-plugin-import for import validation
- Add import/no-internal-modules rule to enforce barrel pattern
- Add import/no-cycle rule to detect circular dependencies
- Configure allowed exceptions for index.ts, types.ts, styles.ts, constants.ts
- Document ESLint changes and violations in PR9-ESLINT-IMPORT-RULES.md
- Current violations: ~30 warnings for direct module imports (to be fixed in PR 10+)

This ensures:
- All imports go through barrel files
- Clear API surface for each feature/component
- Easier refactoring and reduced coupling
- Detection of circular dependencies"
```

### Step 5: Verify Commit

```bash
git log --oneline -1

# Expected output:
# b30c13f feat(eslint): add import boundary rules to enforce barrel exports (PR 9)
```

### Step 6: Push to Branch

```bash
git push origin feature/barrels

# Expected output:
# Counting objects: ...
# Delta compression using up to 4 threads.
# ...
# To github.com:yourorg/bank.git
#  * [new branch]      feature/barrels -> feature/barrels
```

---

## Commit Conventions

### Type Prefix

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | ✅ `feat(eslint):` |
| `fix` | Bug fix | ❌ Not applicable |
| `refactor` | Code refactoring | ❌ Not applicable |
| `docs` | Documentation only | ❌ Not applicable |
| `test` | Test changes | ❌ Not applicable |
| `chore` | Dependency updates | ❌ Not applicable here |

**Used:** `feat` (because ESLint rules enforce new behavior)

### Scope Prefix

| Scope | Usage |
|-------|-------|
| `eslint` | ESLint configuration changes |
| `tsconfig` | TypeScript configuration changes |
| `package` | Package dependencies |

**Used:** `eslint`

### Message Style

- ✅ Imperative mood: "Add rules" not "Added rules"
- ✅ Lowercase first letter: "add" not "Add"
- ✅ No period at end of subject line
- ✅ Detailed body with bullet points
- ✅ Reference to PR number: "(PR 9)"

---

## Push & Pull Request

### After Commit

```bash
# Verify commit is on branch
git log --oneline -5

# Should show PR 9 commit at top

# Push to remote
git push origin feature/barrels
```

### Create Pull Request

When ready to merge:

```bash
# Check branch is up to date
git pull origin feature/barrels

# Push one more time to ensure remote is current
git push origin feature/barrels

# Create PR on GitHub:
# Title: PR 9: Update ESLint Rules (Import Boundaries)
# Description: Reference this commit message
# Target: main
# Source: feature/barrels
```

---

## Rollback (If Needed)

### Undo Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1

# Now you can make changes and recommit
```

### Undo Last Commit (Discard Changes)

```bash
git reset --hard HEAD~1

# Warning: This discards all changes!
```

### Amend Last Commit

```bash
# Make corrections
git add .
git commit --amend -m "new message"

# Force push (be careful!)
git push origin feature/barrels -f
```

---

## Sign-Off

| Step | Status | Timestamp |
|------|--------|-----------|
| Files staged | ✅ Complete | 2026-05-19 |
| Commit message created | ✅ Complete | 2026-05-19 |
| Commit pushed | ✅ Complete | 2026-05-19 |
| PR documentation ready | ✅ Complete | 2026-05-19 |

---

## References

### Conventional Commits
- Spec: https://www.conventionalcommits.org/en/v1.0.0/
- Examples: https://github.com/conventional-commits/examples

### Git Docs
- Committing: https://git-scm.com/docs/git-commit
- Pushing: https://git-scm.com/docs/git-push

---

*For testing instructions, see [PR9-TEST-GUIDE.md](PR9-TEST-GUIDE.md)*  
*For complete summary, see [PR9-SUMMARY.md](PR9-SUMMARY.md)*
