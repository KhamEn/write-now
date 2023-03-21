const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      accent: {
        lightest: "#ffebd5",
        lighter: "#ffe1c8",
        light: "#ffd7bd",
        base: "#ffccb3",
        dark: "#b98d77",
        darker: "#785240",
        darkest: "#3b1e0f",
      },
      secondary: {
        lightest: "#ffd3d1",
        lighter: "#fcbebc",
        light: "#f7a9a7",
        base: "#f29393",
        dark: "#b26768",
        darker: "#773f3f",
        darkest: "#401a1b",
      },
      primary: {
        lightest: "#e2d8fd",
        lighter: "#b3a6d9",
        light: "#8476b6",
        base: "#554994",
        dark: "#443b75",
        darker: "#342d57",
        darkest: "#25203b",
      },
      neutral: {
        lightest: "#ececed",
        lighter: "#c5c6c9",
        light: "#3e414a",
        base: "#3e414a",
        dark: "#32343b",
        darker: "#32343b",
        darkest: "#060707",
      },
    },
    extend: {
      boxShadow: {
        "block-b": "0px 1px 0px, 0px 2px 0px, 0px 3px 0px, 0px 4px 0px",
        "plane-bl": "-9px 9px 0px",
      },
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
  plugins: [],
};
