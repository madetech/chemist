import path from 'path'
import expectAllFiles from '../../helper/expectAllFiles'

const TEST_APP_DIR = path.join(__dirname, '../../../test-app')

describe('CLI', function () {
  describe('chemist new', function () {
    it('should create an app skeleton', function () {
      return expectAllFiles([
        path.join(TEST_APP_DIR, 'api/index.js'),
        path.join(TEST_APP_DIR, 'client/index.js'),
        path.join(TEST_APP_DIR, 'server/index.js')
      ])
    })
  })
})
