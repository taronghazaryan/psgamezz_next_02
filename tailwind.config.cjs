/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        primary: "#6366f1",
        secondary: "#f59e0b",
        "ps-blue": "#6366f1",
        "ps-yellow": "#f59e0b",
        "ps-dark": "#0d0e14",
        "ps-darker": "#1a1b26",
        "ps-accent": "#8b5cf6",
        "ps-neon": "#ec4899",
        "ps-card-bg": "#1e1f2e",
        "ps-surface": "#252732",
      },
      boxShadow: {
        "ps-glow-blue": "0 0 20px rgba(0, 181, 241, 0.5), 0 0 40px rgba(0, 181, 241, 0.3)",
        "ps-glow-yellow": "0 0 20px rgba(255, 226, 69, 0.5), 0 0 40px rgba(255, 226, 69, 0.3)",
        "ps-glow-neon": "0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 240, 255, 0.4)",
        "ps-card": "0 10px 30px rgba(0, 0, 0, 0.3)",
        "ps-card-hover": "0 20px 50px rgba(0, 181, 241, 0.2)",
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "ps-gradient": "linear-gradient(135deg, #202562 0%, #0E56D7 50%, #00B5F1 100%)",
        "ps-gradient-accent": "linear-gradient(135deg, #00B5F1 0%, #00d4ff 100%)",
        "ps-gradient-yellow": "linear-gradient(135deg, #FFE245 0%, #ffd700 100%)",
      },
    },
  },
  plugins: [],
};
