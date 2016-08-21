import chalk from 'chalk'

export const warn = msg => console.warn(chalk.yellow(msg))
export const error = msg => console.error(chalk.red(msg))
export const success = msg => console.info(chalk.green(msg))
