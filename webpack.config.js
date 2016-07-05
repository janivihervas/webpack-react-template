/* eslint no-var: 0 */

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSCSS = new ExtractTextPlugin('styles.[contenthash].css');

var PACKAGE_JSON = require('./package.json');
var SRC_PATH = path.join(__dirname, 'app');
var TEST_PATH = path.join(__dirname, 'test');
var IMAGES_PATH = path.join(SRC_PATH, 'images');
var DIST_PATH = path.join(__dirname, 'dist');

var PRODUCTION = process.env.NODE_ENV === 'production';

function getEntry() {
  var entries = [
    'babel-polyfill',
    path.join(SRC_PATH, 'index.js')
  ];

  if (PRODUCTION) {
    return {
      app: entries,
      vendor: Object.keys(PACKAGE_JSON.dependencies).filter(
        function (d) {
          return d !== 'normalize.css';
        }
      )
    };
  }

  return entries
    .concat([
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ]);
}

function getOutput() {
  if (PRODUCTION) {
    return {
      path: DIST_PATH,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js'
    };
  }

  return {
    filename: 'bundle.js'
  };
}

function getLoaders() {
  var loaders = [
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      include: IMAGES_PATH,
      loader: 'url-loader?limit=100000'
    }
  ];

  if (PRODUCTION) {
    return loaders
      .concat([
        {
          test: /\.jsx?$/,
          loaders: ['babel-loader'],
          include: SRC_PATH
        },
        {
          test: /\.scss$/,
          include: SRC_PATH,
          loader: extractSCSS.extract('style-loader',
            '!css-loader!postcss-loader!sass-loader')
        }
      ]);
  }

  return loaders
    .concat([
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?cacheDirectory'],
        include: SRC_PATH
      },
      {
        test: /\.scss$/,
        include: SRC_PATH,
        loader: 'style-loader' +
        '!css-loader!postcss-loader!sass-loader'
      }
    ]);
}

function getPlugins() {
  if (PRODUCTION) {
    return [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new StyleLintPlugin({
        failOnError: true,
        syntax: 'scss'
      }),
      new WebpackMd5Hash(),
      extractSCSS,
      new HtmlWebpackPlugin({
        template: path.join(SRC_PATH, 'index.html'),
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ];
  }

  return [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({
      failOnError: false,
      syntax: 'scss'
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'index.html'),
      inject: 'body'
    })
  ];
}

var config = {
  context: SRC_PATH,
  entry: getEntry(),
  output: getOutput(),
  devtool: 'inline-source-map',
  // Use this line, if you don't wish to include source maps for dist
  // devtool: PRODUCTION ? null : 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: [
          SRC_PATH,
          TEST_PATH
        ],
        loader: 'eslint-loader'
      }
    ],
    loaders: getLoaders()
  },
  postcss: [
    autoprefixer({browsers: ['last 3 versions']})
  ],
  stylelint: {
    configFile: path.join(__dirname, './.stylelintrc')
  },
  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    progress: true,
    colors: true,
    hot: true,
    inline: true,
    contentBase: SRC_PATH,
    stats: 'errors-only',
    host: 'localhost',
    port: 8080
  },
  plugins: getPlugins()
};

module.exports = config;
