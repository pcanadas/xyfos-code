/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF7700",
          50: "#FFF6EF",
          100: "#FFEEE0",
          200: "#FEDEC1",
          300: "#FFC899",
          400: "#FFAD65",
          500: "#FF7700",
          600: "#F47200",
          700: "#C65C00",
          800: "#994700",
          900: "#7A3900"
        }
      }
    }
  },
  plugins: []
};