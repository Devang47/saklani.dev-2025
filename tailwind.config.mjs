const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        scooter: {
          50: "#effbfc",
          100: "#d6f5f7",
          200: "#b2eaef",
          300: "#7ddae3",
          400: "#41c0cf",
          500: "#2ab7ca",
          600: "#228498",
          700: "#226b7c",
          800: "#245866",
          900: "#224a57",
          950: "#11303b",
        },
        mantis: {
          50: "#f2fbf3",
          100: "#e0f8e2",
          200: "#c2f0c6",
          300: "#93e29c",
          400: "#5ccc68",
          500: "#3bc14a",
          600: "#279234",
          700: "#22732b",
          800: "#205b27",
          900: "#1c4b23",
          950: "#0a290f",
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
