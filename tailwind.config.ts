import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE2",
        paperline: "#DCD8C6",
        ink: {
          DEFAULT: "#16302B",
          light: "#24443C",
          faint: "#5B6E68",
        },
        brass: {
          DEFAULT: "#B8862E",
          light: "#D9A441",
          dark: "#8A6420",
        },
        stampred: "#A23B2E",
        stampgreen: "#1F6E4A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        ledger:
          "repeating-linear-gradient(to bottom, transparent, transparent 35px, #DCD8C6 36px)",
      },
    },
  },
  plugins: [],
};
export default config;
