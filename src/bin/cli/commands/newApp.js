import path from 'path'
import filegen from 'filegen'
import * as Logger from '../helpers/logger'

export default function newApp (name, directory) {
  const gen = filegen({
    templatesDir: path.join(__dirname, '../../../../templates'),
    cwd: directory || path.join(process.cwd(), name)
  })

  gen('app', { name })
    .then(() => Logger.success(`Created ${name}`))
    .catch(err => Logger.error(err))
}
