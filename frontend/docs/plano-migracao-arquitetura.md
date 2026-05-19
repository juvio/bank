# Plano de Migração de Arquitetura - Frontend

**Data:** Maio 2026  
**Status:** Planejamento  
**Escopo:** Apenas `/frontend` — NÃO alterar `/backend`

---

## Resumo Executivo

Este plano propõe migração incremental do frontend Next.js 15 para **Clean Architecture**, com foco em:

- ✅ **Padrão Container/Presentational + hooks co-localizados** (separar lógica de UI)
- ✅ **Arquitetura de pastas híbrida** (features, core, lib, types centralizados)
- ✅ **Absolute imports + barrels + tipos compartilhados** (reduzir imports relativos)
- ✅ **Testes co-localizados** (Vitest setup)
- ✅ **Performance & segurança** (bundle analysis, auth segura, dynamic imports)

**Estado Atual:**

- ✅ Estrutura base boa (Next.js 15, Zustand, TypeScript)
- ✅ Tipos centralizados com barrel exports
- ✅ Path aliases (`@/*`) já configurados
- ❌ Sem testes (Vitest instalado mas não configurado)
- ❌ Sem padrão Container/Presentational
- ❌ Sem hooks para lógica de negócio (lógica misturada em componentes)

---

## Tópico 1: Componentes — Container/Presentational + Hooks Co-localizados

### 1.1 Visão Geral

**Objetivo:** Separar responsabilidades — UI pura (Presentational) vs. Lógica (Container) via hooks.

**Benefícios:**

- Componentes UI reutilizáveis em diferentes contextos
- Lógica testável independentemente da UI
- Reduz acoplamento; facilita refatoração
- Hooks co-localizados = fácil localizar lógica relacionada

### 1.2 Padrão de Nomes & Estrutura Proposta

```
src/components/
├── Button/
│   ├── Button.tsx              # Presentational (UI pura, apenas props)
│   ├── useButton.ts            # Hook com lógica (co-localizado)
│   ├── Button.test.tsx         # Testes do Presentational
│   ├── useButton.test.ts       # Testes do hook
│   ├── types.ts                # Tipos locais (ButtonProps, etc)
│   ├── styles.ts               # Estilos Emotion/MUI
│   └── index.ts                # Barrel: export { Button }; export { useButton };
│
├── TransactionCard/
│   ├── TransactionCard.tsx     # UI pura
│   ├── useTransactionCard.ts   # Lógica: fetch, transform, validation
│   ├── useTransactionCard.test.ts
│   ├── TransactionCard.test.tsx
│   ├── types.ts
│   ├── styles.ts
│   └── index.ts
│
└── Modal/
    ├── Modal.tsx               # UI pura
    ├── useModal.ts             # Lógica de controle de estado
    ├── Modal.test.tsx
    ├── useModal.test.ts
    ├── types.ts
    ├── styles.ts
    └── index.ts
```

### 1.3 Exemplo: Refactoring de Componente Existente

#### Antes (Status Atual - Misturado)

```tsx
// components/TransactionCard/index.tsx
import { useModalStore } from '@/stores/useModalStore';
import { TransactionData } from '@/types';
import styled from '@emotion/styled';

export function TransactionCard({
  transaction,
}: {
  transaction: TransactionData;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const { openModal } = useModalStore();

  // Lógica misturada com UI
  const formatAmount = (amount: number) => `R$ ${amount.toFixed(2)}`;

  const handleViewDetails = async () => {
    setShowDetails(true);
    // API call aqui?
    const enrichedData = await fetchTransactionDetails(transaction.id);
  };

  return (
    <CardContainer onClick={handleViewDetails}>
      <Amount>{formatAmount(transaction.amount)}</Amount>
      <Type>{transaction.type}</Type>
      {showDetails && <Details data={transaction} />}
    </CardContainer>
  );
}

const CardContainer = styled.div`...`;
const Amount = styled.span`...`;
```

#### Depois (Container/Presentational + Hook)

**Step 1: Criar o hook co-localizado**

```tsx
// components/TransactionCard/useTransactionCard.ts
import { useState, useCallback } from 'react';
import { useModalStore } from '@/stores/useModalStore';
import { TransactionData } from '@/types';

export interface UseTransactionCardReturn {
  showDetails: boolean;
  formattedAmount: string;
  handleViewDetails: () => Promise<void>;
  handleClose: () => void;
}

export function useTransactionCard(
  transaction: TransactionData,
): UseTransactionCardReturn {
  const [showDetails, setShowDetails] = useState(false);
  const { openModal } = useModalStore();

  const formattedAmount = formatAmount(transaction.amount);

  const handleViewDetails = useCallback(async () => {
    setShowDetails(true);
    try {
      const enrichedData = await fetchTransactionDetails(transaction.id);
      // Handle enriched data if needed
    } catch (error) {
      console.error('Failed to fetch details:', error);
    }
  }, [transaction.id]);

  const handleClose = useCallback(() => {
    setShowDetails(false);
  }, []);

  return {
    showDetails,
    formattedAmount,
    handleViewDetails,
    handleClose,
  };
}

// Funções utilitárias do hook
function formatAmount(amount: number): string {
  return `R$ ${amount.toFixed(2)}`;
}

async function fetchTransactionDetails(id: string) {
  // API call
  return {
    /* data */
  };
}
```

**Step 2: Criar componente Presentational puro**

