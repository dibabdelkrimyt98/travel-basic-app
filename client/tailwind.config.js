/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your custom brand colors from the design here!
      colors: {
        'brand-blue': '#0B67FF',
        'brand-charcoal': '#0F1724',
        'brand-bg': '#F4F7FB',
      },
    },
  },
  plugins: [],
}