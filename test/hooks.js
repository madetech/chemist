import { fork, spawn } from 'child_process'
import path from 'path'
import rimraf from 'rimraf'

const TEST_APP_NAME = 'test-app'
const cwd = path.join(__dirname, '../')
const appCwd = path.join(cwd, TEST_APP_NAME)

const install = cb =>
  spawn('npm', ['install'], { cwd: appCwd, silent: true })
    .on('close', () => cb())

const scaffold = cb =>
  fork('dist/bin/cli', ['new', TEST_APP_NAME], { cwd, silent: true })
    .on('close', () => install(cb))

const build = cb =>
  spawn('npm', ['run', 'build'])
    .on('close', () => scaffold(cb))

before(function (done) {
  this.timeout(10000)
  build(done)
})

after(done => rimraf(path.join(cwd, TEST_APP_NAME), done))
