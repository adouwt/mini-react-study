const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = {
    entry : './src/index.jsx',
    output: {
        filename: 'dist.js'
    },
    module: { // 所有第三方模块的匹配规则， webpack默认只能处理.js后缀名的文件，需要安装第三方loader
        rules: [
            {
                test: /\.jsx/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /(node_modules)/, // 千万别忘记添加exclude选项,不然运行可能会报错
            }, 
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: 'index.html'
        })
    ],
    mode:'development',
    devtool:'source-map', // 支持source-map 本地调试
}