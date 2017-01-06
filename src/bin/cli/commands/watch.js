import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../../config'
import * as Logger from '../helpers/logger'

export default function watch () {
  process.env.NODE_ENV = 'development'
  process.env.UV_THREADPOOL_SIZE = 100
  const { app: appConfig } = config('index')
  const webpackConfig = config('webpack')
  const serverConfig = config('webpack-dev-server')

  const compiler = webpack(webpackConfig)
  const port = process.env.WEBPACK_DEV_PORT || appConfig.webpackPort || 3001
  const app = express()

  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))

  app.listen(port, function (err) {
    if (err) {
      Logger.error(err)
    } else {
      Logger.success(`Webpack Development Server listening on port ${port}`)
    }
  })
}
