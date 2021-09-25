const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './www/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
