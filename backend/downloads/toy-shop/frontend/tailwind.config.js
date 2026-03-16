/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode based on 'class' attribute on html tag
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347', // Tomato red
        secondary: '#4682B4', // Steel blue
        darkBg: '#1a202c', // Dark background for dark mode
        darkText: '#e2e8f0', // Light text for dark mode
      }
    },
  },
  plugins: [],
}
