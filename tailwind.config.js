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
        accent: 'var(--accent)',
        text: {
           accent: 'var(--color-red)',
        },
        lightAccent: "var(--light-accent)",
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
