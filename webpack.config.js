var path = require('path');
const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const babelConfig = JSON.stringify({
  presets: [
    ['babel-preset-es2015', { modules: false }]
  ]
});


/**
 * Html Translation
 *
 */
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
      chunks: [locale + '/i18n', 'index'],
      chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
    }));
  });
});
plugins.push(new ExtractTextWebpackPlugin('[name].css'));

module.exports = {
  entry: {
    'index': './src/index.ts',
    'de_DE/i18n': './i18n/de_DE.js',
    'en_US/i18n': './i18n/en_US.js'
  },
  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: join(process.cwd(), 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader'],
        exclude: [/node_modules\/(?!(ng2-.+))/]
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
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