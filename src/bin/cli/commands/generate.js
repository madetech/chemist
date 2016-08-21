import path from 'path'
import filegen from 'filegen'
import * as Logger from '../helpers/logger'

const gen = filegen({
  templatesDir: path.join(__dirname, '../templates'),
  cwd: process.cwd()
}, {
  component ({ name, options }) {
    const propTypes = options.map(propType => {
      const [prop, type, required] = propType.split(':')
      return { prop, type, required: required === 'required' }
    })

    return { name, propTypes }
  }
})

export default function generate (generatorName, generatedName, generatorOptions) {
  gen(generatorName, { name: generatedName, options: generatorOptions })
    .then(files => Logger.success(`Generated ${files.join(', ')}`))
    .catch(err => Logger.error(err))
}
