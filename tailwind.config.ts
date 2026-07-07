import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EF",
        creamdeep: "#FCEAD3",
        coral: "#FF6F59",
        coraldeep: "#EE4B3A",
        sunset: "#FDAA4B",
        ink: "#2A2438",
        inksoft: "#6E6580",
        sky: "#3AAED8",
        skydeep: "#2C8FB8",
        berry: "#E8546B",
        berrydeep: "#D63757",
        mint: "#16A394",
        mintdeep: "#0E8377",
        gold: "#FFC94A",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      fontWeight: {
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
      },
      boxShadow: {
        soft: "0 8px 24px -8px rgba(42, 36, 56, 0.12)",
        card: "0 10px 30px -10px rgba(238, 75, 58, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
        pop: "pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};
export default config;
