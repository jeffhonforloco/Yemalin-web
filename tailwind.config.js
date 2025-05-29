module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Include paths to all template files
  theme: {
    extend: {
      colors: {
        yemalinBlack: '#222',        // Custom color used in your CSS
        yemalinAccent: '#FF5722',    // Accent color for buttons and other elements
        yemalinGrey300: '#D3D3D3',
        yemalinGrey400: '#B3B3B3',
        yemalinGrey800: '#333333',
      },
    },
  },
  plugins: [],
};