# Namibia Services - DEPLOYMENT QUICK REFERENCE

## 🗄️ DATABASE

**Type:** PostgreSQL  
**Required:** Yes (Core database for all data)

**Supported Hosting:**
- Vercel PostgreSQL
- AWS RDS
- Heroku PostgreSQL
- DigitalOcean Managed Databases
- Self-hosted PostgreSQL
- Railway
- Render
- PlanetScale (MySQL alternative)

---

## 🔑 REQUIRED VARIABLES (Minimum to Work)

```env
# Database (REQUIRED)
DATABASE_URL=postgresql://user:pass@host:5432/namibia_services
DIRECT_URL=postgresql://user:pass@host:5432/namibia_services

# Authentication (REQUIRED)
NEXTAUTH_SECRET=your-32-character-secret-here
NEXTAUTH_URL=http://localhost:3000 (dev) or https://your-domain.com (prod)
```

**⚠️ Without these: App will NOT work**

---

## 🎯 RECOMMENDED VARIABLES (For Full Features)

```env
# OAuth (enables social login)
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret

FACEBOOK_ID=your-facebook-id
FACEBOOK_SECRET=your-facebook-secret

# Email (sends notifications & verification)
RESEND_API_KEY=your-resend-api-key

# Images (uploads business/listing photos)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=namibia-services

# Rate Limiting (prevents abuse)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

---

## 🚀 EASIEST DEPLOYMENT (5 Minutes)

### Vercel + GitHub

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import repository from GitHub
# 4. Add environment variables
# 5. Click Deploy
# 6. Run: vercel env pull && npx prisma migrate deploy

Done! ✅
```

---

## 💰 COST BREAKDOWN (Per Month)

| Component | Free Tier | Paid Tier |
|-----------|-----------|-----------|
| Hosting (Vercel) | ✅ Free | $20-100 |
| Database (PostgreSQL) | ✅ Free | $15-100 |
| Email (Resend) | ✅ 100/month | $20/1000 |
| Image Storage (Cloudinary) | ✅ 25GB | $99/100GB |
| Redis (Upstash) | ✅ 10,000 ops | $7-50 |
| **TOTAL** | **✅ FREE** | **~$60-200** |

---

## 📊 FULL ENVIRONMENT VARIABLES NEEDED

### A. CORE (Required)
```
DATABASE_URL ..................... PostgreSQL connection
DIRECT_URL ....................... PostgreSQL direct connection
NEXTAUTH_SECRET .................. 32-char random string
NEXTAUTH_URL ..................... Your domain or localhost:3000
```

### B. AUTHENTICATION (Recommended)
```
GOOGLE_ID ........................ From Google Cloud Console
GOOGLE_SECRET ................... From Google Cloud Console
FACEBOOK_ID ..................... From Facebook Developers
FACEBOOK_SECRET ................. From Facebook Developers
```

### C. EMAIL (Recommended)
```
RESEND_API_KEY .................. From Resend.com
```

### D. IMAGES (Optional)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  From Cloudinary
CLOUDINARY_API_KEY .............. From Cloudinary
CLOUDINARY_API_SECRET ........... From Cloudinary
CLOUDINARY_FOLDER ............... Folder name (namibia-services)
```

### E. RATE LIMITING (Optional)
```
UPSTASH_REDIS_REST_URL .......... From Upstash.com
UPSTASH_REDIS_REST_TOKEN ........ From Upstash.com
```

### F. BACKEND (Optional)
```
NEXT_PUBLIC_SUPABASE_URL ........ From Supabase.com
NEXT_PUBLIC_SUPABASE_ANON_KEY ... From Supabase.com
```

---

## 🎬 QUICK START GUIDE

### For Development
```bash
# 1. Install
pnpm install

# 2. Setup database
npx prisma migrate dev

# 3. Create .env.local
DATABASE_URL=postgresql://localhost/namibia_services
NEXTAUTH_SECRET=dev-secret-123
NEXTAUTH_URL=http://localhost:3000

# 4. Run
pnpm dev

# Visit http://localhost:3000
```

### For Production (Vercel)
```bash
# 1. Push to GitHub
git push origin main

# 2. Create Vercel account at vercel.com

# 3. Import project from GitHub

# 4. Add environment variables in Vercel dashboard

