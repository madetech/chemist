import path from 'path'
import createConfig from '../../src/config/createConfig'

const config = createConfig([path.join(__dirname, '../fixtures/config')])

describe('createConfig', function () {
  it('creates a function which returns config from the given directories', function () {
    expect(config).to.be.a('function')
  })
})

describe('config', function () {
  it('returns the exports of the file you pass in', function () {
    expect(config('test')).to.have.all.keys('a', 'b', 'c')
  })

  it('merges config for the current environment into the default config', function () {
    expect(config('test')).to.deep.equal({ a: 1, b: 12, c: 3 })
  })
})
