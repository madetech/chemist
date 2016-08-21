import path from 'path'
import fs from 'fs'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import * as Logger from '../helpers/logger'

const configPath = path.join(process.cwd(), './config')
let config = {}
if (fs.existsSync(configPath)) {
  config = require(configPath)
}

export default function watch () {
  process.env.UV_THREADPOOL_SIZE = 100
  const webpackConfig = require('../../../config/webpack/development.config')

  const compiler = webpack(webpackConfig)
  const host = config.host || 'localhost'
  const port = config.webpackPort || 3001
  const app = express()

  const serverOptions = {
    contentBase: `http://${host}:${port}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  }

  app.use(webpackDevMiddleware(compiler, serverOptions))
  app.use(webpackHotMiddleware(compiler))
  app.listen(port, function (err) {
    if (err) {
      Logger.error(err)
    } else {
      Logger.success(`Webpack Development Server listening on port ${port}`)
    }
  })
}
