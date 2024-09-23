// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#FFFCF5',
        'primary-dark': '#212121',
        'secondary-gray': '#808080',
        'secondary-middle-gray':'#9C9C9C',
        'secondary-light-gray': '#D9D9D9',
        'secondary-accent': '#FF553E',
      },
      fontFamily: {
        'primary': ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'custom': '25px',
      },
      fontSize: {
        'title': '5rem',
        'active-text': '1.5rem',
        'inactive-text': '1.5rem',
        'separator': '1.5rem',
      },
      spacing: {
        'title-margin': '100px',
        'container-padding': '20px',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(180deg, #212121, #808080)',
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      });
    })
  ],
};
