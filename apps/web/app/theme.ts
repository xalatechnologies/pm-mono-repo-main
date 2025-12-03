/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PURE MINERALS DESIGN TOKENS
 * TypeScript Design Token System
 * 
 * This file mirrors the CSS custom properties in globals.css
 * Use these tokens for programmatic access to design values
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const tokens = {
  /* ─────────────────────────────────────────────────────────────────────────
     COLOR TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  colors: {
    // Brand Colors
    brand: {
      primary: "#1a1f2e",
      secondary: "#b87333",
      accent: "#4a7c6f",
    },
    
    // Neutral Palette
    neutral: {
      50: "#fafaf9",
      100: "#f5f0e8",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
      950: "#0f1419",
    },
    
    // Earth Tones
    earth: {
      copper: "#b87333",
      copperLight: "#d4956b",
      copperDark: "#8b5a2b",
      gold: "#8b6914",
      patina: "#4a7c6f",
      stone: "#6b7280",
      sandstone: "#f5f0e8",
      obsidian: "#0f1419",
      slate: "#1a1f2e",
    },
    
    // Semantic Colors
    background: "#f5f0e8",
    backgroundDark: "#0f1419",
    backgroundElevated: "#ffffff",
    foreground: "#1a1f2e",
    foregroundLight: "#f5f0e8",
    foregroundMuted: "#78716c",
    
    // State Colors
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     GRADIENT TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  gradients: {
    copper: "linear-gradient(135deg, #b87333 0%, #8b6914 100%)",
    copperVibrant: "linear-gradient(135deg, #d4956b 0%, #b87333 50%, #8b6914 100%)",
    stone: "linear-gradient(180deg, #1a1f2e 0%, #0f1419 100%)",
    earth: "linear-gradient(135deg, #4a7c6f 0%, #1a1f2e 100%)",
    hero: "linear-gradient(180deg, rgba(15,20,25,0.8) 0%, rgba(26,31,46,0.6) 50%, rgba(15,20,25,0.9) 100%)",
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     SHADOW TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.2)",
    copper: "0 4px 20px 0 rgba(184, 115, 51, 0.3)",
    copperLg: "0 8px 30px 0 rgba(184, 115, 51, 0.35)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     TYPOGRAPHY TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  typography: {
    // Font Families
    fonts: {
      display: "'Playfair Display', Georgia, 'Times New Roman', serif",
      body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      mono: "'SF Mono', 'Fira Code', 'Consolas', monospace",
    },
    
    // Type Scale (in rem) - Perfect Fourth ratio
    fontSize: {
      "2xs": "0.75rem",    // 12px
      xs: "0.875rem",      // 14px
      sm: "1rem",          // 16px
      base: "1.125rem",    // 18px
      lg: "1.25rem",       // 20px
      xl: "1.5rem",        // 24px
      "2xl": "1.75rem",    // 28px
      "3xl": "2.25rem",    // 36px
      "4xl": "2.75rem",    // 44px
      "5xl": "3.5rem",     // 56px
      "6xl": "4.5rem",     // 72px
      "7xl": "5.5rem",     // 88px
      "8xl": "7rem",       // 112px
    },
    
    // Line Heights
    lineHeight: {
      none: 1,
      tighter: 1.1,
      tight: 1.2,
      snug: 1.35,
      normal: 1.5,
      relaxed: 1.625,
      loose: 1.8,
    },
    
    // Letter Spacing
    letterSpacing: {
      tighter: "-0.04em",
      tight: "-0.02em",
      normal: "0",
      wide: "0.02em",
      wider: "0.05em",
      widest: "0.1em",
      caps: "0.14em",
    },
    
    // Font Weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     SPACING TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  spacing: {
    0: "0",
    1: "0.25rem",    // 4px
    2: "0.5rem",     // 8px
    3: "0.75rem",    // 12px
    4: "1rem",       // 16px
    5: "1.25rem",    // 20px
    6: "1.5rem",     // 24px
    8: "2rem",       // 32px
    10: "2.5rem",    // 40px
    12: "3rem",      // 48px
    16: "4rem",      // 64px
    20: "5rem",      // 80px
    24: "6rem",      // 96px
    32: "8rem",      // 128px
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     BORDER RADIUS TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     TRANSITION TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  transitions: {
    duration: {
      instant: "0ms",
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "700ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     Z-INDEX TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  zIndex: {
    behind: -1,
    base: 0,
    elevated: 10,
    dropdown: 20,
    sticky: 30,
    fixed: 40,
    modalBackdrop: 50,
    modal: 60,
    popover: 70,
    tooltip: 80,
    toast: 90,
    max: 9999,
  },
  
  /* ─────────────────────────────────────────────────────────────────────────
     CONTAINER TOKENS
     ───────────────────────────────────────────────────────────────────────── */
  containers: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1400px",
  },
} as const;

// Type exports for TypeScript support
export type Tokens = typeof tokens;
export type ColorTokens = typeof tokens.colors;
export type TypographyTokens = typeof tokens.typography;
export type SpacingTokens = typeof tokens.spacing;

// Legacy theme export for backwards compatibility
export const theme = {
  colors: {
    primary: tokens.colors.brand.primary,
    secondary: tokens.colors.brand.secondary,
    accent: tokens.colors.brand.accent,
    earthBrown: tokens.colors.earth.gold,
    stoneGrey: tokens.colors.earth.stone,
    obsidian: tokens.colors.earth.obsidian,
    sandstone: tokens.colors.earth.sandstone,
    background: tokens.colors.background,
    backgroundDark: tokens.colors.backgroundDark,
    foreground: tokens.colors.foreground,
    foregroundLight: tokens.colors.foregroundLight,
    primaryBlue: tokens.colors.brand.primary,
    darkGray: tokens.colors.earth.obsidian,
    oliveGreen: tokens.colors.earth.patina,
    copper: tokens.colors.earth.copper,
  },
  fonts: {
    heading: tokens.typography.fonts.display,
    body: tokens.typography.fonts.body,
  },
  shadows: tokens.shadows,
  transitions: {
    fast: `${tokens.transitions.duration.fast} ${tokens.transitions.easing.default}`,
    normal: `${tokens.transitions.duration.normal} ${tokens.transitions.easing.default}`,
    slow: `${tokens.transitions.duration.slow} ${tokens.transitions.easing.default}`,
  },
  borderRadius: tokens.borderRadius,
};

export type Theme = typeof theme;
