/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{html,js,jsx,ts,tsx,}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        header: ["Julee", "cursive"],
      },
      colors: {
        primaryfont: "#898989",
        secondary: "#017A5D",
        linear1: "rgba(77, 106, 109, 1)",
        linear2: "rgba(1, 130, 94, 1)",
      },
    },
  },
  plugins: [],
};
