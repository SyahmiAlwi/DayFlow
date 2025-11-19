/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pastelBlue: '#AAC8FF',
        pastelLilac: '#D9C7FF',
        pastelCream: '#FFF7EB'
      },
      boxShadow: {
        soft: '0 10px 40px rgba(170, 200, 255, 0.25)'
      },
      borderRadius: {
        card: '20px'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
