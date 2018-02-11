const path = require("path")
const webpack = require("webpack")
const autoprefixer = require("autoprefixer")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

process.env.NODE_ENV = process.env.NODE_ENV || "development"
const ENV = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
}

const SRC_PATH = path.join(__dirname, "app")
const DIST_PATH = path.join(__dirname, "dist")
const PRODUCTION = process.env.NODE_ENV === "production"

const extractAppStyles = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
})
const extractVendorStyles = new ExtractTextPlugin({
  filename: "vendor.[contenthash].css",
})

function getEntry() {
  return [path.join(SRC_PATH, "index.tsx")]
}

function getOutput() {
  if (PRODUCTION) {
    return {
      path: path.join(DIST_PATH, "assets"),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js",
      publicPath: "/",
    }
  }

  return {
    filename: "bundle.js",
    publicPath: "/",
  }
}

function getRules() {
  const noSourceMap = {sourceMap: false}
  const styleLoader = {loader: "style-loader", options: noSourceMap}
  const cssLoader = {
    loader: "css-loader",
    options: {...noSourceMap, minimize: PRODUCTION, importLoaders: true},
  }
  const postCssLoader = {
    loader: "postcss-loader",
    options: {
      ...noSourceMap,
      plugins: [
        autoprefixer({
          grid: true,
        }),
      ],
    },
  }
  const sassLoader = {loader: "sass-loader", options: noSourceMap}
  const fileLoaderOpts = {
    name: "[name].[hash].[ext]",
  }
  const urlLoaderOpts = {...fileLoaderOpts, limit: 10000}
  const babelLoader = {loader: "babel-loader", options: {cacheDirectory: true}}

  const images = [
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      include: [SRC_PATH],
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      ],
    },
  ]
  const fontsDev = [
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {
            mimetype: "font/woff",
          },
        },
      ],
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: "url-loader", options: {mimetype: "font/woff2"}}],
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {
            mimetype: "application/octet-stream",
          },
        },
      ],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {mimetype: "application/vnd.ms-fontobject"},
        },
      ],
    },
  ]
  const fontsProd = [
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {...urlLoaderOpts, mimetype: "font/woff"},
        },
      ],
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {...urlLoaderOpts, mimetype: "font/woff2"},
        },
      ],
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {...urlLoaderOpts, mimetype: "application/octet-stream"},
        },
      ],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: "file-loader", options: fileLoaderOpts}],
    },
  ]

  if (PRODUCTION) {
    return [
      ...images,
      ...fontsProd,
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        use: [babelLoader],
      },
      {
        test: /\.tsx?$/,
        include: SRC_PATH,
        use: [babelLoader, {loader: "ts-loader"}],
      },
      {
        test: /\.scss$/,
        include: SRC_PATH,
        loader: extractAppStyles.extract({
          fallback: "style-loader",
          use: [cssLoader, postCssLoader, sassLoader],
        }),
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, "node_modules"),
        loader: extractVendorStyles.extract({
          fallback: "style-loader",
          use: [cssLoader, postCssLoader],
        }),
      },
    ]
  }

  return [
    ...images,
    ...fontsDev,
    {
      test: /\.jsx?$/,
      include: SRC_PATH,
      use: [babelLoader],
    },
    {
      test: /\.tsx?$/,
      include: SRC_PATH,
      use: [babelLoader, {loader: "ts-loader"}],
    },
    {
      test: /\.scss$/,
      include: SRC_PATH,
      loader: [styleLoader, cssLoader, postCssLoader, sassLoader],
    },
    {
      test: /\.css$/,
      loader: [styleLoader, cssLoader, postCssLoader],
    },
  ]
}

function getPlugins() {
  const htmlPluginOptions = {
    template: path.join(SRC_PATH, "index.html"),
    inject: "body",
    // favicon: path.join(SRC_PATH, "favicon.ico")
  }
  let plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(htmlPluginOptions),
  ]

  if (PRODUCTION) {
    plugins = [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        ...htmlPluginOptions,
        filename: path.join(DIST_PATH, "index.html"),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      extractAppStyles,
      extractVendorStyles,
      new CleanWebpackPlugin([DIST_PATH]),
      new UglifyJSPlugin({
        cache: false,
        parallel: true,
        sourceMap: false,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: ({resource}) =>
          resource !== undefined && resource.indexOf("node_modules") !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity,
      }),
    ]
  }

  return plugins.concat([
    new webpack.DefinePlugin({
      "process.env": ENV,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Use this version if you want to enable English and German
    // new webpack.IgnorePlugin(/^\.\/locale\/(en|de)\.js$/, /moment$/),
  ])
}

const config = {
  context: path.resolve(__dirname),
  devtool: PRODUCTION ? false : "inline-source-map",
  resolve: {
    modules: [path.resolve(__dirname), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: SRC_PATH,
    stats: "errors-only",
    host: "127.0.0.1",
    port: 8080,
    publicPath: "/",
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  entry: getEntry(),
  output: getOutput(),
  module: {
    rules: getRules(),
  },
  plugins: getPlugins(),
  performance: PRODUCTION
    ? {
        hints: "error",
      }
    : false,
}

module.exports = config
