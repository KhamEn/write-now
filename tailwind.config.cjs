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
        serif: ["Literata", ...defaultTheme.fontFamily.mono],
        mono: ["Courier Prime", ...defaultTheme.fontFamily.mono],
        sans: ["Source Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "fluid-base": "clamp(1.00rem, calc(0.89rem + 0.57vw), 1.25rem)",
      },
      spacing: {
        "letter-height": "11in",
        "letter-width": "8.5in",
        "letter-fluid-vertical-padding":
          "clamp(0.5rem, -0.6364rem + 5.6818vw, 3rem)",
        "letter-fluid-horizontal-padding":
          "clamp(1rem, -1.2727rem + 11.3636vw, 6rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
