const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/index.js',
  output: {
    filename: './lib/bundle.js'
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
