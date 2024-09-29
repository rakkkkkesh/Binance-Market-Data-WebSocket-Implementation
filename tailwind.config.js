module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        up: '#4CAF50', // Green for bullish candles
        down: '#F44336', // Red for bearish candles
      },
    },
  },
  plugins: [],
};
