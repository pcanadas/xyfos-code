/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF7EB",
          100: "#FFE7C2",
          200: "#FFD08A",
          300: "#FFB44F",
          400: "#FB9C23",
          500: "#F18F01",
          600: "#D97800",
          700: "#B86200",
          800: "#8F4C00",
          900: "#6B3A00"
        }
      }
    }
  },
  plugins: []
};