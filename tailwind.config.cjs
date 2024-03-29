const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: {
        base: "#7a0000",
        "normal-AAA": "#ffafae",
      },
      blue: {
        base: "#003a70",
        "AAA-normal": "#9ed0ff",
      },
      green: { base: "#3d5806", "AAA-normal": "#cfff70" },
      light: {
        shade: "#cccccf",
        base: "#fAf9f6",
        "large-AA": "#909097",
        "normal-AA": "#909097",
        "normal-AAA": "#4e4e53",
      },
      dark: {
        tint: "#46464a",
        base: "#111112",
        "large-AA": "#606065",
        "normal-AA": "#7c7c83",
        "normal-AAA": "#9f9fa4",
      },
    },
    extend: {
      boxShadow: {
        "block-b": "0px 1px 0px, 0px 2px 0px, 0px 3px 0px, 0px 4px 0px",
        "plane-bl": "-9px 9px 0px",
      },
      fontFamily: {
        mono: ["iA Writer DuoS", ...defaultTheme.fontFamily.mono],
        sans: ["Karla", ...defaultTheme.fontFamily.sans],
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
  variants: {
    extend: {
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
    },
  },
};
