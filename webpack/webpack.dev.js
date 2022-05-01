const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader', // 3. Injects styles into DOM
                    'css-loader', // 2. Turns CSS into commonJS
                    'sass-loader' // 1. Turns SASS into CSS
                ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ]
});