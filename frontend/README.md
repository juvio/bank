# Bytebank Frontend

Frontend Next.js 15 do Bank, organizado em uma arquitetura hibrida com App
Router, features por dominio, camadas compartilhadas e testes co-localizados.

Este README descreve o padrao atual do frontend apos a migracao incremental de
arquitetura. O README raiz do repositorio continua sendo a referencia geral do
projeto completo; este documento e a referencia operacional para trabalhar em
`frontend/`.

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript em modo `strict`
- Material UI e Emotion
- Zustand para estado global
- SWR para dados quando aplicavel
- Vitest, Testing Library e jsdom
- Storybook
- Bundle Analyzer e budget de performance versionado

## Como Rodar

```bash
npm install
npm run dev
```

O app roda por padrao em `http://localhost:3000`.

Para usar dados mockados sem backend:

```env
NEXT_PUBLIC_USE_MOCK=true
```

## Scripts Principais

```bash
npm run lint
npm run build
npm run test -- --run
npm run test:coverage
npm run storybook
npm run build:analyze
npm run staging:validate
```

Use `npm run staging:validate` antes de publicar uma build de staging. Ele roda
o build com `NEXT_PUBLIC_DEPLOY_ENV=staging` e valida `performance-budget.json`
contra os manifests gerados pelo Next.

## Arquitetura

```txt
src/
|-- app/                  # rotas, layouts e composicao do App Router
|-- core/                 # infraestrutura global: auth, providers, config
|-- features/             # dominios de negocio
|-- components/           # UI compartilhada e reutilizavel
|-- front-types-domain/   # tipos compartilhados de dominio/API
|-- hooks/                # hooks globais e reutilizaveis
|-- stores/               # stores Zustand globais
|-- services/             # adapters e servicos compartilhados
|-- utils/                # utilitarios legados e compatibilidade
|-- lib/                  # helpers puros compartilhados
|-- common/               # constantes, assets e estilos comuns
|-- mocks/                # mocks e fixtures
`-- stories/              # stories do Storybook
```

### Regras de Camadas

- `src/app` deve conter somente rotas, layouts, boundaries do Next e composicao.
- Logica de negocio deve ficar em `src/features/<feature>`.
- Componentes reutilizaveis e sem dominio especifico ficam em `src/components`.
- Tipos compartilhados novos devem ir para `src/front-types-domain`.
- Hooks globais ficam em `src/hooks`; hooks de feature ficam dentro da propria
  feature.
- Stores globais ficam em `src/stores`; estado exclusivo de feature fica na
  feature.
- Shared layers nao devem importar de `src/features`.

## Features

As features publicas vivem em `src/features`:

- `auth`: login, cadastro, hooks e servico de autenticacao.
- `accounts`: card de conta, menu da conta e hooks relacionados.
- `transactions`: historico, filtros, nova transacao, cards, servicos e stores.
- `dashboard`: estrutura reservada para componentes e fluxos do dashboard.

Cada feature deve expor sua API publica pelo `index.ts` da propria pasta e
evitar imports profundos por consumidores externos.

## Padrao de Componentes

Componentes refatorados seguem o padrao Container/Presentational com hooks
co-localizados na feature:

```txt
FeatureComponent/
|-- FeatureComponent.tsx
|-- FeatureComponentContainer.tsx
|-- styles.ts
|-- types.ts
`-- index.tsx

hooks/
|-- useFeatureComponent.ts
`-- __tests__/useFeatureComponent.test.ts
```

O componente presentational recebe dados e callbacks por props. O container e o
hook ficam responsaveis por estado, stores, efeitos, validacoes e transformacoes.

## Imports

Use aliases e barrels para manter os imports estaveis:

```ts
import { LoginCard } from '@features/auth';
import { AccountCard } from '@features/accounts';
import { TransactionCard } from '@features/transactions';
import { ModalComponent } from '@components';
import { useBankAccountStore } from '@stores';
```

Aliases configurados em `tsconfig.json`:

- `@core`
- `@features`
- `@components`
- `@lib`
- `@common`
- `@types`
- `@hooks`
- `@stores`
- `@services`
- `@utils`
- `@mocks`

## Testes

Testes unitarios e de hooks devem ficar co-localizados com o codigo validado,
preferencialmente em `__tests__` dentro da camada da feature:

```txt
src/features/auth/hooks/__tests__/useLogin.test.ts
src/features/transactions/components/__tests__/TransactionCard.test.tsx
src/features/accounts/hooks/__tests__/useAccountCard.test.tsx
```

Para validar localmente:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Seguranca e Dados Sensiveis

- Autenticacao usa fluxo seguro via cookies httpOnly nas rotas de API.
- Entradas textuais passam por sanitizacao antes de estado/servicos.
- Dados sensiveis exibidos na UI devem ser mascarados com os utilitarios em
  `src/utils/privacy.ts`.
- Nomes de arquivos de anexos devem passar por `sanitizeFilename`.

## Performance e Staging

- Componentes pesados podem ser carregados com dynamic imports.
- `npm run build:analyze` habilita o Bundle Analyzer.
- `performance-budget.json` guarda limites versionados para assets e rotas.
- `scripts/validate-performance-budget.mjs` valida os artefatos em `.next`.

## Documentacao da Migracao

O plano e as entregas de arquitetura ficam em:

- `docs/plano-migracao-arquitetura.md`
- `docs/migration-orchestration/`
- `docs/PR1` a `docs/PR15`

Antes de criar um novo PR de migracao, leia `AGENTS.md` e siga as regras em
`.agents/rules/folder-structure.md`.
