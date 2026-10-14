/** @type {import('tailwindcss').Config} — reserved for future Tailwind adoption.
 *  Current theme lives in src/styles/index.css (brand tokens as CSS vars).
 *  Install tailwindcss + wiring when ready; content globs already cover src. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1C33",
        navy2: "#12294A",
        card: "#1B3355",
        ink: "#172238",
        mut: "#4A5A73",
        acc: "#DE7829",
        acc2: "#0057A8",
      },
    },
  },
  plugins: [],
};
