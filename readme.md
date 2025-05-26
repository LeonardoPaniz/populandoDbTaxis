# 🚖 Projeto de População de Dados: Sistema de Táxis

Este projeto é um populador de dados para um sistema de corridas de táxi, utilizando Prisma ORM, PostgreSQL e Faker para gerar dados fictícios.

---

## 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Faker.js](https://fakerjs.dev/)

---

## ✅ Pré-requisitos

Antes de começar, você precisará ter instalado:

- Node.js (v18 ou superior recomendado)
- PostgreSQL rodando localmente
- Git (opcional, para clonar o repositório)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

> **Substitua `seu-usuario/seu-repo` com o caminho correto do repositório.**

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure o banco de dados

Crie um banco de dados PostgreSQL chamado `taxisAtividade` e adicione as informações de conexão no arquivo `.env`:

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5433/taxisAtividade"
```

> Altere `usuario`, `senha` e a porta (`5433`) conforme sua instalação do PostgreSQL.

---

### 4. Gere e aplique a migration

```bash
npx prisma migrate reset
```

Esse comando irá:

- Resetar o banco
- Aplicar as migrations
- Rodar o script de seed automaticamente

---

### 5. (Opcional) Rodar novamente apenas a seed

Caso deseje repopular o banco sem resetar:

```bash
npx prisma generate
npm run prisma:seed
```

---

## 🗃 Estrutura do Projeto

```
.
├── prisma/
│   ├── schema.prisma     # Definição do modelo Prisma
│   ├── seed.ts           # Script para popular o banco
│   └── migrations/       # Migrations do banco
├── src/
│   └── config/db.ts      # Conexão com o Prisma Client
├── .env                  # Variáveis de ambiente (não versionado)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💡 Observações

- O campo `cliid` do cliente é gerado de forma única no script de seed, evitando duplicações.
- O script cria 10.000 clientes, táxis e corridas aleatórias.
- Se quiser reduzir a carga, altere o valor de `totalPopulation` no `prisma/seed.ts`.

---

## 🙋 Dúvidas?

Se tiver qualquer problema, chame no grupo ou abra uma issue no repositório (caso esteja no GitHub).

---
