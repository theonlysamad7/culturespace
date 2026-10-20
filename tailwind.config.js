/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F8F7F3",
        ink: "#252820",
        muted: "#77796F",
        olive: "#68745A",
        "olive-dark": "#4F5B43",
        sand: "#E9E4D8",
        terracotta: "#B76E50",
        line: "#E7E4DC",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        display: ["Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 12px 40px rgba(37, 40, 32, 0.06)",
      },
    },
  },
  plugins: [],
};
