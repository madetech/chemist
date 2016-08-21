function absoluteUrl (path, config) {
  if (__SERVER__) return `http://${config.host}:${config.port}${path}`
  return `/api${path}`
}

function requestOptions (config) {
  const options = { mode: 'cors', headers: {} }
  const cookie = __SERVER__ && config.req && config.req.get('cookie')
  if (cookie) options.headers.Cookie = cookie

  return options
}

function localise (query, config) {
  if (query.locale) return query

  const locale = (config.req && config.req.language) || (window && window.__locale)
  return { ...query, locale }
}

function makeRequest (apiRequest, method, query, config) {
  return new Promise((accept, reject) => {
    const localisedOptions = localise(query, config)

    apiRequest[method](localisedOptions)
      .then(res => accept(res))
      .catch(err => reject(err))
  })
}

class ApiClient {
  static methods = ['get', 'post', 'put', 'patch', 'delete']

  constructor (path, config) {
    const apiRequest = fetchival(
      absoluteUrl(path, config),
      requestOptions(config)
    )

    ApiClient.methods.forEach((method) => {
      this[method] = (options = {}) => makeRequest(apiRequest, method, options, config)
    })
  }
}

export default function createApiClient (config = {}) {
  return function (path) {
    return new ApiClient(path, config)
  }
}
