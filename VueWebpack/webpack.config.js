// 包含模块
var path=require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

// webpack配置
module.exports = {
  // 获取入口js文件,格式shell.xxx.js/后续优化为函数?
  entry: {
    index : './source/shell.index',
    bank : './source/shell.bank',
    round: './source/shell.round'
  },
  // 输出
  output: {
    path: path.join(__dirname, 'app/js'),   //文件输出目录
    publicPath: "./",   // 配置文件发布路径，不用时注释掉,使用webpack-dev-server必须有此项
    filename: 'build.[name].js',   //根据入口文件输出的对应多个文件名
    chunkFilename: 'app/js/chunk.[id].js'   //chunk生成的配置
  },
  // loader使用简写
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style","css!sass")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
    ]
  },
  babel: {
    presets: ['es2015'] // 编译ES6
  },
  resolve: {
    // 配置别名，在项目中可缩减引用路径
    // 暂无, 留空
    alias: {
      //
    }
  },
  plugins: [
    // 提供全局的变量，在模块中使用无需用require引入
    new webpack.ProvidePlugin({
      $: 'jquery',
      Vue: 'vue'
    }),
    // 将公共代码抽离出来合并为一个文件
    new CommonsChunkPlugin('common.js'),
    // js文件的压缩
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 单独输出css
    new ExtractTextPlugin("../assets/css/[name].css"),
    // 页面模板输出配置
    new HtmlWebpackPlugin(htmlView('index')),
    new HtmlWebpackPlugin(htmlView('bank')),
    new HtmlWebpackPlugin(htmlView('round'))
  ],
  devServer: {
    host: 'localhost',
    port: 8080,   // 默认8080
    hot: false,
    inline: true,
    noInfo: true, // 不显示服务器提示信息
    historyApiFallback: true
  },
  // 生成sourcemap,便于开发调试,不用可去掉
  devtool: 'source-map'
};

// HtmlWebpackPlugin配置对象函数
// @params str:view文件前缀
// @return 单例对象
function htmlView(str) {
  return {
    chunks: [str],   // 需要引入的chunk，不配置就会引入所有页面的资源
    template: './source/view/' + str + '.html',   // html模板路径
    filename: '../' + str + '.html',   // 生成的html存放路径
    inject: 'body'   // js插入的位置，true/'head'/'body'/false
  }
}