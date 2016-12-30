require('css-loader');
require('style-loader');
require('raw-loader');

const path = require('path');
const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const StringReplacePluginLoader = StringReplacePlugin.replace({
  replacements: [
    {
      pattern: /i18n.(\w*?)/ig,
      replacement: function (match, p1, offset, string) {
        return '';
      }
    }
  ]
});
const babelConfig = JSON.stringify({
  presets: [
    ['babel-preset-es2015', { modules: false }]
  ]
});

/**
 * Html Translation
 *
 */
const src = './src/';
const i18n = `${src}i18n/`;
const dist = '/dist/';
const fs = require('fs');
const glob = require('glob');
var resourceNames = glob.sync(`${i18n}*.json`);
var resources = resourceNames.map(resourceName => {
  return {
    name: resourceName.replace(i18n, '').replace('.json', ''),
    data: require(resourceName)
  }
})
var pages = glob.sync(src + '**/*.html');

/**
 * Configs
 *
 */
var configs = [];
resources.forEach(function (resource) {
  var plugins = [];
  plugins = pages.map(page => {
    return new HtmlWebpackPlugin({
      resource: resource,
      filename: page.replace(src, ''),
      template: page,
      chunks: ['app'],
      chunksSortMode: (a, b) => a.names[0] === 'app' ? 1 : 0
    });
  });
  plugins.push(new I18nPlugin(resource.data));
  plugins.push(new StringReplacePlugin());

  configs.push({
    name: resource.name,
    entry: {
      'app': `${src}app.ts`
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist', resource.name),
    },
    module: {
      loaders: [
        {
          test: /\.(jpg|png)$/,
          use: 'url-loader?limit=100000',
          exclude: [/(node_modules)/],
          include: `${src}images`
        },
        {
          test: /\.(svg)$/,
          loader: 'raw-loader'
        },
        {
          test: /\.js$/,
          loaders: [`babel-loader?${babelConfig}`, StringReplacePluginLoader],
          exclude: [/(node_modules)/]
        },
        {
          test: /\.ts$/,
          loaders: [`babel-loader?${babelConfig}`, StringReplacePluginLoader, `ts-loader`],
          exclude: [/(node_modules)/]
        },
        {
          test: /\.css$/, loaders: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: plugins,
  })
}, this);
module.exports = configs;