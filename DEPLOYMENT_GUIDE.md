# Namibia Services - Deployment Guide

## 📊 Database Setup

**Database Type:** PostgreSQL

### Database Configuration
```
Provider: PostgreSQL
URL Format: postgresql://username:password@host:port/database_name
```

---

## 🔑 Required Environment Variables

### Core Database Variables
```env
# PostgreSQL Connection (Required)
DATABASE_URL=postgresql://user:password@localhost:5432/namibia_services
DIRECT_URL=postgresql://user:password@localhost:5432/namibia_services
```

### Authentication (NextAuth.js)
```env
# NextAuth Configuration (Required)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### OAuth Providers (Optional but Recommended)
```env
# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Facebook OAuth  
FACEBOOK_ID=your-facebook-app-id
FACEBOOK_SECRET=your-facebook-app-secret
```

### Email Service (Resend)
```env
# Resend Email Service API
RESEND_API_KEY=re_your_api_key_here
```

### Image Storage (Cloudinary)
```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=namibia-services
```

### Redis (Rate Limiting)
```env
# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Supabase (Optional Backend Services)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📋 Complete Environment File Template

Create `.env.local` file in the root directory:

```env
# ========== DATABASE ==========
DATABASE_URL=postgresql://user:password@db-host:5432/namibia_services
DIRECT_URL=postgresql://user:password@db-host:5432/namibia_services

# ========== NEXTAUTH ==========
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://namibiaservices.com
NEXT_PUBLIC_APP_URL=https://namibiaservices.com

# ========== OAUTH PROVIDERS ==========
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

FACEBOOK_ID=your-facebook-app-id
FACEBOOK_SECRET=your-facebook-app-secret

# ========== EMAIL SERVICE ==========
RESEND_API_KEY=re_your_resend_api_key

# ========== IMAGE STORAGE ==========
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_FOLDER=namibia-services

# ========== REDIS (RATE LIMITING) ==========
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# ========== OPTIONAL: SUPABASE ==========
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🚀 Deployment Platforms

### **Option 1: Vercel (Recommended for Next.js)**

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial Namibia Services migration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables in project settings
   - Deploy (automatic)

3. **Database Setup**
   - Create PostgreSQL database on Vercel PostgreSQL or external provider
   - Add connection string to environment variables

4. **Run Migrations**
   ```bash
   # On Vercel CLI
   vercel env pull
   npx prisma migrate deploy
   ```

### **Option 2: Docker + Self-Hosted**

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

# Build
RUN pnpm build

# Prisma setup
RUN pnpm prisma generate
RUN pnpm prisma migrate deploy

EXPOSE 3000
CMD ["pnpm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: namibia_services
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_secure_password
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    environment:
      DATABASE_URL: postgresql://postgres:your_secure_password@db:5432/namibia_services
      DIRECT_URL: postgresql://postgres:your_secure_password@db:5432/namibia_services
      NEXTAUTH_SECRET: your-generated-secret
      NEXTAUTH_URL: https://your-domain.com
    ports:
      - "3000:3000"
    depends_on:
      - db

volumes:
  db_data:
```

### **Option 3: AWS**

**Using EC2 + RDS:**

1. **Create RDS PostgreSQL Instance**
   - Engine: PostgreSQL 15
   - Allocated storage: 20GB minimum
   - Multi-AZ: Yes (for production)

2. **Create EC2 Instance**
   - OS: Ubuntu 22.04 LTS
   - Instance type: t3.medium (minimum for production)
   - Security group: Allow port 3000 & 5432

3. **Deploy Application**
   ```bash
   # On EC2
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   npm install -g pnpm
   
   # Clone repository
   git clone your-repo-url
   cd namibia-services
   pnpm install
   
   # Setup environment
   cp .env.example .env.local
   # Edit .env.local with RDS credentials
   
   # Database migration
   npx prisma migrate deploy
   
   # Build & Start
   pnpm build
   pnpm start
   ```

### **Option 4: Heroku**

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create App**
   ```bash
   heroku create namibia-services
   ```

