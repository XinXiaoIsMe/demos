const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Log = require('./plugins/Log')

module.exports = {
  entry: './main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: resolve(__dirname, 'loaders/cssLoader.js'),
        options: {
          extract: true,
          commonPath: 'css'
        }
      },
      {
        test: /\.vss$/,
        use: [
          {
            loader: resolve(__dirname, 'loaders/cssLoader.js')
          },
          {
            loader: resolve(__dirname, 'loaders/vssLoader.js')
          }
        ],
        
      }
    ]
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new Log(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html')
    })
  ]
}