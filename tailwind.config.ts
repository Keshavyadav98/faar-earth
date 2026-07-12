import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#4C5A44",
        "dark-green": "#42523D",
        "secondary-green": "#56654E",
        "hover-green": "#374034",
        beige: "#F7F4EE",
        offwhite: "#FAFAFA",
        "text-dark": "#333333",
        "text-gray": "#666666",
        "border-gray": "#E5E5E5",
        divider: "#D9D9D9",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        h1: ["64px", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["42px", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["30px", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["24px", { lineHeight: "1.25", fontWeight: "600" }],
      },
      borderRadius: {
        btn: "8px",
        card: "20px",
        img: "18px",
        input: "6px",
        pill: "40px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.08)",
        "card-hover": "0 20px 40px rgba(0,0,0,.15)",
        btn: "0 8px 20px rgba(76,90,68,.25)",
      },
      maxWidth: {
        container: "1400px",
      },
      spacing: {
        "section-y": "100px",
        "section-y-mobile": "56px",
      },
    },
  },
  plugins: [],
};
export default config;