```tsx
// components/TransactionCard/TransactionCard.tsx
import React from 'react';
import { TransactionData } from '@/types';
import { CardContainer, Amount, Type } from './styles';
import { Details } from './Details';

export interface TransactionCardProps {
  transaction: TransactionData;
  showDetails: boolean;
  formattedAmount: string;
  onViewDetails: () => Promise<void>;
  onClose: () => void;
}

export function TransactionCard({
  transaction,
  showDetails,
  formattedAmount,
  onViewDetails,
  onClose,
}: TransactionCardProps): JSX.Element {
  return (
    <CardContainer onClick={onViewDetails}>
      <Amount>{formattedAmount}</Amount>
      <Type>{transaction.type}</Type>
      {showDetails && <Details transaction={transaction} onClose={onClose} />}
    </CardContainer>
  );
}
```

**Step 3: Container combina hook + Presentational**

```tsx
// components/TransactionCard/TransactionCardContainer.tsx
import { TransactionData } from '@/types';
import { useTransactionCard } from './useTransactionCard';
import { TransactionCard } from './TransactionCard';

export interface TransactionCardContainerProps {
  transaction: TransactionData;
}

export function TransactionCardContainer({
  transaction,
}: TransactionCardContainerProps): JSX.Element {
  const { showDetails, formattedAmount, handleViewDetails, handleClose } =
    useTransactionCard(transaction);

  return (
    <TransactionCard
      transaction={transaction}
      showDetails={showDetails}
      formattedAmount={formattedAmount}
      onViewDetails={handleViewDetails}
      onClose={handleClose}
    />
  );
}
```

**Step 4: Barrel export**

```ts
// components/TransactionCard/index.ts
export { TransactionCardContainer as TransactionCard } from './TransactionCardContainer';
export { TransactionCard as TransactionCardUI } from './TransactionCard'; // Se precisar do UI puro
export { useTransactionCard } from './useTransactionCard';
export type { TransactionCardProps } from './TransactionCard';
```

**Step 5: Uso (simples e limpo)**

```tsx
// Em app/transactions/page.tsx
import { TransactionCard } from '@/components/TransactionCard';

export function TransactionsPage() {
  const transactions = [...];
  return (
    <div>
      {transactions.map((t) => (
        <TransactionCard key={t.id} transaction={t} />
      ))}
    </div>
  );
}
```

### 1.4 Testes Co-localizados

**useTransactionCard.test.ts**

```ts
import { renderHook, act } from '@testing-library/react';
import { useTransactionCard } from './useTransactionCard';
import { TransactionData } from '@/types';

const mockTransaction: TransactionData = {
  id: '1',
  amount: 100.5,
  type: 'transfer',
  date: new Date(),
};

describe('useTransactionCard', () => {
  it('should format amount correctly', () => {
    const { result } = renderHook(() => useTransactionCard(mockTransaction));
    expect(result.current.formattedAmount).toBe('R$ 100.50');
  });

  it('should toggle showDetails on handleViewDetails', async () => {
    const { result } = renderHook(() => useTransactionCard(mockTransaction));

    expect(result.current.showDetails).toBe(false);

    await act(async () => {
      await result.current.handleViewDetails();
    });

    expect(result.current.showDetails).toBe(true);
  });
});
```

**TransactionCard.test.tsx**

```ts
import { render, screen } from '@testing-library/react';
import { TransactionCard } from './TransactionCard';
import { TransactionData } from '@/types';

const mockProps = {
  transaction: { id: '1', amount: 100.5, type: 'transfer' } as TransactionData,
  showDetails: false,
  formattedAmount: 'R$ 100.50',
  onViewDetails: jest.fn(),
  onClose: jest.fn(),
};

describe('TransactionCard (Presentational)', () => {
  it('should render formatted amount', () => {
    render(<TransactionCard {...mockProps} />);
    expect(screen.getByText('R$ 100.50')).toBeInTheDocument();
  });

  it('should show details when showDetails is true', () => {
    render(<TransactionCard {...mockProps} showDetails={true} />);
    // Details component should be rendered
  });
});
```

### 1.5 Migração: Passos Concretos (PR 1)

**PR Title:** `refactor(components): extract Transaction logic to useTransactionCard hook`

1. Criar `useTransactionCard.ts` com lógica extraída
2. Criar `TransactionCard.tsx` (Presentational puro)
3. Criar `TransactionCardContainer.tsx` (combina hook + UI)
4. Mover testes para co-localização
5. Atualizar `index.ts` com novo barrel export
6. Rodar testes: `npm run test`
7. Verificar lint: `npm run lint -- --fix`

**Arquivos afetados:**

```
✓ src/components/TransactionCard/useTransactionCard.ts (novo)
✓ src/components/TransactionCard/TransactionCard.tsx (novo)
✓ src/components/TransactionCard/TransactionCardContainer.tsx (novo)
✓ src/components/TransactionCard/index.tsx → index.ts (atualizado)
✓ src/components/TransactionCard/TransactionCard.test.tsx (novo)
✓ src/components/TransactionCard/useTransactionCard.test.ts (novo)
```

### 1.6 Checklist de PRs Incrementais

- [ ] **PR 1:** TransactionCard (Container/Presentational + hook)
- [ ] **PR 2:** AccountCard (Container/Presentational + hook)
- [ ] **PR 3:** Modal (Container/Presentational + hook)
- [ ] **PR 4:** LoginCard (Container/Presentational + hook)
- [ ] **PR 5:** RegisterCard (Container/Presentational + hook)
- [ ] **PR 6:** Componentes menores (Button, AccountMenu, etc)
- [ ] **PR 7:** Update all imports across app/ (se necessário)

