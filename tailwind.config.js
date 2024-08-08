/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        geom: ["Geom Graphic", "sans-serif"],
        chakra: ["Chakra Petch", "sans-serif"],
      },
      colors: {
        primary: "#00ff00",
        secondary: "#98DD28",
        accent: "#FCFC03",
        lightAccent: "#FCFDC7",
        tertiary: "#9BA885",
        darkBackground: "#11140C",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B"
      },
    },
  },
  plugins: [],
};
