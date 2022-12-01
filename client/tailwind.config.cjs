/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5EA7D4",
        secondary: "#AED3EA",
        tertiary: "#192124",
      },
      backgroundColor: {
        primary: "#192124",
        secondary: "#5EA7D4",
        tertiary: "#AED3EA",
      },
    },
  },
  plugins: [],
};
