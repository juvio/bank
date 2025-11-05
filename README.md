# 🏦 SuperBank

Uma aplicação bancária moderna construída com Next.js, Material-UI e TypeScript, oferecendo uma experiência intuitiva para gerenciamento de contas e transações.

> **📚 Projeto Acadêmico**: Este projeto foi desenvolvido como trabalho de pós-graduação.

## 👨‍💻 Autoras

**[Juliana Vieira de Oliveira]**  
**[Nayara Carolly Soares Barbosa]**

## ✨ Funcionalidades

- 💳 **Visualização de Saldo**: Exiba e oculte o saldo da conta com um clique
- 📊 **Histórico de Transações**: Acompanhe todas as suas movimentações financeiras
- 🔄 **Nova Transação**: Interface modal para criar novas transações
- 📱 **Design Responsivo**: Interface adaptada para desktop e mobile
- 🎨 **Temas Customizáveis**: Suporte a temas claro e escuro
- 📚 **Storybook**: Componentes documentados e testáveis

## 🛠️ Tecnologias

- **Framework**: [Next.js 15](https://nextjs.org) com App Router
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Documentação**: [Storybook](https://storybook.js.org/)
- **Linting**: [ESLint](https://eslint.org/)

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd superbank
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Executando em desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Executando o Storybook

Para visualizar e testar os componentes isoladamente:

```bash
npm run storybook
# ou
yarn storybook
# ou
pnpm storybook
# ou
bun storybook
```

Abra [http://localhost:6006](http://localhost:6006) no seu navegador para ver o Storybook.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── (operations)/      # Grupo de rotas operacionais
│   │   ├── home/          # Página principal
│   │   └── transactions/  # Página de transações
│   └── @modal/            # Slot paralelo para modais
├── components/            # Componentes reutilizáveis
│   ├── AccountCard/       # Card de conta bancária
│   ├── TransactionCard/   # Card de transação
│   └── Modal/             # Sistema de modal
├── stores/                # Gerenciamento de estado (Zustand)
├── types/                 # Definições de tipos TypeScript
├── mocks/                 # Dados mockados para desenvolvimento
└── stories/               # Histórias do Storybook
```
