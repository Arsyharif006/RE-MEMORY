/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0b0b0b",
        blood: "#7a0c0c",
      },
    },
  },
  plugins: [],
}
