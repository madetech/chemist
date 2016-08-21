import { check } from 'tcp-port-used'

function listen (app, port) {
  return new Promise((accept, reject) => {
    check(parseInt(port, 10), 'localhost').then(isUsed => {
      if (isUsed) return accept(null)

      const server = app.listen(port, err => {
        if (err) reject(err)
        accept(server)
      })

      return server
    })
  })
}

export default function startTestServers (serverConfig) {
  const listeners = Object.keys(serverConfig).map(port =>
    listen(serverConfig[port], port)
  )

  const onExit = (servers) => {
    process.on('exit', () => servers.forEach(server => server && server.close()))
  }

  return Promise.all(listeners)
    .then(servers => onExit(servers))
    .catch(err => { throw err })
}
