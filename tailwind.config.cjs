const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: {
        tint: "#fababa",
        base: "#af0000",
        shade: "#790000",
      },
      blue: {
        tint: "#edebf7",
        base: "#4e3e9f",
        shade: "#383061",
      },
      light: {
        base: "#ececed",
        shade: "#86868d",
      },
      dark: {
        tint: "#616167",
        base: "#111112",
      },
    },
    extend: {
      boxShadow: {
        "block-b": "0px 1px 0px, 0px 2px 0px, 0px 3px 0px, 0px 4px 0px",
        "plane-bl": "-9px 9px 0px",
      },
      fontFamily: {
        mono: ["Courier Prime", ...defaultTheme.fontFamily.mono],
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
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
  plugins: [],
};
