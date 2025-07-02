/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#60CBC5',
        tertiary: '#FF837A',
        quaternary: '#FBE267',
        success: '#9EDC75',
        'alt-primary': '#233640',
        surfaceGlass: 'rgba(190, 138, 111, 0.3)',
      },
      fontFamily: {
        sans: ['"Cairo Play"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Anta', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
