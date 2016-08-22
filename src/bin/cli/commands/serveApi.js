import path from 'path'
import piping from 'piping'

export default function serveApi () {
  const babelrc = require('../../../config/loadBabelrc')()
  const apiPath = path.join(process.cwd(), './api')

  if (process.env.NODE_ENV === 'development') {
    const pipes = piping({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })

    if (!pipes) return
  }

  require('babel-register')(babelrc)
  require(apiPath)
}
