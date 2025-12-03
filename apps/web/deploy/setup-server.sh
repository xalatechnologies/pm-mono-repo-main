#!/bin/bash

# ============================================
# Pure Minerals - Ubuntu VPS Server Setup
# Run this ONCE on your VPS to set up the server
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Pure Minerals VPS Setup Script${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Please run as root (use sudo)${NC}"
  exit 1
fi

# Get domain from user
read -p "Enter your domain name (e.g., pureminerals.no): " DOMAIN

if [ -z "$DOMAIN" ]; then
  echo -e "${RED}Domain name is required${NC}"
  exit 1
fi

echo -e "${YELLOW}Starting server setup...${NC}"

# Update system
echo -e "${YELLOW}Updating system packages...${NC}"
apt-get update && apt-get upgrade -y

# Install Node.js 20.x
echo -e "${YELLOW}Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo -e "${GREEN}Node.js version: $(node -v)${NC}"

# Install PM2
echo -e "${YELLOW}Installing PM2...${NC}"
npm install -g pm2

# Install Nginx
echo -e "${YELLOW}Installing Nginx...${NC}"
apt-get install -y nginx

# Create app directory
echo -e "${YELLOW}Creating app directory...${NC}"
mkdir -p /var/www/pureminerals
chown -R $SUDO_USER:$SUDO_USER /var/www/pureminerals 2>/dev/null || chown -R root:root /var/www/pureminerals

# Create Nginx configuration
echo -e "${YELLOW}Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/pureminerals << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;

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

    location /static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000";
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/pureminerals /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# Setup firewall
echo -e "${YELLOW}Configuring firewall...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
echo "y" | ufw enable 2>/dev/null || true

# Install Certbot for SSL
echo -e "${YELLOW}Installing Certbot for SSL...${NC}"
apt-get install -y certbot python3-certbot-nginx

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Server setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Point your domain DNS to this server's IP"
echo "2. Run the deploy script from your local machine"
echo "3. After deployment, run this command to enable SSL:"
echo -e "   ${GREEN}sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}"
echo ""
echo -e "App directory: ${GREEN}/var/www/pureminerals${NC}"

