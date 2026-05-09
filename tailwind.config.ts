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
      },
    },
  },
};

export default config;
