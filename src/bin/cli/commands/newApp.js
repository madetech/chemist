import path from 'path'
import filegen from 'filegen'
import * as Logger from '../helpers/logger'

export default function newApp (name, directory) {
  console.log(name)
  console.log(directory)

  const gen = filegen({
    templatesDir: path.join(__dirname, '../templates'),
    cwd: directory || path.join(process.cwd(), name)
  })

  gen('app', { name })
    .then(() => Logger.success(`Created ${name}`))
    .catch(err => Logger.error(err))
}
