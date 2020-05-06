const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const copyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization:{
        minimizer: [ new optimizeCssAssetsPlugin]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude:/styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    attributes: false,
                },
            },
            {
                test: /\.(png|svg|jpm)$/,
                use:
                {
                    loader:'file-loader',
                    options: {
                        esModule: false
                    }
                }
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        new miniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new copyPlugin ([
            {from: 'src/assets', to: 'assets/'} 
        ])
    ]

}