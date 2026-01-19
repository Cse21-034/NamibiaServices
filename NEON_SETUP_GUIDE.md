# Neon PostgreSQL Setup Guide

## ✅ Your Database is Ready!

You have successfully created a **Neon PostgreSQL** database. This guide explains how to use it with your Namibia Services application.

---

## 📋 Your Connection Details

### Pooled Connection (For Vercel/Serverless)
```
postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```
- **Use for:** Vercel, serverless, or short-lived connections
- **What it is:** PgBouncer connection pooling (recommended for most cases)

### Unpooled Connection (For Long-Running Applications)
```
postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```
- **Use for:** Docker, self-hosted, or persistent connections
- **What it is:** Direct connection to PostgreSQL

### Individual Components
| Component | Value |
|-----------|-------|
| Host (Pooled) | `ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech` |
| Host (Unpooled) | `ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech` |
| User | `neondb_owner` |
| Password | `npg_AfYtS0Pnlkw3` |
| Database | `neondb` |
| Port | `5432` (default) |

---

## 🚀 Setup Instructions

### Step 1: Create .env.local File
Copy the pooled connection string to your `.env.local`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: Run Migrations
Initialize the database schema:

```bash
npx prisma migrate deploy
```

Or for development:

```bash
npx prisma migrate dev
```

### Step 3: Seed Data (Optional)
Populate with categories:

```bash
pnpm db:seed
```

### Step 4: Test Connection
Start your app locally:

```bash
pnpm dev
```

Visit http://localhost:3000 and test:
- [ ] Website loads
- [ ] Login page works
- [ ] Can create a business listing
- [ ] Can upload images

---

## 🌐 Deployment to Vercel

### Step 1: Add Environment Variables to Vercel
In Vercel dashboard → Project Settings → Environment Variables, add:

```
DATABASE_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET = [your-generated-secret]
NEXTAUTH_URL = https://your-domain.vercel.app
```

### Step 2: Deploy
Push to GitHub - Vercel will auto-deploy:

```bash
git push origin main
```

### Step 3: Run Migrations on Vercel
After deployment completes:

```bash
vercel env pull
npx prisma migrate deploy
```

Or use Vercel CLI:

```bash
vercel deploy --prod
```

---

## 🔄 Alternative Connection Formats

Your Neon credentials work with multiple formats:

### For Prisma (Already configured)
```env
DATABASE_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### For psql CLI
```bash
psql "postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### For DBeaver / GUI Tools
| Setting | Value |
|---------|-------|
| Database Type | PostgreSQL |
| Host | `ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech` |
| Port | `5432` |
| Database | `neondb` |
| Username | `neondb_owner` |
| Password | `npg_AfYtS0Pnlkw3` |
| SSL Mode | `require` |

---

## ⚙️ Prisma Configuration

Your `prisma/schema.prisma` is already configured correctly:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")        # Pooled (Vercel)
  directUrl = env("DIRECT_URL")         # Unpooled (local dev)
}
```

**How it works:**
- `DATABASE_URL` - Used for Vercel deployments (pooled)
- `DIRECT_URL` - Used for local development and migrations (unpooled)

---

## 🧪 Test Your Connection

### Option 1: Via Prisma
```bash
npx prisma db execute --stdin
```

Then type SQL:
```sql
SELECT NOW();
```

### Option 2: Via psql
```bash
psql "postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

Then:
```sql
\dt  -- List tables
\q  -- Quit
```

### Option 3: In Your App
The app automatically tests the connection when you run:
```bash
pnpm dev
```

If there are any issues, you'll see error messages in the terminal.

---

## 🔐 Security Notes

### ⚠️ Important: Your credentials are visible in this guide!

Since you've shared them here, **you should rotate them immediately**:

1. Go to https://console.neon.tech
2. Select your database
3. Go to Settings → Change Password
4. Update all `.env` files with new password
5. Redeploy to Vercel with new password

### Best Practices
- ✅ Never commit `.env.local` to git (should be in `.gitignore`)
- ✅ Use different passwords for dev and prod
- ✅ Rotate passwords every 90 days
- ✅ Enable backups in Neon dashboard
- ✅ Monitor database usage in Neon console

---

## 📊 Monitoring Your Database

### Via Neon Dashboard
1. Visit https://console.neon.tech
2. Select your project: `neondb`
3. View:
   - Connection count
   - Query performance
   - Storage usage
   - Backup history

### Via Your App
Monitor from the Vercel dashboard:
1. Go to Vercel → Your Project
2. Check Deployments → Logs
3. Look for database-related messages

---

## ❌ Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Connection refused" | DATABASE_URL not set | Add to .env.local |
| "SSL certificate error" | Missing `?sslmode=require` | Use full URL with SSL parameter |
| "Too many connections" | Connection pool exhausted | Use pooled URL for Vercel |
| "Migration timeout" | Network issue | Retry with `npx prisma migrate deploy` |
| "Cannot find table" | Migrations not run | Run `npx prisma migrate deploy` |

---

## 📈 Performance Tips

### Connection Pooling
- **Vercel:** Always use pooled connection (default `DATABASE_URL`)
- **Local Dev:** Always use unpooled connection (`DIRECT_URL`)
- **Docker:** Use unpooled for persistent connections

### Query Performance
- Enable Neon's query insights in dashboard
- Monitor slow queries
- Add indexes for frequently filtered columns

### Backup Strategy
Neon automatically backs up every hour. You can:
1. View backups in Neon dashboard
2. Restore to a specific point in time
3. Export data for backups

---

## 🆘 Need Help?

### Resources
- **Neon Docs:** https://neon.tech/docs
- **Prisma Docs:** https://prisma.io/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs

### Support
- **Neon Support:** https://console.neon.tech/app/projects (in-app chat)
- **Community:** Neon Discord https://discord.gg/neon

---

## ✅ Setup Checklist

- [ ] Created Neon database
- [ ] Copied DATABASE_URL to .env.local
- [ ] Copied DIRECT_URL to .env.local
- [ ] Ran `npx prisma migrate deploy`
- [ ] Tested locally with `pnpm dev`
- [ ] Added environment variables to Vercel
- [ ] Deployed to Vercel
- [ ] Ran migrations on Vercel
- [ ] Tested deployed app
- [ ] Rotated password (since shared here)
- [ ] Enabled backups in Neon

---

**Last Updated:** January 19, 2026  
**Database:** Neon PostgreSQL (managed)  
**Status:** ✅ Ready for Production
