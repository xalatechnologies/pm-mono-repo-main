#!/bin/bash

# ============================================
# Pure Minerals - Web App Deployment Script
# Deploys ONLY the Next.js frontend
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Pure Minerals - Web Deployment${NC}"
echo -e "${BLUE}========================================${NC}"

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
VPS_USER="root"
VPS_HOST="72.62.1.197"
WEB_DIR="/var/www/pureminerals-web"

# Check if VPS_HOST is set
if [ "$VPS_HOST" = "YOUR_VPS_IP" ]; then
  read -p "Enter your VPS IP or hostname: " VPS_HOST
  if [ -z "$VPS_HOST" ]; then
    echo -e "${RED}Error: VPS host is required${NC}"
    exit 1
  fi
fi

echo -e "${YELLOW}Deploying to: ${VPS_USER}@${VPS_HOST}${NC}"
echo ""

# ============================================
# BUILD WEB APP
# ============================================
echo -e "${BLUE}[1/4] Building Next.js app...${NC}"
cd "$MONOREPO_ROOT/apps/web"
# Set API URL at build time for Next.js (use localhost since both run on same server)
NEXT_PUBLIC_API_URL="http://localhost:8080/api" npm run build

# ============================================
# PREPARE DEPLOYMENT PACKAGE
# ============================================
echo -e "${BLUE}[2/4] Preparing deployment package...${NC}"
WEB_TMP="/tmp/pm-web-deploy-$(date +%s)"
mkdir -p "$WEB_TMP"

cd "$MONOREPO_ROOT/apps/web"

# Copy standalone build
cp -r .next/standalone/* "$WEB_TMP/"
cp -r .next/static "$WEB_TMP/.next/"
cp -r public "$WEB_TMP/" 2>/dev/null || true

# Create PM2 ecosystem
cat > "$WEB_TMP/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [{
    name: 'pm-web',
    script: 'server.js',
    cwd: '/var/www/pureminerals-web',
    instances: 1,
    exec_mode: 'fork',
    max_restarts: 10,
    restart_delay: 5000,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    max_memory_restart: '500M',
    error_file: '/var/log/pm2/pm-web-error.log',
    out_file: '/var/log/pm2/pm-web-out.log',
    merge_logs: true,
    time: true
  }]
};
EOF

echo -e "${GREEN}Package prepared${NC}"

# ============================================
# UPLOAD TO VPS
# ============================================
echo -e "${BLUE}[3/4] Uploading to VPS...${NC}"

rsync -avz --delete --progress -e "ssh -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.env' \
  "$WEB_TMP/" "${VPS_USER}@${VPS_HOST}:${WEB_DIR}/"

# ============================================
# RESTART SERVICE
# ============================================
echo -e "${BLUE}[4/4] Restarting web service...${NC}"

ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_HOST}" << 'ENDSSH'
mkdir -p /var/log/pm2

echo "Restarting pm-web..."
pm2 restart pm-web 2>/dev/null || pm2 start /var/www/pureminerals-web/ecosystem.config.js

pm2 save

echo ""
echo "=== Web Status ==="
pm2 status pm-web

echo ""
echo "=== Testing Web ==="
sleep 3
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000
ENDSSH

# Cleanup
rm -rf "$WEB_TMP"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Web deployment complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Website: ${GREEN}https://pureminerals.no${NC}"
echo ""
echo -e "${YELLOW}Check logs:${NC}"
echo "  ssh ${VPS_USER}@${VPS_HOST} 'pm2 logs pm-web'"

