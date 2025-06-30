# 🚀 Guia de Deploy Rápido

## Opção 1: Vercel (Recomendado - 5 minutos)

### Passo 1: Prepare o projeto
```bash
npm run build
```

### Passo 2: Deploy via GitHub
1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe seu repositório do GitHub
5. Configure as variáveis de ambiente:
   - `DATABASE_URL` - URL do seu banco PostgreSQL
   - `GOOGLE_DRIVE_CLIENT_ID` - ID do cliente Google Drive
   - `GOOGLE_DRIVE_CLIENT_SECRET` - Secret do Google Drive
   - `GOOGLE_DRIVE_REDIRECT_URI` - URI de redirecionamento

### Passo 3: Deploy
O Vercel detectará automaticamente a configuração e fará o deploy!

## Opção 2: Netlify (Alternativa)

1. Faça push para GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Clique em "New site from Git"
4. Configure as variáveis de ambiente
5. Deploy automático!

## Opção 3: Render (Com banco de dados)

1. Acesse [render.com](https://render.com)
2. Crie um novo Web Service
3. Conecte com GitHub
4. Configure as variáveis de ambiente
5. Deploy!

## Variáveis de Ambiente Necessárias

```env
DATABASE_URL=postgresql://username:password@host:port/database
GOOGLE_DRIVE_CLIENT_ID=your_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret
GOOGLE_DRIVE_REDIRECT_URI=your_redirect_uri
NODE_ENV=production
```

## Banco de Dados

Para o banco PostgreSQL, você pode usar:
- **Supabase** (gratuito)
- **Neon** (gratuito)
- **Railway** (gratuito)
- **Render** (gratuito)

## Status do Deploy

✅ Build configurado
✅ Vercel configurado
✅ Netlify configurado
✅ Server.js configurado
✅ Prisma configurado

**Próximo passo:** Escolha uma plataforma e faça o deploy! 