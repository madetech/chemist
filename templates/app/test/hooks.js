import path from 'path'
import webpackConfig from 'chemist/dist/config/webpack/webpack-isomorphic-tools'
import config from '../config'
import startTestServers from './helper/startTestServers'
import renderingServer from '../server/app'
import apiServer from '../api/app'

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')

before(function (done) {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackConfig)
    .development(true)
    .server(path.resolve(__dirname, '..'), () =>
      startTestServers({
        [config.apiPort]: apiServer,
        [config.port]: renderingServer
      }).then(() => done())
    )
})