3. **Add PostgreSQL Add-on**
   ```bash
   heroku addons:create heroku-postgresql:standard-0
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NEXTAUTH_SECRET=your-secret
   heroku config:set NEXTAUTH_URL=https://namibia-services.herokuapp.com
   heroku config:set GOOGLE_ID=your-id
   heroku config:set GOOGLE_SECRET=your-secret
   # ... add other variables
   ```

5. **Deploy**
   ```bash
   git push heroku main
   heroku run npx prisma migrate deploy
   ```

---

## 🗄️ Database Migration Steps

### Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma client
npx prisma generate

# 3. Create migration (first time)
npx prisma migrate dev --name init

# 4. Seed database (optional)
pnpm db:seed

# 5. View database
npx prisma studio
```

### Production

```bash
# 1. Run pending migrations
npx prisma migrate deploy

# 2. Verify schema
npx prisma db push

# 3. (Optional) Create backup
pg_dump database_url > backup.sql
```

---

## 📦 Build & Deploy Commands

### Development
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# Visit http://localhost:3000
```

### Production Build
```bash
# Build application
pnpm build

# Start production server
pnpm start
```

### Linting
```bash
pnpm lint
```

---

## ✅ Pre-Deployment Checklist

- [ ] PostgreSQL database created and accessible
- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] OAuth credentials obtained (Google, Facebook)
- [ ] Email service (Resend) API key obtained
- [ ] Image storage (Cloudinary) account setup
- [ ] Domain configured with SSL certificate
- [ ] NEXTAUTH_SECRET generated securely
- [ ] Redis cache configured (optional)
- [ ] Email templates tested
- [ ] Social media links updated
- [ ] Logo images replaced
- [ ] Contact information verified

---

## 🔍 Database Credentials Setup

### PostgreSQL on Different Platforms

**Local PostgreSQL:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/namibia_services
DIRECT_URL=postgresql://postgres:password@localhost:5432/namibia_services
```

**Heroku PostgreSQL:**
```env
DATABASE_URL=postgres://xxxxx:password@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com:5432/xxxxx
DIRECT_URL=postgres://xxxxx:password@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com:5432/xxxxx
```

**AWS RDS:**
```env
DATABASE_URL=postgresql://admin:password@namibia-db.xxxxx.us-east-1.rds.amazonaws.com:5432/namibia_services
DIRECT_URL=postgresql://admin:password@namibia-db.xxxxx.us-east-1.rds.amazonaws.com:5432/namibia_services
```

**Vercel PostgreSQL:**
```env
DATABASE_URL=postgres://default:password@xxx.postgres.vercel-storage.com:5432/verceldb
DIRECT_URL=postgres://default:password@xxx.postgres.vercel-storage.com:5432/verceldb
```

---

## 🚨 Common Issues & Fixes

### Issue: "No DATABASE_URL provided"
```bash
# Solution: Ensure .env.local exists and contains DATABASE_URL
echo "DATABASE_URL=your_url" >> .env.local
```

### Issue: "Connection timeout"
```bash
# Solution: Check firewall/security groups allow port 5432
# Or ensure database URL is correct
```

### Issue: "Prisma migration fails"
```bash
# Solution: Reset database and re-migrate
npx prisma migrate reset
npx prisma migrate deploy
```

### Issue: "NextAuth fails"
```bash
# Solution: Regenerate NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## 📚 Resource Links

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **NextAuth.js Docs:** https://next-auth.js.org
- **Vercel Deployment:** https://vercel.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs

---

## 💡 Quick Start for Vercel

```bash
# 1. Build locally
pnpm build

# 2. Push to GitHub
git push origin main

# 3. Connect repository to Vercel
# - Go to vercel.com
# - Click "New Project"
# - Import from GitHub

# 4. Add environment variables in Vercel dashboard

# 5. Deploy (automatic)

# 6. Run migrations
vercel env pull
npx prisma migrate deploy
```

---

**Last Updated:** January 16, 2026
**Version:** Namibia Services v1.0
