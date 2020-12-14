/*
 * @Description: 
 * @Date: 2020-12-02 11:20:23
 * @LastEditTime: 2020-12-11 12:08:46
 * @FilePath: /giftBag/vue.config.js
 */
const webpack = require("webpack");

module.exports = {
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                target: 'http://ls.im30.net',
                changeOrigin: true,
            }
        }
    },
    // publicPath: process.env.NODE_ENV === 'production'? 'http://img-10048861.file.myqcloud.com/wechat/': './',
    publicPath: './',
    // baseUrl: './',
    chainWebpack(config) {
          if (process.env.NODE_ENV === 'production') {
            config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
          }

          config.when(process.env.NODE_ENV !== 'development', config => {
            config.optimization.minimizer('terser').tap(options => {
                      options[0].terserOptions.compress.drop_console = true
                      return options
                })
        })
    },
    configureWebpack: {
        plugins:process.env.NODE_ENV === 'production'? [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require('./public/vendor/vender-manifest.json')
            })
        ]: []
    },
}