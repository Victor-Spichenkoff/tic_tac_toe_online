import type { Config } from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";


export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightBackground: "#355E3B",
        darkBackground: "#222222",
        lightMenu: "#4E7852",
        darkMenu: "#1A1A1A",
        lightCircle: "#2097D2",
        darkCircle: "#4CAF50",
        cross: "#F44336"
      },
      fontFamily: {
        hand_title: ["var(--font-permanent_marker)", ...fontFamily.sans],
        hand_icons: ["var(--font-patric_hand)", ...fontFamily.sans],
        hand_text: ["var(--font-gloria_hallelujah)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
