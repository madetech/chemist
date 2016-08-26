import config from '../../src/config'
import developmentConfig from '../fixtures/json/developmentWebpackConfig'
import productionConfig from '../fixtures/json/productionWebpackConfig'

describe('Webpack Config', function () {
  describe('Development', function () {
    before(() => { process.env.NODE_ENV = 'development' })
    after(() => { process.env.NODE_ENV = 'test' })

    it('should give correct development config', function () {
      expect(JSON.stringify(config('webpack'))).to.eq(JSON.stringify(developmentConfig))
    })
  })

  describe('Production', function () {
    before(() => { process.env.NODE_ENV = 'production' })
    after(() => { process.env.NODE_ENV = 'test' })

    it('should give correct production config', function () {
      expect(JSON.stringify(config('webpack'))).to.eq(JSON.stringify(productionConfig))
    })
  })
})
