import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hapvi: {
          primary: "#5D1818",
          dark: "#3D0A0A",
          light: "#F5E8E8",
        },
        cream: {
          DEFAULT: "#FFFBF7",
          muted: "#FAF7F2",
          deep: "#F5EFE8",
        },
        ink: {
          DEFAULT: "#2C2825",
          muted: "#5C5652",
          subtle: "#8A837D",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-noto-kr)",
          "var(--font-dm-sans)",
          "system-ui",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(44, 40, 37, 0.06), 0 8px 24px rgba(44, 40, 37, 0.06)",
        card: "0 1px 2px rgba(44, 40, 37, 0.04), 0 12px 40px rgba(93, 24, 24, 0.06)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
};

export default config;
