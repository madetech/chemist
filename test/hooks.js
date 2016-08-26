import { fork, spawn } from 'child_process'
import path from 'path'

const TEST_APP_NAME = 'test-app'
const cwd = path.join(__dirname, '../')

const scaffold = cb =>
  fork('dist/bin/cli', ['new', TEST_APP_NAME], { cwd, silent: true })
    .on('close', () => cb())

const build = cb =>
  spawn('npm', ['run', 'build'])
    .on('close', () => scaffold(cb))

before(function (done) {
  this.timeout(10000)
  build(done)
})
