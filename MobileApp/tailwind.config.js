/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'helvetica-neue': ['Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        '14': '14px',
      },
      lineHeight: {
        '20': '20px',
      },
    },
  },
  plugins: [],
}
