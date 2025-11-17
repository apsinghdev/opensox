import type { Config } from "tailwindcss";

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
        background: "#101010",
        foreground: "#ffffff",
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
        border: "hsl(var(--border))",
        "border-primary": "#252525",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "ox-purple": "#9455f4",
        "ox-purple-2": "#7A45C3",
        "ox-gray": "rgb(75 85 99)",
        "ox-white": "text-slate-400",
        "ox-black-1": "#0E0E10",
        "ox-black-2": "#15161A",
        "ox-sidebar": "#141414",
        "ox-profile-card": "#1E1E1E",
        "ox-content": "#1A1A1A",
        "ox-header": "#363636",
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
        DMfont: ["var(--font-dm-mono-med)", "var(--font-dm-mono-req)"],
        MonaSans: ["var(--font-mona-sans-med)", "var(--font-mona-sans-req)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