### 1.7 Riscos & Mitigantes

| Risco                                            | Mitigation                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| Aumentar tamanho do bundle (mais arquivos)       | Tree-shaking funciona com ESM; testar com `next build --analyze` |
| Performance de renderização com muitos hooks     | Memoizar com `useMemo`/`useCallback`; testar com React Profiler  |
| Quebrar componentes existentes (breaking change) | Manter exports anteriores; deprecate gradualmente                |
| Curva de aprendizado para o time                 | Documentar padrão em CONTRIBUTING.md; revisar PRs com atenção    |

### 1.8 Critérios de Aceitação

- ✅ Componentes Presentational sem `useState`, `useEffect`, API calls, store access
- ✅ Hooks isolados e testáveis com `renderHook` (Vitest)
- ✅ Testes co-localizados com cobertura ≥ 80%
- ✅ Lint/ESLint sem erros
- ✅ Bundle size não aumenta > 2% (testar com build analyzer)
- ✅ Todos os testes passando: `npm run test`

---

## Tópico 2: Arquitetura de Pastas — Estrutura Híbrida (Features + Core)

### 2.1 Visão Geral

**Objetivo:** Reorganizar frontend em camadas escaláveis (features por domínio, core compartilhado, lib de utilitários).

**Por que híbrido?** Next.js 15 suporta SSR, ISR, CSR. Cada página pode usar estratégia diferente. Estrutura deve refletir isso.

### 2.2 Estrutura Proposta

```
frontend/src/
│
├── app/                             # Next.js 15 App Router (NÃO MOVER)
│   ├── (auth)/                      # Route group: login, register
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (operations)/                # Route group: páginas protegidas
│   │   ├── @modal/                  # Parallel route: modal slots
│   │   ├── (microfrontend)/         # Nested group: MFE routes
│   │   ├── home/page.tsx
│   │   ├── transactions/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Homepage
│   └── globals.css
│
├── core/                            # Configs & Providers globais
│   ├── auth/
│   │   ├── AuthContext.tsx          # Auth context provider
│   │   ├── ProtectedRoute.tsx       # Route guard
│   │   ├── useAuthContext.ts        # Hook para consumir auth
│   │   ├── authService.ts           # Auth API calls
│   │   └── types.ts
│   ├── config/
│   │   ├── api.ts                   # API client config
│   │   ├── constants.ts
│   │   └── env.ts                   # Env vars type-safe
│   ├── providers/
│   │   ├── ClientThemeProvider.tsx  # MUI + Emotion theme
│   │   └── index.tsx                # Wrapper com todos os providers
│   └── index.ts                     # Barrel: re-export principais
│
├── features/                        # Features por domínio (SSR/SSG/CSR)
│   │
│   ├── auth/                        # Feature: Autenticação
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── useLoginForm.ts
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   └── RegisterForm/
│   │   │       └── (similar structure)
│   │   ├── hooks/
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── loginService.ts
│   │   │   ├── registerService.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── auth.types.ts
│   │   │   └── index.ts
│   │   └── index.ts                 # Barrel: export { LoginForm } etc
│   │
│   ├── transactions/                # Feature: Transações
│   │   ├── components/
│   │   │   ├── TransactionCard/
│   │   │   ├── TransactionFilter/
│   │   │   ├── TransactionHistory/
│   │   │   └── NewTransactionForm/
│   │   ├── hooks/
│   │   │   ├── useTransactionsList.ts  # Fetch com cache
│   │   │   ├── useCreateTransaction.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── transactionService.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── transaction.types.ts
│   │   │   └── index.ts
│   │   ├── stores/                     # Se precisar Zustand local
│   │   │   ├── useTransactionStore.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── accounts/                    # Feature: Contas Bancárias
│   │   ├── components/
│   │   │   ├── AccountCard/
│   │   │   ├── AccountMenu/
│   │   │   └── AccountSelector/
│   │   ├── hooks/
│   │   │   ├── useAccountsList.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── accountService.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── account.types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── dashboard/                  # Feature: Dashboard/Home
│   │   ├── components/
│   │   │   ├── DashboardHero/
│   │   │   ├── QuickStats/
│   │   │   └── RecentTransactions/
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts
│   │   ├── services/
│   │   │   └── dashboardService.ts
│   │   ├── types/
│   │   │   └── dashboard.types.ts
│   │   └── index.ts
│   │
│   └── index.ts                     # Barrel: re-export all features
│
├── components/                      # UI shared (atoms, molecules)
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Card/
│   ├── Navbar/
│   ├── Footer/
│   └── index.ts
│
├── lib/                             # Utilitários & helpers (pure functions)
│   ├── date.ts                      # formatDate, parseDate, etc
│   ├── currency.ts                  # formatCurrency, parseCurrency, etc
│   ├── validation.ts                # Validators (email, phone, etc)
│   ├── crypto.ts                    # Client-side crypto utils (se necessário)
│   ├── localStorage.ts              # Typed localStorage wrapper
│   └── index.ts
│
├── common/                          # Constantes & assets
│   ├── constants.ts                 # App constants (timeouts, limits, etc)
│   ├── styles.ts                    # Global styles, theme values
│   ├── icons/                       # SVG icons
│   ├── images/                      # Static images
│   └── index.ts
│
├── front-types-domain/              # CENTRALIZADO: Tipos compartilhados
│   ├── index.ts                     # Re-exports de todos os tipos
│   ├── common.types.ts              # Tipos genéricos (ID, Timestamp, etc)
│   ├── api.types.ts                 # Response/Request types
│   └── domain.types.ts              # Domain models (Transaction, Account, User, etc)
│
├── hooks/                           # Hooks globais reutilizáveis
│   ├── useBreakpoint.ts             # Media queries
│   ├── useLocalStorage.ts           # Typed localStorage
│   ├── useFetch.ts                  # Data fetching com SWR
│   ├── useDebounce.ts
│   ├── useTheme.ts
│   └── index.ts
│
├── stores/                          # Zustand global stores (MANTER)
│   ├── useAuthStore.ts
│   ├── useAccountStore.ts
│   ├── useModalStore.ts
│   └── index.ts
│
├── services/                        # API clients & external services
│   ├── api.ts                       # Base API client (axios/fetch wrapper)
│   ├── mockService.ts               # Mock data (dev only)
│   └── index.ts
│
├── utils/                           # Utility functions (REFACTOR para lib/)
│   ├── getGraphicAppBaseUrl.ts      # MFE-specific
│   ├── sanitizedFilename.ts
│   └── index.ts
│
├── stories/                         # Storybook stories
│   ├── components/
│   └── features/
│
├── mocks/                           # Mock data (MSW, fixtures)
│   ├── handlers.ts                  # MSW handlers
│   ├── fixtures/
│   └── mock.json
│
├── types.ts                         # LEGACY - migrar para front-types-domain/
└── tsconfig.json                    # Paths configurados (próxima seção)
```

