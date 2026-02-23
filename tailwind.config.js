/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,index,pages,components}/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-primary': {
          'DEFAULT': '#6D28D9',
          'light': '#8B5CF6',
          'dark': '#5B21B6',
        },
        'brand-background': {
          'light': '#F9FAFB',
          'dark': '#111827',
        },
        'brand-text': {
          'light': '#1F2937',
          'dark': '#F9FAFB',
        },
        'brand-surface': {
          'light': '#FFFFFF',
          'dark': '#1F2937',
        },
        'brand-border': {
          'light': '#E5E7EB',
          'dark': '#374151',
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.8s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out 0.3s',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
