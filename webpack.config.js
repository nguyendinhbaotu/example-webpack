var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AwesomeTypescriptLoader = require('awesome-typescript-loader')
module.exports = {
    entry: {
        'index': './src/index.ts',
        'de_DE/i18n': './i18n/de_DE.js',
        'en_US/i18n': './i18n/en_US.js'
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
        publicPath: "/dist/"
    },
    // resolve: {
    //     extensions: ['.css', '.ts', '.tsx', '.js', '.jsx']
    // },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ["css-loader"]
            }
        ]
    },
    plugins: [
        // an instance of the plugin must be present
        new HtmlWebpackPlugin({
            locale: 'de_DE',
            filename: 'de_DE/index.html',
            template: 'src/index.html',
            chunks: ['de_DE/i18n', 'index'],
            chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
        }),
        new HtmlWebpackPlugin({
            locale: 'en_US',
            filename: 'en_US/index.html',
            template: 'src/index.html',
            chunks: ['en_US/i18n', 'index'],
            chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
        }),
    ],
    externals: [
        '@app/i18n'
    ]
}