module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          press: ['"PressStart2P-Regular"', 'sans-serif'], // Ensure the font name is properly quoted
        },
      },
    },
    plugins: [],
  };
  