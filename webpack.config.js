const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/pages/index/index.js',
  },
  output: {
    filename: './js/[name].[hash].js',//生成的js文件名
    chunkFilename: './js/[name].bundle.js',//懒加载导入的文件名
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),//清除dist目录多余文件
    // new ProvidePlugin({
    //   _: 'lodash'
    // }),
    new HtmlWebpackPlugin({
      //生成index.html并自动导入js文件
      title: 'TTentau的博客',
      filename: 'index.html',
      template: './src/pages/index/index.html',
      chunks: ['index'],
      minify: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/, use: [{
          loader: 'url-loader',
          // options: {
          //     name: '[name].[ext]',
          //     publicPath: "./images/",
          //     outputPath: "images/"
          // }
          options: {
            limit: 8192,//限制打包图片的大小：
            //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
            name: 'images/[name].[ext]',//images:图片打包的文件夹；
            //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
          }
        }]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            // 处理html 引用的图片
            attrs: ['img:src'],
            // 开启 html模板功能
            interpolate: true
          }
        }
      },
      {
        //注意还要装@babel/runtime。不然报错
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader']
      }
    ]
  },
}