# Pure Minerals - Deployment Guide

Deploy the Pure Minerals website to an Ubuntu VPS (Hostinger or similar).

## Prerequisites

- Ubuntu VPS (20.04 or later)
- SSH access to the VPS
- Domain name (optional but recommended)

## Quick Start

### 1. First-time Server Setup

SSH into your VPS and run the setup script:

```bash
# On your VPS
curl -sSL https://raw.githubusercontent.com/your-repo/setup-server.sh | sudo bash

# Or copy the script manually and run:
sudo bash setup-server.sh
```

This will install:
- Node.js 20.x
- PM2 (process manager)
- Nginx (reverse proxy)
- Certbot (SSL certificates)

### 2. Deploy from Local Machine

```bash
# Make the deploy script executable
chmod +x deploy/deploy.sh

# Run deployment
./deploy/deploy.sh
```

You'll be prompted for your VPS IP address.

### 3. Enable SSL (After DNS is configured)

```bash
# On your VPS
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Configuration

Edit `deploy/deploy.sh` to set your VPS details permanently:

```bash
VPS_USER="root"
VPS_HOST="your-vps-ip-or-hostname"
```

## Useful Commands

### On the VPS:

```bash
# View app status
pm2 status

# View logs
pm2 logs pureminerals

# Restart app
pm2 restart pureminerals

# Stop app
pm2 stop pureminerals

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### From local machine:

```bash
# Deploy updates
./deploy/deploy.sh

# SSH into VPS
ssh root@your-vps-ip
```

## Troubleshooting

### App not starting
```bash
# Check PM2 logs
pm2 logs pureminerals --lines 50

# Check if port 3000 is in use
sudo lsof -i :3000
```

### Nginx errors
```bash
# Test config
sudo nginx -t

# Check error log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL issues
```bash
# Renew certificates
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

## File Structure on VPS

```
/var/www/pureminerals/
├── server.js           # Next.js standalone server
├── ecosystem.config.js # PM2 configuration
├── .next/
│   └── static/         # Static assets
├── public/             # Public files
└── node_modules/       # Dependencies (minimal)
```

