import path from 'path'
import createConfig from './createConfig'

export default createConfig([
  __dirname,
  path.join(process.cwd(), './config')
])
