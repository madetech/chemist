import extend from 'extend'
import { handle as middleware, LanguageDetector } from 'i18next-express-middleware'
import configureI18n from './configureI18n'

const DEFAULTS = {
  i18n: {
    lng: 'en',
    fallbackLng: 'en',
  },
  detector: {
    lookupQuerystring: 'locale',
    order: ['querystring']
  }
}

export default function (config = {}) {
  const options = extend(true, {}, DEFAULTS, config)
  return function localisation (req, res, next) {
    const detector = new LanguageDetector(null, options.detector)

    configureI18n(options, instance => instance.use(detector))
      .then(i18n => middleware(i18n)(req, res, next))
      .catch(err => { throw err })
  }
}
