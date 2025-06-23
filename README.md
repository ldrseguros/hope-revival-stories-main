# Projeto Jardel Borges

## Project info

**URL**: https://lovable.dev/projects/b3b2e22c-bd63-4abe-8332-9346a4f8fc68

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b3b2e22c-bd63-4abe-8332-9346a4f8fc68) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b3b2e22c-bd63-4abe-8332-9346a4f8fc68) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Hope Revival Stories - Backend e Integração

## 1. Crie o arquivo `.env` na raiz do projeto

Crie um arquivo chamado `.env` (no mesmo nível do `package.json`) com o seguinte conteúdo:

```
DATABASE_URL=postgresql://convite-jardel_owner:npg_S6EKJApUM8nN@ep-lingering-boat-ac82mro5-pooler.sa-east-1.aws.neon.tech/convite-jardel?sslmode=require
GOOGLE_DRIVE_FOLDER_ID=1rl8aksO0_A1JwjpOX9EloSzEJNgYdob8
GOOGLE_SERVICE_ACCOUNT=./service-account.json
```

## 2. Instale as dependências necessárias

```
npm install dotenv express multer googleapis pg cors
```

Se for usar Prisma:
```
npm install prisma --save-dev
npm install @prisma/client
```

## 3. Configure o Prisma (opcional, se for usar)

No arquivo `prisma/schema.prisma`, a configuração já está correta:

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Gere o cliente e rode as migrations:
```
npx prisma generate
npx prisma migrate dev --name init
```

## 4. Rode o backend

```
node server.js
```

## 5. Teste o frontend

- Certifique-se de que o backend está rodando em `localhost:3001`.
- O frontend deve enviar os dados para `http://localhost:3001/upload`.

---

Se aparecer qualquer erro de conexão com o banco, confira se o banco Neon está ativo e se a string de conexão está correta no `.env`.

Para mais detalhes, consulte a [documentação oficial do Neon](https://neon.com/docs/manage/platform).
