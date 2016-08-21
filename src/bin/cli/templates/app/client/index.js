import 'babel-polyfill'
import 'isomorphic-fetch'
import fetchival from 'fetchival'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { createApiClient } from 'chemist'
import translations from '../config/locales/index.translations'
import configureStore from '../shared/store'
import configureRoutes from '../shared/routes'
import config from '../config'

global.fetchival = fetchival

i18n.init({ lng: window.__locale, fallbackLng: 'en', resources: translations })

const apiClient = createApiClient({
  host: config.apiHost,
  port: config.apiPort
})

const store = configureStore(browserHistory, apiClient, window.__data)
const history = syncHistoryWithStore(browserHistory, store)
const root = document.getElementById('content')
const renderAsync = props => (
  <ReduxAsyncConnect
    {...props}
    helpers={{ client: apiClient }}
    filter={item => !item.deferred}
  />
)

const router = (
  <Router history={history} render={renderAsync}>
    {configureRoutes(store)}
  </Router>
)

ReactDOM.render(
  <Provider store={store} key="provider">
    <I18nextProvider i18n={i18n}>
      {router}
    </I18nextProvider>
  </Provider>,
  root
)
