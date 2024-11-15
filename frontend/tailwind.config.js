/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor1: '#FEF1E9',
        customColor2: '#FCE6D8',
      },
      height: {
        'custom-71': '71px',
      },
    },
  },
  plugins: [],
}

