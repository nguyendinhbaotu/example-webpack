var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AwesomeTypescriptLoader = require('awesome-typescript-loader');
var fs = require('fs');
var glob = require('glob');

var src = 'src/';
var realPath = fs.realpathSync(__dirname + '/' + src);
var plugins = new Array();
var locales = ['en_US'];
var pages = glob.sync(src + '**/*.html');
locales.map(locale => {
    pages.map(page => {
        plugins.push(new HtmlWebpackPlugin({
            locale: locale,
            filename: locale + '/' + page.replace(realPath, '').replace(src, ''),
            template: page,
            chunks: [locale + '/i18n', 'index'],
            chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
        }));
    });
});
// plugins.push(new AwesomeTypescriptLoader());

console.log(plugins);
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
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: plugins,
    externals: [
        '@app/i18n'
    ]
}