### 2.3 Configuração de Paths no tsconfig.json

**tsconfig.json (atualizado)**

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@core/*": ["./core/*"],
      "@features/*": ["./features/*"],
      "@components/*": ["./components/*"],
      "@lib/*": ["./lib/*"],
      "@common/*": ["./common/*"],
      "@types/*": ["./front-types-domain/*"],
      "@hooks/*": ["./hooks/*"],
      "@stores/*": ["./stores/*"],
      "@services/*": ["./services/*"],
      "@utils/*": ["./utils/*"],
      "@mocks/*": ["./mocks/*"]
    },
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "bundler"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

**Uso:**

```tsx
// Antes (relative imports)
import { TransactionCard } from '../../components/TransactionCard';
import { useTransactionsList } from '../../hooks/transactions/useTransactionsList';
import { Transaction } from '../../types/transaction.type';

// Depois (absolute imports)
import { TransactionCard } from '@components/TransactionCard';
import { useTransactionsList } from '@features/transactions/hooks';
import type { Transaction } from '@types/domain.types';
```

### 2.4 Regras de Renderização (SSR/ISR/CSR)

**Decisão baseada na página:**

| Página                | Estratégia      | Motivo                                    |
| --------------------- | --------------- | ----------------------------------------- |
| `/` (home)            | **ISR (5 min)** | Conteúdo público, raro mudar              |
| `/login`, `/register` | **CSR**         | Sem auth, sem dados dinâmicos             |
| `/home` (dashboard)   | **CSR**         | Dados privados por-user, fetch no cliente |
| `/transactions`       | **CSR**         | Dados sensíveis, filtros dinâmicos        |
| `/graphicApp` (MFE)   | **CSR**         | Micro frontend client-side                |

**Exemplo: Configurar página com ISR**

```tsx
// app/page.tsx (Homepage)
import { Metadata } from 'next';

export const revalidate = 300; // ISR: 5 minutos

export const metadata: Metadata = {
  title: 'Home | Bank App',
};

export default async function HomePage() {
  // Pode fazer fetch aqui (será cached)
  return <Home />;
}
```

**Exemplo: Configurar página com CSR**

```tsx
// app/(operations)/home/page.tsx (Dashboard)
'use client'; // Forçar CSR

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch aqui no cliente
    fetchDashboardData().then(setData);
  }, []);

  return <Dashboard data={data} />;
}
```

### 2.5 Migração: Passos Concretos

**Fase 1: Setup (PR 1)**

1. Criar pastas base: `core/`, `features/`, `lib/`, `common/`, `front-types-domain/`
2. Atualizar `tsconfig.json` com novos paths
3. Rodar ESLint/TypeScript: `npm run lint` e `npm run build`
4. Atualizar `.eslintrc.json` para validar imports (ex.: `@features/*` imports só de features)

**Fase 2: Criar estrutura base (PR 2)**

1. Criar pastas base: `core/`, `features/`, `lib/`, `common/`, `front-types-domain/`
2. Criar barrels/arquivos ancora sem mover codigo de dominio
3. Preservar imports e comportamento existentes

**Fase 3: Atualizar paths e migrar tipos (PR 3)**

1. Atualizar `tsconfig.json` e `vitest.config.ts` para aliases da estrutura criada no PR 2
2. Mover `src/types/` para `src/front-types-domain/`
3. Atualizar imports de `@/types` para `@types`
4. Criar/ajustar `front-types-domain/index.ts` com barrels dos tipos reais

**Fase 4: Migrar auth e demais features (PR 4-10)**

1. PR 4: migrar auth para `features/auth`
2. PR 5: migrar transactions para `features/transactions`
3. PR 6: migrar accounts para `features/accounts`
4. PR 7-10: refatorar components/hooks, barrels, testes e cleanup incremental

**Fase 5: Atualizar app/ routes (PR 11)**

1. Verificar imports em `app/**/*.tsx`
2. Atualizar para novos paths

**Codemod: Atualizar imports em massa**

```bash
# Usando jscodeshift - criar arquivo transform
# codemods/updateImports.js

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Transformar: @/types/** → @types/**
  root
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value.startsWith('@/types'))
    .forEach(path => {
      path.value.source.value = path.value.source.value.replace('@/types', '@types');
    });

  return root.toSource();
};
```

**Rodar codemod:**

```bash
npx jscodeshift --transform ./codemods/updateImports.js src/ --extensions tsx,ts
```

### 2.6 Checklist de PRs Incrementais

- [ ] **PR 1:** Setup: criar pastas, atualizar tsconfig, validar
- [ ] **PR 2:** Criar estrutura de pastas (core, features, lib, common, front-types-domain)
- [ ] **PR 3:** Atualizar paths e migrar tipos para front-types-domain/
- [ ] **PR 4:** Migrar auth para features/auth
- [ ] **PR 5-6:** Migrar transactions/accounts para features/
- [ ] **PR 7:** Atualizar imports em app/ routes
- [ ] **PR 8:** Verificar testes e cobertura
- [ ] **PR 9:** Atualizar ESLint rules (import boundaries)
- [ ] **PR 10:** Cleanup: deletar arquivos antigos, validar build

### 2.7 Riscos & Mitigantes

| Risco                            | Mitigation                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| Breaking changes em imports      | Usar codemod + git grep para validar todos os imports                                 |
| Componentes em múltiplos lugares | Decidir regra clara: shared → components/, feature-specific → features/\*/components/ |
| Circular dependencies            | ESLint rule: `import/no-cycle`; validar com `npm run lint`                            |
| Build quebrado após refactor     | Rodar `npm run build` após cada PR; usar CI/CD                                        |

