/*
 * @Description: 
 * @Date: 2020-12-02 11:20:23
 * @LastEditTime: 2020-12-02 20:54:34
 * @FilePath: /giftBag/vue.config.js
 */
module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://ls.im30.net',
                changeOrigin: true,
            }
        }
    },
    publicPath: './'
}