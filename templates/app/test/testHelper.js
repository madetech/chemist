import 'jsdom-global/register'
import 'isomorphic-fetch'
import fetchival from 'fetchival'
import path from 'path'
import sepia from 'sepia'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import createFeature from 'mocha-react-feature'
import config from '../config'
import configureWrapperAndStore from './helper/configureWrapperAndStore'

global.__DEVELOPMENT__ = true
global.__CLIENT__ = false
global.__SERVER__ = true
global.__TEST__ = true

fetchival.fetch = fetch
global.fetchival = fetchival
global.APP_HOST = `http://${config.host}:${config.port}`
global.expect = chai.expect
global.feature = createFeature(configureWrapperAndStore)

sepia.filter({ url: /localhost/, forceLive: true })
sepia.fixtureDir(path.join(__dirname, './fixtures/generated'))

chai.use(chaiEnzyme())
