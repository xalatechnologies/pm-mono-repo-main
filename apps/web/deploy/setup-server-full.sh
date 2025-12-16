#!/bin/bash

# ============================================
# Pure Minerals - Full VPS Server Setup
# Sets up BOTH Web App AND Admin API
# Run this ONCE on your VPS
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Pure Minerals Full VPS Setup${NC}"
echo -e "${GREEN}  (Web App + Admin API + MongoDB)${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Please run as root (use sudo)${NC}"
  exit 1
fi

# Get configuration from user
read -p "Enter your main domain (e.g., pureminerals.no): " DOMAIN
read -p "Enter your API subdomain (e.g., api.pureminerals.no): " API_DOMAIN

if [ -z "$DOMAIN" ] || [ -z "$API_DOMAIN" ]; then
  echo -e "${RED}Both domains are required${NC}"
  exit 1
fi

echo -e "${YELLOW}Starting full server setup...${NC}"

# ============================================
# SYSTEM UPDATES
# ============================================
echo -e "${BLUE}[1/8] Updating system packages...${NC}"
apt-get update && apt-get upgrade -y

# ============================================
# NODE.JS INSTALLATION
# ============================================
echo -e "${BLUE}[2/8] Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo -e "${GREEN}Node.js version: $(node -v)${NC}"

# ============================================
# PM2 INSTALLATION
# ============================================
echo -e "${BLUE}[3/8] Installing PM2...${NC}"
npm install -g pm2

# ============================================
# MONGODB INSTALLATION (Optional - Local)
# ============================================
echo -e "${BLUE}[4/8] MongoDB Setup...${NC}"
read -p "Install MongoDB locally? (y/n, recommended: n for MongoDB Atlas): " INSTALL_MONGO

if [ "$INSTALL_MONGO" = "y" ]; then
  echo -e "${YELLOW}Installing MongoDB...${NC}"
  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
  echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-7.0.list
  apt-get update
  apt-get install -y mongodb-org
  systemctl start mongod
  systemctl enable mongod
  echo -e "${GREEN}MongoDB installed and running${NC}"
else
  echo -e "${YELLOW}Skipping local MongoDB - use MongoDB Atlas${NC}"
fi

# ============================================
# NGINX INSTALLATION
# ============================================
echo -e "${BLUE}[5/8] Installing Nginx...${NC}"
apt-get install -y nginx

# ============================================
# CREATE APP DIRECTORIES
# ============================================
echo -e "${BLUE}[6/8] Creating app directories...${NC}"
mkdir -p /var/www/pureminerals-web
mkdir -p /var/www/pureminerals-admin
mkdir -p /var/log/pm2
chown -R $SUDO_USER:$SUDO_USER /var/www/pureminerals-web 2>/dev/null || chown -R root:root /var/www/pureminerals-web
chown -R $SUDO_USER:$SUDO_USER /var/www/pureminerals-admin 2>/dev/null || chown -R root:root /var/www/pureminerals-admin

# ============================================
# NGINX CONFIGURATION
# ============================================
echo -e "${BLUE}[7/8] Configuring Nginx...${NC}"

# Web App Configuration
cat > /etc/nginx/sites-available/pureminerals-web << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;

    location / {
        proxy_pass http://localhost:3000;
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

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}
EOF

# Admin API Configuration
cat > /etc/nginx/sites-available/pureminerals-admin << EOF
server {
    listen 80;
    server_name ${API_DOMAIN};

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types application/json text/plain;

    # Increase body size for file uploads
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:8080;
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

# Enable the sites
ln -sf /etc/nginx/sites-available/pureminerals-web /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/pureminerals-admin /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# ============================================
# FIREWALL CONFIGURATION
# ============================================
echo -e "${BLUE}[8/8] Configuring firewall...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
echo "y" | ufw enable 2>/dev/null || true

# Install Certbot for SSL
echo -e "${YELLOW}Installing Certbot for SSL...${NC}"
apt-get install -y certbot python3-certbot-nginx

# ============================================
# CREATE ENVIRONMENT TEMPLATE FILES
# ============================================
echo -e "${YELLOW}Creating environment template files...${NC}"

# Admin .env template
cat > /var/www/pureminerals-admin/.env.template << EOF
# Server Configuration
PORT=8080
NODE_ENV=production

# MongoDB Connection (UPDATE THIS!)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/pureminerals

# Authentication (UPDATE THIS!)
COOKIE_SECRET=generate-a-secure-random-string-here
ADMIN_EMAIL=admin@pureminerals.no
ADMIN_PASSWORD_HASH=\$2b\$10\$your-bcrypt-hash-here

# News Aggregation
NEWS_FETCH_ENABLED=true
NEWS_ARTICLES_PER_DAY=5
RSS_CATEGORIES=mining,geology,metals,ree

# API Keys (UPDATE THESE!)
GROQ_API_KEY=your-groq-api-key
NEWS_API_KEY=your-newsapi-key-optional
EOF

# Web .env template
cat > /var/www/pureminerals-web/.env.local.template << EOF
# API URL
NEXT_PUBLIC_API_URL=https://${API_DOMAIN}/api

# Site URL
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=
EOF

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Server setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Directory structure:${NC}"
echo "  /var/www/pureminerals-web   - Next.js web app (port 3000)"
echo "  /var/www/pureminerals-admin - Express admin API (port 8080)"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Point your DNS records:"
echo "   - ${DOMAIN} → this server IP"
echo "   - ${API_DOMAIN} → this server IP"
echo ""
echo "2. Configure environment files:"
echo "   - /var/www/pureminerals-admin/.env"
echo "   - /var/www/pureminerals-web/.env.local"
echo ""
echo "3. Run deploy script from your local machine"
echo ""
echo "4. Enable SSL after DNS propagation:"
echo -e "   ${GREEN}sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} -d ${API_DOMAIN}${NC}"
echo ""

