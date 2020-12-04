/*
 * @Description: 
 * @Date: 2020-12-04 10:00:41
 * @LastEditTime: 2020-12-04 12:07:19
 * @FilePath: /giftBag/webpack.dll.conf.js
 */


const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
 entry: {
    vender:['vue','core-js', 'vuex', 'vue-router',  'axios'],
 },
 output: {
   path: path.join(__dirname, dllPath),
   filename: '[name].dll.js',
   library: '[name]_[hash]'
 },
 plugins: [
   // 清除之前的dll文件
   new CleanWebpackPlugin(['*.*'], {
     root: path.join(__dirname, dllPath)
   }),
   // 设置环境变量
   new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: 'production'
     }
   }),
   // manifest.json 描述动态链接库包含了哪些内容
   new webpack.DllPlugin({
     path: path.join(__dirname, dllPath, '[name]-manifest.json'),
     // 保持与 output.library 中名称一致
     name: '[name]_[hash]',
     context: process.cwd()
   })
 ]
}