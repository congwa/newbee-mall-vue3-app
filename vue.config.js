/*
 * @Description: 
 * @Date: 2020-12-02 11:20:23
 * @LastEditTime: 2020-12-08 15:40:03
 * @FilePath: /giftBag/vue.config.js
 */
const webpack = require("webpack");

module.exports = {
    productionSourceMap: false,
    devServer: {
        host: 'localhost',
        hot: false,
        liveReload: false,
        proxy: {
            '/': {
                target: 'http://ls.im30.net',
                changeOrigin: true,
            }
        }
    },
    publicPath: 'http://img-10048861.file.myqcloud.com/wechat/',
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