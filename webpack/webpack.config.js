const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Webpack App',
            template: './public/index.html',
            filename: 'index.html',
            // inject: 'body',
            // minify: {
            //     collapseWhitespace: true,
            //     removeComments: true,
            //     removeRedundantAttributes: true,
            //     removeScriptTypeAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     useShortDoctype: true,
            //     minifyCSS: true,
            //     minifyJS: true,
            //     minifyURLs: true,
            //     removeAttributeQuotes: true,
            //     removeEmptyAttributes: true,
            //     removeOptionalTags: true,
            //     removeRedundantAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     removeComments: true,
            //     removeEmptyElements: true,
            //     removeOptionalTags: true,
            //     removeRedundantAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     removeComments: true,
            //     removeEmptyElements: true,
            // }
        })
    ]
}