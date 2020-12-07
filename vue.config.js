/*
 * @Description: 
 * @Date: 2020-12-02 11:20:23
 * @LastEditTime: 2020-12-04 21:31:20
 * @FilePath: /giftBag/vue.config.js
 */
const webpack = require("webpack");

module.exports = {
    devServer: {
        host: 'localhost',
        proxy: {
            '/': {
                target: 'http://ls.im30.net',
                changeOrigin: true,
            }
        }
    },
    publicPath: './',
    chainWebpack(config) {
          if (process.env.NODE_ENV === 'production') {
            config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
          }
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