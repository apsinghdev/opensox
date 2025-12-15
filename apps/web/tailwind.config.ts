import type { Config } from "tailwindcss";
import { colors } from "./src/lib/design-tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: colors.background.primary,
        foreground: colors.text.primary,

        // Brand colors
        brand: {
          purple: {
            DEFAULT: colors.brand.purple.DEFAULT,
            light: colors.brand.purple.light,
            dark: colors.brand.purple.dark,
          },
        },

        // Surface colors - more semantic naming
        surface: {
          primary: colors.background.primary,
          secondary: colors.background.secondary,
          tertiary: colors.background.tertiary,
          elevated: colors.background.elevated,
          hover: colors.background.hover,
          card: colors.background.card,
        },

        // Dashboard-specific backgrounds
        dash: {
          base: colors.backgroundDash.base,
          surface: colors.backgroundDash.surface,
          raised: colors.backgroundDash.raised,
          hover: colors.backgroundDash.hover,
          border: colors.backgroundDash.border,
        },

        // Border colors
        border: {
          DEFAULT: colors.border.DEFAULT,
          light: colors.border.light,
          dark: colors.border.dark,
          focus: colors.border.focus,
        },

        // Text colors
        text: {
          primary: colors.text.primary,
          secondary: colors.text.secondary,
          tertiary: colors.text.tertiary,
          muted: colors.text.muted,
          light: colors.text.light,
        },

        // Link colors
        link: {
          DEFAULT: colors.link.DEFAULT,
          hover: colors.link.hover,
        },

        // Status colors
        success: colors.status.success,
        error: colors.status.error,
        warning: colors.status.warning,
        info: colors.status.info,

        // External brand colors
        github: {
          bg: colors.external.github.bg,
          hover: colors.external.github.hover,
          border: colors.external.github.border,
        },

        // Legacy ox-* colors (for gradual migration) - will be deprecated
        "ox-purple": colors.brand.purple.DEFAULT,
        "ox-purple-2": colors.brand.purple.dark,
        "ox-gray": "rgb(75 85 99)",
        "ox-sidebar": colors.background.secondary,
        "ox-profile-card": colors.background.elevated,
        "ox-content": colors.background.tertiary,
        "ox-header": colors.border.light,
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scrollRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Move by half the width since we duplicate content
        },
        scrollLeft: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }, // Same for left scroll
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scrollRight: "scrollRight var(--duration) linear infinite",
        scrollLeft: "scrollLeft var(--duration) linear infinite",
        none: "none",
        customspin: "spin 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-slow-reverse": "spin 20s linear infinite reverse",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shine: "shine var(--duration) infinite linear",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-dm-mono)",
          "Menlo",
          "Monaco",
          "Courier New",
          "monospace",
        ],
        DMfont: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
