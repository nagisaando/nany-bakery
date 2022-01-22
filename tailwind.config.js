module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000',
      pink: '#eed2d2',
      darkPink: '#d38081',
    },
    extend: {
      spacing: {
        98: '400px',
        '100%': '100%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
