import httpProxy from 'http-proxy'
import config from '../../config'

const apiHost = `http://${config.apiHost}:${config.apiPort}`
const proxy = httpProxy.createProxyServer({ target: apiHost })

// https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }

  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  const json = { error: 'proxy_error', reason: error.message }
  res.end(JSON.stringify(json))
})

export default function () {
  return function api (req, res) {
    proxy.web(req, res, { target: apiHost })
  }
}
