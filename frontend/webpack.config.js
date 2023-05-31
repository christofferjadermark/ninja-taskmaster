const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  // ...
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // Add other rules for loaders if needed
    ],
  },
  plugins: [
    // Add other plugins
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // ...
};
