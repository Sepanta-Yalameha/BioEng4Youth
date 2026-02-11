/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // From UI Design Images - Header, Footer, Connect form
        navy: {
          DEFAULT: '#0E1F40',
          alt: '#152a47',
          dark: '#0a1830',
        },
        // Teal accents - buttons, highlights
        teal: {
          DEFAULT: '#1D969C',
          dark: '#177a7f',
          light: '#2ab3ba',
        },
        // Text colors from UI design
        'text-primary': '#333333',
        'text-muted': '#6C757D',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
