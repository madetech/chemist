import fs from 'fs'
import path from 'path'

function exists (fpath) {
  return new Promise(function (accept) {
    fs.stat(fpath, err => accept(!err))
  })
}

describe('CLI', function () {
  describe('chemist new', function () {
    it('should create an app skeleton', function () {
      const testApp = path.join(__dirname, '../../../test-app')
      const files = [
        'api/index.js',
        'client/index.js',
        'server/index.js'
      ]

      return Promise
        .all(files.map(file => exists(path.join(testApp, file))))
        .then(checked => expect(checked).to.not.include(false))
    })
  })
})