### 2.8 Critérios de Aceitação

- ✅ Estrutura de pastas implementada conforme proposta
- ✅ Todos os imports atualizados para paths absolutos
- ✅ `npm run build` e `npm run lint` sem erros
- ✅ Testes passando: `npm run test`
- ✅ Build time reduzido ou mantido (não aumentar)
- ✅ ESLint validando import boundaries

---

## Tópico 3: Melhorias Diversas (Paths, Barrels, Testes, Segurança, Performance)

### 3.1 Path Absolute Imports (Completar Configuração)

**Estado Atual:** ✅ `@/*` já configurado

**Melhorias propostas:** Adicionar paths específicas para melhor organização

**Comando para adicionar paths:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@core/*": ["./core/*"],
      "@features/*": ["./features/*"],
      "@components/*": ["./components/*"],
      "@lib/*": ["./lib/*"],
      "@common/*": ["./common/*"],
      "@types/*": ["./front-types-domain/*"],
      "@hooks/*": ["./hooks/*"],
      "@stores/*": ["./stores/*"],
      "@services/*": ["./services/*"],
      "@utils/*": ["./utils/*"],
      "@mocks/*": ["./mocks/*"]
    }
  }
}
```

**Migração: Codemod para atualizar imports em massa**

**Script: codemods/migrateToAbsoluteImports.js**

```js
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Padrão: ../../components/X -> @components/X
  // Padrão: ../hooks/useX -> @hooks/useX
  // Padrão: ../../types -> @types

  const RULES = [
    { from: /^\.\.\/\.\.\/components\//, to: '@components/' },
    { from: /^\.\.\/\.\.\/hooks\//, to: '@hooks/' },
    { from: /^\.\.\/\.\.\/types/, to: '@types' },
    { from: /^\.\.\/\.\.\/lib\//, to: '@lib/' },
    { from: /^\.\.\/\.\.\/common\//, to: '@common/' },
    { from: /^\.\.\/\.\.\/stores\//, to: '@stores/' },
    { from: /^\.\.\/\.\.\/services\//, to: '@services/' },
    { from: /^\.\.\/\.\.\/utils\//, to: '@utils/' },
    { from: /^\.\.\/hooks\//, to: '@hooks/' },
    { from: /^\.\.\/types/, to: '@types' },
  ];

  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.value.source.value;
    RULES.forEach(({ from, to }) => {
      if (from.test(source)) {
        path.value.source.value = source.replace(from, to);
      }
    });
  });

  return root.toSource();
};
```

**Rodar:**

```bash
# Instalar jscodeshift
npm install -D jscodeshift

# Executar codemod
npx jscodeshift --transform codemods/migrateToAbsoluteImports.js src/ --extensions tsx,ts

# Validar
npm run lint -- --fix
npm run build
```

### 3.2 Barrels (index.ts) — Padronizar Estrutura

**Estado Atual:** ✅ Parcialmente implementado

- ✅ `src/types/index.ts` (barrel de tipos)
- ✅ Cada componente tem `index.tsx` (export default)
- ❌ Faltam barrels em: hooks/, stores/, features/

**Proposta:** Cada pasta exporta um barrel controlado

**Padrão: Barrel files**

```ts
// src/components/index.ts
export { Button } from './Button';
export { Modal } from './Modal';
export { Card } from './Card';
export type { ButtonProps } from './Button/types';
export type { ModalProps } from './Modal/types';

// src/hooks/index.ts
export { useBreakpoint } from './useBreakpoint';
export { useLocalStorage } from './useLocalStorage';
export { useFetch } from './useFetch';

// src/stores/index.ts
export { useAuthStore } from './useAuthStore';
export { useAccountStore } from './useAccountStore';
export { useModalStore } from './useModalStore';

// src/features/transactions/index.ts
export { TransactionCard } from './components/TransactionCard';
export { TransactionFilter } from './components/TransactionFilter';
export { useTransactionsList } from './hooks/useTransactionsList';
export { useCreateTransaction } from './hooks/useCreateTransaction';
export { transactionService } from './services';
export type { Transaction } from './types';
export type { TransactionFilter } from './types';

// src/front-types-domain/index.ts
export type { Transaction } from './domain.types';
export type { Account } from './domain.types';
export type { User } from './domain.types';
export type { ApiResponse } from './api.types';
```

**Benefícios:**

- ✅ Imports simples: `import { TransactionCard } from '@features/transactions'`
- ✅ Não expõe implementação interna
- ✅ Facilita refatoração interna
- ✅ Reduz número de imports em cada arquivo

**ESLint rule para forçar barrels:**

```js
// .eslintrc.json
{
  "rules": {
    "import/no-internal-modules": [
      "error",
      {
        "allow": [
          "**/node_modules/**",
          "**/dist/**",
          "**/index.{js,ts,tsx}",
          "**/types.ts",
          "**/styles.ts"
        ]
      }
    ]
  }
}
```

### 3.3 Centralização de Tipos — front-types-domain/

**Estado Atual:** ✅ Tipos em `src/types/`

**Proposta:** Renomear para `src/front-types-domain/` (mais descritivo)

**Estrutura:**

```ts
// src/front-types-domain/index.ts
export * from './common.types';
export * from './api.types';
export * from './domain.types';

