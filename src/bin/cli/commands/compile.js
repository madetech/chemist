import webpack from 'webpack'
import * as Logger from '../helpers/logger'

export default function compile () {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  const config = require('../../../config/webpack/production.config')

  webpack(config, function (err, stats) {
    if (err) throw err

    const { errors, warnings, assetsByChunkName } = stats.toJson()
    if (errors.length > 0) errors.map(webpackError => Logger.error(webpackError))
    if (warnings.length > 0) warnings.map(webpackWarning => Logger.warn(webpackWarning))

    Logger.success(`Succesfully compiled ${assetsByChunkName.main.join(', ')}`)
  })
}
