import path from 'path'
import webpack from 'webpack'
import CleanPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import strip from 'strip-loader'
import config from '../'

const assetsPath = path.resolve(process.cwd(), './static/dist')
const webpackIsoConfig = config('webpack-isomorphic-tools')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsoConfig)

export default function () {
  return {
    devtool: 'source-map',
    context: process.cwd(),
    entry: {
      main: ['./client/index.js']
    },
    output: {
      path: assetsPath,
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/dist/'
    },
    module: {
      loaders: [
        {
          test: /\.translations$/,
          exclude: /node_modules/,
          loader: 'i18next-resource-store-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: [strip.loader('debug'), 'babel']
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.scss$/,
          exclude: /shared\/vendor/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
        },
        {
          test: /\.scss$/, include: /shared\/vendor/, loader: ExtractTextPlugin.extract('style', 'css!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: webpackIsomorphicToolsPlugin.regular_expression('images'),
          loader: 'url-loader?limit=10240'
        }
      ]
    },
    progress: true,
    resolve: {
      modulesDirectories: [
        'shared',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
      new CleanPlugin([assetsPath], { root: process.cwd() }),
      new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"production"' },
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __TEST__: false
      }),
      new webpack.IgnorePlugin(/\.\/development/, /\/config$/),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      webpackIsomorphicToolsPlugin
    ]
  }
}
