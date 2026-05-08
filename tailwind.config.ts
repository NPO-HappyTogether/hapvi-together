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
          primary: "#1D9E75",
          dark: "#0F6E56",
          light: "#E1F5EE",
        },
      },
    },
  },
};

export default config;
