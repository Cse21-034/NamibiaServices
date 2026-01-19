# Namibia Services - Deployment Checklist with Neon

## ✅ Pre-Deployment Setup

### Database (Neon PostgreSQL)
- [x] Neon database created (`neondb`)
- [x] Connection strings generated
- [x] Credentials obtained:
  - Pool: `ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech`
  - Direct: `ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech`
  - User: `neondb_owner`
  - Password: `npg_AfYtS0Pnlkw3`

### Code Repository
- [x] Namibia Services code migrated from Botswana Services
- [x] All imports updated (BOTSWANA_LOCATIONS → NAMIBIA_LOCATIONS)
- [x] Code pushed to GitHub: `https://github.com/Cse21-034/NamibiaServices`
- [x] Latest commit: Import fixes applied

### Redis (Upstash)
- [x] Redis instance created
- [x] Credentials obtained:
  - URL: `https://cuddly-kodiak-12970.upstash.io`
  - Token: `ATKqAAIncDIxOWQzY2Y1MmRjNmQ0YmI4ODMyMmRjZjc3NzMzNTljMHAyMTI5NzA`

---

## 🚀 LOCAL SETUP (Before Deployment)

### Step 1: Create .env.local
```bash
# Copy this to .env.local in project root
DATABASE_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
UPSTASH_REDIS_REST_URL=https://cuddly-kodiak-12970.upstash.io
UPSTASH_REDIS_REST_TOKEN=ATKqAAIncDIxOWQzY2Y1MmRjNmQ0YmI4ODMyMmRjZjc3NzMzNTljMHAyMTI5NzA
```

### Step 2: Install Dependencies
```bash
pnpm install
```

### Step 3: Run Database Migrations
```bash
npx prisma migrate deploy
```

### Step 4: Seed Categories (Optional)
```bash
pnpm db:seed
```

### Step 5: Test Locally
```bash
pnpm dev
```

Then visit: http://localhost:3000

**Test these features:**
- [ ] Website loads without errors
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] Can access /login page
- [ ] Can access admin dashboard

---

## 🌐 VERCEL DEPLOYMENT

### Step 1: Connect GitHub to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Choose `https://github.com/Cse21-034/NamibiaServices`
5. Click "Import"

### Step 2: Add Environment Variables
In Vercel dashboard, add these variables:

#### Database
```
DATABASE_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

#### Authentication
```
NEXTAUTH_SECRET = [Generate with: openssl rand -base64 32]
NEXTAUTH_URL = https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

#### Redis (Rate Limiting)
```
UPSTASH_REDIS_REST_URL = https://cuddly-kodiak-12970.upstash.io
UPSTASH_REDIS_REST_TOKEN = ATKqAAIncDIxOWQzY2Y1MmRjNmQ0YmI4ODMyMmRjZjc3NzMzNTljMHAyMTI5NzA
```

#### Optional (OAuth, Email, Images)
```
GOOGLE_ID = [from Google Cloud Console]
GOOGLE_SECRET = [from Google Cloud Console]
RESEND_API_KEY = [from Resend]
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = [from Cloudinary]
CLOUDINARY_API_KEY = [from Cloudinary]
CLOUDINARY_API_SECRET = [from Cloudinary]
```

### Step 3: Deploy
Click "Deploy" button in Vercel

**Expected build time:** 2-5 minutes

### Step 4: Verify Deployment
Wait for build to complete, then:
1. Click "Visit" to open deployed site
2. Check that it loads correctly
3. Verify no build errors in logs

### Step 5: Run Database Migrations on Vercel
```bash
# Option A: Via Vercel CLI
vercel env pull
npx prisma migrate deploy

# Option B: Manual in Vercel
# 1. Go to Vercel Dashboard
# 2. Select your project
# 3. Go to "Deployments" tab
# 4. Click latest deployment
# 5. Go to "Logs" tab
# 6. Check for any database errors
```

---

## 🧪 POST-DEPLOYMENT TESTING

### Critical Tests
- [ ] Website loads: `https://your-domain.vercel.app`
- [ ] Homepage displays without errors
- [ ] Navigation menu works
- [ ] Search functionality works
- [ ] Can access `/login` page
- [ ] Can access admin dashboard

### Feature Tests
- [ ] User registration works
- [ ] User login works
- [ ] Password reset works (if Resend configured)
- [ ] Can create a business listing
- [ ] Can upload business images (if Cloudinary configured)
- [ ] Can search businesses by location
- [ ] Can view business details
- [ ] Rate limiting works (Redis)

### Performance Tests
- [ ] Homepage loads in < 3 seconds
- [ ] Search results appear in < 2 seconds
- [ ] Images load quickly
- [ ] No console errors

---

## 📦 OPTIONAL: Add OAuth (Google/Facebook Login)

