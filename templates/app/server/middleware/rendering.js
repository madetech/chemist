import { createApiClient, renderingMiddleware } from 'chemist'
import configureStore from '../../shared/store'
import configureRoutes from '../../shared/routes'
import { apiHost, apiPort } from '../../config'

export default function () {
  return function rendering (req, res, next) {
    const stylesheet = require('../../shared/containers/App/style.scss')._style

    const client = createApiClient({ host: apiHost, port: apiPort, req })
    const middleware = renderingMiddleware({
      client,
      configureStore,
      configureRoutes,
      stylesheet,
      webpackIsomorphicTools
    })

    middleware(req, res, next)
  }
}
