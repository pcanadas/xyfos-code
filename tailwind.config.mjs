/** @type {import('tailwindcss').Config} */
// Design system: direction A "Ingeniería serena" + warm blocks from C.
// See docs/direccion-visual-2026-10.md
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF7",            // page background
        surface: {
          DEFAULT: "#FFFFFF",     // cards
          warm: "#FFEEDD",        // human sections only (About, Process)
        },
        ink: "#14161A",           // headings, body text, dark band
        muted: "#4A5160",         // secondary text (8.2:1 on bg)
        line: {
          DEFAULT: "#E4E4DE",     // hairline borders
          strong: "#CFCFC7",      // secondary button border
        },
        brand: {
          DEFAULT: "#FF7700",     // button fill with ink text (7.3:1). Never as text on light bg.
          hover: "#E86C00",
          text: "#9A4A00",        // orange text/links on light bg (6.3:1)
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
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ['"Inter Tight Variable"', '"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      fontSize: {
        // Body copy is 17px in direction A
        body: ["1.0625rem", { lineHeight: "1.65" }],
      },
      letterSpacing: {
        display: "-0.025em",
      },
      maxWidth: {
        content: "72rem",         // site container (1152px)
        prose: "65ch",
      },
      spacing: {
        section: "7rem",          // 112px between sections on desktop
        "section-sm": "4rem",     // 64px on mobile
      },
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
