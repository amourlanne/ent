const path = require('path');

module.exports = {
  entry: [path.resolve('src', 'server.ts.ts')],
  mode: 'production',
  devtool: 'inline-source-map',
  target: 'node',
  output: {
    path: path.resolve('build'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
};
