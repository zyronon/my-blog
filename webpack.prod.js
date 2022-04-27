const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPlugin = require("_html-webpack-plugin@3.2.0@html-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: './css/[name].[hash].css',
      chunkFilename: './css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      //生成index.html并自动导入js文件
      title: 'TTentau的博客',
      filename: 'index.html',
      template: './src/pages/index/index.html',
      chunks: ['index'],
      minify: {
        removeRedundantAttributes: true, // 删除多余的属性
        collapseWhitespace: true, // 折叠空白区域
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
      },
    }),
  ],
  output: {
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          //提取css到单个文件
          MiniCssExtractPlugin.loader,//热更新功能不行。
          'css-loader',
          'less-loader'
        ],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ]
  }
})