// src/front-types-domain/domain.types.ts
export type User = {
  id: string;
  email: string;
  name: string;
};

export type Account = {
  id: string;
  number: string;
  balance: number;
};

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: 'transfer' | 'deposit' | 'withdrawal';
  date: Date;
  description: string;
};

// src/front-types-domain/api.types.ts
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
}>;

// src/front-types-domain/common.types.ts
export type ID = string | number;
export type Timestamp = Date | string;

export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };
```

**Migração:**

```bash
# Renomear pasta
mv src/types src/front-types-domain

# Atualizar imports
npm install -D jscodeshift
npx jscodeshift --transform codemods/updateTypeImports.js src/

# Validar
npm run lint -- --fix
npm run build
```

### 3.4 Co-localização de Testes — Vitest Setup

**Estado Atual:** ❌ Sem testes (Vitest instalado mas não configurado)

**Proposta:** Setup Vitest + React Testing Library

**File: vitest.config.ts (criar)**

```ts
import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@common': path.resolve(__dirname, './src/common'),
      '@types': path.resolve(__dirname, './src/front-types-domain'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
    },
  },
});
```

**File: src/test/setup.ts (criar)**

```ts
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

**File: package.json (atualizar scripts)**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  },
  "devDependencies": {
    "@testing-library/react": "^15.x.x",
    "@testing-library/jest-dom": "^6.x.x",
    "@vitest/ui": "^2.x.x",
    "@vitest/coverage-v8": "^2.x.x",
    "@vitejs/plugin-react": "^4.x.x",
    "vitest": "^2.x.x"
  }
}
```

**Instalar dependências:**

```bash
npm install -D @testing-library/react @testing-library/jest-dom @vitest/ui @vitejs/plugin-react
```

**Estrutura de testes co-localizados:**

```
src/components/Button/
├── Button.tsx
├── Button.test.tsx          # ← co-localizado
├── useButton.ts
├── useButton.test.ts        # ← co-localizado
├── types.ts
├── styles.ts
└── index.ts

