import config from '../'

export default function () {
  const appConfig = config('index')
  const webpackConfig = config('webpack')
  const { host, webpackPort } = appConfig

  return {
    contentBase: `http://${host}:${webpackPort}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  }
}
