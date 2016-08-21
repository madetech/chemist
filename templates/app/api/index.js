import 'isomorphic-fetch'
import fetchival from 'fetchival'
import app from './app'
import config from '../config'

fetchival.fetch = fetch
global.fetchival = fetchival

app.listen(config.apiPort, (err) => {
  if (err) console.error(err)
  console.info('----\n==> 🌎  API is running on port %s', config.apiPort)
})
