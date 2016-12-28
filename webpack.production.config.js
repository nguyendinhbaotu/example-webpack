const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const babelConfig = JSON.stringify({
  presets: [
    [ 'babel-preset-es2015', { modules: false } ]
  ]
});

const plugins = require('./webpack/plugins.js');

console.log(plugins);
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
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader: `babel-loader?${babelConfig}!awesome-typescript-loader`
      },
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract('css-loader?sourceMap&context=/')
      }
    ]
  },
  plugins: plugins,
  externals: [
    '@foo/i18n'
  ]
};
