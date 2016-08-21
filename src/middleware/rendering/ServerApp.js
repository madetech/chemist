import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ReduxAsyncConnect } from 'redux-connect'
import { RouterContext } from 'react-router'

export default function ServerApp ({ store, req, renderProps }) {
  return (
    <Provider store={store} key="provider">
      <I18nextProvider i18n={req.i18n}>
        <RouterContext {...renderProps}>
          <ReduxAsyncConnect />
        </RouterContext>
      </I18nextProvider>
    </Provider>
  )
}

ServerApp.propTypes = {
  store: PropTypes.any.isRequired,
  req: PropTypes.any.isRequired,
  renderProps: PropTypes.object.isRequired
}
