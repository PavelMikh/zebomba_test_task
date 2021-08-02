const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 4200,
    hot: true
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {},
        }, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ],
  },
}