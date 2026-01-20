# 🚨 Fix Build Error: Run Database Migrations on Vercel

## Problem
The Vercel build is failing because the database tables don't exist yet:
```
The table `public.businesses` does not exist in the current database.
The table `public.categories` does not exist in the current database.
The table `public.listings` does not exist in the current database.
```

## Solution
You need to run Prisma migrations on your Neon database. Follow these steps:

---

## ✅ Step 1: Run Migrations Locally First

Before Vercel, make sure your local database is set up:

```bash
# Navigate to project
cd c:\Users\mosim\OneDrive\Desktop\botswanaserv-main

# Run migrations
npx prisma migrate deploy

# Seed with categories (optional)
pnpm db:seed
```

**Expected output:**
```
Prisma schema loaded from prisma/schema.prisma
✔ Migration `20251029071214_init` applied
✔ Migration `20251112000732_add_subcategory_to_business` applied
✔ Migration `20251119015904_add_multi_branch_support` applied
✔ Migration `20260113015506_add_listing_model` applied
✔ Migration `20260113021722_add_promotion_model` applied
✔ Migration `20260113073709_add_image_to_promotions` applied
```

---

## ✅ Step 2: Verify Migrations Ran Locally

Test that your local database is working:

```bash
# Start dev server
pnpm dev

# Visit http://localhost:3000
# You should see the homepage WITHOUT database errors
```

---

## ✅ Step 3: Deploy to Vercel Again

Push your changes:

```bash
git push origin main
```

Vercel will auto-redeploy. If it still fails with the same database error, proceed to Step 4.

---

## ✅ Step 4: Run Migrations on Vercel (If Still Failing)

After deployment completes, run this to apply migrations to your production Neon database:

### Option A: Via Vercel CLI (Recommended)
```bash
# Pull environment variables from Vercel
vercel env pull

# Run migrations on production database
npx prisma migrate deploy

# Seed categories on production (optional)
pnpm db:seed
```

### Option B: Via Vercel Dashboard Console
1. Go to https://vercel.com/dashboard
2. Select your project: `NamibiaServices`
3. Go to "Deployments" tab
4. Click the latest deployment
5. Go to "Overview" tab
6. Scroll down to find error details

Then check the actual database connection string is correct in Vercel environment variables.

### Option C: Manually Using psql
Connect directly to your Neon database and run migrations:

```bash
# Connect to your Neon database
psql "postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# List tables (should be empty)
\dt

# Exit
\q
```

Then run migrations:
```bash
npx prisma migrate deploy
```

---

## 🔍 Verify Vercel Environment Variables

Make sure these are set in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Check these exist:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   
   DIRECT_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

3. If they're missing, add them:
   - Click "Add New"
   - Name: `DATABASE_URL`
   - Value: `postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`
   - Click "Save"
   
   - Repeat for `DIRECT_URL`

4. Redeploy after adding variables

---

## 📋 Complete Checklist

- [ ] Run `npx prisma migrate deploy` locally
- [ ] Test with `pnpm dev` - no database errors
- [ ] Push to GitHub: `git push origin main`
- [ ] Wait for Vercel build to complete
- [ ] If build succeeds → You're done! ✅
- [ ] If build fails → Check Vercel environment variables
- [ ] Run `vercel env pull && npx prisma migrate deploy`
- [ ] Redeploy from Vercel dashboard
- [ ] Test your deployed app

---

## 🧪 Test After Fix

Once migrations are complete, verify:

1. Visit your Vercel deployment URL
2. Homepage loads without errors ✅
3. Can navigate to `/listings` ✅
4. Can navigate to `/categories` ✅
5. Can access `/login` ✅
6. No console errors in browser DevTools ✅

---

## ⚠️ Common Issues

### Issue: "Still says tables don't exist"
**Fix:** 
1. Verify DATABASE_URL is correct in Vercel
2. Check migrations ran locally first
3. Try: `vercel env pull && npx prisma migrate deploy`

### Issue: "Connection timeout"
**Fix:**
1. Check database is running on Neon
2. Verify connection string has `?sslmode=require`
3. Try running locally first

### Issue: "Already up to date"
**This is fine!** Means migrations already ran. The build should work now.

---

## 🚀 After Migrations Complete

Your app will work with:
- ✅ All database tables created
- ✅ User authentication ready
- ✅ Business listings ready
- ✅ Bookings system ready
- ✅ Admin dashboard ready

---

**Next Step:** Run the migrations, then rebuild on Vercel!

**Status:** 🔧 Fix in progress  
**Action Required:** Run `npx prisma migrate deploy`
