#!/bin/bash

# ============================================
# Pure Minerals - Full Deploy Script
# Deploys BOTH Web App AND Admin API
# Run this from your local machine
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE
VPS_USER="root"
VPS_HOST="72.62.1.197"
WEB_DIR="/var/www/pureminerals-web"
ADMIN_DIR="/var/www/pureminerals-admin"

# Get script directory (monorepo root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO_ROOT="$(dirname "$(dirname "$(dirname "$SCRIPT_DIR")")")"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Pure Minerals Full Deployment${NC}"
echo -e "${GREEN}  (Web App + Admin API)${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Monorepo root: ${BLUE}$MONOREPO_ROOT${NC}"

# Check if VPS_HOST is set
if [ "$VPS_HOST" = "YOUR_VPS_IP" ]; then
  read -p "Enter your VPS IP or hostname: " VPS_HOST
  if [ -z "$VPS_HOST" ]; then
    echo -e "${RED}VPS host is required${NC}"
    exit 1
  fi
fi

# ============================================
# BUILD WEB APP
# ============================================
echo -e "${BLUE}[1/6] Building Web App...${NC}"
cd "$MONOREPO_ROOT/apps/web"

# Set API URL at build time for Next.js (use localhost since both run on same server)
NEXT_PUBLIC_API_URL="http://localhost:8080/api" npm run build

if [ ! -d ".next/standalone" ]; then
  echo -e "${RED}Web build failed - standalone directory not found${NC}"
  exit 1
fi
echo -e "${GREEN}Web App build successful!${NC}"

# ============================================
# BUILD ADMIN API
# ============================================
echo -e "${BLUE}[2/6] Building Admin API...${NC}"
cd "$MONOREPO_ROOT/apps/admin"

npm run build

if [ ! -d "dist" ]; then
  echo -e "${RED}Admin build failed - dist directory not found${NC}"
  exit 1
fi
echo -e "${GREEN}Admin API build successful!${NC}"

# ============================================
# PREPARE WEB DEPLOYMENT
# ============================================
echo -e "${BLUE}[3/6] Preparing Web deployment package...${NC}"
WEB_TMP="/tmp/pm-web-deploy-$(date +%s)"
mkdir -p "$WEB_TMP"

cd "$MONOREPO_ROOT/apps/web"

# Copy standalone build
cp -a .next/standalone/. "$WEB_TMP/"

# Copy static files
mkdir -p "$WEB_TMP/.next/static"
cp -r .next/static/* "$WEB_TMP/.next/static/"
mkdir -p "$WEB_TMP/apps/web/.next/static"
cp -r .next/static/* "$WEB_TMP/apps/web/.next/static/"

# Copy public folder
cp -r public "$WEB_TMP/"
cp -r public "$WEB_TMP/apps/web/"

# Create PM2 ecosystem for web
cat > "$WEB_TMP/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [{
    name: 'pm-web',
    script: 'apps/web/server.js',
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

echo -e "${GREEN}Web package prepared${NC}"

# ============================================
# PREPARE ADMIN DEPLOYMENT
# ============================================
echo -e "${BLUE}[4/6] Preparing Admin deployment package...${NC}"
ADMIN_TMP="/tmp/pm-admin-deploy-$(date +%s)"
mkdir -p "$ADMIN_TMP"

cd "$MONOREPO_ROOT/apps/admin"

# Copy built files
cp -r dist "$ADMIN_TMP/"
cp package-lock.json "$ADMIN_TMP/" 2>/dev/null || true

# Handle shared-types package
echo "Packing shared-types..."
cd "$MONOREPO_ROOT/packages/shared-types"
npm pack --pack-destination "$ADMIN_TMP"
SHARED_TYPES_TGZ=$(ls "$ADMIN_TMP"/pm-shared-types-*.tgz 2>/dev/null | head -1)

# Copy and modify package.json to use local shared-types tarball
cd "$MONOREPO_ROOT/apps/admin"
cat package.json | sed 's/"@pm\/shared-types": "\*"/"@pm\/shared-types": "file:.\/pm-shared-types-1.0.0.tgz"/' > "$ADMIN_TMP/package.json"

# Create PM2 ecosystem for admin (using .cjs for ES module compatibility)
cat > "$ADMIN_TMP/ecosystem.config.cjs" << 'EOF'
module.exports = {
  apps: [{
    name: 'pm-admin',
    script: 'dist/app.js',
    cwd: '/var/www/pureminerals-admin',
    instances: 1,
    exec_mode: 'fork',
    max_restarts: 10,
    restart_delay: 5000,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    max_memory_restart: '500M',
    error_file: '/var/log/pm2/pm-admin-error.log',
    out_file: '/var/log/pm2/pm-admin-out.log',
    merge_logs: true,
    time: true
  }]
};
EOF

echo -e "${GREEN}Admin package prepared${NC}"

# ============================================
# UPLOAD TO VPS
# ============================================
echo -e "${BLUE}[5/6] Uploading to VPS...${NC}"

echo -e "${YELLOW}Uploading Web App...${NC}"
rsync -avz --delete --progress -e "ssh -o StrictHostKeyChecking=no" \
  "$WEB_TMP/" "${VPS_USER}@${VPS_HOST}:${WEB_DIR}/"

echo -e "${YELLOW}Uploading Admin API...${NC}"
rsync -avz --delete --progress -e "ssh -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.env' \
  "$ADMIN_TMP/" "${VPS_USER}@${VPS_HOST}:${ADMIN_DIR}/"

# ============================================
# RESTART SERVICES ON VPS
# ============================================
echo -e "${BLUE}[6/6] Restarting services on VPS...${NC}"

ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_HOST}" << 'ENDSSH'
echo "Installing admin dependencies..."
cd /var/www/pureminerals-admin
npm install --omit=dev --legacy-peer-deps

echo "Creating log directory..."
mkdir -p /var/log/pm2

echo "Stopping existing apps..."
pm2 stop pm-web 2>/dev/null || true
pm2 stop pm-admin 2>/dev/null || true
pm2 delete pm-web 2>/dev/null || true
pm2 delete pm-admin 2>/dev/null || true

echo "Starting Web App..."
cd /var/www/pureminerals-web
pm2 start ecosystem.config.js

echo "Starting Admin API..."
cd /var/www/pureminerals-admin
pm2 start ecosystem.config.cjs

echo "Saving PM2 process list..."
pm2 save

echo "Setting up PM2 startup..."
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo ""
echo "====== PM2 Status ======"
pm2 status

echo ""
echo "====== Testing Endpoints ======"
sleep 3
echo "Web App (port 3000):"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "Not ready yet"
echo ""
echo "Admin API (port 8080):"
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/news/status || echo "Not ready yet"
ENDSSH

# Cleanup
rm -rf "$WEB_TMP"
rm -rf "$ADMIN_TMP"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Web App:   ${GREEN}https://pureminerals.no${NC}"
echo -e "Admin API: ${GREEN}https://api.pureminerals.no${NC}"
echo -e "Admin UI:  ${GREEN}https://api.pureminerals.no/admin${NC}"
echo ""
echo -e "${YELLOW}Check logs with:${NC}"
echo "  ssh ${VPS_USER}@${VPS_HOST} 'pm2 logs pm-web'"
echo "  ssh ${VPS_USER}@${VPS_HOST} 'pm2 logs pm-admin'"

