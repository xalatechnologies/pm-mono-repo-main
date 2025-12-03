#!/bin/bash

# ============================================
# Pure Minerals - Local Deploy Script
# Run this from your local machine to deploy
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE
VPS_USER="root"
VPS_HOST="72.62.1.197"
APP_DIR="/var/www/pureminerals"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Pure Minerals Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if VPS_HOST is set
if [ -z "$VPS_HOST" ]; then
  read -p "Enter your VPS IP or hostname: " VPS_HOST
  if [ -z "$VPS_HOST" ]; then
    echo -e "${RED}VPS host is required${NC}"
    exit 1
  fi
fi

# Navigate to web directory
cd "$WEB_DIR"
echo -e "${YELLOW}Working directory: $WEB_DIR${NC}"

# Build the application
echo -e "${YELLOW}Building Next.js application...${NC}"
npm run build

if [ ! -d ".next/standalone" ]; then
  echo -e "${RED}Build failed - standalone directory not found${NC}"
  exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Create a temporary deployment directory
echo -e "${YELLOW}Preparing deployment package...${NC}"
DEPLOY_TMP="/tmp/pureminerals-deploy-$(date +%s)"
mkdir -p "$DEPLOY_TMP"

# Copy standalone build
cp -r .next/standalone/* "$DEPLOY_TMP/"

# Copy static files into the correct location
mkdir -p "$DEPLOY_TMP/.next"
cp -r .next/static "$DEPLOY_TMP/.next/"

# Copy public folder
cp -r public "$DEPLOY_TMP/"

# Create ecosystem file for PM2
cat > "$DEPLOY_TMP/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [{
    name: 'pureminerals',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    max_memory_restart: '500M',
    error_file: '/var/log/pm2/pureminerals-error.log',
    out_file: '/var/log/pm2/pureminerals-out.log',
    merge_logs: true,
    time: true
  }]
};
EOF

# Upload to VPS
echo -e "${YELLOW}Uploading to VPS...${NC}"
rsync -avz --delete --progress "$DEPLOY_TMP/" "${VPS_USER}@${VPS_HOST}:${APP_DIR}/"

# Restart the application on VPS
echo -e "${YELLOW}Restarting application on VPS...${NC}"
ssh "${VPS_USER}@${VPS_HOST}" << 'ENDSSH'
cd /var/www/pureminerals

# Create log directory
mkdir -p /var/log/pm2

# Stop existing app if running
pm2 stop pureminerals 2>/dev/null || true
pm2 delete pureminerals 2>/dev/null || true

# Start with ecosystem config
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Ensure PM2 starts on boot
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo "Application restarted successfully!"
ENDSSH

# Cleanup
rm -rf "$DEPLOY_TMP"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Your site should be live at: ${GREEN}http://${VPS_HOST}${NC}"
echo -e "Or at your domain if DNS is configured."

