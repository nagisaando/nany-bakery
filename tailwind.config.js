module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000',
      pink: '#eed2d2',
      lightPink: '#faeded',
      darkPink: '#d38081',
      gray: '#c9c9c9',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      },
      spacing: {
        0.25: '1px',
        98: '400px',
        '100%': '100%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
