import { renderingMiddleware } from 'chemist'

export default function () {
  return function rendering (req, res, next) {
    const stylesheet = require('../../shared/containers/App/style.scss')._style

    renderingMiddleware({ stylesheet, webpackIsomorphicTools })(req, res, next)
  }
}
