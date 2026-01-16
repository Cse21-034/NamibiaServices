# Namibia Services - STEP-BY-STEP DEPLOYMENT

## 📦 PLATFORM-SPECIFIC GUIDES

---

## 🟦 VERCEL (Recommended - Easiest)

### Step 1: Prepare GitHub Repository
```bash
cd namibia-services
git init
git add .
git commit -m "Namibia Services v1.0"
git remote add origin https://github.com/yourusername/namibia-services.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Environment Variables
1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add each variable from `.env.production`:

```
DATABASE_URL = postgresql://user:pass@host:5432/db
DIRECT_URL = postgresql://user:pass@host:5432/db
NEXTAUTH_SECRET = [generated secret]
NEXTAUTH_URL = https://your-vercel-url.vercel.app
GOOGLE_ID = [from Google Cloud]
GOOGLE_SECRET = [from Google Cloud]
[... add other variables ...]
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build completion (~3-5 minutes)
3. Visit your deployed site

### Step 5: Run Database Migrations
```bash
# Connect via Vercel CLI
vercel env pull

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### Step 6: Verify Deployment
- Visit your live URL
- Test login functionality
- Check database connectivity
- Test email functionality

---

## 🐳 DOCKER + AWS EC2 (Advanced)

### Step 1: Create AWS EC2 Instance
1. Go to AWS Console → EC2
2. Launch instance:
   - OS: Ubuntu 22.04 LTS
   - Instance type: t3.medium
   - Storage: 30GB
   - Security group: Allow 80, 443, 3000

### Step 2: Create AWS RDS PostgreSQL
1. Go to RDS Console
2. Create database:
   - Engine: PostgreSQL 15
   - DB name: namibia_services
   - Username: postgres
   - Password: [strong password]
   - Publicly accessible: Yes (for now)

### Step 3: SSH into EC2 Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 4: Install Docker
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
newgrp docker
```

### Step 5: Clone Repository
```bash
git clone https://github.com/yourusername/namibia-services.git
cd namibia-services
```

### Step 6: Create .env.local
```bash
cat > .env.local << EOF
DATABASE_URL=postgresql://postgres:password@rds-endpoint:5432/namibia_services
DIRECT_URL=postgresql://postgres:password@rds-endpoint:5432/namibia_services
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://your-ec2-ip:3000
GOOGLE_ID=your-id
GOOGLE_SECRET=your-secret
[... add other variables ...]
EOF
```

### Step 7: Build and Run with Docker
```bash
docker build -t namibia-services .
docker run -d -p 3000:3000 --env-file .env.local namibia-services
```

### Step 8: Setup Nginx Reverse Proxy (Optional)
```bash
sudo apt install nginx -y
sudo systemctl start nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

Reload nginx:
```bash
sudo systemctl reload nginx
```

### Step 9: Run Database Migrations
```bash
docker exec namibia-services npx prisma migrate deploy
```

---

## 🟪 HEROKU (Simple)

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Step 2: Create Heroku App
```bash
heroku create namibia-services
```

### Step 3: Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:standard-0
```

### Step 4: Add Environment Variables
```bash
heroku config:set DATABASE_URL='postgresql://...'
heroku config:set NEXTAUTH_SECRET='your-secret'
heroku config:set NEXTAUTH_URL='https://namibia-services.herokuapp.com'
heroku config:set GOOGLE_ID='your-id'
heroku config:set GOOGLE_SECRET='your-secret'
# ... add others ...
```

### Step 5: Deploy
```bash
git push heroku main
```

### Step 6: Run Migrations
```bash
heroku run "npx prisma migrate deploy"
heroku run "npx prisma db seed"
```

### Step 7: Monitor
```bash
heroku logs --tail
```

---

## 🌐 RAILWAY (Super Easy)

### Step 1: Connect GitHub
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access GitHub
5. Select your repository

### Step 2: Add PostgreSQL
1. Click "Add Service"
2. Select "PostgreSQL"
3. Railway automatically creates DATABASE_URL

### Step 3: Configure Variables
1. Go to "Variables"
2. Add all environment variables from `.env.production`

### Step 4: Deploy
- Click "Deploy"
- Railway automatically deploys on git push

### Step 5: Run Migrations
1. Go to "Deployments"
2. Click "Command line"
3. Run: `npx prisma migrate deploy`

---

## ☁️ DIGITALOCEAN (Full Control)

### Step 1: Create Droplet
1. Go to DigitalOcean Console
2. Create Droplet:
   - Image: Ubuntu 22.04
   - Size: 2GB RAM ($5/month)
   - Region: Closest to Namibia

### Step 2: Create Managed Database
1. Go to Databases
2. Create PostgreSQL cluster
3. Copy connection string

### Step 3: SSH into Droplet
```bash
ssh root@your-droplet-ip
```

### Step 4: Install Node & pnpm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g pnpm
```

### Step 5: Clone & Setup
```bash
git clone https://github.com/yourusername/namibia-services.git
cd namibia-services
pnpm install
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Step 6: Build
```bash
pnpm build
npx prisma migrate deploy
```

### Step 7: Run with PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start "pnpm start" --name "namibia-services"
pm2 save
pm2 startup
```

### Step 8: Setup Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🚀 QUICK COMPARISON TABLE

| Platform | Setup Time | Cost | Difficulty | Best For |
|----------|-----------|------|-----------|----------|
| Vercel | 5 min | Free tier | Easy | Production |
| Heroku | 10 min | $7-50/mo | Easy | Learning |
| Railway | 5 min | Free tier | Very Easy | Quick setup |
| Docker+EC2 | 30 min | $5-100/mo | Advanced | Full control |
| DigitalOcean | 20 min | $5-50/mo | Medium | Scalability |

---

## ✅ POST-DEPLOYMENT CHECKLIST

After deploying, verify:

- [ ] Website loads successfully
- [ ] User registration works
- [ ] Google login works
- [ ] Emails send correctly
- [ ] Images upload to Cloudinary
- [ ] Government directory loads
- [ ] Location filters work
- [ ] Bookings can be created
- [ ] Admin dashboard accessible
- [ ] Database backups configured

---

## 🆘 DEPLOYMENT TROUBLESHOOTING

### Database Connection Fails
```bash
# Test connection
psql postgresql://user:pass@host:5432/db

# Check Prisma
npx prisma db push
```

### Build Fails
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
pnpm install
pnpm build
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Environment Variables Not Loading
```bash
# Verify file exists
ls -la .env.local

# Restart app
# (Heroku: git push heroku main)
# (Vercel: redeploy)
# (Local: pnpm dev)
```

---

## 📞 GET HELP

- Vercel Support: https://vercel.com/support
- Next.js Discord: https://discord.gg/nextjs
- Prisma Discord: https://discord.gg/prisma
- Railway Community: https://railway.app/community

---

**Last Updated:** January 16, 2026
**Version:** Namibia Services v1.0