src/features/transactions/hooks/
├── useTransactionsList.ts
├── useTransactionsList.test.ts  # ← co-localizado
└── index.ts
```

**Exemplo: Test co-localizado**

```tsx
// src/components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('should render with label', () => {
    render(<Button label='Click me' />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button label='Click' onClick={handleClick} />);
    await user.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalled();
  });
});
```

**Rodar testes:**

```bash
npm run test                # Modo watch
npm run test:ui             # UI dashboard
npm run test:coverage       # Relatório de cobertura
```

### 3.5 Segurança: Autenticação & Criptografia

#### 3.5.1 Autenticação Segura

**Recomendações:**

1. **Token Storage: httpOnly Cookies (NOT localStorage)**

   ```tsx
   // ❌ NUNCA faça isso
   localStorage.setItem('token', jwtToken);

   // ✅ SEMPRE use httpOnly cookies (servidor define)
   // Backend faz:
   // response.setHeader('Set-Cookie', 'token=JWT; httpOnly; Secure; SameSite=Strict')
   ```

2. **Refresh Token Rotation**

   ```tsx
   // src/core/auth/authService.ts
   export async function refreshToken(): Promise<string> {
     // Chamada ao backend que rotaciona o token
     const response = await fetch('/api/auth/refresh', {
       method: 'POST',
       credentials: 'include', // Incluir cookies
     });
     return response.json();
   }
   ```

3. **Logout completo**

   ```tsx
   // src/core/auth/authService.ts
   export async function logout(): Promise<void> {
     // Backend deleta cookie httpOnly
     await fetch('/api/auth/logout', {
       method: 'POST',
       credentials: 'include',
     });
     // Limpar estado local
     useAuthStore.getState().clearAuth();
   }
   ```

4. **Validação de Claims (no servidor)**
   ```tsx
   // Backend deve validar:
   // - Assinatura do JWT
   // - Expiração
   // - Permissões (roles/scopes)
   // Frontend NÃO decodifica token sensível
   ```

**Checklist de Segurança - Auth:**

- [ ] Tokens armazenados em httpOnly cookies
- [ ] Cookies com `Secure` flag (HTTPS only)
- [ ] Cookies com `SameSite=Strict` (CSRF protection)
- [ ] Refresh token endpoint que rotaciona tokens
- [ ] Logout limpa state + cookies
- [ ] Sem tokens em localStorage/sessionStorage
- [ ] HTTPS obrigatório (prod)

#### 3.5.2 Criptografia de Dados Sensíveis

**Princípio:** Frontend NÃO criptografa dados sensíveis (PII)

**O que fazer:**

1. **Transmissão: TLS/HTTPS (obrigatório)**

   ```bash
   # Sempre usar HTTPS
   # Validar certificados SSL
   # Usar STS headers
   ```

2. **Dados no Frontend: Mascarar & Sanitizar**

   ```tsx
   // ✅ Mascarar número de conta
   export function maskAccountNumber(number: string): string {
     return `${number.slice(0, 2)}***${number.slice(-4)}`;
   }

   // ✅ Sanitizar entrada (contra XSS)
   import DOMPurify from 'dompurify';
   const cleanHTML = DOMPurify.sanitize(userInput);
   ```

3. **Dados em Repouso: Backend criptografa**

   ```
   Frontend: envia dados sensíveis para backend
   Backend: criptografa com AES-256 antes de gravar em BD
   Frontend: nunca vê dados descriptografados
   ```

4. **Exemplo: Envio seguro de CPF**

   ```tsx
   // ❌ NUNCA armazene no frontend
   // localStorage.setItem('cpf', '123.456.789-00');

   // ✅ SEMPRE envie ao backend e delete
   async function submitPersonalData(cpf: string) {
     // 1. Validar
     if (!isValidCPF(cpf)) throw new Error('Invalid CPF');

     // 2. Enviar ao backend (sobre TLS)
     const response = await fetch('/api/account/personal-data', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       credentials: 'include',
       body: JSON.stringify({ cpf }),
     });

     // 3. Limpar da memória
     cpf = ''; // Garbage collect

     return response.json();
   }
   ```

**Checklist de Segurança - Criptografia:**

- [ ] HTTPS obrigatório (prod)
- [ ] Sem PII em localStorage/sessionStorage/cookies
- [ ] Mascarar dados sensíveis na UI (ex.: conta, CPF)
- [ ] Sanitizar inputs (DOMPurify ou similar)
- [ ] Backend criptografa dados sensíveis em repouso
- [ ] Não decodificar JWTs sensíveis no frontend
- [ ] Validar CORS headers
- [ ] CSP headers configurados

### 3.6 Performance: Bundle Analysis & Dynamic Imports

#### 3.6.1 Bundle Analysis

**Setup: Next.js Bundle Analyzer**

**Instalar:**

```bash
npm install -D @next/bundle-analyzer
```

**File: next.config.js (atualizar)**

```js
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
```

**File: package.json (atualizar scripts)**

```json
{
  "scripts": {
    "build": "next build",
    "build:analyze": "ANALYZE=true next build"
  }
}
```

**Usar:**

```bash
npm run build:analyze
# Abre visualização de bundle em http://localhost:3000
```

#### 3.6.2 Dynamic Imports

**Problema:** Componentes pesados (gráficos, editores) aumentam bundle inicial

**SoluÃ§Ã£o: next/dynamic para lazy-load**

```tsx
// ❌ Sem dynamic import (carrega sempre)
import HeavyChart from '@/components/HeavyChart';

export default function Page() {
  return <HeavyChart />;
}

// ✅ Com dynamic import (carrega sob demanda)
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>Carregando gráfico...</div>,
  ssr: false, // Carregar apenas no cliente
});

export default function Page() {
  return <HeavyChart />;
}
```

**Usar para MFE (GraphicApp):**

```tsx
// src/components/@microfrontend/GraphicMFEComponent/index.tsx
import dynamic from 'next/dynamic';

const GraphicMFE = dynamic(
  () => import('@/components/@microfrontend/GraphicMFEComponent/MFELoader'),
  {
    loading: () => <div>Carregando gráficos...</div>,
    ssr: false,
  },
);

export default function GraphicMFEComponent() {
  return <GraphicMFE />;
}
```

**Checklist de Performance:**

- [ ] Rodar `npm run build:analyze` antes/depois de refactors
- [ ] Dynamic imports para componentes > 50KB
- [ ] Lazy-loading de routes (Next.js automático com app router)
- [ ] Image optimization (next/image)
- [ ] Font optimization (next/font)
- [ ] Web Vitals monitorados (LCP, FID, CLS)

### 3.7 Scripts Sugeridos para Automação

**File: scripts/migrate-imports.js**

```js
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Migrando imports para absolute paths...');

// 1. Backup
console.log('📦 Criando backup...');
execSync('git stash');

// 2. Rodar codemod
console.log('✨ Aplicando codemod...');
try {
  execSync(
    'npx jscodeshift --transform ./codemods/migrateToAbsoluteImports.js src/ --extensions tsx,ts',
    {
      stdio: 'inherit',
    },
  );
} catch (error) {
  console.error('❌ Codemod falhou. Restaurando backup...');
  execSync('git stash pop');
  process.exit(1);
}

