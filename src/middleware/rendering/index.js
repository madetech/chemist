import React from 'react'
import ReactDOM from 'react-dom/server'
import cookie from 'react-cookie'
import { match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { loadOnServer } from 'redux-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import { loadNamespaces } from 'react-i18next'

import HTMLComponent from './HTMLComponent'
import ServerApp from './ServerApp'

export default function (options) {
  const { client, configureStore, configureRoutes, stylesheet, webpackIsomorphicTools } = options

  return function rendering (req, res) {
    if (__DEVELOPMENT__ && webpackIsomorphicTools) {
      webpackIsomorphicTools.refresh()
    }

    const memoryHistory = createHistory(req.originalUrl)
    const store = configureStore(memoryHistory, client)
    const history = syncHistoryWithStore(memoryHistory, store)
    const unplug = cookie.plugToRequest(req, res)

    function renderPage (status, props = {}) {
      const html = ReactDOM.renderToStaticMarkup(
        <HTMLComponent
          {...props}
          assets={webpackIsomorphicTools.assets()}
          store={store}
          i18n={req.i18n}
          stylesheet={stylesheet}
        />
      )

      res.status(status).send(`<!doctype html>\n${html}`)
      unplug()
    }

    const routeConfig = {
      history,
      routes: configureRoutes(store),
      location: req.originalUrl
    }

    match(routeConfig, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search)
        unplug()
      } else if (error) {
        renderPage(500)
      } else if (renderProps) {
        loadOnServer({ ...renderProps, store, helpers: { client } })
          .then(() => loadNamespaces({ ...renderProps, i18n: req.i18n }))
          .then(() => {
            const notFound = renderProps.routes.some((route) => route.status === 404)
            const statusCode = notFound ? 404 : 200
            const component = (
              <ServerApp
                renderProps={renderProps}
                req={req}
                store={store}
              />
            )

            global.navigator = { userAgent: req.headers['user-agent'] }
            renderPage(statusCode, { component })
          })
          .catch(err => { throw err })
      }
    })
  }
}
