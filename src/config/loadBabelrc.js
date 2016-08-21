const fs = require('fs')
const path = require('path')

function reactHmrPlugin (plugins) {
  const pluginIndex = plugins.findIndex(function (plugin) {
    return Array.isArray(plugin) && plugin[0] === 'react-transform'
  })

  const plugin = pluginIndex > -1
    ? plugins.splice(pluginIndex, 1)[0]
    : ['react-transform', { transforms: [] }]

  plugin[1].transforms = plugin[1].transforms || []
  plugin[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
  })

  return plugin
}

module.exports = function loadBabelrc ({ client = false } = {}) {
  const babelrcPath = path.join(process.cwd(), '.babelrc')
  let config = {}

  if (fs.existsSync(babelrcPath)) {
    config = JSON.parse(fs.readFileSync(babelrcPath))
  }

  const envConfig = (config.env && config.env.development) || {}
  const plugins = [...(config.plugins || []), ...(envConfig.plugins || [])]
  const babelrc = Object.assign({}, config, envConfig, { plugins })
  delete babelrc.env

  if (!client) return babelrc

  babelrc.plugins.push(reactHmrPlugin(babelrc.plugins))
  return babelrc
}
