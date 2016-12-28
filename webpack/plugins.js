const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const glob = require('glob');
const src = './src/';
const realPath = fs.realpathSync(src);
var plugins = new Array();
var locales = ['en_US', 'de_DE'];
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
plugins.push(new ExtractTextWebpackPlugin('style.css'));