#!/bin/bash

# ============================================
# Pure Minerals - Initial Server Setup
# Run this ONCE on a fresh VPS
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="pureminerals.no"
API_DOMAIN="api.pureminerals.no"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Pure Minerals - Server Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# ============================================
# 1. UPDATE SYSTEM
# ============================================
echo -e "${BLUE}[1/7] Updating system...${NC}"
apt update && apt upgrade -y

# ============================================
# 2. INSTALL NODE.JS 20
# ============================================
echo -e "${BLUE}[2/7] Installing Node.js 20...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# ============================================
# 3. INSTALL PM2
# ============================================
echo -e "${BLUE}[3/7] Installing PM2...${NC}"
npm install -g pm2

# ============================================
# 4. INSTALL NGINX
# ============================================
echo -e "${BLUE}[4/7] Installing Nginx...${NC}"
apt install -y nginx

# ============================================
# 5. CREATE DIRECTORIES
# ============================================
echo -e "${BLUE}[5/7] Creating directories...${NC}"
mkdir -p /var/www/pureminerals-web
mkdir -p /var/www/pureminerals-admin
mkdir -p /var/log/pm2

# ============================================
# 6. CONFIGURE NGINX
# ============================================
echo -e "${BLUE}[6/7] Configuring Nginx...${NC}"

# Main website - with static file serving
cat > /etc/nginx/sites-available/pureminerals << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Serve Next.js static files directly
    location /_next/static/ {
        alias /var/www/pureminerals-web/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Serve public files (images, etc.)
    location ~* \.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot|pdf)$ {
        root /var/www/pureminerals-web/public;
        expires 30d;
        add_header Cache-Control "public";
        try_files \$uri @nextjs;
    }

    location @nextjs {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
}
EOF

# Admin API
cat > /etc/nginx/sites-available/pureminerals-api << EOF
server {
    listen 80;
    server_name ${API_DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
}
EOF

# Enable sites
ln -sf /etc/nginx/sites-available/pureminerals /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/pureminerals-api /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
nginx -t
systemctl reload nginx

# ============================================
# 7. CONFIGURE FIREWALL
# ============================================
echo -e "${BLUE}[7/7] Configuring firewall...${NC}"
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Server setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "1. Create environment files on the server:"
echo ""
echo "   # Web app environment"
echo "   nano /var/www/pureminerals-web/.env"
echo "   # Add: NEXT_PUBLIC_API_URL=https://${API_DOMAIN}/api"
echo ""
echo "   # Admin API environment"
echo "   nano /var/www/pureminerals-admin/.env"
echo "   # Add your MongoDB URI, API keys, etc."
echo ""
echo "2. Deploy from your local machine:"
echo "   ./deploy-full.sh    # First time (both apps)"
echo "   ./deploy-web.sh     # Frontend only"
echo "   ./deploy-admin.sh   # Backend only"
echo ""
echo "3. Set up SSL (after first deployment):"
echo "   apt install certbot python3-certbot-nginx"
echo "   certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo "   certbot --nginx -d ${API_DOMAIN}"
echo ""