### Google OAuth Setup
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials (Web application)
5. Set redirect URL: `https://your-domain.vercel.app/api/auth/callback/google`
6. Copy Client ID and Secret
7. Add to Vercel environment variables:
   ```
   GOOGLE_ID = [your-client-id]
   GOOGLE_SECRET = [your-client-secret]
   ```

### Facebook OAuth Setup
1. Go to https://developers.facebook.com
2. Create app
3. Add "Facebook Login" product
4. Set redirect URL: `https://your-domain.vercel.app/api/auth/callback/facebook`
5. Copy App ID and App Secret
6. Add to Vercel environment variables:
   ```
   FACEBOOK_ID = [your-app-id]
   FACEBOOK_SECRET = [your-app-secret]
   ```

---

## 📧 OPTIONAL: Setup Email Service (Resend)

1. Go to https://resend.com
2. Sign up / log in
3. Create API key
4. Add to Vercel:
   ```
   RESEND_API_KEY = [your-api-key]
   ```

**Emails sent automatically for:**
- User registration confirmations
- Password resets
- Booking confirmations
- Business notifications

---

## 🖼️ OPTIONAL: Setup Image Hosting (Cloudinary)

1. Go to https://cloudinary.com
2. Sign up / log in
3. Copy credentials from dashboard
4. Add to Vercel:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = [your-cloud-name]
   CLOUDINARY_API_KEY = [your-api-key]
   CLOUDINARY_API_SECRET = [your-api-secret]
   ```

**Used for:**
- Business profile images
- Listing photos
- User avatars

---

## 🔄 CUSTOM DOMAIN SETUP

### Step 1: Purchase Domain
Buy a domain from GoDaddy, Namecheap, etc.

### Step 2: Configure in Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add custom domain
5. Follow DNS configuration steps

### Step 3: Update Environment Variables
Update these in Vercel for your custom domain:
```
NEXTAUTH_URL = https://your-custom-domain.com
NEXT_PUBLIC_APP_URL = https://your-custom-domain.com
```

### Step 4: Redeploy
Vercel will auto-generate SSL certificate (free with Let's Encrypt)

---

## 🛡️ SECURITY CHECKLIST

### Credentials
- [ ] NEXTAUTH_SECRET is 32+ characters (generated with `openssl rand -base64 32`)
- [ ] Database password is strong and unique
- [ ] Never commit `.env.local` to git
- [ ] `.env.local` is in `.gitignore`
- [ ] API keys are stored securely in Vercel, not in code

### Database
- [ ] Backups enabled in Neon dashboard
- [ ] SSL connections enabled (already configured)
- [ ] Connection limits set appropriately

### Application
- [ ] HTTPS enabled (Vercel provides free SSL)
- [ ] Security headers configured
- [ ] Rate limiting enabled (Upstash Redis)
- [ ] Input validation enabled
- [ ] SQL injection protection (Prisma ORM)

---

## 📈 MONITORING & MAINTENANCE

### Weekly
- [ ] Check Vercel deployment logs for errors
- [ ] Monitor Neon database usage
- [ ] Check error tracking if available

### Monthly
- [ ] Review database backups
- [ ] Check Redis cache performance
- [ ] Monitor storage usage

### Quarterly
- [ ] Update dependencies: `pnpm update`
- [ ] Rotate passwords
- [ ] Review security settings

---

## 🚨 TROUBLESHOOTING

### Build Fails
```
Error: Command "pnpm run build" failed
Solution: Push latest code, clear Vercel cache, retry
```

### Database Connection Error
```
Error: Cannot connect to DATABASE_URL
Solution: Verify DATABASE_URL is correct in Vercel, restart deployment
```

### Migrations Fail
```
Error: Migration failed
Solution: Check database is running, verify connection string, retry with npx prisma migrate deploy
```

### Environment Variables Not Loading
```
Error: NEXTAUTH_SECRET is undefined
Solution: Verify variables in Vercel dashboard, redeploy after adding
```

---

## ✅ DEPLOYMENT COMPLETE!

When you see all tests passing:

1. **You're live!** 🎉
2. Share your URL: `https://your-domain.vercel.app`
3. Start accepting business listings
4. Monitor performance
5. Scale as needed

---

## 📞 SUPPORT

**For issues:**
- Vercel docs: https://vercel.com/docs
- Neon docs: https://neon.tech/docs
- Prisma docs: https://prisma.io/docs
- Next.js docs: https://nextjs.org/docs

**Contact:**
- Vercel Support: https://vercel.com/support
- Neon Support: https://console.neon.tech (in-app chat)

---

**Status:** Ready for Production Deployment  
**Database:** ✅ Neon PostgreSQL  
**Redis:** ✅ Upstash  
**Repository:** ✅ GitHub  
**Last Updated:** January 19, 2026
