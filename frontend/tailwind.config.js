/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{html,js,jsx,ts,tsx,}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#F4F3EE",
        secondary: "#017A5D",
      },
    },
  },
  plugins: [],
};
