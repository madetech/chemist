import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { requestMiddleware } from 'chemist'
import logger from './middleware/logger'

export default function configureStore (history, client, data) {
  const middleware = [
    requestMiddleware({ api: client }),
    routerMiddleware(history)
  ]

  if (__DEVELOPMENT__) {
    middleware.push(logger())
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  const reducer = require('../reducers')

  const store = createStoreWithMiddleware(reducer, data)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'))
    })
  }

  return store
}
