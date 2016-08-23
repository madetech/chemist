import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

module.exports = function () {
  return {
    assets: {
      images: {
        extensions: [
          'jpeg',
          'jpg',
          'png',
          'gif'
        ],
        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
      },
      fonts: {
        extensions: [
          'woff',
          'woff2',
          'ttf',
          'eot'
        ],
        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
      },
      svg: {
        extension: 'svg',
        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
      },
      style_modules: {
        extensions: ['scss'],
        filter (module, regex, options, log) {
          if (options.development) {
            return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
          }

          return regex.test(module.name)
        },
        path (module, options, log) {
          if (options.development) {
            return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
          }

          return module.name
        },
        parser (module, options, log) {
          if (options.development) {
            return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
          }

          return module.source
        }
      }
    }
  }
}
