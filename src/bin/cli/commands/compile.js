import webpack from 'webpack'
import config from '../../../config'
import * as Logger from '../helpers/logger'

const logAssetSuccess = assets => Logger.success(`Succesfully compiled ${assets.main}`)

export default function compile () {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'

  webpack(config('webpack'), function (err, stats) {
    if (err) throw err

    const { errors, warnings, children, assetsByChunkName } = stats.toJson()

    if (errors.length > 0) errors.map(webpackError => Logger.error(webpackError))
    if (warnings.length > 0) warnings.map(webpackWarning => Logger.warn(webpackWarning))

    if (Array.isArray(children)) {
      children.forEach(child => logAssetSuccess(child.assetsByChunkName))
    } else {
      logAssetSuccess(assetsByChunkName)
    }
  })
}
