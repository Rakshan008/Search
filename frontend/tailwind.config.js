/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable dark mode based on class attribute
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Scan these files for Tailwind classes
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], // Modern sans-serif stack
        },
        boxShadow: {
          'input': '0 1px 6px rgba(32, 33, 36, 0.28)', // Google-like shadow for input
          'input-focus': '0 1px 6px rgba(32, 33, 36, 0.4)',
          'card': '0 2px 10px rgba(0, 0, 0, 0.08)', // Soft shadow for cards
          'card-dark': '0 2px 10px rgba(255, 255, 255, 0.05)',
        },
        colors: {
          'brand-blue': {
            light: '#4285F4', // Example accent color
            DEFAULT: '#3b78e7',
            dark: '#3b78e7',
          },
          'background': {
            light: '#ffffff',
            dark: '#1f2023', // Dark background
          },
          'surface': {
            light: '#ffffff',
            dark: '#2a2b2e', // Dark surface (cards)
          },
          'text-primary': {
            light: '#202124', // Main text light
            dark: '#e8eaed',   // Main text dark
          },
          'text-secondary': {
            light: '#5f6368', // Secondary text light
            dark: '#bdc1c6',   // Secondary text dark
          },
          'border-light': '#dfe1e5',
          'border-dark': '#3c4043',
        }
      },
    },
    plugins: [],
  }
  