# 5. Deploy (automatic)

# 6. Run migrations
vercel env pull
npx prisma migrate deploy
```

---

## 📋 WHERE TO GET CREDENTIALS

| Service | Where | URL |
|---------|-------|-----|
| PostgreSQL | Vercel/AWS/Railway | Various |
| Google OAuth | Google Cloud Console | console.cloud.google.com |
| Facebook OAuth | Facebook Developers | developers.facebook.com |
| Email (Resend) | Resend | resend.com |
| Images (Cloudinary) | Cloudinary | cloudinary.com |
| Redis (Upstash) | Upstash | upstash.com |
| Database Hosting | Vercel/AWS/Railway | Various |

---

## ⚡ DEPLOYMENT OPTIONS RANKED

### ⭐⭐⭐⭐⭐ BEST FOR BEGINNERS
**Vercel + Vercel PostgreSQL**
- Setup: 5 minutes
- Cost: Free tier available
- Scaling: Automatic
- Maintenance: None
- Recommended: YES ✅

### ⭐⭐⭐⭐ BEST FOR FLEXIBILITY
**Railway**
- Setup: 5 minutes
- Cost: $5/month minimum
- Scaling: Manual but easy
- Maintenance: Minimal
- Recommended: YES ✅

### ⭐⭐⭐⭐ BEST FOR CONTROL
**AWS (EC2 + RDS)**
- Setup: 30 minutes
- Cost: $10-50/month
- Scaling: Full control
- Maintenance: You manage it
- Recommended: For advanced users

### ⭐⭐⭐ BEST FOR LEARNING
**Heroku**
- Setup: 10 minutes
- Cost: $7/month minimum
- Scaling: Limited
- Maintenance: Minimal
- Recommended: For learning

---

## 🔐 ENVIRONMENT SECURITY TIPS

```bash
# ✅ DO:
- Generate secure NEXTAUTH_SECRET: openssl rand -base64 32
- Use different secrets for dev/prod
- Keep .env.local in .gitignore
- Rotate secrets annually
- Use environment management tools

# ❌ DON'T:
- Commit .env files to git
- Share secrets in messages/emails
- Use same secret everywhere
- Use weak passwords
- Store plaintext credentials
```

---

## 🧪 VERIFY DEPLOYMENT

```bash
# Check 1: Website loads
curl https://your-domain.com

# Check 2: Database connection
npx prisma db push

# Check 3: Authentication
# Try login at /login

# Check 4: Functionality
# Create a test business
# Upload images
# Place a booking

# Check 5: Logs
heroku logs --tail
# or
vercel logs
```

---

## 🆘 MOST COMMON ISSUES & FIXES

| Issue | Cause | Fix |
|-------|-------|-----|
| "DATABASE_URL not found" | Missing env var | Add to .env.local |
| "Connection timeout" | DB not accessible | Check firewall/URL |
| "Build fails" | Dependencies issue | `pnpm install` again |
| "OAuth fails" | Wrong credentials | Verify redirect URLs |
| "Emails not sending" | No API key | Add RESEND_API_KEY |

---

## 📞 SUPPORT RESOURCES

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://prisma.io/docs
- **Railway Help:** https://docs.railway.app
- **NextAuth Docs:** https://next-auth.js.org/getting-started/introduction

---

## 📦 DEPLOYMENT CHECKLIST

- [ ] PostgreSQL database created
- [ ] All required variables configured
- [ ] Database migrations run
- [ ] Optional services set up (Google OAuth, Resend, etc.)
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] First user account tested
- [ ] Email sending tested
- [ ] Images uploading tested
- [ ] Bookings working tested
- [ ] Admin dashboard accessible
- [ ] Backups configured

---

## 🎉 YOU'RE READY!

**Follow these steps:**

1. **Pick a platform** (Vercel recommended)
2. **Prepare your database** (PostgreSQL)
3. **Gather credentials** (Google, Email service, etc.)
4. **Deploy** (Push code)
5. **Configure variables** (In platform dashboard)
6. **Run migrations** (Database setup)
7. **Test everything** (Login, bookings, etc.)
8. **Go live** 🚀

---

**Questions?** Check DEPLOYMENT_GUIDE.md or DEPLOY_INSTRUCTIONS.md

**Last Updated:** January 16, 2026
