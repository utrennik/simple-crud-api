const path = require('path');

module.exports = () => ({
  mode: 'production',

  target: 'node',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.json'],
  },
});
