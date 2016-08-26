import webpack from 'webpack'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import loadConfig from '../'
import loadBabelrc from '../loadBabelrc'

const webpackIsoConfig = loadConfig('webpack-isomorphic-tools')
const host = (process.env.HOST || 'localhost')
const port = (+process.env.PORT + 1) || 3001
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsoConfig)
const babelrc = loadBabelrc({ client: true })

module.exports = function (config) {
  config.devtool = 'inline-source-map'
  config.entry.main.unshift(`webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`)
  config.output.filename = '[name]-[hash].js'
  config.output.publicPath = `http://${host}:${port}/dist/`

  config.module.loaders = [
    {
      test: /\.translations$/,
      exclude: /node_modules/,
      loader: 'i18next-resource-store-loader'
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [
        `babel?${JSON.stringify(babelrc)}`,
        'eslint-loader'
      ]
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      exclude: /shared\/vendor/,
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
    },
    {
      test: /\.scss$/,
      include: /shared\/vendor/,
      loader: 'style!sass?outputStyle=expanded&sourceMap'
    },
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

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __TEST__: false
    }),
    webpackIsomorphicToolsPlugin.development()
  ]

  return config
}
