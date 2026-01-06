# 🏦 SuperBank

Uma aplicação bancária moderna construída com Next.js, Material-UI e TypeScript, com arquitetura de microfrontend e design system apartado em um pacote npm. Este repositório se trata da aplicação host com a maioria das funcionalidades, como: login, adicionar e editar transações, visualizar saldo. A aplicação remote trata-se de uma visualização da evolução do saldo em forma de gráfico.

> **📊 Repositório da aplicação remote**: [Microfrontend de gráfico](https://github.com/carollyb/mfe-graphics)

> **📊 Repositório do design system**: [Pacote NPM](https://github.com/carollyb/bank-design-system/pkgs/npm/bank-design-system)

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

### Decisões projetuais

1. Microfrontend: Optou-se por utilizar a injeção da aplicação microfrontend via script, devido às limitações das bibliotecas para suporte a aplicações Next com app router. Foram realizadas duas provas de conceito, uma com aplicação remote Next com app router (incompatível com Module Federation e Single SPA), que foi descartada, e com uma aplicação remote Next com pages router utilizando o Plugin Module Federation, mas que também se provou limitada devido ao host estar em app router. Uma opção também seria migrar a aplicação atual para pages router, mas foi descartada já que o Next pretende seguir com o app router para o futuro. A prova de conceito que se mostrou eficiente como microfrontend mantendo as principais vantagens (código apartado e passar props da aplicação host para remota, evitando chamadas desnecessárias ao backend) foi com uma aplicação remote React com framework Vite, utilizando a injeção no DOM via script.

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun
- Docker e Docker Compose (para rodar com containers)

#### 1. Obter autorização para o pacote bank-design system:

##### 1.1 Gerar token GitHub (PAT):

- Acesse https://github.com/settings/tokens
- Clique em Generate new Token > Generate new token (classic)
- Selecione o scope read:packages
- Copie o token gerado

##### 1.2 Configurar acesso ao registry:

- Defina a variável de ambiente (PowerShell sessão) no terminal na pasta /frontend do projeto:

```bash
$env:NPM_TOKEN="SEU_TOKEN_AQUI"
```

#### 2. Instalar dependências:

```bash
cd frontend
npm install
```

## Executar o projeto

### Opção 1: Docker Completo

Sobe toda a aplicação (MongoDB + Backend + Frontend) em containers.

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

### Opção 2: MongoDB no Docker + Backend/Frontend Local

MongoDB roda em container, backend e frontend rodam localmente.

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

### Opção 3: MongoDB em Memória

Backend usa MongoDB em memória (sem Docker).

#### 1. Instalar dependências:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

#### 2. Configurar variável de ambiente:

Criar arquivo `frontend/.env.local`:

```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### 3. Executar os servidores:

```bash
# Backend (porta 5000)
cd backend
npm start

# Frontend (porta 3000) - em outro terminal
cd frontend
npm run dev
```

**Acesse:**

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

**Dados:** ❌ **Não persistem** (apagados ao parar o servidor)

---

### Opção 4: Frontend com Mock (Sem Backend) 🎭

Frontend roda com dados mockados, sem precisar de backend ou banco de dados. **Usado em produção na Vercel.**

#### 1. Configurar variável de ambiente:

Criar arquivo `frontend/.env.local`:

```env
NEXT_PUBLIC_USE_MOCK=true
```

#### 2. Executar o frontend:

```bash
cd frontend
npm run dev
```

**Acesse:**

- Frontend: [http://localhost:3000](http://localhost:3000)

**Credenciais de teste:**

- Email: `user@test.com`
- Senha: `123456`

**Dados:** 🎭 Mockados em memória (resetados ao recarregar a página)

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