// 3. Validar
console.log('🔍 Validando...');
try {
  execSync('npm run lint -- --fix', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Migração concluída com sucesso!');
} catch (error) {
  console.error('❌ Validação falhou. Restaurando backup...');
  execSync('git stash pop');
  process.exit(1);
}
```

**Usar:**

```bash
chmod +x scripts/migrate-imports.js
node scripts/migrate-imports.js
```

**File: scripts/create-barrel.js (gerar index.ts)**

```js
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function createBarrel(dirPath) {
  const items = fs.readdirSync(dirPath);
  const exports = items
    .filter((item) => !item.startsWith('.') && item !== 'index.ts')
    .map((item) => {
      const itemPath = path.join(dirPath, item);
      const isDir = fs.statSync(itemPath).isDirectory();
      if (isDir) return null;
      const name = item.replace('.ts', '').replace('.tsx', '');
      return `export { ${name} } from './${name}';`;
    })
    .filter(Boolean);

  const indexPath = path.join(dirPath, 'index.ts');
  fs.writeFileSync(indexPath, exports.join('\n') + '\n');
  console.log(`✅ Created ${indexPath}`);
}

const dir = process.argv[2] || process.cwd();
createBarrel(dir);
```

**Usar:**

```bash
node scripts/create-barrel.js src/components
node scripts/create-barrel.js src/hooks
```

### 3.8 Checklist Final: Tópico 3

**Path Absolute Imports**

- [ ] tsconfig.json atualizado com novos paths
- [ ] Codemod executado para migrar imports
- [ ] `npm run lint` e `npm run build` sem erros

**Barrels (index.ts)**

- [ ] Cada pasta tem `index.ts` com exports controlados
- [ ] ESLint rule `import/no-internal-modules` ativada
- [ ] Imports simplifcados: `from '@features/transactions'`

**Centralização de Tipos**

- [ ] `src/types/` renomeado para `src/front-types-domain/`
- [ ] Barrel `front-types-domain/index.ts` com re-exports
- [ ] Imports atualizados: `from '@types'`

**Co-localização de Testes**

- [ ] vitest.config.ts criado
- [ ] src/test/setup.ts criado
- [ ] Testes co-localizados próximos aos componentes
- [ ] `npm run test` executando com sucesso

**Segurança**

- [ ] Auth usa httpOnly cookies (não localStorage)
- [ ] Dados sensíveis mascarados na UI
- [ ] Backend criptografa PII em repouso
- [ ] HTTPS obrigatório
- [ ] CSP headers configurados

**Performance**

- [ ] Bundle Analyzer instalado e testado
- [ ] Dynamic imports para componentes pesados
- [ ] `npm run build:analyze` executando
- [ ] Sem aumento de bundle size > 5%

---

## Roadmap de Entrega (PRs Incrementais)

### Fase 1: Foundation (2-3 PRs)

- [x] **PR 1:** Setup Vitest + tipos centralizados
- [x] **PR 2:** Criar estrutura de pastas (core, features, lib)
- [x] **PR 3:** Atualizar tsconfig paths e migrar tipos para front-types-domain

### Fase 2: Refactoring (5-8 PRs)

- [x] **PR 4:** Migrar auth para features/auth
- [x] **PR 5:** Migrar transactions para features/transactions
- [x] **PR 6:** Migrar accounts para features/accounts
- [x] **PR 7:** Refactor TransactionCard (Container/Presentational + hook)
- [ ] **PR 8:** Refactor AccountCard (Container/Presentational + hook)
- [ ] **PR 9:** Implementar barrels em todas as pastas
- [ ] **PR 10:** Adicionar testes co-localizados (mínimo 80% cobertura)

### Fase 3: Performance & Security (3-4 PRs)

- [ ] **PR 11:** Setup Bundle Analyzer + dynamic imports
- [ ] **PR 12:** Implementar auth segura (httpOnly cookies)
- [ ] **PR 13:** Data masking + sanitização
- [ ] **PR 14:** Deploy em staging, validar performance

### Fase 4: Documentation & Cleanup (2 PRs)

- [ ] **PR 15:** Atualizar README com novo padrão
- [ ] **PR 16:** Cleanup: deletar arquivos antigos, validar

---

## Métricas & Critérios de Sucesso

| Métrica                        | Baseline | Target     | Ferramenta              |
| ------------------------------ | -------- | ---------- | ----------------------- |
| Build time                     | ~45s     | < 40s      | `next build`            |
| Bundle size (main)             | TBD      | < TBD + 5% | `npm run build:analyze` |
| LCP (Largest Contentful Paint) | TBD      | < 2.5s     | Lighthouse              |
| Test coverage                  | 0%       | ≥ 80%      | `npm run test:coverage` |
| Lint errors                    | 0        | 0          | `npm run lint`          |
| Type errors                    | 0        | 0          | `npm run build` (tsc)   |
| Componentes refatorados        | 0/15+    | 15+/15+    | Manual count            |

---

## Conclusão

Este plano propõe migração **incremental e segura** do frontend Next.js 15 para Clean Architecture, com:

- ✅ Container/Presentational + hooks co-localizados
- ✅ Arquitetura de pastas escalável (features, core, lib)
- ✅ Absolute imports + barrels + tipos centralizados
- ✅ Testes completos (Vitest)
- ✅ Segurança (auth httpOnly, masking, HTTPS)
- ✅ Performance (bundle analysis, dynamic imports)

**Próximos passos:** Selecione um tópico para começar (sugestão: Tópico 1 com PR 1 — TransactionCard refactor + Vitest setup).
