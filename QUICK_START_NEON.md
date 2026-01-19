# 🚀 Quick Start - Deploy Namibia Services with Neon

## 5-Minute Quick Deploy

### Step 1: Create .env.local (2 minutes)
Save this in your project root as `.env.local`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET=dev-secret-123-change-in-production
NEXTAUTH_URL=http://localhost:3000
UPSTASH_REDIS_REST_URL=https://cuddly-kodiak-12970.upstash.io
UPSTASH_REDIS_REST_TOKEN=ATKqAAIncDIxOWQzY2Y1MmRjNmQ0YmI4ODMyMmRjZjc3NzMzNTljMHAyMTI5NzA
```

### Step 2: Initialize Database (2 minutes)
```bash
pnpm install
npx prisma migrate deploy
```

### Step 3: Run Locally (1 minute)
```bash
pnpm dev
```

Visit: http://localhost:3000 ✅

---

## Deploy to Vercel (Additional 5 minutes)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to https://vercel.com/dashboard**

3. **Click "Add New Project"**
   - Select repository: `NamibiaServices`
   - Click Import

4. **Add Environment Variables**
   In Vercel Settings → Environment Variables, add:
   
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   DIRECT_URL = postgresql://neondb_owner:npg_AfYtS0Pnlkw3@ep-morning-bread-ahjj7qjj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   NEXTAUTH_SECRET = [generate new: openssl rand -base64 32]
   NEXTAUTH_URL = https://your-domain.vercel.app
   UPSTASH_REDIS_REST_URL = https://cuddly-kodiak-12970.upstash.io
   UPSTASH_REDIS_REST_TOKEN = ATKqAAIncDIxOWQzY2Y1MmRjNmQ0YmI4ODMyMmRjZjc3NzMzNTljMHAyMTI5NzA
   ```

5. **Click "Deploy"**
   - Wait 2-5 minutes for build
   - Click "Visit" when ready

6. **Run Migrations on Vercel**
   ```bash
   vercel env pull
   npx prisma migrate deploy
   ```

7. **Done!** 🎉
   Your app is live at: `https://your-domain.vercel.app`

---

## What's Included

✅ Namibia Services (migrated from Botswana Services)  
✅ Neon PostgreSQL database (connected)  
✅ NextAuth.js authentication  
✅ Upstash Redis (rate limiting)  
✅ Cloudinary integration (images - optional)  
✅ Resend email service (optional)  

---

## Next Steps

1. **Test locally** - Make sure everything works
2. **Deploy to Vercel** - Use the 5-minute steps above
3. **Optional: Add features**
   - Google OAuth
   - Facebook OAuth
   - Email notifications
   - Image uploads

---

## Troubleshooting

**"Connection refused"?**
- Verify DATABASE_URL and DIRECT_URL in .env.local
- Make sure `.env.local` is in project root

**"Build fails on Vercel"?**
- Check Vercel logs for error details
- Verify all env variables are added
- Try redeploying

**"Database not initialized"?**
- Run: `npx prisma migrate deploy` locally first
- Then run it again on Vercel after deployment

---

## Documentation Files

For more detailed info, see:
- `NEON_SETUP_GUIDE.md` - Complete Neon PostgreSQL guide
- `DEPLOYMENT_CHECKLIST_NEON.md` - Full deployment checklist
- `DEPLOYMENT_GUIDE.md` - General deployment guide
- `DEPLOY_INSTRUCTIONS.md` - Platform-specific instructions

---

**Status:** ✅ Ready to Deploy  
**Database:** ✅ Neon PostgreSQL  
**Hosting:** Vercel (recommended)
