#!/bin/bash

# ============================================
# Pure Minerals - Admin API Deployment Script
# Deploys ONLY the Express admin backend
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Pure Minerals - Admin Deployment${NC}"
echo -e "${BLUE}========================================${NC}"

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
VPS_USER="root"
VPS_HOST="72.62.1.197"
ADMIN_DIR="/var/www/pureminerals-admin"

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
# BUILD SHARED TYPES
# ============================================
echo -e "${BLUE}[1/5] Building shared-types...${NC}"
cd "$MONOREPO_ROOT/packages/shared-types"
npm run build

# ============================================
# BUILD ADMIN APP
# ============================================
echo -e "${BLUE}[2/5] Building Admin API...${NC}"
cd "$MONOREPO_ROOT/apps/admin"
npm run build

# ============================================
# PREPARE DEPLOYMENT PACKAGE
# ============================================
echo -e "${BLUE}[3/5] Preparing deployment package...${NC}"
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

# Copy and modify package.json to use local shared-types tarball
cd "$MONOREPO_ROOT/apps/admin"
cat package.json | sed 's/"@pm\/shared-types": "\*"/"@pm\/shared-types": "file:.\/pm-shared-types-1.0.0.tgz"/' > "$ADMIN_TMP/package.json"

# Create PM2 ecosystem (using .cjs for ES module compatibility)
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

echo -e "${GREEN}Package prepared${NC}"

# ============================================
# UPLOAD TO VPS
# ============================================
echo -e "${BLUE}[4/5] Uploading to VPS...${NC}"

rsync -avz --delete --progress -e "ssh -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.env' \
  "$ADMIN_TMP/" "${VPS_USER}@${VPS_HOST}:${ADMIN_DIR}/"

# ============================================
# INSTALL & RESTART SERVICE
# ============================================
echo -e "${BLUE}[5/5] Installing dependencies and restarting...${NC}"

ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_HOST}" << 'ENDSSH'
mkdir -p /var/log/pm2

echo "Installing admin dependencies..."
cd /var/www/pureminerals-admin
npm install --omit=dev --legacy-peer-deps

echo "Restarting pm-admin..."
pm2 restart pm-admin 2>/dev/null || pm2 start ecosystem.config.cjs

pm2 save

echo ""
echo "=== Admin Status ==="
pm2 status pm-admin

echo ""
echo "=== Testing Admin API ==="
sleep 3
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:8080/api/health 2>/dev/null || echo "API starting..."
ENDSSH

# Cleanup
rm -rf "$ADMIN_TMP"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Admin deployment complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Admin API: ${GREEN}https://api.pureminerals.no${NC}"
echo -e "Admin UI:  ${GREEN}https://api.pureminerals.no/admin${NC}"
echo ""
echo -e "${YELLOW}Check logs:${NC}"
echo "  ssh ${VPS_USER}@${VPS_HOST} 'pm2 logs pm-admin'"

