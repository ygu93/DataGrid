const path = require('path');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
