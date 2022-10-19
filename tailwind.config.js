/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        josefin: ['Josefin Sans']
      },
      colors: {
        primary: '#0066BA'
      },
      container: {
        padding: '2rem',
        center: true
      },
      screens: {
        sm: '640px',
        md: '768px'
      }
    }
  },
  plugins: []
};
