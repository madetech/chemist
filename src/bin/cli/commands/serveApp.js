import path from 'path'
import piping from 'piping'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import webpackIsoConfig from '../../../config/webpack/webpack-isomorphic-tools'

export default function serveApp () {
  const serverPath = path.join(process.cwd(), './server')

  global.__CLIENT__ = false
  global.__SERVER__ = true
  global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development'
  global.__TEST__ = false

  if (__DEVELOPMENT__) {
    const pipes = piping({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })

    if (!pipes) return
  }

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsoConfig)
    .development(__DEVELOPMENT__)
    .server(process.cwd(), () => require(serverPath))
}
