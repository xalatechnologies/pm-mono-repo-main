# Pure Minerals App

A monorepo containing the complete Pure Minerals AS web application - a Norwegian geological exploration company focused on sustainable mineral development in the Trøndelag region.

## 📋 Overview

This repository contains:
- **Web App** (`apps/web`) - Next.js frontend website
- **Admin API** (`apps/admin`) - Express backend with AdminJS dashboard
- **Shared Types** (`packages/shared-types`) - TypeScript types shared between apps

## 🏗️ Architecture

```
puremineral-app/
├── apps/
│   ├── web/          # Next.js frontend (pureminerals.no)
│   └── admin/         # Express API + AdminJS (api.pureminerals.no)
├── packages/
│   └── shared-types/ # Shared TypeScript types
└── turbo.json        # Turborepo configuration
```

### Current Portfolio Stats
- **19 mining licenses** covering **189 km²** in Trøndelag, Norway
- Two strategic mining districts:
  - **Gaulstad-Mokk**: 11 licenses (128 km²)
  - **Skrattås-Byafossen**: 7 licenses (51 km²)

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** 10.0.0+
- **MongoDB** (MongoDB Atlas recommended for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/xalatechnologies/puremineral-app.git
cd puremineral-app

# Install all dependencies
npm install

# Install web app dependencies
cd apps/web && npm install && cd ../..
```

### Development

Run both apps simultaneously:

```bash
npm run dev
```

This will start:
- **Web App**: http://localhost:3000
- **Admin API**: http://localhost:3000 (or configured port)

Or run individually:

```bash
# Web app only
npm run web:dev

# Admin API only
npm run admin:dev
```

## 📦 Applications

### Web App (`apps/web`)

**Tech Stack:**
- Next.js 15.5.7 (App Router)
- TypeScript
- Tailwind CSS 4.1
- Framer Motion
- Mapbox GL JS

**Features:**
- 🗺️ Interactive 3D maps with terrain and satellite views
- 📊 Animated scroll timeline
- 📱 Fully responsive design
- ⚡ Performance optimized with static generation
- 📧 Contact forms with Web3Forms

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Admin API (`apps/admin`)

**Tech Stack:**
- Express.js
- AdminJS
- MongoDB with Mongoose
- TypeScript

**Features:**
- 📝 Content management dashboard (AdminJS)
- 📰 News aggregation from RSS feeds
- 🖼️ Image upload to Azure Blob Storage
- 🔐 Authentication with bcrypt
- 📊 Article and category management

**Environment Variables:**
```env
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=admin@pureminerals.no
ADMIN_PASSWORD_HASH=...
COOKIE_SECRET=...
NEWSAPI_KEY=... (optional)
GROQ_API_KEY=... (optional)
NEWS_FETCH_ENABLED=true
```

## 🛠️ Available Scripts

### Root Level

```bash
npm run dev          # Start both apps in development
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run clean        # Clean all build artifacts
npm run format       # Format code with Prettier

# Individual app commands
npm run web:dev      # Start web app only
npm run web:build    # Build web app only
npm run admin:dev    # Start admin API only
npm run admin:build  # Build admin API only
```

### Web App (`apps/web`)

```bash
cd apps/web
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Admin API (`apps/admin`)

```bash
cd apps/admin
npm run dev          # Run in development mode
npm run build        # Compile TypeScript
npm run start:dev    # Build + watch + run
npm run start        # Run production build
```

## 📁 Project Structure

```
puremineral-app/
├── apps/
│   ├── web/
│   │   ├── app/              # Next.js app directory
│   │   │   ├── components/   # React components
│   │   │   ├── about/        # About page
│   │   │   ├── articles/     # Articles pages
│   │   │   ├── projects/     # Project pages
│   │   │   └── ...
│   │   ├── lib/              # Utilities & configs
│   │   ├── public/           # Static assets
│   │   └── deploy/           # Deployment scripts
│   │
│   └── admin/
│       ├── src/
│       │   ├── admin/        # AdminJS configuration
│       │   ├── db/           # Database models
│       │   ├── routes/       # API routes
│       │   ├── services/     # Business logic
│       │   └── jobs/         # Scheduled jobs
│       └── dist/             # Compiled output
│
├── packages/
│   └── shared-types/          # Shared TypeScript types
│
└── turbo.json                # Turborepo config
```

## 🚢 Deployment

### Quick Deployment

Deployment scripts are available in `apps/web/deploy/`:

```bash
# Deploy web app only
cd apps/web/deploy
./deploy-web.sh

# Deploy admin API only
./deploy-admin.sh

# Deploy both apps
./deploy-full.sh
```

### Manual Deployment

1. **Build all apps:**
   ```bash
   npm run build
   ```

2. **Deploy to VPS:**
   - Web app: Upload `.next/standalone/` to `/var/www/pureminerals-web/`
   - Admin API: Upload `dist/` to `/var/www/pureminerals-admin/`
   - Configure PM2 to run both services
   - Set up Nginx reverse proxy

See `apps/web/deploy/README.md` for detailed deployment instructions.

## 🔧 Configuration

### MongoDB Setup

1. Create a MongoDB Atlas account (or use local MongoDB)
2. Create a database cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/pureminerals`
4. Add to admin app `.env` file

### Admin Credentials

Generate password hash:
```bash
npx bcrypt-cli hash "your-password"
```

Add to admin app `.env`:
```env
ADMIN_EMAIL=admin@pureminerals.no
ADMIN_PASSWORD_HASH=$2b$10$...
COOKIE_SECRET=your-random-secret-string
```

### Mapbox Setup

1. Create account at [mapbox.com](https://mapbox.com)
2. Get access token
3. Add to web app `.env.local`:
```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
```

## 📚 Documentation

- [Web App README](apps/web/README.md) - Detailed web app documentation
- [Deployment Guide](apps/web/deploy/README.md) - Deployment instructions
- [News Aggregation Setup](apps/admin/NEWS_AGGREGATION_SETUP.md) - News feature setup

## 🧪 Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test:**
   ```bash
   npm run dev
   ```

3. **Build and verify:**
   ```bash
   npm run build
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

## 🐛 Troubleshooting

### Build Errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### Port Conflicts

If port 3000 is in use:
- Web app: Set `PORT=3001` in `.env.local`
- Admin API: Set `PORT=8080` in `.env`

### MongoDB Connection Issues

- Verify connection string format
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes your server IP

## 📄 License

© 2025 Pure Minerals AS. All rights reserved.

## 👥 Contributors

Developed by [Xala Technologies](https://xala.no)

---

**Repository:** [puremineral-app](https://github.com/xalatechnologies/puremineral-app)  
**Website:** [pureminerals.no](https://pureminerals.no)  
**API:** [api.pureminerals.no](https://api.pureminerals.no)

