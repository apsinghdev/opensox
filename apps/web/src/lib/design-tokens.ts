/**
 * Opensox AI Design Tokens
 *
 * Central source of truth for all design values (colors, spacing, etc.)
 * DO NOT use hardcoded hex values in components - always reference these tokens
 */

export const colors = {
  // Brand Colors - Primary purple for CTAs, highlights, and brand elements
  brand: {
    purple: {
      DEFAULT: "#5519f7", // Primary brand purple
      light: "#8a5cf4", // Lighter variant for hover states
      dark: "#7a45c3", // Darker variant for depth
      gradient: {
        from: "#9455f4",
        to: "#7a45c3",
      },
      // Text gradient (higher contrast)
      textGradient: {
        from: "#9455f4",
        to: "#341e7b",
      },
      // Button specific colors
      button: {
        gradient: {
          from: "#5728f4",
          to: "#5100ff",
        },
        border: "#6348fc",
        shadow: "#2c04b1",
      },
      // Effects
      glow: "rgba(145, 89, 226, 0.5)",
      grid: "#3f1fbc", // For flickering grid effect
    },
  },

  // Background / Surface Colors (Mostly for the landing page)
  background: {
    primary: "#101010", // Main app background
    secondary: "#141414", // Sidebar, secondary surfaces
    tertiary: "#1a1a1a", // Content areas, cards
    elevated: "#1e1e1e", // Elevated cards, modals
    hover: "#15161a", // Hover states for dark surfaces
    card: "#111111", // Card backgrounds
  },

  // Background / Surface Colors (for /dashboard)
  backgroundDash: {
    base: "#1e1e1e", // Page background (darkest)
    surface: "#262626", // Panels, cards, navbars
    raised: "#363636", // Buttons, inputs, interactive surfaces
    hover: "rgb(28, 28, 28)", // Hover for raised items
    border: "rgb(43, 42, 42)", // Thin dividers, borders
  },

  // Border Colors
  border: {
    DEFAULT: "#252525", // Primary border color
    light: "#141414", // Lighter borders for nested elements
    dark: "#292929", // Darker borders
    focus: "#9455f4", // Focus states (brand purple)
    github: "#30363d", // GitHub-style borders
  },

  // Text Colors
  text: {
    primary: "#ffffff", // Primary white text
    secondary: "#e1e1e1", // Secondary text
    tertiary: "#d1d1d1", // Tertiary/muted text
    muted: "#a1a1a1", // Very muted text
    light: "#363636", // Light gray text for copyright/footer
  },

  // Link Colors
  link: {
    DEFAULT: "#60a5fa", // blue-400 - Default link color
    hover: "#93c5fd", // blue-300 - Hover state
  },

  // Status Colors
  status: {
    success: {
      bg: "#002d21",
      text: "#00bd7c",
      border: "#00bd7c",
    },
    error: {
      bg: "#2d0000",
      text: "#ff4444",
      border: "#ff4444",
    },
    warning: {
      bg: "#2d2400",
      text: "#ffcc00",
      border: "#ffcc00",
    },
    info: {
      bg: "#00182d",
      text: "#4499ff",
      border: "#4499ff",
    },
  },

  // External Brand Colors (GitHub, etc.)
  external: {
    github: {
      bg: "#0d1117",
      hover: "#161b22",
      border: "#30363d",
    },
    users: {
      from: "#ff6154",
      to: "#ff8c00",
    },
  },
} as const;

/**
 * Gradients - Reusable gradient definitions
 */
export const gradients = {
  // Brand gradients
  purple: "linear-gradient(to bottom,#9455f4,#7a45c3)",
  purpleText: "linear-gradient(to bottom,#9455f4,#341e7b)",
  purpleButton: "linear-gradient(to bottom,#5728f4,#5100ff)",

  // Background gradients
  backgroundRadial:
    "radial-gradient(circle at center,#101010 30%, transparent 100%)",
  backgroundFade: "linear-gradient(to top,#101010, transparent)",

  // External
  users: "linear-gradient(to bottom right,#ff6154,#ff8c00)",
} as const;

/**
 * Shadows - Box shadow definitions
 */
export const shadows = {
  button: "0px -2px 0px 0px#2c04b1 inset",
  card: "0 -20px 90px -20px rgba(255, 255, 255, 0.12) inset",
  cardInactive: "0 -30px 80px -20px rgba(255, 255, 255, 0.12) inset",
  glow: "0 0 40px rgba(145, 89, 226, 0.5)",
  text: "0 1px 0 black",
} as const;

/**
 * Typography - Font family references
 */
export const fonts = {
  sans: "var(--font-geist-sans)",
  mono: "var(--font-dm-mono)",
} as const;

/**
 * Spacing - Consistent spacing values
 */
export const spacing = {
  section: {
    padding: {
      mobile: "1rem",
      desktop: "60px",
    },
  },
} as const;

/**
 * Animation durations
 */
export const durations = {
  fast: "0.1s",
  normal: "0.3s",
  slow: "0.6s",
} as const;

/**
 * Border radius values
 */
export const radii = {
  small: "0.5rem",
  medium: "1rem",
  large: "1.5rem",
  xlarge: "2.5rem",
  button: "16px",
} as const;
