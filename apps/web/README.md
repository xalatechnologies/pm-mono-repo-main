# Pure Minerals Website

A modern, professional website for Pure Minerals AS - a Norwegian geological exploration company focused on sustainable mineral development in the Trøndelag region.

## Tech Stack

- **Framework:** Next.js 15.2.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1
- **Animations:** Framer Motion
- **Maps:** Mapbox GL JS
- **Icons:** Lucide React
- **Form Handling:** Web3Forms

## Features

- 🗺️ **Interactive 3D Maps** - Mapbox-powered exploration maps with terrain, satellite views, and animated scanner effects
- 📊 **Scroll Timeline** - Animated timeline component that expands/collapses based on scroll position
- 🎨 **Design Token System** - Comprehensive CSS variables for colors, typography, spacing, and more
- 📱 **Fully Responsive** - Mobile-first design with optimized layouts for all devices
- ⚡ **Performance Optimized** - Static generation, image optimization, and efficient bundle splitting
- 📧 **Contact Forms** - Web3Forms integration for email submissions

## Project Structure

```
apps/web/
├── app/
│   ├── components/
│   │   ├── home/          # Homepage sections
│   │   ├── about/         # About page components
│   │   ├── map/           # Map components & configs
│   │   ├── cards/         # Reusable card components
│   │   └── ui/            # UI primitives (Button, Timeline, etc.)
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects pages
│   │   ├── skrattaasen/   # Skrattåsen project
│   │   └── mokk/          # Gaulstad/Mokk project
│   ├── globals.css        # Global styles & design tokens
│   ├── theme.ts           # TypeScript theme exports
│   └── layout.tsx         # Root layout
├── public/                # Static assets (images, logos, etc.)
└── next.config.ts         # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# From the monorepo root
npm install

# Or from the web app directory
cd apps/web
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
# Mapbox (required for maps)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Web3Forms (optional - already configured with public key)
NEXT_PUBLIC_WEB3FORMS_KEY=a95eaf84-d632-4091-b34e-fc067083df6d
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Production Start

```bash
npm run start
```

## Deployment to Hostinger

### Option 1: Node.js Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the following to Hostinger:
   - `.next/standalone/` directory
   - `.next/static/` → `.next/standalone/.next/static/`
   - `public/` → `.next/standalone/public/`

3. Set Node.js version to 18+ in Hostinger panel

4. Set start command: `node server.js`

### Option 2: Static Export (Alternative)

For static hosting, modify `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

Then build and upload the `out/` directory.

## Key Components

### ScrollTimeline
Scroll-based expanding timeline with card animations.

```tsx
import ScrollTimeline from "@/app/components/ui/ScrollTimeline";

<ScrollTimeline
  badge="Our Journey"
  title="Company Timeline"
  description="Key milestones"
  entries={[
    {
      icon: Mountain,
      title: "2021",
      subtitle: "Founded",
      description: "Company established...",
      image: "/image.jpg",
      items: ["Item 1", "Item 2"],
      highlight: true,
    },
  ]}
/>
```

### ProjectMapPage
Interactive 3D map with license areas and markers.

```tsx
import { ProjectMapPage, skrattaasenConfig } from "@/app/components/map";

<ProjectMapPage config={skrattaasenConfig} />
```

### Design Tokens
Access design tokens in CSS or TypeScript:

```css
/* CSS */
color: var(--color-earth-copper);
font-size: var(--text-lg);
```

```ts
// TypeScript
import { tokens } from '@/app/theme';
tokens.colors.brand.primary
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero slider, stats, projects showcase |
| `/about` | Investor pitch page with timeline, values, mineral data |
| `/projects` | Projects overview with Skrattåsen & Mokk |
| `/projects/skrattaasen` | Skrattåsen project with 3D map |
| `/projects/mokk` | Gaulstad/Mokk project with 3D map |
| `/contact` | Contact page with form and FAQ |

## Contact Form

Forms use Web3Forms API. Submissions are sent to `post@pureminerals.no`.

Access Key: `a95eaf84-d632-4091-b34e-fc067083df6d`

## License

© 2025 Pure Minerals AS. All rights reserved.

---

**Developed by [Xala Technologies](https://xala.no)**
