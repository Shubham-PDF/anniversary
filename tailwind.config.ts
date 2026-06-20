import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ivory: {
          DEFAULT: "#F5F0EB",
          translucent: "rgba(245, 240, 235, 0.8)",
        },
        gold: {
          DEFAULT: "#C7A66B",
          light: "#E5D3B3",
          dark: "#A38249",
        },
        charcoal: "#2B2B2B",
        softgray: "#666666",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        cursive: ["var(--font-cursive)", "cursive"],
        balloon: ["var(--font-balloon)", "cursive"],
      },
      animation: {
        'sparkle-float': 'sparkleFloat 6s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        sparkleFloat: {
          '0%, 100%': { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px) scale(1.2) rotate(180deg)', opacity: '0.8' },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
