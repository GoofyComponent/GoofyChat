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
      height: {
        minusHeader: "87vh",
      },
    },
  },
  plugins: [
    require("@gradin/tailwindcss-scrollbar")({
      size: "10px",
      track: {
        background: "transparent", // default '#f1f1f1'
        // add any css attributes here, will be merged to ::-webkit-scrollbar-track
      },
      thumb: {
        background: "#AED3EA", // default '#c1c1c1'
        borderRadius: "40px",
        // add any css attributes here, will be merged to ::-webkit-scrollbar-thumb
      },
      hover: {
        background: "#5EA7D4", // default '#a8a8a8'
        borderRadius: "40px",
        // add any css attributes here, will be merged to ::-webkit-scrollbar-thumb:hover
      },
    }),
  ],
};
