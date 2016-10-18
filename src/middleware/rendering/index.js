import React from 'react'
import ReactDOM from 'react-dom/server'
import cookie from 'react-cookie'
import chalk from 'chalk'
import { match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { loadOnServer } from 'redux-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import { loadNamespaces } from 'react-i18next'

import HTMLComponent from './HTMLComponent'
import ServerApp from './ServerApp'

export default function (options) {
  const {
    appConfig,
    client,
    configureStore,
    configureRoutes,
    stylesheet,
    webpackIsomorphicTools
  } = options

  return function rendering (req, res, next) {
    if (__DEVELOPMENT__ && webpackIsomorphicTools) {
      webpackIsomorphicTools.refresh()
    }

    const memoryHistory = createHistory(req.originalUrl)
    const store = configureStore(memoryHistory, client)
    const history = syncHistoryWithStore(memoryHistory, store)
    const unplug = cookie.plugToRequest(req, res)

    function renderPage (props) {
      return ReactDOM.renderToStaticMarkup(
        <HTMLComponent
          {...props}
          appConfig={appConfig}
          assets={webpackIsomorphicTools.assets()}
          store={store}
          i18n={req.i18n}
          stylesheet={stylesheet}
        />
      )
    }

    function renderAndRespond (status, props = {}) {
      try {
        const html = renderPage(props)
        res.status(status).send(`<!doctype html>\n${html}`)
        unplug()
      } catch (e) {
        console.error(chalk.red('Chemist could not render the page.'))
        next(e)
      }
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
        renderAndRespond(500)
      } else if (renderProps) {
        loadOnServer({ ...renderProps, store, helpers: { client } })
          .then(() => loadNamespaces({ ...renderProps, i18n: req.i18n }))
          .then(() => {
            const notFound = renderProps.routes.some((route) => route.status === 404)
            const statusCode = notFound ? 404 : 200
            const component = (
              <ServerApp
                appConfig={appConfig}
                renderProps={renderProps}
                req={req}
                store={store}
              />
            )

            global.navigator = { userAgent: req.headers['user-agent'] }
            renderAndRespond(statusCode, { component })
          })
          .catch(err => { throw err })
      }
    })
  }
}
