import path from 'path'

const pairs = (a, b) =>
  a.reduce((aAcc, source) =>
    aAcc.concat(b.reduce((bAcc, env) =>
      bAcc.concat({ source, env })
    , []))
  , [])

export default function createConfig (sources) {
  return function config (name) {
    const envs = ['default', process.env.NODE_ENV]
    return pairs(sources, envs).reduce((currentConfig, { source, env }) => {
      if (!source || !env || !name) return {}
      const configPath = path.join(source, env, name)

      try {
        return require(configPath)(currentConfig)
      } catch (e) {
        return currentConfig
      }
    }, {})
  }
}
