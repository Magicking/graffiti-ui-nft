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
        brightGreen: "#00ff00",
        lime: "#98DD28",
        yellow: "#FCFC03",
        lightYellow: "#FCFDC7",
        camo: "#9BA885",
        camoDark: "#11140C",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
      }
    },
  },
  plugins: [],
};
