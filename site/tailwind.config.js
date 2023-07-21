/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sourceSans: ['var(--font-source-sans)']
      },
      animation: {
        'fade-in-0': 'fadeIn 0.5s ease-in-out 0ms forwards',
        'fade-in-75': 'fadeIn 0.5s ease-in-out 75ms forwards',
        'fade-in-150': 'fadeIn 0.5s ease-in-out 150ms forwards',
        'fade-in-300': 'fadeIn 0.5s ease-in-out 300ms forwards',
        'fade-in-500': 'fadeIn 0.5s ease-in-out 500ms forwards',
        'fade-in-700': 'fadeIn 0.5s ease-in-out 700ms forwards',
        'fade-in-1000': 'fadeIn 0.5s ease-in-out 1000ms forwards',
        'fade-in-1500': 'fadeIn 0.5s ease-in-out 1500ms forwards',
        'fade-in-2000': 'fadeIn 0.5s ease-in-out 2000ms forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
    },
  },
  plugins: [],
}
