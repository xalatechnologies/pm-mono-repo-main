# Pure Minerals - Deployment Guide

## Architecture Overview

The Pure Minerals website consists of two applications:

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────────┐         ┌──────────────────┐             │
│   │   WEB APP        │         │   ADMIN API      │             │
│   │   (Next.js)      │ ──────► │   (Express)      │             │
│   │                  │         │                  │             │
│   │   pureminerals.no│         │   api.pureminerals.no          │
│   │   Port: 3000     │         │   Port: 8080     │             │
│   └──────────────────┘         └────────┬─────────┘             │
│                                         │                        │
│                                         ▼                        │
│                                ┌──────────────────┐             │
│                                │   MongoDB        │             │
│                                │   (Database)     │             │
│                                └──────────────────┘             │
│                                         │                        │
│                         ┌───────────────┴───────────────┐       │
│                         ▼                               ▼       │
│                ┌──────────────────┐           ┌──────────────┐  │
│                │   NewsAPI.org    │           │   RSS Feeds  │  │
│                │   (Optional)     │           │   (Free)     │  │
│                └──────────────────┘           └──────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## What Needs to Be Deployed

### 1. Web App (Next.js) - `apps/web`
- Public-facing website
- Displays articles, projects, etc.
- Fetches data from Admin API

### 2. Admin API (Express) - `apps/admin`
- Backend API for articles
- AdminJS dashboard for content management
- News aggregation scheduler (runs automatically)
- Connects to MongoDB

### 3. MongoDB Database
- Stores articles, categories, etc.
- Can use MongoDB Atlas (cloud) or self-hosted

---

## Deployment Options

### Option A: Single Server (VPS)
Both apps on one server (e.g., DigitalOcean, Hetzner)

**Pros:** Simple, cost-effective
**Cons:** Single point of failure

```
Server (Ubuntu)
├── Web App → port 3000 → nginx → pureminerals.no
├── Admin API → port 8080 → nginx → api.pureminerals.no
└── MongoDB (local or Atlas)
```

### Option B: Separate Services
- Web App → Vercel (free tier available)
- Admin API → Railway / Render / DigitalOcean App Platform
- MongoDB → MongoDB Atlas (free tier: 512MB)

**Pros:** Scalable, managed services
**Cons:** More complex, potential costs

### Option C: Current Setup (Recommended Initially)
- Web App → Your existing hosting
- Admin API → Same server or separate VPS
- MongoDB → MongoDB Atlas (free tier)

---

## Environment Variables

### Web App (`apps/web/.env.local`)
```bash
# Production API URL
NEXT_PUBLIC_API_URL=https://api.pureminerals.no/api

# Or if on same server
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Site URL
NEXT_PUBLIC_SITE_URL=https://pureminerals.no

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Admin API (`apps/admin/.env`)
```bash
# Server
PORT=8080
NODE_ENV=production

# MongoDB Connection
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/pureminerals

# Authentication
COOKIE_SECRET=your-secure-random-string-here
ADMIN_EMAIL=admin@pureminerals.no
ADMIN_PASSWORD_HASH=$2b$10$... (bcrypt hash)

# News Aggregation
NEWS_FETCH_ENABLED=true
NEWS_ARTICLES_PER_DAY=5
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
NEWS_API_KEY=xxxxxxxxxxxxx  # Optional

# RSS Categories
RSS_CATEGORIES=mining,geology,metals,ree
```

---

## Deployment Steps

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create a cluster (M0 free tier)
4. Create database user
5. Whitelist IP addresses (or allow all: 0.0.0.0/0)
6. Get connection string

### Step 2: Deploy Admin API

**Using PM2 (Process Manager):**
```bash
# On server
cd apps/admin

# Install dependencies
npm install

# Build TypeScript
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start dist/app.js --name "pm-admin"

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
```

**Using Docker:**
```dockerfile
# Dockerfile for admin
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 8080
CMD ["node", "dist/app.js"]
```

### Step 3: Configure Nginx (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/api.pureminerals.no

server {
    listen 80;
    server_name api.pureminerals.no;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 4: SSL Certificate (Let's Encrypt)
```bash
sudo certbot --nginx -d api.pureminerals.no
```

### Step 5: Deploy Web App

Update environment and rebuild:
```bash
cd apps/web

# Update .env.local with production API URL
echo "NEXT_PUBLIC_API_URL=https://api.pureminerals.no/api" > .env.local

# Build
npm run build

# Deploy (your existing method)
```

---

## How News Aggregation Works in Production

### Automatic Schedule
When the admin API starts, it automatically:
1. Schedules news fetching every 24 hours
2. Runs the first fetch immediately on startup

```
Server Start
    │
    ▼
┌─────────────────────┐
│ Schedule News Job   │ ← Runs every 24 hours
│ (setInterval)       │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Fetch from Sources  │
│ - RSS Feeds         │
│ - NewsAPI (optional)│
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Filter Duplicates   │ ← Check MongoDB for existing URLs
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ AI Summarization    │ ← Groq API (Llama 3.3)
│ - Generate title    │
│ - Generate summary  │
│ - Extract tags      │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Save to MongoDB     │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Available on Web    │ ← /articles page fetches from API
└─────────────────────┘
```

### Manual Trigger
You can also trigger news fetching manually:
```bash
curl -X POST https://api.pureminerals.no/api/news/fetch
```

### Check Status
```bash
curl https://api.pureminerals.no/api/news/status
```

---

## Monitoring & Maintenance

### PM2 Commands
```bash
# View logs
pm2 logs pm-admin

# Monitor
pm2 monit

# Restart
pm2 restart pm-admin

# View status
pm2 status
```

### Log Files
```bash
# View news job logs
pm2 logs pm-admin --lines 100 | grep "News Job"
```

### Health Check Endpoint
```bash
# Check if API is running
curl https://api.pureminerals.no/api/news/status
```

---

## Cost Estimate (Monthly)

### Option A: Single VPS
| Service | Cost |
|---------|------|
| DigitalOcean Droplet (2GB) | $12/month |
| MongoDB Atlas (Free tier) | $0 |
| Groq API (Free tier) | $0 |
| NewsAPI (Free tier) | $0 |
| **Total** | **~$12/month** |

### Option B: Managed Services
| Service | Cost |
|---------|------|
| Vercel (Web) | $0-20/month |
| Railway (API) | $5-20/month |
| MongoDB Atlas | $0 |
| **Total** | **$5-40/month** |

---

## Security Checklist

- [ ] Use HTTPS for all endpoints
- [ ] Set strong COOKIE_SECRET
- [ ] Whitelist MongoDB IP addresses
- [ ] Use environment variables (never commit secrets)
- [ ] Enable firewall (ufw)
- [ ] Regular backups of MongoDB
- [ ] Monitor server resources

---

## Troubleshooting

### News not fetching?
1. Check `NEWS_FETCH_ENABLED=true`
2. Check `GROQ_API_KEY` is set
3. View logs: `pm2 logs pm-admin`

### Articles not showing on website?
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify API is accessible: `curl $API_URL/articles`
3. Check browser console for errors

### API not starting?
1. Check MongoDB connection string
2. Verify port 8080 is available
3. Check for TypeScript build errors

---

## Support

For deployment assistance, contact:

**Xala Technologies AS**
- Email: support@xala.no
- Website: xala.no

