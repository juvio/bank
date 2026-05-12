# PR 1: Vitest Setup & Centralized Types

## Overview

This PR implements:

1. ✅ Vitest configuration with jsdom environment for unit tests
2. ✅ Global test setup with React Testing Library
3. ✅ Path aliases support in tests (matching tsconfig.json)
4. ✅ Two example co-localized tests
5. ✅ Centralized types structure (preparation for front-types-domain migration)
6. ✅ Updated npm scripts for test execution

## Changes Made

### Files Created/Modified

**Configuration Files:**

- `vitest.config.ts` — Updated with proper unit test config, path aliases, and dual projects (unit + storybook)
- `vitest.setup.ts` — Global test setup with mocked Router, Navigation, matchMedia, IntersectionObserver
- `package.json` — Added test scripts and devDependencies

**Type Files (Centralization Preparation):**

- `src/types/barrel-index.ts` — Proper barrel export with all types
- `src/types/remote-app.type.ts` — Extracted type definition from ambient types

**Test Files (Co-localized):**

- `src/utils/date.test.ts` — 5 tests for formatDate utility function
- `src/hooks/useTransactionValidation.test.ts` — 11 tests for useTransactionValidation hook

**Type Aliases (tsconfig.json):**

- Added `@types/*` → `./src/front-types-domain/*` (ready for future migration)

### New npm Scripts

```bash
# Run tests in watch mode
npm run test

# Run tests with UI dashboard (recommended for development)
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run tests once (for CI/CD)
npm run test:watch
```

## How to Run Tests

### Prerequisites

Ensure all dependencies are installed:

```bash
cd frontend
npm install
```

### Run Tests

**Watch mode (recommended during development):**

```bash
npm run test
```

**UI Dashboard (visual feedback):**

```bash
npm run test:ui
# Opens at http://localhost:51204
```

**Coverage Report:**

```bash
npm run test:coverage
# Generates HTML report in ./coverage/index.html
```

**Run Once (CI mode):**

```bash
npm run test -- --run
```

## Test Structure

Tests are **co-localized** with source files:

```
src/
├── hooks/
│   ├── useTransactionValidation.ts
│   └── useTransactionValidation.test.ts    ← Test here
├── utils/
│   ├── date.ts
│   └── date.test.ts                        ← Test here
```

### Naming Convention

- Test files: `[component|hook|util].test.ts` or `.test.tsx`
- Placed in the same directory as source file
- One test file per source file (recommended)

## Example Test Files

### 1. Utility Function Test (date.test.ts)

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('should format a valid date string to pt-BR locale', () => {
    const result = formatDate('2024-05-15');
    expect(result).toBe('15/5/2024');
  });

  it('should return empty string for undefined input', () => {
    const result = formatDate(undefined);
    expect(result).toBe('');
  });
});
```

### 2. Hook Test (useTransactionValidation.test.ts)

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTransactionValidation } from './useTransactionValidation';

describe('useTransactionValidation', () => {
  it('should validate amount correctly with valid number', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(50.5, 'transfer', '2024-05-15'),
    );

    expect(result.current.isAmountValid()).toBe(true);
  });

  it('should set error message on handleAmountBlur with invalid amount', () => {
    const { result } = renderHook(() =>
      useTransactionValidation(undefined, 'transfer', '2024-05-15'),
    );

    act(() => {
      result.current.handleAmountBlur();
    });

    expect(result.current.errors).toBe('Valor obrigatório');
  });
});
```

## Testing Best Practices

### For Utility Functions

```typescript
import { describe, it, expect } from 'vitest';

describe('utilityName', () => {
  it('should do X when given Y', () => {
    const result = utilityFunction(input);
    expect(result).toBe(expected);
  });
});
```

### For React Hooks

```typescript
import { renderHook, act } from '@testing-library/react';

describe('useHookName', () => {
  it('should update state on action', () => {
    const { result } = renderHook(() => useHookName());

    act(() => {
      result.current.handleAction();
    });

    expect(result.current.state).toBe(expectedValue);
  });
});
```

### For React Components

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ComponentName', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler on click', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Path Aliases in Tests

Tests support the same path aliases as the main application:

```typescript
// ✅ All of these work in tests
import { TransactionMapper } from '@/types';
import { formatDate } from '@/utils/date';
import { useTransactionValidation } from '@/hooks/useTransactionValidation';
import { useAuthStore } from '@/stores/useAuthStore';
```

## Future: front-types-domain Migration

The tsconfig.json is prepared with:

```json
"@types/*": ["./src/front-types-domain/*"]
```

When ready for full migration:

1. Rename `src/types` → `src/front-types-domain`
2. Update all imports: `@/types` → `@types`
3. Create proper barrel exports in `front-types-domain/index.ts`

## Validation Commands

**Lint check:**

```bash
npm run lint
```

**Build check:**

```bash
npm run build
```

**Full test suite:**

```bash
npm run test -- --run && npm run test:coverage && npm run build && npm run lint
```

## Troubleshooting

### Tests not running

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear vitest cache: `npm run test -- --clearCache`

### Import errors in tests

- Verify tsconfig.json paths match vitest.config.ts aliases
- Check file extensions (.ts vs .tsx)

### Storybook tests failing

- Ensure `.storybook/vitest.setup.ts` exists
- Run: `npm run test -- --project storybook`

## CI/CD Integration

For GitHub Actions or similar:

```yaml
- name: Run tests
  run: npm run test -- --run

- name: Generate coverage
  run: npm run test:coverage
```

## Next Steps (PR 2+)

- [ ] Migrate remaining components to use co-localized tests
- [ ] Achieve 80%+ overall coverage
- [ ] Move `src/types` → `src/front-types-domain`
- [ ] Update all imports to use `@types/*` paths
