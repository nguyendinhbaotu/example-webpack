require('css-loader');
require('style-loader');
var path = require('path');
const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = JSON.stringify({
  presets: [
    ['babel-preset-es2015', { modules: false }]
  ]
});

/**
 * Html Translation
 *
 */
// const en = require('./src/i18n/en.json');
// console.log(en);
const fs = require('fs');
const glob = require('glob');
const src = 'src/';
const realPath = fs.realpathSync(__dirname + '/' + src);
var plugins = new Array();
var locales = ['en_US', 'de_DE'];
var pages = glob.sync(src + '**/*.html');
locales.map(locale => {
  pages.map(page => {
    plugins.push(new HtmlWebpackPlugin({
      locale: locale,
      filename: locale + '/' + page.replace(realPath, '').replace(src, ''),
      template: page,
      chunks: ['i18n/' + locale, 'app'],
      chunksSortMode: (a, b) => a.names[0] === 'app' ? 1 : 0
    }));
  });
});
module.exports = {
  entry: {
    'app': './src/app.ts',
    'i18n/de_DE': './i18n/de_DE.js',
    'i18n/en_US': './i18n/en_US.js',
  },
  output: {
    libraryTarget: 'umd',
    filename: 'js/[name].js',
    path: root('dist')
  },
  module: {
    loaders: [
      {
        test: /\.(jpg|png)$/,
        use: 'url-loader?limit=100000',
        exclude: [/(node_modules)/],
        include: root('src', 'images')
      },
      {
        test: /\.js$/,
        loaders: [`babel-loader?${babelConfig}`],
        exclude: [/(node_modules)/]
      },
      {
        test: /\.ts$/,
        loaders: [`babel-loader?${babelConfig}`, `awesome-typescript-loader`],
        exclude: [/(node_modules)/]
      },
      {
        test: /\.css$/, loaders: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: plugins,
  externals: [
    '@foo/i18n'
  ]
};

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}