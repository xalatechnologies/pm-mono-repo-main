# Pure Minerals - Deployment Scripts

## Quick Reference

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `setup-server.sh` | Initial VPS setup | Run once on new server |
| `deploy-full.sh` | Deploy both apps | First deployment or major changes |
| `deploy-web.sh` | Deploy frontend only | UI/content changes |
| `deploy-admin.sh` | Deploy backend only | API/admin changes |

## First Time Setup

### 1. SSH to your VPS

```bash
ssh root@72.62.1.197
```

### 2. Download and run setup script

```bash
# Option A: Copy script content and run
nano setup-server.sh
# Paste the content, save, then:
chmod +x setup-server.sh
./setup-server.sh

# Option B: Run from local (from this directory)
cat setup-server.sh | ssh root@72.62.1.197 'bash -s'
```

### 3. Create environment files on the VPS

```bash
# Web app environment
nano /var/www/pureminerals-web/.env
```

Add:
```env
NEXT_PUBLIC_API_URL=https://api.pureminerals.no/api
```

```bash
# Admin API environment
nano /var/www/pureminerals-admin/.env
```

Add:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pureminerals?retryWrites=true&w=majority

# Admin credentials
ADMIN_EMAIL=admin@pureminerals.no
ADMIN_PASSWORD=your-secure-password

# Session
COOKIE_SECRET=your-random-secret-string

# News API (optional)
NEWSAPI_KEY=your-newsapi-key
GROQ_API_KEY=your-groq-api-key
NEWS_FETCH_ENABLED=true
NEWS_FETCH_CRON=0 6 * * *
```

### 4. Deploy from your local machine

```bash
# Make scripts executable
chmod +x *.sh

# First deployment (both apps)
./deploy-full.sh
```

### 5. Set up SSL (after first deployment)

```bash
ssh root@72.62.1.197

# Install certbot
apt install certbot python3-certbot-nginx -y

# Get certificates
certbot --nginx -d pureminerals.no -d www.pureminerals.no
certbot --nginx -d api.pureminerals.no
```

---

## Day-to-Day Deployments

### Frontend Changes (UI, content, styles)

```bash
./deploy-web.sh
```

### Backend Changes (API, admin panel, news jobs)

```bash
./deploy-admin.sh
```

### Both Apps

```bash
./deploy-full.sh
```

---

## Monitoring & Troubleshooting

### Check status

```bash
ssh root@72.62.1.197 'pm2 status'
```

### View logs

```bash
# Web app logs
ssh root@72.62.1.197 'pm2 logs pm-web'

# Admin API logs
ssh root@72.62.1.197 'pm2 logs pm-admin'

# Last 100 lines
ssh root@72.62.1.197 'pm2 logs pm-web --lines 100'
```

### Restart services

```bash
# Restart web
ssh root@72.62.1.197 'pm2 restart pm-web'

# Restart admin
ssh root@72.62.1.197 'pm2 restart pm-admin'

# Restart all
ssh root@72.62.1.197 'pm2 restart all'
```

### Manual news fetch (trigger immediately)

```bash
ssh root@72.62.1.197 'curl -X POST http://localhost:8080/api/news/fetch'
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         VPS (72.62.1.197)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                      Nginx                          │   │
│   │   :80/:443 → Routes traffic                         │   │
│   └─────────────────────────────────────────────────────┘   │
│            │                           │                    │
│            ▼                           ▼                    │
│   ┌─────────────────┐         ┌─────────────────┐          │
│   │    pm-web       │         │    pm-admin     │          │
│   │   (Next.js)     │         │    (Express)    │          │
│   │   Port 3000     │         │    Port 8080    │          │
│   │                 │         │                 │          │
│   │ pureminerals.no │         │ api.pureminerals│          │
│   └─────────────────┘         └─────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌─────────────────┐          │
│                               │  MongoDB Atlas  │          │
│                               │    (Cloud)      │          │
│                               └─────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Important Notes

1. **Environment files** (`.env`) are NOT deployed automatically - they must be created manually on the server
2. **Database** is hosted on MongoDB Atlas (not on the VPS)
3. **SSL certificates** are managed by Certbot and auto-renew
4. **PM2** keeps apps running and restarts them if they crash
5. **News job** runs automatically via cron inside the admin app
