import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ReduxAsyncConnect } from 'redux-connect'
import { RouterContext } from 'react-router'
import AppConfigProvider from '../../helpers/AppConfigProvider'

export default function ServerApp ({ appConfig, store, req, renderProps }) {
  return (
    <Provider store={store} key="provider">
      <I18nextProvider i18n={req.i18n}>
        <AppConfigProvider config={appConfig}>
          <RouterContext {...renderProps}>
            <ReduxAsyncConnect />
          </RouterContext>
        </AppConfigProvider>
      </I18nextProvider>
    </Provider>
  )
}

ServerApp.propTypes = {
  appConfig: PropTypes.any,
  store: PropTypes.any.isRequired,
  req: PropTypes.any.isRequired,
  renderProps: PropTypes.object.isRequired
}
