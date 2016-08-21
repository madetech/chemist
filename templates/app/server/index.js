import 'isomorphic-fetch'
import fetchival from 'fetchival'
import server from './app'
import config from '../config'

fetchival.fetch = fetch
global.fetchival = fetchival

server.listen(config.port, (err) => {
  if (err) console.error(err)
  console.info(`==> ✅  ${config.app.title} is running. Open http://${config.host}:${config.port}`)
})
