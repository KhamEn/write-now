const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "light-shade": "#f6f6f6",
      "light-accent": "",
      brand: "#7c149c",
      "dark-accent": "",
      "dark-shade": "#333333",
    },
    extend: {
      fontFamily: {
        mono: ["Inconsolata", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        "fluid-base": "clamp(1.13rem, calc(1.01rem + 0.57vw), 1.38rem)",
      },
    },
  },
  plugins: [],
};
