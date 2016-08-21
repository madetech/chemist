import i18next from 'i18next'
import Backend from 'i18next-node-fs-backend'

export default function configureI18n (options, cb) {
  return new Promise((accept, reject) => {
    const backend = new Backend(null, { loadPath: options.resourcePath })
    const i18n = i18next.use(backend)

    if (cb) cb.call(this, i18n)

    i18n.init(options.i18n, err => {
      if (err) reject(err)
      accept(i18n)
    })
  })
}
