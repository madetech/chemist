import { fork, spawn } from 'child_process'
import path from 'path'
import rimraf from 'rimraf'

const cwd = path.join(__dirname, '../')

const scaffold = cb =>
  fork('dist/bin/cli', ['new', 'test-app'], { cwd })
    .on('close', cb)

const build = cb =>
  spawn('npm', ['run', 'build'])
    .on('close', () => scaffold(cb))

before(function (done) {
  this.timeout(5000)
  build(done)
})

after(done => rimraf(path.join(cwd, 'test-app'), done))
