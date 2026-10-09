import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF0033",
          hover: "#E41E2B",
          dark: "#D90028",
          light: "#FFE5E8",
        },
        dark: {
          bg: "#0B0C12",
          card: "#14161E",
          elevated: "#1A1D27",
          border: "#232737",
          border2: "#1E2230",
          text: "#ECEDF2",
          muted: "#A0A4B0",
        },
        light: {
          bg: "#F7F7FA",
          card: "#FFFFFF",
          elevated: "#F4F5F8",
          border: "#E5E7EB",
          border2: "#EFF0F4",
          text: "#1A1A1F",
          muted: "#5C5F6A",
        }
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 0, 51, 0.25)",
        card: "0 12px 36px rgba(15, 18, 34, 0.08)",
        "card-dark": "0 12px 36px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
