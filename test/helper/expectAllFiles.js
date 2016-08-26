import fs from 'fs'

function exists (fpath) {
  return new Promise(function (accept) {
    fs.stat(fpath, err => accept(!err))
  })
}

export default function expectAllFiles (files) {
  return Promise.all(files.map(exists))
    .then(checked => expect(checked).to.not.include(false))
}
