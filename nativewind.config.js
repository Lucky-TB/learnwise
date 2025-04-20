const { withExpoSnack } = require('nativewind');

module.exports = withExpoSnack({
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          dark: '#0056B3',
        },
        secondary: {
          DEFAULT: '#5856D6',
          dark: '#3634A3',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
        },
        text: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}); 