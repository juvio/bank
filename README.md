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
- Docker e Docker Compose (para rodar com containers)

### Opção 1: Docker Completo (Produção/Deploy)

Sobe toda a aplicação (MongoDB + Backend + Frontend) em containers. Ideal para produção.

```bash
# Subir todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v
```

**Acesse:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)
- MongoDB: `localhost:27017`

**Dados:** ✅ Persistem no volume Docker

---

### Opção 2: MongoDB no Docker + Backend/Frontend Local (Desenvolvimento)

MongoDB roda em container, backend e frontend rodam localmente. Ideal para desenvolvimento com dados persistentes.

#### 1. Subir apenas o MongoDB via Docker:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

#### 2. Instalar dependências:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

#### 3. Configurar variáveis de ambiente:

Criar arquivo `backend/.env`:
```env
MONGO_URI=mongodb://admin:admin123@localhost:27017/bank_dev?authSource=admin
```

#### 4. Executar os servidores:

```bash
# Backend (porta 5000)
cd backend
npm start

# Frontend (porta 3000) - em outro terminal
cd frontend
npm run dev
```

#### 5. Parar o MongoDB (quando terminar):

```bash
docker-compose -f docker-compose.dev.yml down
```

**Acesse:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

**Dados:** ✅ Persistem no volume Docker

---

### Opção 3: MongoDB em Memória (Desenvolvimento Rápido)

Backend usa MongoDB em memória (sem Docker). Ideal para testes rápidos ou sem Docker disponível.

#### 1. Instalar dependências:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

#### 2. Executar os servidores:

```bash
# Backend (porta 5000)
cd backend
npm start
# ✅ Conecta automaticamente no MongoDB em memória

# Frontend (porta 3000) - em outro terminal
cd frontend
npm run dev
```

**Acesse:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

**Dados:** ❌ **Não persistem** (apagados ao parar o servidor)

---

### Comparação das Opções

| Opção | Docker necessário? | Dados persistem? | Ideal para |
|-------|-------------------|------------------|------------|
| **1. Docker Completo** | ✅ Sim | ✅ Sim | Produção, deploy, testes de integração |
| **2. MongoDB Docker + Local** | ✅ Sim (só MongoDB) | ✅ Sim | Desenvolvimento com dados reais |
| **3. MongoDB em Memória** | ❌ Não | ❌ Não | Desenvolvimento rápido, testes unitários |

---

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
