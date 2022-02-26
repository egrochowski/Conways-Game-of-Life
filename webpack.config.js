// const path = require('path');

// module.exports = {
//   entry: './client/src/index.tsx',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         loader: 'ts-loader',
//         exclude: [/node_modules/, /bower_components/],
//       },
//       {
//         test: /.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
//   mode: 'production',
// };

const webpack = require('webpack');
const path = require('path');

const config = {
  entry: ['./client/src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: './public',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
