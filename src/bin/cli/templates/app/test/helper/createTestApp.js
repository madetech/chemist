import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { mount } from 'enzyme'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import translations from '../../config/locales/index.translations'
import configureRoutes from '../../shared/routes'

export default function createTestApp (client, history, store) {
  const renderAsync = props => (
    <ReduxAsyncConnect
      {...props}
      helpers={{ client }}
      filter={item => !item.deferred}
    />
  )

  const router = (
    <Router history={history} render={renderAsync}>
      {configureRoutes(store)}
    </Router>
  )

  i18n.init({ lng: 'en', fallbackLng: 'en', resources: translations })

  return mount(
    <Provider store={store} key="provider">
      <I18nextProvider i18n={i18n}>
        {router}
      </I18nextProvider>
    </Provider>
  )
}
