// theme.ts - Pure Minerals Geological Design System
export const theme = {
  colors: {
    // Primary palette - Earth tones
    primary: "#1a1f2e", // Deep Slate (dark geological stone)
    secondary: "#b87333", // Copper Ore
    accent: "#4a7c6f", // Oxidized Copper (patina green)
    
    // Extended palette
    earthBrown: "#8b6914", // Mineral gold
    stoneGrey: "#6b7280", // Granite
    obsidian: "#0f1419", // Dark background
    sandstone: "#f5f0e8", // Light background
    
    // Semantic colors
    background: "#f5f0e8",
    backgroundDark: "#0f1419",
    foreground: "#1a1f2e",
    foregroundLight: "#f5f0e8",
    
    // Legacy support
    primaryBlue: "#1a1f2e",
    darkGray: "#0f1419",
    oliveGreen: "#4a7c6f",
    copper: "#b87333",
  },
  
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
  },
  
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    copper: "0 4px 14px 0 rgba(184, 115, 51, 0.25)",
  },
  
  transitions: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease",
  },
  
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
};

export type Theme = typeof theme;
