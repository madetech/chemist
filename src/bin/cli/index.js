import program from 'commander'
import { compile, generate, newApp, serveApi, serveApp, watch } from './commands'
import pkg from '../../../package.json'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

program.version(pkg.version)

program
  .command('serve-app')
  .description('start the app server')
  .action(serveApp)

program
  .command('serve-api')
  .description('start the api server')
  .action(serveApi)

program
  .command('compile')
  .description('compile the production client assets')
  .action(compile)

program
  .command('watch')
  .description('start live reload server')
  .action(watch)

program
  .command('generate <generator> <name> [generatorOptions...]')
  .alias('g')
  .description('generate files')
  .action(generate)

program
  .command('new <name> [directory]')
  .description('create new app')
  .action(newApp)

program.parse(process.argv)
