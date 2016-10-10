import React from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

export default function HTMLComponent ({ appConfig, assets, component, store, i18n, stylesheet }) {
  const content = component ? ReactDOM.renderToString(component) : ''
  const head = !__TEST__ && Helmet.rewind()

  return (
    <html lang="en">
      <head>
        {head && head.base.toComponent()}
        {head && head.title.toComponent()}
        {head && head.meta.toComponent()}
        {head && head.link.toComponent()}
        {head && head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Production */}
        { Object.keys(assets.styles).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
        )}

        {/* Development */}
        { Object.keys(assets.styles).length === 0
          ? <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          : null }
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
          charSet="UTF-8"
        />
        <script
          dangerouslySetInnerHTML={{ __html: `window.__locale='${i18n.language}'` }}
          charSet="UTF-8"
        />
        <script
          dangerouslySetInnerHTML={{ __html: `window.__appConfig='${serialize(appConfig)}'` }}
          charSet="UTF-8"
        />
        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  )
}
