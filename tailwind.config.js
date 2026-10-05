/**
 * Tailwind CSS configuration
 * Custom UI theme for Sổ Hiếu Hỉ app
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E0285C",
        secondary: "#F0573F",
        dark: "#1B2445",
        accent: "#FFC107",
        neutral: "#F5F5F5",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #E0285C 0%, #F0573F 100%)",
        "gradient-dark": "linear-gradient(135deg, #1B2445 0%, #0A0E14 100%)",
      },
      fontFamily: {
        sans: ["'Be Vietnam Pro'", "ui-sans-serif", "system-ui"],
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};