/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: { max: '375px' },
      tablet: { min: '376px', max: '1199px' },
      desktop: { min: '1200px' },
    },
    extend: {
      colors: {
        gs: {
          10: '#FFFFFF',
          20: '#F9F9F9',
          30: '#CFCFCF',
          40: '#818181',
          50: '#515151',
          60: '#000000',
        },
        bn: {
          10: '#F5F1EE',
          20: '#E4D5C9',
          30: '#C7BBB5',
          40: '#542F1A',
          50: '#341909',
        },
        b50: '#1877F2',
        y50: '#FEE500',
        r50: '#B93333',
      },
    },
  },
  plugins: [],
};
