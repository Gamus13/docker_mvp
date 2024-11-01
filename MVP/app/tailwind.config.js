/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    
    extend: {
      colors: {
        primary: "#0000FF",
        background: "#0000FF",
        text: "#FFFFFF",
        bgCard: "#222222",
        lightGray: "#CDD0D8",
        borderGray: "#d9d9d9",
        bgGray: "#f9f9f9",
        darkGray: "#9593A4",
      },
      fontFamily: {
        jarkarta: ["Calsans", "sans-serif"],
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
    
    
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
