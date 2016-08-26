import fs from 'fs'
import path from 'path'
import { fork } from 'child_process'
import { denodeify } from 'promise'
import expectAllFiles from '../../helper/expectAllFiles'

const readFile = denodeify(fs.readFile, 1)

const TEST_APP_DIR = path.join(__dirname, '../../../test-app')

const generate = (command) => {
  const generateCommand = ['generate'].concat(command.split(' '))
  return new Promise(accept =>
    fork('../dist/bin/cli', generateCommand, { cwd: TEST_APP_DIR, silent: true })
      .on('close', accept)
  )
}

describe('CLI', function () {
  this.timeout(5000)
  describe('chemist generate component', function () {
    it('should create a new component', async function () {
      const fpath = path.join(TEST_APP_DIR, 'shared/components/Person/index.js')

      await generate('component Person name:string:required age:number')
      await expectAllFiles([fpath])

      const contents = await readFile(fpath)
      expect(contents.toString().replace(/[\n|\s]{1,}/g, ' ')).to.include(
        'static propTypes = { name: PropTypes.string.isRequired, age: PropTypes.number }'
      )
    })
  })

  describe('chemist generate container', function () {
    it('should create a new component', async function () {
      const fpath = path.join(TEST_APP_DIR, 'shared/containers/PostPage/index.js')

      await generate('container PostPage')
      await expectAllFiles([fpath])

      const contents = await readFile(fpath)
      expect(contents.toString().replace(/[\n|\s]{1,}/g, ' ')).to.include(
        'return ( <section> <h1>PostPage</h1> </section> )'
      )
    })
  })
})
