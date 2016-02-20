var path = require('path');

module.exports = {
  context: path.resolve('src'),
  entry: './app.js',
  output: {
    path: path.resolve('src/'),
    publicPath: path.resolve('/src/'),
    filename: './bundle.js'
  },
  devServer: {
    contentBase: __dirname,
    inline: true
  },
  devtools: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel",  query: { presets: ['es2015']}},
      { test: /\.css/, exclude: /node_modules/, loader: "style-loader!css-loader"},
      { test: /\.html$/, loader: 'raw' }
    ]
  },
  resolve: ['', '.js']
};